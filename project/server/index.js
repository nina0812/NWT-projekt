//IMPORTAMO EXPRESS
const express=require('express');
//inicijaliziramo express u app varijabli
const app=express();
//Povezivanje aplikacije s mongodb
const mongoose=require('mongoose');
const routes=require('./routes/routes');
const dotenv=require('dotenv');
const cors=require('cors');
const path=require('path');
const fs = require('fs');

dotenv.config();


mongoose.connect(process.env.DATABASE_ACCESS, ()=>{
    console.log("Database connection successful");
})


//Middlewares
app.use(express.json());
app.use(cors({origin: '*'}));
app.use('/api', routes);

// for serving images
var dir = path.join(__dirname, 'public');

var mime = {
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml'
};

app.get('*', function (req, res) {
    var file = path.join(dir, req.path.replace(/\/$/, '/index.html'));
    if (file.indexOf(dir + path.sep) !== 0) {
        return res.status(403).end('Forbidden');
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});

app.listen(5000, ()=>{
    console.log("Server is listening on port 5000");
})