# Format JSON

Command line tool for formatting json.

Based on library [json-stable-stringify](https://github.com/substack/json-stable-stringify)

### Installation

`sudo npm install json-format-cli -g`

Then use it as command line tool:
```
$ json-format foo.json
```

### What it can?

- Sorting properties alphabetically
- Formatting json with specified indentation

Can be useful when response from server is not formatted or properties come in different order every time.

### Options

```
--indent - number of chars used for indentation. 4 spaces by default
--indent-char - char used for indentation 'space' or 'tab'. space by default
```

### You can pass any numbers of files to it

`format-json foo.json bar.json`

In this case every file will be overwritten by formatted file.


### Using pipes

`cat foo.json | format-json > result.json`


`curl https://api.chucknorris.io/jokes/random | format-json`


### Formatting example

```
//input
{"category":null,"icon_url":"https:\/\/assets.chucknorris.host\/img\/avatar\/chuck-norris.png","id":"zvno1ZJIQfetnTX5ye8TwQ","url":"https:\/\/api.chucknorris.io\/jokes\/zvno1ZJIQfetnTX5ye8TwQ","value":"The Old Spice Man aspires to smell like Chuck Norris"}

//output
{
    "category": null,
    "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
    "id": "zvno1ZJIQfetnTX5ye8TwQ",
    "url": "https://api.chucknorris.io/jokes/zvno1ZJIQfetnTX5ye8TwQ",
    "value": "The Old Spice Man aspires to smell like Chuck Norris"
}
```
__Sorting props__

```
//input
{
    "b": 10,
    "a": 1,
    "x": {
        "foo": 1,
        "bar": 2
    }
}

//output
{
    "a": 1,
    "b": 10,
    "x": {
        "bar": 2,
        "foo": 1
    }
}
```
