const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

//meddleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("First server code");
})
app.get('/users', (req, res) => {
    res.send("First server code");
})


app.listen(port, () => {
    console.log("My server start in the port: ", port);
})