const assert = require('assert');
const sinon =  require('sinon');
const proxyquire =  require('proxyquire');
const jsonFormat = require('../json-format');

describe('json-format', function() {

    describe('#formatJson()', function() {

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
        let jsonFormat;
        let fs;

        beforeEach(() => {
            fs = {
                readFileSync: () => '{"a":1,    "b": "2"}',
                writeFileSync: () => {}
            };
            jsonFormat = proxyquire('../json-format', { fs });
        });

        it("should format and override file", () => {
            const fileName = '/foo/bar';
            const indentSize = 4;
            const indentChar = ' ';

            const writeFileSyncSpy = sinon.spy(fs, 'writeFileSync');
            jsonFormat.formatAndOverwriteFile(fileName, indentSize, indentChar);

            sinon.assert.calledWith(writeFileSyncSpy, fileName, `{
    "a": 1,
    "b": "2"
}`);
            fs.writeFileSync.restore();
        });
    });
});
