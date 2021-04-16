const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const encryptPassword = (password) => bcrypt.hashSync(password, salt);

const isPasswordsSame = (password, userPassword) => {
  bcrypt.compare(encryptPassword(password), userPassword);
}


module.exports = {
  encryptPassword,
  isPasswordsSame
};
