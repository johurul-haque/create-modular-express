#!/usr/bin/env node
const fs = require('fs-extra');
const { execSync } = require('child_process');
const readline = require('readline');
const path = require('path');

function isPackageInstalledGlobally(packageName) {
  try {
    execSync(`npm list -g ${packageName}`);
    return true;
  } catch (error) {
    return false;
  }
}

function promptUser(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function createFooApp(destination) {
  // Check if create-modular-express is installed globally
  const isInstalledGlobally = isPackageInstalledGlobally(
    'create-modular-express'
  );

  if (!isInstalledGlobally) {
    const shouldInstall = await promptUser(
      '? Do you want to install the following package globally? (y/n): '
    );

    if (shouldInstall.toLowerCase() === 'y') {
      try {
        execSync('npm install -g create-modular-express');
        console.log('Scaffolding tool has been installed globally.');
      } catch (error) {
        console.error('Error installing globally:', error.message);
        process.exit(1);
      }
    } else {
      process.exit(0);
    }
  }
  // If no destination is provided, prompt the user for a project name
  if (destination === '.') {
    destination = process.cwd(); // If a dot is provided, use the current directory
  } else if (!destination) {
    const userInput = await promptUser('? project name: ');
    destination = userInput || process.cwd(); // If the user presses Enter, use the current directory
  }

  // Copy template files
  await fs.copy(`${__dirname}/template`, destination, {
    filter: (src, dest) => {
      // Exclude node_modules, dist and .vercel folders
      return (
        !src.includes('node_modules') &&
        !src.includes('dist') &&
        !src.includes('.vercel')
      );
    },
    // Exclude node_modules and dist folders explicitly
    exclude: ['node_modules', 'dist'],
  });

  // Update package.json with the correct name
  const projectName = path.basename(destination); // Extract the last part of the path as the project name

  const packageJsonPath = `${destination}/package.json`;
  const packageJsonContent = await fs.readFile(packageJsonPath, 'utf-8');
  const updatedPackageJsonContent = packageJsonContent.replace(
    `"name": "modular-express-app"`,
    `"name": "${projectName}"`
  );

  await fs.writeFile(packageJsonPath, updatedPackageJsonContent, 'utf-8');

  console.log(`Scaffolded successfully.`);
}

// Check if there is an argument provided for the destination folder
const destinationArgument = process.argv[2];
createFooApp(destinationArgument);
