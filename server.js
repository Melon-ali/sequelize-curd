const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'http://localhost:8081',
};

// global middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api
app.get('/', (req, res) => {
    console.log('Home page')
    res.json({message: 'Hello World'})
});

// routes
const productRouters = require('./routes/productRouter');
app.use('/api/products', productRouters);

// PORT
const PORT = process.env.PORT || 8080;

//server
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});