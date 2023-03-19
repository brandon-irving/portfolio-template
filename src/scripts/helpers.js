const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to create the "Job" folder and "index.md" file
function createFolderAndFile(directory, filePath, data) {
  // Create the "Job" folder
  fs.mkdir(directory, err => {
    if (err && err.code !== 'EEXIST') {throw err;}

    console.log(`${directory} created`);

    // Check if the "index.md" file already exists
    fs.access(`${filePath}`, fs.constants.F_OK, err => {
      if (!err) {
        // If it exists, prompt the user to confirm overwriting the file
        rl.question(
          'The "index.md" file already exists. Do you want to overwrite it? (y/n) ',
          answer => {
            if (answer === 'y') {
              createFile(filePath, data);
            } else {
              console.log('Aborting.');
              rl.close();
            }
          },
        );
      } else {
        createFile(filePath, data);
      }
    });
  });
}

// Function to create the "index.md" file and write to it
function createFile(filePath, data) {
  // Create the "index.md" file and write to it
  fs.writeFile(`${filePath}`, data, err => {
    if (err) {throw err;}

    console.log(`${filePath} was created`);

    // Read the content of the file to verify it was written successfully
    fs.readFile(`${filePath}`, 'utf8', (err, readData) => {
      if (err) {throw err;}

      console.log('Content:', readData);
      rl.close();
    });
  });
}

exports.modules = {
  createFolderAndFile,
  createFile,
};
