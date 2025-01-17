const fs = require('fs');

const videoService = (req, res) => {
    let path = 'D:\\PROJECTS\\NODE-STREAM-PEER\\assets\\demoVideo.mp4'; // path of video file.
    let videoStat = fs.statSync(path);
    let fileSize = videoStat.size;
    let range = req.headers.range;

    if (range) {
        let parts = range.replace(/bytes=/, "").split("-");
        let start = parseInt(parts[0], 10);
        let end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        let chunksize = (end - start) + 1;
        let file = fs.createReadStream(path, { start, end });

        let head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        console.log(file, head)
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        let head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        console.log(head)
        fs.createReadStream(path).pipe(res);
    }
}

module.exports = { videoService };