const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());


/* ----------Database Connection---------- */
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.j8jry5z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
      const emailsCollection = client.db("comingsoon").collection("emails");
     
      app.post("/email", async (req, res) => {
        const email = req.body;
        const result = await emailsCollection.insertOne(email);
        res.send(result);
      });
     
    } finally {
    }
  }
  run().catch(console.log);

app.get("/", async (req, res) => {
    res.send("Coming Soon Server Running");
  });
  
  app.listen(port, () => console.log(`Coming Soon Server is Running on ${port}`));