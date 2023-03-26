const bcryptjs = require('bcryptjs');

const encPass = (pass) => {
    return bcryptjs.hashSync(pass,10);
}

const decPass = (pass, storePass) => {
    return bcryptjs.compareSync(pass, storePass);
}

module.exports = {encPass, decPass};