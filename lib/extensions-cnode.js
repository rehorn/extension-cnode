const fs = require('fs');
const vm = require('vm');

const cnode = require('./cnode');

function _enable() {
    require.extensions[".cnode"] = function(module, filename) {
        return module._compile(cnode.unpackFromFile(module.filename), filename);
    };
}


module.exports = {
    enable: _enable
}
