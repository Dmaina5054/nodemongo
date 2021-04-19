const Express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const DATABASE_NAME =  'mongoose_basics';
const conn_url = 'mongodb://localhost:27017/mongoose_basics';


//create app instance

var app = Express();
//middleware here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var database, collection;


//set up listen loop
app.listen(5000,()=>{

    mongoClient.connect(conn_url,{ useNewUrlParser: true }, (err, client)=>{
        if (err) throw err
        database = client.db(DATABASE_NAME);
        collection = database.collection('books');
        console.log(`connected to ${DATABASE_NAME}`);
    })

})


//here we design our API endpoints

//design POST rq

app.post('/books', (req, res)=>{
    collection.insert(req.body, (err,reslt)=>{
        if (err) {
            return res.status(500).send(err);
        }
        console.log(reslt)
        res.end('Data indexed successfully')
    })
})

//design GET rq
app.get('/books',(req,res)=>{
    //perform get here
    //if any query conditions specify as find params
    collection.find({}).toArray((err,reslt)=>{
        if (err) {
            return res.status(500).send(err);
        }
        //show results
        console.log(reslt)
        res.end(reslt.json)
    })

})

//design GET by ID

app.get('/book/:id',(req,res)=>{
    collection.findOne({"_id":new ObjectId(req.params.id)},(err,reslt)=>{
        if (err) {
            return res.status(500).send(err);
        }
        console.log(reslt)
        res.send(reslt)
    })
})