const fs = require('fs')
const path = require('path')
const solc = require('solc')

const sourcePath = path.resolve(__dirname,'contracts','Lottery.sol')
let source = fs.readFileSync(sourcePath,'utf-8');
let result = solc.compile(source,1);
console.log(result)
module.exports=result.contracts[':Lottery']
