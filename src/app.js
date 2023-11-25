const express = require("express");
const multer = require("multer");
const {upload} = require("./controller/upload");

const app = express();
const port = 8000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './file');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploadMiddleware = multer({ storage: storage }).single('file');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
});


app.post("/upload", (req, res) => {
    uploadMiddleware(req, res, function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        const fileName = req.file.filename;

        upload(fileName);
        res.redirect("/upload")
    });
});

app.get('/upload', (req, res) => {
  res.sendFile(__dirname + '/view/upload.html');
});

app.listen(port, () => console.log(`Listen Port ${port}`));
