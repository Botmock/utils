import fs from 'fs';
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
