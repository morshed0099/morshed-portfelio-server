const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()

app.use(express.json())
app.use(cors())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1m4kiwj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const projectCollection = client.db('portfeliodb').collection('projects')
async function run() {
    try {

        app.get('/project/:id', async (req, res) => {
            const id = req.params.id
            const match = { id: id }
            const result = await projectCollection.find(match).toArray()
            res.send(result);
            console.log(result);
        })

    } finally {

    }
} run().catch(error => console.error(error))

app.get('/', (req, res) => {
    res.send('server running')
})
app.listen(port, () => {
    console.log('woow server is running')
})