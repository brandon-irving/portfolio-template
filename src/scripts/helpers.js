const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to create the "Job" folder and "index.md" file
function createFolderAndFile(directory, filePath, data) {
  // Remove old stuff first
  // Create the "Job" folder
  fs.mkdir(directory, err => {
    if (err && err.code !== 'EEXIST' && err.code !== 'ENOENT') {
      throw err;
    }
    if (!fs.existsSync(directory)) {
      console.log(`No directory "${directory}" found, creating directory`);
      fs.mkdirSync(directory, { recursive: true });
      console.log(`successfully created "${directory}" directory`);
    }
    console.log(`${directory} created`);
    createFile(filePath, data);
  });
}

// Function to create the "index.md" file and write to it

function createFile(filePath, data) {
  const directory = path.dirname(filePath);

  if (!fs.existsSync(directory)) {
    console.log(`No directory "${directory}" found, creating directory`);
    fs.mkdirSync(directory, { recursive: true });
    console.log(`successfully created "${directory}" directory`);
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, data);
    console.log(`successfully created "${filePath}"`);
  }
  fs.readFile(`${filePath}`, 'utf8', err => {
    if (err) {
      throw err;
    }
    rl.close();
  });
}

exports.modules = {
  createFolderAndFile,
  createFile,
};
