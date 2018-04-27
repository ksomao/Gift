/* eslint-disable strict */
const multiparty = require('multiparty');

const getFileFromRequest = (req) => new Promise((resolve, reject) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) reject(err);
    const file = files['file'][0]; // get the file from the returned files object
    if (!file) Promise.reject('File was not found in form data.');
    else resolve(file);
  });
});

module.exports = getFileFromRequest;
