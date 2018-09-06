# Format JSON

Comand line tool for formating json.

Based on library [json-stable-stringify](https://github.com/substack/json-stable-stringify)

__What is does?__

- Sorting properties alpabetically
- Formatting json with 4 space indentation

Can be useful when response from server is not formated or properties come in different order every time.

### You can pass any numbers of files to it

`format-json foo.json bar.json`

In this case every file will be overwritten by formated file.


### Use is with shell pipes

`cat foo.json | format-json > result.json`


`curl https://api.chucknorris.io/jokes/random | format-json`

