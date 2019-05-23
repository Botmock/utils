import fs from 'fs';
import { promisify } from 'util';
import { exec } from 'child_process';
import { join } from 'path';

export const checkEnvVars = async (n = 4) => {
  const envpath = join(process.cwd(), '.env');
  // Create .env if it does not exist
  try {
    await fs.promises.access(envpath, fs.constants.R_OK);
  } catch (_) {
    fs.writeFileSync(envpath, ``);
  }
  const file = fs.readFileSync(envpath, 'utf8');
  // Exit if there are too few env vars
  if (file.match(/BOTMOCK_\w+/g).length < n) {
    throw new Error(`must define env variables in ${process.cwd()}/.env
see README.md
`);
  }
};

// determine if arguments are globally installed npm packages
export const doesHaveGlobalPackages = async packages => {
  const { stdout } = await promisify(exec)('npm ls -g --depth=0');
  return packages.every(packageName =>
    stdout.split('\n').find(line => line.includes(packageName))
  );
};
