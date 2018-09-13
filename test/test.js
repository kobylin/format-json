const assert = require('assert');
const proxyquire =  require('proxyquire');

describe('json-format', function() {
    let jsonFormat;


    describe('#formatJson()', function() {

        before(() => {
            jsonFormat = proxyquire('../json-format', {

            });
            console.log('before....');
        });

        it('should return json formatted with 4 spaces', function() {
            const json = '{"a":1,    "b": "2"}';

            const formatted = jsonFormat.formatJson(json, 4, ' ');
            assert.equal(formatted,
`{
    "a": 1,
    "b": "2"
}`          );
        });

        it('should return json formatted with 2 tabs', function() {
            const json = '{"a":1,    "b": "2"}';

            const formatted = jsonFormat.formatJson(json, 2, '\t');
            assert.equal(formatted,
`{
		"a": 1,
		"b": "2"
}`          );
        });

        it('should sort properties', function() {
            const json = '{"b":1,"a": "2", "z": 21, "sub": {"zb":1,"aa": "2", "1z": 21} }';

            const formatted = jsonFormat.formatJson(json, 4, ' ');
            assert.equal(formatted,
                `{
    "a": "2",
    "b": 1,
    "sub": {
        "1z": 21,
        "aa": "2",
        "zb": 1
    },
    "z": 21
}`          );
        });



    });

    describe("#formatAndOverwriteFile", function() {
        before(() => {
            jsonFormat = proxyquire('../json-format', {
                readFileSync: () => '{"a":1,    "b": "2"}'
            });
            console.log('before....');
        });

        it("should format and override file", () => {

        })
    });
});
