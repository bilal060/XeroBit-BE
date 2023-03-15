const express = require('express')
const Testlist = require("./dataBase")
const app = express()
const PORT = process.env.PORT || 8000;



app.get('/', async (req, res) => {

    const data = await Testlist.find();
    console.log(data)
    res.send(data)
})


app.listen(PORT, () => {
    console.log(`Listening To the Port ${PORT}`);
})