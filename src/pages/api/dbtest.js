import { MongoClient } from 'mongodb'

export default (req,res) => {
   if (req.method === "GET") {
      MongoClient.connect(process.env.DB_URL, (err,client)=>{

         client.db('nextjs').collection('test-data').find({}).toArray((err,docs)=>{
            res.json(docs[0]);
            client.close();
         });
         
      });
   }
}