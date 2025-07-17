const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./dbconnection');

app.use(cors());
app.use(bodyParser.json());
dotenv.config();

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
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`);
});
