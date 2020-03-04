const chokidar = require('chokidar');
const fs = require('fs');
const chalk = require('chalk');
const config = require('dotenv').config().parsed;
const argv = require('yargs').argv;
const path = require('path');

const DataStorage = require('./src/DataStorage/index.js');
const dataStorage = new DataStorage();

const pathData = argv.d || config.DATA_PATH;
let keyPhrase;


const watcher = chokidar.watch(pathData, {
  persistent: true,
  ignoreInitial: true
})

// Listens when a new file is added and updates data
watcher.on('add', async (event) => {
  console.log(chalk.magenta.underline('File added: ' + path.basename(event)));
  let fileName = path.basename(event);
  dataStorage.totalFiles.push(fileName);
  await readSingleFile(pathData, fileName, keyPhrase);
  dataStorage.calculateTfIdfRanking();
});


function readFiles(dirname) {

  const readFilesPromises = [];

  fs.readdir(dirname, function(err, filenames) {

    if (err) {
      console.log(err);
    }

    // Filters hidden files
    filenames = filenames.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));

    dataStorage.totalFiles = filenames;
    dataStorage.totalFiles.forEach(function(filename) {
      readFilesPromises.push(
        readSingleFile(dirname, filename, keyPhrase)
      );
    });

    Promise.all(readFilesPromises).then((content) => {
      dataStorage.calculateTfIdfRanking();
    });

  });
}



function readSingleFile(dirname, filename, keyPhrase) {

  return new Promise((resolve, reject) => {
    fs.readFile(dirname + '/' + filename, 'utf-8', function (err, fileContent) {
      if (err) {
        console.log(err);
        reject(err);
      }

      resolve(dataStorage.addFileData(filename, fileContent, keyPhrase));
    });
  });
}

// Checks if -t param is present to run the program
if (argv.t) {
  keyPhrase = argv.t;
  readFiles(pathData, dataStorage.addFileData);
} else {
  console.log(chalk.red('Please indicate the term to check (-t param)'));
  process.exit()
}




