#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

main();

function main() {
  const [sourceArg, targetArg, logArg] = process.argv.slice(2);
  if (!sourceArg || !targetArg || process.argv.length > 5) {
    console.error(
      'Usage: extract.mjs <source-dir> <resources-dir> [log-file]'
    );
    process.exit(1);
  }

  const repoRoot = path.resolve(sourceArg);
  const targetRoot = path.resolve(targetArg);
  const logPath = logArg ? path.resolve(logArg) : null;
  const requiredDir = path.join(targetRoot, 'required');
  const optionalDir = path.join(targetRoot, 'optional');

  if (!fs.existsSync(repoRoot) || !fs.statSync(repoRoot).isDirectory()) {
    throw new Error(`Source repo not found: ${repoRoot}`);
  }

  if (targetRoot === path.parse(targetRoot).root) {
    throw new Error(`Refusing to write to target: ${targetRoot}`);
  }

  const relPaths = walkRepoFiles(repoRoot).filter((relPath) => {
    const sourcePath = path.join(repoRoot, relPath);
    return (
      sourcePath !== targetRoot &&
      !sourcePath.startsWith(`${targetRoot}${path.sep}`)
    );
  });
  const totalCount = relPaths.length;

  fs.rmSync(requiredDir, { recursive: true, force: true });
  fs.rmSync(optionalDir, { recursive: true, force: true });
  fs.mkdirSync(requiredDir, { recursive: true });
  fs.mkdirSync(optionalDir, { recursive: true });

  const createdDirs = new Set([requiredDir, optionalDir]);
  const requiredEntries = [];
  const optionalEntries = [];
  const skippedEntries = [];

  let lastPercent = -1;
  for (const [index, relPath] of relPaths.entries()) {
    const sourcePath = path.join(repoRoot, relPath);

    if (relPath.startsWith(`src${path.sep}airdev${path.sep}`)) {
      copyFile(sourcePath, path.join(requiredDir, relPath), createdDirs);
      requiredEntries.push(relPath);
      lastPercent = printProgress(index + 1, totalCount, relPath, lastPercent);
      continue;
    }

    const bucket = classifyFile(sourcePath);
    if (bucket === 'required') {
      copyFile(sourcePath, path.join(requiredDir, relPath), createdDirs);
      requiredEntries.push(relPath);
    } else if (bucket === 'optional') {
      copyFile(sourcePath, path.join(optionalDir, relPath), createdDirs);
      optionalEntries.push(relPath);
    } else {
      skippedEntries.push(relPath);
    }

    lastPercent = printProgress(index + 1, totalCount, relPath, lastPercent);
  }

  if (totalCount > 0) {
    process.stdout.write('\n');
  }

  if (logPath) {
    ensureDir(path.dirname(logPath), createdDirs);
    fs.writeFileSync(
      logPath,
      buildLog({
        requiredEntries,
        optionalEntries,
        skippedEntries,
      }),
      'utf8'
    );
  }

  console.log(`Required: ${requiredEntries.length}`);
  console.log(`Optional: ${optionalEntries.length}`);
  console.log(`Skipped: ${skippedEntries.length}`);
}

function walkRepoFiles(repoRoot) {
  const ignoreMatcher = createIgnoreMatcher(repoRoot);
  const relPaths = [];
  walkDirectory(repoRoot, '');
  return relPaths;

  function walkDirectory(absDirPath, relDirPath) {
    for (const entry of fs.readdirSync(absDirPath, { withFileTypes: true })) {
      const relPath = relDirPath
        ? path.join(relDirPath, entry.name)
        : entry.name;
      const normalizedRelPath = normalizePath(relPath);
      const absPath = path.join(absDirPath, entry.name);

      if (ignoreMatcher(normalizedRelPath, entry.isDirectory())) {
        continue;
      }

      if (entry.isDirectory()) {
        walkDirectory(absPath, relPath);
      } else if (entry.isFile()) {
        relPaths.push(relPath);
      }
    }
  }
}

function createIgnoreMatcher(repoRoot) {
  const rules = parseIgnoreRules(path.join(repoRoot, '.gitignore'));
  const alwaysIgnore = new Set(['.git', 'node_modules']);

  return (relPath, isDirectory) => {
    const segments = relPath.split('/');
    if (segments.some((segment) => alwaysIgnore.has(segment))) {
      return true;
    }

    let ignored = false;
    for (const rule of rules) {
      if (!matchesRule(rule, relPath, isDirectory)) {
        continue;
      }
      ignored = !rule.negated;
    }
    return ignored;
  };
}

