const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth.middleware');
const { uploadFileController, getAllFilesController, downloadFileController, getSharedFileController, downloadSharedFileController, deleteFileController } = require('../controllers/file.controller');

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

/*
 * route    GET /api/file/:fileId
 * desc     Get all files uploaded by the user
 * access   Public
*/
router.get('/:fileId', getSharedFileController);

/*
 * route    GET /api/file/download/{id of the file}
 * desc     Get all files uploaded by the user
 * access   Private
*/
router.get('/download/:fileId', auth, downloadFileController);

/*
 * route    GET /api/file/download/shared/{id of the file}
 * desc     Get all files uploaded by the user
 * access   Public
*/
router.get('/download/shared/:fileId', downloadSharedFileController);

/*
 * route    GET /api/file/delete
 * desc     Get all files uploaded by the user
 * access   Public
*/
router.post('/delete', auth, deleteFileController);

module.exports = router;