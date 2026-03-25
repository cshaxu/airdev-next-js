#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');
const resourceRoot = path.join(packageRoot, 'resources', 'root');

main();

function main() {
  const { command, scope, options } = parseArgs(process.argv.slice(2));
  if (command === 'help') {
    printHelp();
    return;
  }

  if (command !== 'generate' || scope !== 'root') {
    printHelp();
    process.exitCode = 1;
    return;
  }

  if (!fs.existsSync(resourceRoot)) {
    throw new Error(`Resource root not found: ${resourceRoot}`);
  }

  const targetRoot = path.resolve(options.cwd ?? process.cwd());
  if (targetRoot === packageRoot) {
    throw new Error(
      'Refusing to generate root files into the package repo itself. Run this from a consumer app root or pass --cwd <app-root>.'
    );
  }

  const results = syncDirectory(resourceRoot, targetRoot, options);
  reportResults(results, options.check === true);

  const hasFailures = results.some((result) => result.status === 'needs_update');
  if (hasFailures) {
    process.exitCode = 1;
  }
}

function parseArgs(args) {
  const options = {
    check: false,
    cwd: null,
  };

  const [command = 'help', scope, ...rest] = args;

  for (let index = 0; index < rest.length; index += 1) {
    const arg = rest[index];
    if (arg === '--check') {
      options.check = true;
      continue;
    }
    if (arg === '--cwd') {
      options.cwd = rest[index + 1] ?? null;
      index += 1;
      continue;
    }
    if (arg.startsWith('--cwd=')) {
      options.cwd = arg.slice('--cwd='.length);
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  return { command, scope, options };
}

function printHelp() {
  const scriptPath = path.relative(process.cwd(), path.join(__dirname, 'generate.mjs'));
  console.log(
    [
      'Usage:',
      `  node ${scriptPath} generate root [--check] [--cwd <path>]`,
      '',
      'Behavior:',
      '  Copies the contents of resources/root into the consumer app root.',
      '  Existing files are overwritten to match the package resources.',
      '  --check  Report drift without writing files.',
      '  --cwd    Generate into a specific app root. Defaults to the current working directory.',
    ].join('\n')
  );
}

function syncDirectory(sourceDir, targetDir, options) {
  const results = [];

  for (const sourcePath of walkFiles(sourceDir)) {
    const relativePath = path.relative(sourceDir, sourcePath);
    const targetPath = path.join(targetDir, relativePath);
    const sourceContent = fs.readFileSync(sourcePath);
    const targetExists = fs.existsSync(targetPath);
    const targetContent = targetExists ? fs.readFileSync(targetPath) : null;

    if (targetContent !== null && Buffer.compare(sourceContent, targetContent) === 0) {
      results.push({ status: 'unchanged', targetPath });
      continue;
    }

    if (options.check === true) {
      results.push({ status: 'needs_update', targetPath });
      continue;
    }

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.copyFileSync(sourcePath, targetPath);
    results.push({
      status: targetExists ? 'updated' : 'created',
      targetPath,
    });
  }

  return results;
}

function reportResults(results, isCheck) {
  const groups = [
    ['created', 'Created'],
    ['updated', 'Updated'],
    ['unchanged', 'Unchanged'],
    ['needs_update', isCheck ? 'Needs update' : 'Needs update'],
  ];

  for (const [status, label] of groups) {
    const matches = results.filter((result) => result.status === status);
    if (matches.length === 0) {
      continue;
    }

    console.log(`${label}:`);
    for (const match of matches) {
      console.log(`  ${match.targetPath}`);
    }
  }
}

function* walkFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkFiles(fullPath);
    } else {
      yield fullPath;
    }
  }
}