function parseIgnoreRules(ignoreFilePath) {
  if (!fs.existsSync(ignoreFilePath)) {
    return [];
  }

  return fs
    .readFileSync(ignoreFilePath, 'utf8')
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const negated = line.startsWith('!');
      const rawPattern = negated ? line.slice(1) : line;
      const directoryOnly = rawPattern.endsWith('/');
      const anchored = rawPattern.startsWith('/');
      const pattern = rawPattern.replace(/^\//u, '').replace(/\/$/u, '');

      return { anchored, directoryOnly, negated, pattern };
    })
    .filter((rule) => rule.pattern);
}

function matchesRule(rule, relPath, isDirectory) {
  if (rule.directoryOnly && !isDirectory) {
    return false;
  }

  const basename = path.posix.basename(relPath);
  const hasSlash = rule.pattern.includes('/');

  if (rule.directoryOnly) {
    if (rule.anchored) {
      return relPath === rule.pattern || relPath.startsWith(`${rule.pattern}/`);
    }
    return (
      relPath === rule.pattern ||
      relPath.startsWith(`${rule.pattern}/`) ||
      relPath.includes(`/${rule.pattern}/`)
    );
  }

  if (!hasSlash) {
    return matchesGlob(basename, rule.pattern);
  }

  if (rule.anchored) {
    return matchesGlob(relPath, rule.pattern);
  }

  return matchesGlob(relPath, rule.pattern) || matchesGlob(relPath, `**/${rule.pattern}`);
}

function matchesGlob(value, pattern) {
  return globToRegExp(pattern).test(value);
}

function globToRegExp(pattern) {
  let regex = '^';

  for (let index = 0; index < pattern.length; index += 1) {
    const char = pattern[index];

    if (char === '*') {
      const nextChar = pattern[index + 1];
      if (nextChar === '*') {
        const afterNextChar = pattern[index + 2];
        if (afterNextChar === '/') {
          regex += '(?:.*/)?';
          index += 2;
        } else {
          regex += '.*';
          index += 1;
        }
      } else {
        regex += '[^/]*';
      }
      continue;
    }

    if (char === '?') {
      regex += '[^/]';
      continue;
    }

    regex += escapeRegExp(char);
  }

  return new RegExp(`${regex}$`, 'u');
}

function escapeRegExp(value) {
  return value.replace(/[|\\{}()[\]^$+?.]/gu, '\\$&');
}

function classifyFile(filePath) {
  const header = readHeader(filePath);
  if (header === null) {
    return null;
  }

  if (
    header.includes('@airdev/next managed') ||
    header.includes('"@airdev/next": "managed"')
  ) {
    return 'required';
  }

  if (
    header.includes('@airdev/next seeded') ||
    header.includes('"@airdev/next": "seeded"')
  ) {
    return 'optional';
  }

  return null;
}

function readHeader(filePath) {
  const fd = fs.openSync(filePath, 'r');
  try {
    const buffer = Buffer.alloc(4096);
    const bytesRead = fs.readSync(fd, buffer, 0, buffer.length, 0);
    const chunk = buffer.subarray(0, bytesRead);

    if (chunk.includes(0)) {
      return null;
    }

    const text = chunk.toString('utf8');
    const lines = text.split(/\r?\n/u).slice(0, 2);
    return lines.join('\n');
  } finally {
    fs.closeSync(fd);
  }
}

function copyFile(sourcePath, targetPath, createdDirs) {
  ensureDir(path.dirname(targetPath), createdDirs);
  fs.copyFileSync(sourcePath, targetPath);
}

function ensureDir(dirPath, createdDirs) {
  if (createdDirs.has(dirPath)) {
    return;
  }
  fs.mkdirSync(dirPath, { recursive: true });
  createdDirs.add(dirPath);
}

function buildLog({ requiredEntries, optionalEntries, skippedEntries }) {
  return [
    `Required (${requiredEntries.length}):`,
    ...requiredEntries,
    '',
    `Optional (${optionalEntries.length}):`,
    ...optionalEntries,
    '',
    `Skipped (${skippedEntries.length}):`,
    ...skippedEntries,
    '',
  ].join('\n');
}

function printProgress(current, total, relPath, lastPercent) {
  if (total === 0) {
    return lastPercent;
  }

  const percent = Math.floor((current / total) * 100);
  if (percent === lastPercent && current !== total) {
    return lastPercent;
  }

  const message = `Progress: ${percent}% (${current}/${total}) ${normalizePath(relPath)}`;
  if (process.stdout.isTTY) {
    process.stdout.write(`\r${message}`);
  } else {
    console.log(message);
  }

  return percent;
}

function normalizePath(filePath) {
  return filePath.split(path.sep).join('/');
}
