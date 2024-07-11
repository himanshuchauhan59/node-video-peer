const app = require('express')();
const router = require('./routes/video.routes');
const fs = require('fs');
app.use(router);

app.listen(port, () => {
    console.log('Server is running on port 7544');
});

app.get("/", (req, res) => {
    fs.readFile('./index.html', (err, htmlFile) => {
        if (err) {
            console.log(err);
        }
        res.setHeader("Content-Type", "text/html");
        res.send(htmlFile);
        res.end();
    })
})
