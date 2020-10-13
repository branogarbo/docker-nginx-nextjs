const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const dburl = "mongodb+srv://brian:XUW4gIGtueppNgVd@name-dump-titz9.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(dburl, (err,client)=>{
  
  let names = client.db('name-collect').collection('names');
  
  app.listen(port, console.log(`listening on port ${port}`));
  app.use(express.json({limit:'1mb'}));
  app.use('/db/add',express.static(path.join(__dirname,'public')));

  app.get('/', (req,res)=>{
    res.redirect('/db/add');
  })
  
  app.get('/db/filter', (req,res)=>{
    res.redirect('/db/all?_sortBy=time&_order=1');
  })
  
  app.post('/db/all', (req,res)=>{
    names.insertOne(req.body, (err,data)=> res.end());
  })

  app.get('/db/all', (req,res)=>{
    let query = req.query;
    let sorter = new Object();
    
    ({_sortBy, _order, _limit} = query);
    
    if (_sortBy && _order) {
      sorter[_sortBy] = Number(_order);

      for (key in query) {key[0] == "_" ? delete query[key] : {}}
    }
    else {
      sorter = {time:1};
    }
    
    !_limit ? _limit = 0 : {};

    names.find(query).sort(sorter).limit(Number(_limit)).toArray((err,docs)=> {
      console.log(docs);

      res.json(docs);
    });
  })

});