#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');
const requiredResourceRoot = path.join(packageRoot, 'resources', 'required');
const optionalResourceRoot = path.join(packageRoot, 'resources', 'optional');

main();

function main() {
  assertNoArgs(process.argv.slice(2));

  if (!fs.existsSync(requiredResourceRoot)) {
    throw new Error(
      `resources/required not found: ${requiredResourceRoot}`
    );
  }

  if (!fs.existsSync(optionalResourceRoot)) {
    throw new Error(
      `resources/optional not found: ${optionalResourceRoot}`
    );
  }

  const targetRoot = path.resolve(process.cwd());
  if (targetRoot === packageRoot) {
    throw new Error(
      'Refusing to generate project files into the package repo itself. Run this from a consumer app root.'
    );
  }

  const results = [
    ...syncRequiredDirectory(requiredResourceRoot, targetRoot),
    ...syncOptionalDirectory(optionalResourceRoot, targetRoot),
  ];
  reportResults(results);
}

function assertNoArgs(args) {
  if (args.length > 0) {
    throw new Error(
      `This script does not take arguments. Run it with no arguments from the target app root. Received: ${args.join(' ')}`
    );
  }
}

function syncRequiredDirectory(sourceDir, targetDir) {
  const results = [];

  for (const sourcePath of walkFiles(sourceDir)) {
    const relativePath = path.relative(sourceDir, sourcePath);
    const targetPath = path.join(targetDir, relativePath);
    const sourceContent = fs.readFileSync(sourcePath);
    const targetExists = fs.existsSync(targetPath);
    const targetContent = targetExists ? fs.readFileSync(targetPath) : null;

    if (
      targetContent !== null &&
      Buffer.compare(sourceContent, targetContent) === 0
    ) {
      results.push({ status: 'unchanged', targetPath });
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

function syncOptionalDirectory(sourceDir, targetDir) {
  const results = [];

  for (const sourcePath of walkFiles(sourceDir)) {
    const relativePath = path.relative(sourceDir, sourcePath);
    const targetPath = path.join(targetDir, relativePath);

    if (fs.existsSync(targetPath)) {
      results.push({ status: 'skipped', targetPath });
      continue;
    }

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.copyFileSync(sourcePath, targetPath);
    results.push({ status: 'created', targetPath });
  }

  return results;
}

function reportResults(results) {
  const groups = [
    ['created', 'Created'],
    ['updated', 'Updated'],
    ['unchanged', 'Unchanged'],
    ['skipped', 'Skipped'],
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
