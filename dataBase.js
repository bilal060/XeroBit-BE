
const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/xerobittech")
    .then(() => console.log("DataBase is Connected"))
    .catch((err) => console.log(err));


const testSchema = new mongoose.Schema({
    name: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    active: Boolean
});


const Testlist = new mongoose.model("test-models", testSchema);

(async () => {
    try {
        const test = new Testlist({
            name: "Numan",
            active: true
        })
        const result = await test.save();
        console.log(result)
    } catch (error) {
        console.log(error)
    }
})

module.exports = Testlist