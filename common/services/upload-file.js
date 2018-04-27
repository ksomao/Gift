/* eslint-disable strict */
const {join, extname} = require('path');
const {readFileSync} = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const thumbnailMaker = require('./thumbnail-maker');

const uploadFileToS3 = async (file, options = {}, thumb = false) => {
    let buffer = readFileSync(file.path);
    const fileName = options.name || String(Date.now());
    const extension = extname(file.path);

    if (thumb) {buffer = await thumbnailMaker(buffer)}

    return new Promise((resolve, reject) => {
        return s3.upload({
            Bucket: 'mdemmy',
            ACL: 'public-read',
            Key: `${fileName}${extension}`,
            Body: buffer,
        }, (err, result) => {
            if (err) reject(err);
            else resolve(result); // return the values of the successful AWS S3 request
        });
    });
};

module.exports = uploadFileToS3;
