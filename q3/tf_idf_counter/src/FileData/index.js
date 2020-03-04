class FileData {
    constructor(fileContentSize, fileOcurrences, fileName){
        this.fileName = fileName,
        this.fileContentSize = fileContentSize,
        this.fileOcurrences = fileOcurrences
        this.tf_idf = 0;
    }

    calculateTF_IDF(idf) {
        if (idf !== 0 ) {
            const tf = this.fileOcurrences / this.fileContentSize;
            const rawTf_Idf = tf / idf;
            this.tf_idf = Math.round(((rawTf_Idf) + Number.EPSILON) * 10000000) / 10000000;
        } else {
            this.tf_idf = 0;
        }
    }
}

module.exports =  FileData;
