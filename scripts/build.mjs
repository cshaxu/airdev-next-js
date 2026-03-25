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
  path.join(srcRoot, 'frontend', 'assets'),
  path.join(libRoot, 'frontend', 'assets')
);
copyIfExists(
  path.join(srcRoot, 'ambient.d.ts'),
  path.join(libRoot, 'ambient.d.ts')
);

rewritePackageAliases(libRoot);
assertExplicitRelativeModuleSpecifiers(libRoot);

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

    let rewritten = fs.readFileSync(filePath, 'utf8');
    const pattern =
      /((?:import|export)\s+(?:[^'"\r\n]+?\s+from\s+)?)(['"])([^'"\r\n]+)\2/g;
    rewritten = rewritten.replace(
      pattern,
      (_match, statementStart, quote, target) => {
        const rewrittenTarget = rewriteModuleTarget({
          filePath,
          rootDir,
          target,
        });
        if (rewrittenTarget === target) {
          return _match;
        }
        return `${statementStart}${quote}${rewrittenTarget}${quote}`;
      }
    );

    fs.writeFileSync(filePath, rewritten, 'utf8');
  }
}

function rewriteModuleTarget({ filePath, rootDir, target }) {
  if (target.startsWith('@/')) {
    const sourceTarget = resolveSourceTarget(srcRoot, target.slice(2));
    if (sourceTarget === null) {
      // Leave host-app aliases like @/config/* untouched.
      return target;
    }

    const relativeSourcePath = path
      .relative(srcRoot, sourceTarget)
      .replace(/\.(d\.ts|ts|tsx|js|jsx)$/i, '');
    const resolvedTarget = resolvePackageTarget(rootDir, relativeSourcePath);
    if (resolvedTarget === null) {
      throw new Error(`Unable to resolve @/${target.slice(2)} from ${filePath}`);
    }
    return formatRelativeModuleSpecifier(filePath, resolvedTarget);
  }

  if (!target.startsWith('./') && !target.startsWith('../')) {
    return target;
  }

  if (hasExplicitRuntimeExtension(target)) {
    return target;
  }

  const resolvedTarget = resolveRelativePackageTarget(filePath, target);
  if (resolvedTarget === null) {
    throw new Error(`Unable to resolve relative import ${target} from ${filePath}`);
  }
  return formatRelativeModuleSpecifier(filePath, resolvedTarget);
}

function resolveRelativePackageTarget(filePath, target) {
  const basePath = path.resolve(path.dirname(filePath), target);
  const candidates = [
    basePath,
    `${basePath}.js`,
    `${basePath}.jsx`,
    `${basePath}.d.ts`,
    path.join(basePath, 'index.js'),
    path.join(basePath, 'index.jsx'),
    path.join(basePath, 'index.d.ts'),
  ];

  return candidates.find(isExistingFile) ?? null;
}

function formatRelativeModuleSpecifier(filePath, resolvedTarget) {
  let finalTarget = resolvedTarget;
  if (finalTarget.endsWith('.d.ts')) {
    const jsTarget = finalTarget.replace(/\.d\.ts$/i, '.js');
    if (fs.existsSync(jsTarget)) {
      finalTarget = jsTarget;
    }
  }

  let relative = path.relative(path.dirname(filePath), finalTarget);
  relative = relative.replace(/\\/g, '/');
  if (!relative.startsWith('.')) {
    relative = `./${relative}`;
  }
  return relative;
}

function hasExplicitRuntimeExtension(target) {
  return /\.[a-z0-9]+$/i.test(target);
}

function isExistingFile(filePath) {
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
}

function assertExplicitRelativeModuleSpecifiers(rootDir) {
  const offenders = [];
  const pattern =
    /(?:import|export)\s+(?:[^'"\r\n]+?\s+from\s+)?['"](\.{1,2}\/[^'"\r\n]+)['"]/g;

  for (const filePath of walkFiles(rootDir)) {
    if (!/\.(js|d\.ts)$/.test(filePath)) {
      continue;
    }

    const source = fs.readFileSync(filePath, 'utf8');
    let match;
    while ((match = pattern.exec(source)) !== null) {
      const target = match[1];
      if (hasExplicitRuntimeExtension(target)) {
        continue;
      }
      offenders.push(`${filePath}: ${target}`);
    }
  }

  if (offenders.length > 0) {
    throw new Error(
      `Found extensionless relative module specifiers after build:\n${offenders.join('\n')}`
    );
  }
}

function resolveSourceTarget(rootDir, target) {
  const basePath = path.join(rootDir, target);
  const candidates = [
    basePath,
    `${basePath}.ts`,
    `${basePath}.tsx`,
    `${basePath}.js`,
    `${basePath}.jsx`,
    `${basePath}.d.ts`,
    path.join(basePath, 'index.ts'),
    path.join(basePath, 'index.tsx'),
    path.join(basePath, 'index.js'),
    path.join(basePath, 'index.jsx'),
    path.join(basePath, 'index.d.ts'),
  ];

  return candidates.find(isExistingFile) ?? null;
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

  return candidates.find(isExistingFile) ?? null;
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
