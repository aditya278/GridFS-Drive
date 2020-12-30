const mongoose = require('mongoose');
const mongodb = require('mongodb');
const { Readable } = require('stream');

const gridFileUpload = (file, userId) => {
    const db = mongoose.connection.db;

    const bucket = new mongodb.GridFSBucket(db, { bucketName : "drive"});

    const buffer = file.buffer;
    function bufferToStream(buffer) {
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null);
        return stream;
    }

    return new Promise((resolve, reject) => {
        bufferToStream(buffer).pipe(bucket.openUploadStream(file.originalname, {
            metadata : { userId },
            contentType : file.mimetype
        }))
        .on("error", function(error) {
            reject(error);
        })
        .on("finish", function() {
            resolve("done");
        })
    })
}

const gridGetAllUserFiles = (userId) => {
    const db = mongoose.connection.db;

    const bucket = new mongodb.GridFSBucket(db, { bucketName : "drive"});
    
    return new Promise((resolve) => {
        const allFiles = bucket.find({
            metadata : { userId }
        });
        resolve(allFiles.toArray());
    })
}

const gridFindFile = (fileId, userId) => {
    const db = mongoose.connection.db;

    const bucket = new mongodb.GridFSBucket(db, { bucketName : "drive"});
    const id = new mongodb.ObjectID(fileId);
    return new Promise((resolve) => {
        const file = bucket.find({
            _id : id,
            metadata : { userId }
        });
        resolve(file.toArray());
    })
}

const gridDownloadFile = (fileId) => {
    const db = mongoose.connection.db;

    const bucket = new mongodb.GridFSBucket(db, { bucketName : "drive"});
    const id = new mongodb.ObjectID(fileId);

    return bucket.openDownloadStream(id);
}

module.exports = {
    gridFileUpload,
    gridGetAllUserFiles,
    gridFindFile,
    gridDownloadFile
}