// Resolution shim for `{ "plugins": [{ "name": "scripttype/ts-plugin" }] }`.
//
// tsserver resolves plugins with its own loader, which does not consult the package
// `exports` map — it probes literal paths like `<pkg>/ts-plugin/index.js`. So the exports
// entry alone is not enough and this file has to exist at exactly this path.
//
// The sibling package.json marks the directory CommonJS, because the package as a whole
// is `"type": "module"` and tsserver `require`s its plugins.
module.exports = require('../dist-plugin/ts-plugin.js')
