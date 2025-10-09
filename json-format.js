const fs = require("fs");

function sortKeysDeep(value) {
    if (Array.isArray(value)) {
        return value.map(sortKeysDeep);
    }

    if (value && typeof value === "object") {
        const sorted = {};
        Object.keys(value)
            .sort()
            .forEach(key => {
                sorted[key] = sortKeysDeep(value[key]);
            });
        return sorted;
    }

    return value;
}

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
        const space = indentSize > 0 ? indentChar.repeat(indentSize) : "";
        const parsed = JSON.parse(content);
        const sorted = sortKeysDeep(parsed);
        return JSON.stringify(sorted, null, space);
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
