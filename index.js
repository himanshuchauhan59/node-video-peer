const app = require('express')();
const router = require('./routes/video.routes');

app.use(router);

app.listen(7544, () => {
    console.log(`Server is running on port http://localhost:7544`);
})