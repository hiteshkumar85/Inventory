const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./dbconnection');
const path = require('path');
dotenv.config();
const app = express();
connectDB();


app.use(cors({ origin: ['https://dulcet-puppy-ff17ab.netlify.app'], credentials: true }));
app.use(bodyParser.json());

app.use('/uploadedImage', express.static(path.join(__dirname, 'uploadedImage')));
app.use('/profileImage', express.static(path.join(__dirname, 'profileImage')));

app.get('/', (req, res) => {
    res.send("Backend is running")
});

app.use('/api', require('./routes/loginRoute'));
app.use(require('./middleware/tokenAuth'));
app.use('/api', require('./routes/categoryRoute'));
app.use('/api', require('./routes/mediaRoute'));
app.use('/api', require('./routes/productRoute'));
app.use('/api', require('./routes/groupRoute'));
app.use('/api', require('./routes/saleRoute'));
app.use('/api', require('./routes/dashboardRoute'));
app.use('/api', require('./routes/userRoute'));
app.use('/api', require('./routes/salesReportRoute'));

app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`);
});
