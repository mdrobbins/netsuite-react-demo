// noinspection JSCheckFunctionSignatures

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./api.prod.js');
} else {
    module.exports = require('./api.dev.js');
}