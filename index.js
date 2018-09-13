#! /usr/bin/node

const minimist = require("minimist");
const jsonFormat = require("./json-format");

const argv = minimist(process.argv.slice(2));

console.log(argv);

if (argv.h || argv.help) {
    console.log(`
    json-format [file]- Command line tool for formatting json.
    
    --indent - number of chars used for indentation
    --indent-char - char used for indentation 'space' or 'tab'
`);
}

const CHAR_SPACE = " ";
const CHAR_TAB = "\t";

const indentChar = argv["indent-char"] === "tab" ? CHAR_TAB : CHAR_SPACE;
const indentSize = argv["indent"] ? parseInt(argv["indent"]) : 4;

if (process.stdin.isTTY) {
    const files = argv._;
    files.forEach(file =>
        jsonFormat.formatAndOverwriteFile(file.toString(), indentSize, indentChar)
    );
} else {
    jsonFormat.formatAndOutputStdin(indentSize, indentChar)
}
