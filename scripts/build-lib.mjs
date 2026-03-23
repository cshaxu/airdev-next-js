import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const libDir = resolve(rootDir, 'lib');

function copyPath(from, to) {
  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to, { recursive: true });
}

rmSync(libDir, { recursive: true, force: true });

execFileSync(
  process.execPath,
  [
    resolve(rootDir, 'node_modules', 'typescript', 'bin', 'tsc'),
    '-p',
    'tsconfig.build.json',
  ],
  { cwd: rootDir, stdio: 'inherit' }
);

if (existsSync(resolve(rootDir, 'src', 'frontend', 'styles'))) {
  copyPath(
    resolve(rootDir, 'src', 'frontend', 'styles'),
    resolve(libDir, 'frontend', 'styles')
  );
}

if (existsSync(resolve(rootDir, 'src', 'app', 'fonts'))) {
  copyPath(
    resolve(rootDir, 'src', 'app', 'fonts'),
    resolve(libDir, 'app', 'fonts')
  );
}
