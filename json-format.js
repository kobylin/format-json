const fs = require("fs");
const stringify = require("json-stable-stringify");

class JsonFormat {
    static formatAndOverwriteFile(fileName, indentSize, indentChar) {
        let content;

        try {
            content = fs.readFileSync(fileName);
        } catch (e) {
            console.log(e.message);
            return;
        }

        try {
            const contentString = content.toString();
            const formatted = JsonFormat.formatJson(
                contentString,
                indentSize,
                indentChar
            );

            fs.writeFileSync(fileName, formatted);
        } catch (e) {
            console.log(e);
            console.log(
                `File content ${fileName} is not json. Error ${e.message}`
            );
        }
    }

    static getStdout() {
        return process.stdout;
    }

    static formatAndOutputStdin(indentSize, indentChar) {
        JsonFormat.getStdinContent(content => {
            try {
                const formatted = JsonFormat.formatJson(
                    content,
                    indentSize,
                    indentChar
                );
                JsonFormat.getStdout().write(formatted);
            } catch (e) {
                console.log(`Can't format stdin content. Error: ${e.message}`);
            }
        });
    }

    static formatJson(content, indentSize, indentChar) {
        const space =
            indentSize > 0 ? new Array(indentSize + 1).join(indentChar) : "";
        return stringify(JSON.parse(content), { space });
    }

    static getStdinContent(cb) {
        let data = "";
        let stream = process.stdin;

        stream.on("readable", function() {
            let chunk = this.read();
            if (chunk === null) {
                stream.end();
            } else {
                data += chunk;
            }
        });

        stream.on("end", function() {
            cb(data.trim());
        });
    }
}

module.exports = JsonFormat;
