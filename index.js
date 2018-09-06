#! /usr/bin/node

const fs = require('fs');
const stringify = require('json-stable-stringify');

if (process.stdin.isTTY) {
    const files = process.argv.slice(2);
    files.forEach(formatAndOwerwriteFile);
} else {
    formatAndOutputStdin()
}

function formatAndOwerwriteFile(fileName) {
    const content = fs.readFileSync(fileName);

    if (!content) {
        console.error(`Can't read file: ${fileName}`);
        return;
    }

    try {
        const contentString = content.toString();
        const formated = formatJson(contentString);

        fs.writeFileSync(fileName, formated);
    } catch (e) {
        console.log(`File content ${fileName} is not json. Error ${e.toString()}`);
    }
}

function formatAndOutputStdin() {
    getStdinContent(content => {
        try {
            const formated = formatJson(content);
            process.stdout.write(formated);
        } catch (e) {
            console.log(`Can't format stdin content. Error: ${e.toString()}`);
        }
    });
}

function formatJson(content) {
    return stringify(JSON.parse(content), { space: '    ' });
}

function getStdinContent(cb) {
  let data = '';
  let stream = process.stdin;

  stream.on('readable', function() {
      let chunk = this.read();
      if (chunk === null) {
          stream.end();
      } else {
         data += chunk;
      }
  });

  stream.on('end', function() {
     cb(data.trim());
  });
}