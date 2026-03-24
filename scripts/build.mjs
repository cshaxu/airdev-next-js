import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const srcRoot = path.join(repoRoot, 'src');
const libRoot = path.join(repoRoot, 'lib');
const tscBin = require.resolve('typescript/bin/tsc');

fs.rmSync(libRoot, { recursive: true, force: true });
execFileSync(process.execPath, [tscBin, '-p', 'tsconfig.build.json'], {
  cwd: repoRoot,
  stdio: 'inherit',
});

copyIfExists(
  path.join(srcRoot, 'frontend', 'styles'),
  path.join(libRoot, 'frontend', 'styles')
);
copyIfExists(
  path.join(srcRoot, 'frontend', 'fonts'),
  path.join(libRoot, 'frontend', 'fonts')
);
copyIfExists(
  path.join(srcRoot, 'config-contracts.d.ts'),
  path.join(libRoot, 'config-contracts.d.ts')
);

rewritePackageAliases(libRoot);

function copyIfExists(sourcePath, targetPath) {
  if (!fs.existsSync(sourcePath)) {
    return;
  }

  const stat = fs.statSync(sourcePath);
  if (stat.isDirectory()) {
    copyDirectory(sourcePath, targetPath);
  } else {
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.copyFileSync(sourcePath, targetPath);
  }
}

function copyDirectory(sourceDir, targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function rewritePackageAliases(rootDir) {
  for (const filePath of walkFiles(rootDir)) {
    if (!/\.(js|jsx|d\.ts)$/.test(filePath)) {
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const rewritten = content.replace(
      /(['"])@\/package\/([^'"\r\n]+)\1/g,
      (_match, quote, target) => {
        const resolvedTarget = resolvePackageTarget(rootDir, target);
        if (resolvedTarget === null) {
          throw new Error(`Unable to resolve @/package/${target} from ${filePath}`);
        }

        let relative = path.relative(path.dirname(filePath), resolvedTarget);
        relative = relative.replace(/\\/g, '/');
        relative = relative.replace(/\/(index\.(js|jsx|d\.ts))$/i, '');
        relative = relative.replace(/\.(js|jsx|d\.ts)$/i, '');
        if (!relative.startsWith('.')) {
          relative = `./${relative}`;
        }
        return `${quote}${relative}${quote}`;
      }
    );

    fs.writeFileSync(filePath, rewritten, 'utf8');
  }
}

function resolvePackageTarget(rootDir, target) {
  const basePath = path.join(rootDir, target);
  const candidates = [
    basePath,
    `${basePath}.js`,
    `${basePath}.jsx`,
    `${basePath}.d.ts`,
    path.join(basePath, 'index.js'),
    path.join(basePath, 'index.jsx'),
    path.join(basePath, 'index.d.ts'),
  ];

  return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
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