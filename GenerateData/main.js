const GenerateData = require('./generate.js'); // For import one object
// const {GenerateData,test_string} = require('./generate.js'); // For import many objects


let genData = new GenerateData(100000, 30, '01');
genData.setRangeStringSize(3,10);
genData.generateArrayString();
genData.checkUniqueness();
genData.writeArrayToFile('binary.txt');
