/* eslint-disable strict */
const sharp = require('sharp');

const ImageToThumbnail = async (buffer) => {
    return new Promise((resolve, reject) => {
        const thumbnail = sharp(buffer)
            .resize(100, 100)
            .max()
            .toBuffer();
        if (!thumbnail) reject(null);
        else resolve(thumbnail);
    })
}

module.exports = ImageToThumbnail;

