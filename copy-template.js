import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function copyTemplate(destination) {
  const destinationPath = path.resolve(destination);

  const excludedFolders = ['node_modules', 'dist', '.vercel'];

  const filterFunction = (src) => {
    return !excludedFolders.some((exclusion) => src.includes(exclusion));
  };

  const copyFile = (src, dest) => {
    const destDir = path.dirname(dest);

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    fs.copyFileSync(src, dest);
  };

  const copyContents = (src, dest) => {
    const contents = fs.readdirSync(src);

    contents.forEach((item) => {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);

      if (filterFunction(srcPath)) {
        if (fs.statSync(srcPath).isDirectory()) {
          copyContents(srcPath, destPath);
        } else {
          copyFile(srcPath, destPath);
        }
      }
    });
  };

  copyContents(path.join(__dirname, 'template'), destinationPath);
}
