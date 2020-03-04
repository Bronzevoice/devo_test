const FileData = require('../FileData/index.js');
const chalk = require('chalk');
const argv = require('yargs').argv;

class DataStorage {
    constructor () {
        this.totalFiles = [];
        this.filesWhereKeyIsPresent = [];
        this.totalOcurrencesNumber = 0;
        this.contentSize = 0;
        this.filesData = []; 
        this.showInfoInterval = null;
    }

    addFileData(fileName, content, keyPhrase) {                    
        const wordsInFile = content.match(/\S+/g);
        if (wordsInFile.length)  {
          const ocurrencesCount = wordsInFile.filter((v) => (v.toLowerCase() === keyPhrase.toLowerCase())).length;
          const numberOfWordsInFile = wordsInFile ? wordsInFile.length : 0;
        
          this.filesData.push(new FileData(numberOfWordsInFile, ocurrencesCount, fileName))
          if (ocurrencesCount > 0) {
              this.filesWhereKeyIsPresent.push(fileName); 
          }
  
          this.contentSize += numberOfWordsInFile;
          this.totalOcurrencesNumber += ocurrencesCount;
        }     
    }

    calculateTfIdfRanking() {
        let string_to_show = '';
        const resultsToShow = argv.n || 3;
        const idf = Math.log10(this.totalFiles.length / this.filesWhereKeyIsPresent.length);
        this.filesData.forEach((file) => {
          file.calculateTF_IDF(idf);
        });

        // Sorts files by tf-idf index
        this.filesData.sort((a, b) => {
          return b.tf_idf - a.tf_idf;
        });

        for (let i = 0; i < resultsToShow; i++) {
          if (this.filesData[i]) {
            string_to_show += `${this.filesData[i].fileName} : ${this.filesData[i].tf_idf} ; \n`;
          }
        }

        if (this.showInfoInterval) {
          clearInterval(this.showInfoInterval);
        }

        this.showInfoInterval = setInterval(() => {
          console.log(chalk.underline.cyan(string_to_show));
        }, argv.p * 1000 || 3000);

      }

 }
module.exports =  DataStorage
