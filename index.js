#! /usr/bin/node

const minimist = require("minimist");
const jsonFormat = require("./json-format");

const argv = minimist(process.argv.slice(2));
const files = argv._;

if (argv.h || argv.help || (process.stdin.isTTY && files.length === 0)) {
    console.log(`
    json-format [file]- Command line tool for formatting json.
    
    --indent - number of chars used for indentation. 4 spaces by default
    --indent-char - char used for indentation 'space' or 'tab'. 'space' by default
`);
}

const CHAR_SPACE = " ";
const CHAR_TAB = "\t";

const indentChar = argv["indent-char"] === "tab" ? CHAR_TAB : CHAR_SPACE;
const indentSize =
    argv["indent"] !== undefined ? parseInt(argv["indent"]) || 0 : 4;

if (process.stdin.isTTY) {
    files.forEach(file =>
        jsonFormat.formatAndOverwriteFile(
            file.toString(),
            indentSize,
            indentChar
        )
    );
} else {
    jsonFormat.formatAndOutputStdin(indentSize, indentChar);
}
