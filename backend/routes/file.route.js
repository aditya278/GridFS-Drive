const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth.middleware');
const { uploadFileController, getAllFilesController } = require('../controllers/file.controller');

// Storing file in memory Buffer
const storage = multer.memoryStorage();
const upload = multer({storage});

/*
 * route    POST /api/file/upload
 * desc     Upload a file to Database
 * access   Private
*/
router.post('/upload', auth, upload.single('file'), uploadFileController);

/*
 * route    GET /api/file/all
 * desc     Get all files uploaded by the user
 * access   Private
*/
router.get('/all', auth, getAllFilesController);

module.exports = router;