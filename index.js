const { MongoClient } = require('mongodb');
const express = require('express');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

//meddleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wff6x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("tourism");
        /*================package api ==================*/
        const packageCollection = database.collection("package");
        //add a package
        app.post("/addpackage", async (req, res) => {
            const result = await packageCollection.insertOne(req.body);
            res.json(result);
        })
        //get all package
        app.get("/packages", async (req, res) => {
            const cursor = packageCollection.find({});
            const packages = await cursor.toArray();
            res.send(packages);
        })
        //get single package
        app.get("/packages/:packageid", async (req, res) => {
            const id = req.params.packageid;
            const query = { _id: ObjectId(id) };
            const package = await packageCollection.findOne(query);
            res.json(package);
        })
        //delete single package
        app.delete('/packages/:packageid', async (req, res) => {
            const id = req.params.packageid;
            const query = { _id: ObjectId(id) };
            const result = await packageCollection.deleteOne(query);
            res.json(result);
        })
        //get single package

        //update signle package
        app.put("/update-package/:uid", async (req, res) => {
            const id = req.params.uid;
            const updatedPackage = req.body;
            const filter = { _id: ObjectId(id) };
            const updateInfo = {
                $set: {
                    title: updatedPackage.title,
                    location: updatedPackage.location,
                    price: updatedPackage.price,
                    day: updatedPackage.day,
                    description: updatedPackage.description,
                    discount: updatedPackage.discount,
                    imgUrl: updatedPackage.imgUrl
                },
            };
            const result = await packageCollection.updateOne(filter, updateInfo);
            res.send(result);
        });

        /*================guide api ==================*/
        const guideCollection = database.collection("guide");
        //add a guide
        app.post("/guides", async (req, res) => {
            const result = await guideCollection.insertOne(req.body);
            res.json(result);
        })
        //get all guides
        app.get("/guides", async (req, res) => {
            const cursor = guideCollection.find({});
            const guides = await cursor.toArray();
            res.send(guides);
        })
        //get single guide
        app.get("/guides/:gid", async (req, res) => {
            const id = req.params.gid;
            const query = { _id: ObjectId(id) };
            const guide = await guideCollection.findOne(query);
            res.json(guide);
        })
        //delete single guide
        app.delete('/guides/:gid', async (req, res) => {
            const id = req.params.gid;
            const query = { _id: ObjectId(id) };
            const result = await guideCollection.deleteOne(query);
            res.json(result);
        })
        //get single package

        //update signle guide
        app.put("/update-guide/:gid", async (req, res) => {
            const id = req.params.uid;
            const updatedGuide = req.body;
            const filter = { _id: ObjectId(id) };
            const updateInfo = {
                $set: {
                    name: updatedGuide.name,
                    mail: updatedGuide.mail,
                    photo: updatedGuide.photo,
                    language: updatedGuide.language,
                    area: updatedGuide.area,
                    level: updatedGuide.level,
                    exp: updatedGuide.exp,
                    hire: updatedGuide.hire,
                    bio: updatedGuide.bio,
                    facebook: updatedGuide.facebook,
                },
            };
            const result = await guideCollection.updateOne(filter, updateInfo);
            res.send(result);
        });



    } finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.listen(port, () => {
    console.log("My server start in the port: ", port);
})