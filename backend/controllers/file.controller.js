const { gridFileUpload, gridGetAllUserFiles } = require('../utils/gridfs');

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

module.exports = {
    uploadFileController,
    getAllFilesController
};