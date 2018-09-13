const fs = require("fs");
const stringify = require("json-stable-stringify");

function formatAndOverwriteFile(fileName, indentSize, indentChar) {
    let content;

    try {
        content = fs.readFileSync(fileName);
    } catch(e) {
        console.log(e.message);
        return;
    }

    try {
        const contentString = content.toString();
        const formatted = formatJson(contentString, indentSize, indentChar);

        fs.writeFileSync(fileName, formatted);
    } catch (e) {
        console.log(e);
        console.log(`File content ${fileName} is not json. Error ${e.message}`);
    }
}

function formatAndOutputStdin(indentSize, indentChar) {
    getStdinContent(content => {
        try {
            const formatted = formatJson(content, indentSize, indentChar);
            process.stdout.write(formatted);
        } catch (e) {
            console.log(`Can't format stdin content. Error: ${e.message}`);
        }
    });
}

function formatJson(content, indentSize, indentChar) {
    const space = indentSize > 0 ? (new Array(indentSize + 1)).join(indentChar) : '';
    return stringify(JSON.parse(content), {space});
}

function getStdinContent(cb) {
    let data = "";
    let stream = process.stdin;

    stream.on("readable", function () {
        let chunk = this.read();
        if (chunk === null) {
            stream.end();
        } else {
            data += chunk;
        }
    });

    stream.on("end", function () {
        cb(data.trim());
    });
}

module.exports = {
    formatAndOverwriteFile,
    formatAndOutputStdin,
    formatJson,
    getStdinContent
};
