const express = require('express');
const router = express.Router();
const videoController = require('../controller/video.controller');

router.get('/getVideo', videoController.videoService);

module.exports = router;