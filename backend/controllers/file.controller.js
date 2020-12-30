const { gridFileUpload, gridGetAllUserFiles, gridFindFile, gridDownloadFile } = require('../utils/gridfs');

const uploadFileController = async (req, res) => {
    try {
        await gridFileUpload(req.file, req.userId);
        res.status(200).json({
            upload : "Success"
        })
    }
    catch(err) {
        console.error(err);
        res.status(500).json({
            errors : [{
                msg : "Internal Server Error"
            }]
        })
    }
}

const getAllFilesController = async(req, res) => {
    try {
        const files = await gridGetAllUserFiles(req.userId);
        res.status(200).send(files);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({
            errors : [{
                msg : "Internal Server Error"
            }]
        })
    }
}

const downloadFileController = async (req, res) => {
    try {
        const { fileId } = req.params;
        let file = await gridFindFile(fileId, req.userId);
        if(!file.length) {
            return res.status(400).json({
                errors : [{
                    msg : "File Does not Exist!"
                }]
            });
        }
        file = file[0];
        res.set({
            "Content-Type" : file.contentType,
            "Content-Disposition" : "attachment; filename="+file.aliases
        });
        gridDownloadFile(fileId).pipe(res);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({
            errors : [{
                msg : "Internal Server Error"
            }]
        })
    }
}

module.exports = {
    uploadFileController,
    getAllFilesController,
    downloadFileController
};