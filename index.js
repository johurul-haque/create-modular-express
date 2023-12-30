#!/usr/bin/env node

import fs from 'fs-extra';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function promptUser() {
  const answer = await inquirer.prompt({
    name: 'project_name',
    type: 'input',
    message: 'project name:',
  });

  return answer.project_name;
}

async function runCli(destination) {
  const spinner = createSpinner('scaffolding...');

  let commands = `
  npm install
  `;

  try {
    if (destination === '.') {
      destination = process.cwd();
    } else if (!destination) {
      const projectName = await promptUser();

      destination = projectName || process.cwd();

      commands = `
  cd ${destination} 
  npm install
      `;
    }

    spinner.start({ color: 'blue' });

    await fs.copy(`${__dirname}/template`, destination, {
      filter: (src) => {
        const exclusions = ['node_modules', 'dist', '.vercel', '.env'];

        return !exclusions.some((exclusion) => src.includes(exclusion));
      },
    });

    const projectName = path.basename(destination);

    const packageJsonPath = `${destination}/package.json`;

    let packageJson = await fs.readFile(packageJsonPath, 'utf-8');

    packageJson = packageJson.replace(
      `"name": "modular-express-app"`,
      `"name": "${projectName}"`
    );

    await fs.writeFile(packageJsonPath, packageJson, 'utf-8');

    spinner.success({ text: 'Success!' });

    console.log(`
  Now run:
  ${commands}
    `);
  } catch (error) {
    spinner.error({ text: 'ERROR: Something went wrong!' });
    process.exit(1);
  }
}

await runCli(process.argv[2]);
