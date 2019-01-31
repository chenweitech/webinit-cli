const exec = require('child_process').execSync;

module.exports = () => {
  let name

  try {
    name = exec('git config --get user.name');
  }catch (e) {}

  name = name && JSON.stringify(name.toString().trim()).slice(1, -1);
  return name || 'admin'
}