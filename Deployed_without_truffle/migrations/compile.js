/* contracts/*.sol => build/*.json*/

const solc = require("solc");	//solc: compiler for .sol files
const path = require("path");	//path: utlities for working with files and dir paths
const fs = require("fs-extra"); //fs-extra: read/write to files

const buildPath = path.resolve(__dirname,"../build");	//returns the absolute path.  will return path for build in dirname

fs.removeSync(buildPath);	//Removes the build folder alongwith its contents
fs.ensureDirSync(buildPath);	//buildpath created including the directory it is to be placed in

const tokenPath = path.resolve(__dirname,"../contracts","Token.sol");	//Goto the specified folder in the working directory

const source  = fs.readFileSync(tokenPath,"utf8");	//Read contents to memory
							//Returns contents of given path
console.log("\n\n"+solc.compile(source, 1)+"\n\n");			//1 -> 1 class present in Token.sol to compile

const output = solc.compile(source, 1).contracts[":Token"];

fs.outputJsonSync(path.resolve(buildPath, "Token.json"), output);

