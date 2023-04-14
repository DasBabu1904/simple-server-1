const express = require('express');
const cors = require('cors');
//const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send("Simeple node server is running ")
});
/*
mongodb: 
user name:Learn001
password:mF8nwzHr3MvUiRQ9
*/



// const uri = "mongodb+srv://Learn001:mF8nwzHr3MvUiRQ9@cluster0.crafy20.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// // async function run() {
//     try {
//         const userCollection = client.db("SimpleNode").collection("Users");
//         // create a document to insert
//         const user = { name: 'adi', email: 'adi@gmail.com' }
//         const result = await userCollection.insertOne(user);
//         console.log(result)
//         //console.log("sourav")
//         // console.log(`A document was inserted with the _id: ${result.insertedId}`);
//     } finally {
//         await client.close();
//     }
// }
//console.log(client)
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Learn001:mF8nwzHr3MvUiRQ9@cluster0.crafy20.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    console.log("connected")
    // perform actions on the collection object
    client.close();
});


const users = [
    { id: 1, name: "sourav", email: "dass7550@gamil.com" },
    { id: 2, name: "dasbabu", email: "dass7550@gamil.com" },
    { id: 3, name: "souravdas", email: "dass7550@gamil.com" }
]

app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {
    if (req.query.name) {
        const searchKey = req.query.name
        console.log(searchKey)
        const filtered = users.filter(user => user.name.toLowerCase().indexOf(searchKey) >= 0)
        console.log(filtered)
        res.send(filtered)
    }
    else {
        res.send(users)
    }
});

app.post('/users', (req, res) => {
    // console.log("Post is called")
    // console.log(req.body)
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.send(newUser);

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});