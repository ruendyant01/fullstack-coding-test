if(process.env.NODE_ENV !== "production") require('dotenv').config()

const cors = require('cors');
const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');
const app = express()
const port = process.env.PORT;

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors())

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})