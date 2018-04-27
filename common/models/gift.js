'use strict';
const getFileFromRequest = require('../services/parse-from');
const uploadFileToS3 = require('../services/upload-file');
const imageToThumbnail = require('../services/thumbnail-maker');
const sharp = require('sharp');

module.exports = function (Gift) {
    Gift.listFree = function (cb) {
        Gift.find({
            fields: {
                reserved: false,
            },
        }, cb);
    };

    Gift.remoteMethod('listFree', {
        return: {
            arg: 'gifts',
            type: 'array',
        },
        http: {
            path: '/list-free',
            verb: 'get',
        },
    });

    Gift.isFree = function (id, cb) {
        var response;
        Gift.find({
            fields: {
                id: id,
            },
        }, function (err, gift) {
            if (err) return cb(err);

            if (gift.reserved)
                response = 'Sorry gift is reserved';
            else
                response = 'Great this gift can be yours';
        });
        cb(null, response);
    };

    Gift.remoteMethod('isFree', {
        accepts: {
            arg: 'id',
            type: 'number',
        },
        returns: {
            arg: 'response',
            type: 'string',
        },
        http: {
            path: '/free',
            verb: 'post',
        },
    });

    Gift.UploadImage = async (req) => {
        const originalImage = await getFileFromRequest(req)
        uploadFileToS3(originalImage, {}, true);
     ;
    }


    Gift.remoteMethod('UploadImage', {
        accepts: [
            // {arg: 'id', type: 'number'},
            {arg: 'req', type: 'object', http: {source: 'req'}}, // pass the request object to remote method

        ],
        returns: {root: true, type: 'object'},
        http: {path: '/uploadImage', verb: 'post'},
    });


};
