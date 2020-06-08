const fs = require("fs");

class GenerateData {
    constructor(amount = 100000, strsize = 10, dictionary = "0123456789") {
        this.amount = amount;
        this.strsize = strsize;
        this.dictionary = dictionary;
        this.enableRangeStrsize = false;
        this.dataArray = [];
    }

    generateArrayString() {
        const timeStart = Date.now();
        let dictionaryLength = this.dictionary.length;
        let result = []
        let currentString = ''
        while (result.length < this.amount) {
            while (currentString.length < this._getStrSize()) { //длина строки
                currentString += this.dictionary[Math.random() * dictionaryLength | 0];
                // currentString += dictionary[Math.round(Math.random() * dictionaryLength)];
            }
            result.push(currentString);
            currentString = '';
        }
        const timeEnd = Date.now();
        console.log(`-Array is generated! in ${timeEnd - timeStart}ms -`)
        this.dataArray = result
    }

    _getStrSize(){
        if (!this.enableRangeStrsize){
            return this.strsize;
        }
        else {
            return (Math.random() * (this.strsizeMax-this.strsizeMin) + this.strsizeMin) | 0;
        }
    }

    setRangeStringSize(min,max){
        this.strsizeMin = min;
        this.strsizeMax = max;
        this.enableRangeStrsize = true;
    }

    checkUniqueness() {
        let setValueArray = new Set(this.dataArray);
        let sizeArray = this.dataArray.length;
        let sizeSet = setValueArray.size;
        if (sizeSet === sizeArray) {
            console.log('-All values are unique!-');
        } else {
            console.log(`- All values are NOT unique! SizeArray = ${sizeArray}, SizeUniqueSet = ${sizeSet} -`);
        }
    }

    writeArrayToFile(filename = 'result+.txt') {
        // fs.writeFile("result.txt", data,()=>console.log("_completed write!")); // пример записи данных строки
        const timeStart = Date.now();
        if (this.dataArray.length === 0) {
            console.log('Array is empty')
            return;
        }

        let resultFile = fs.createWriteStream(filename)
        resultFile.on('error', function (err) {
            console.log(err)
        })
        this.dataArray.forEach((data) => {
            resultFile.write(`${data}\n`);
        })
        resultFile.end()
        const timeEnd = Date.now()
        console.log(`-File is recorded! in ${timeEnd - timeStart}ms -`)
    }
}

module.exports = GenerateData; // For Export one Object

// For Export many Objects
// exports.GenerateData = GenerateData;
// exports.test_string = "Alalala";



/*console.log(x);
let test = new GenerateData(150000, 50, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
let x = generateArrayString(1500000,10,'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
let x = generateArrayString(1000000,10,'abcdefghijklmnopqrstuvwxyz');
let x = generateArrayString(1000000,10,'0123456789');
writeArrayToFile(x);*/

