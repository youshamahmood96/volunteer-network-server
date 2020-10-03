const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())

const ObjectId = require('mongodb').ObjectId

//initialize dotenv
require('dotenv').config()


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.cni7x.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const rawData = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION}`);
  const taskLists = client.db(`${process.env.DB_NAME}`).collection('tasks')

  app.post('/addToRawData',(req, res) => {
      const task = req.body
      console.log(task)
      rawData.insertOne(task)
      .then(result=>{
          console.log(result);
      })
  })

  app.post('/addTask',(req,res) => {
    const singleTask = req.body
    taskLists.insertOne(singleTask)
    .then(result=>{
        
    })
})
  app.get('/totalTasks',(req,res) => {
      taskLists.find({email:req.query.email})
      .toArray((err,documents)=>{
          res.send(documents)
      })
  })
  app.get('/adminTasks',(req,res) => {
      taskLists.find({})
      .toArray((err,documents)=>{
          res.send(documents)
      })
  })
  app.get('/taskData',(req,res) => {
      rawData.find({})
      .toArray((err,documents)=>{
          res.send(documents)
      })
  })
  app.delete('/delete/:id',(req,res)=>{
      taskLists.deleteOne({_id:ObjectId(req.params.id)})
      .then(result=>{
          
      })
  })


});




app.listen(port)