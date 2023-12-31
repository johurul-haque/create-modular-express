#!/usr/bin/env node

import fsExtra from 'fs-extra';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import path from 'path';
import { fileURLToPath } from 'url';
import { copyTemplate } from './copy-template.js';

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
    } else if (destination) {
      commands = `
  cd ${destination} 
  npm install
      `;
    } else {
      const projectName = await promptUser();

      destination = projectName || process.cwd();

      commands = `
  cd ${destination} 
  npm install
      `;
    }

    spinner.start({ color: 'blue' });

    copyTemplate(destination);

    const projectName = path.basename(destination);
    const packageJsonPath = `${destination}/package.json`;
    let packageJson = await fsExtra.readFile(packageJsonPath, 'utf-8');

    packageJson = packageJson.replace(
      `"name": "create-modular-express"`,
      `"name": "${projectName}"`
    );

    await fsExtra.writeFile(packageJsonPath, packageJson, 'utf-8');

    spinner.success({ text: 'Success!' });

    console.log(`
  Now run:
  ${commands}
    `);
  } catch (error) {
    spinner.error({ text: 'ERROR: Something went wrong!' });
    console.log(error);
    process.exit(1);
  }
}

runCli(process.argv[2]);
