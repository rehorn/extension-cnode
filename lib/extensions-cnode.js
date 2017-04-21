const fs = require('fs');
const vm = require('vm');

const jse = require('./cnode');

function _enable() {
    require.extensions[".cnode"] = function(module, filename) {
        return module._compile(jse.unpackFromFile(module.filename), filename);
    };
}


module.exports = {
    enable: _enable
}
