//CRUD operation

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectID(); //first 4 bits have the time stamp
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable connect to database");
    }

    const db = client.db(databaseName);

    //insertiion

    // db.collection("users")
    //   .insertOne({
    //     name: "usman",
    //     age: "21"
    //   })
    //   .then(result => {
    //     console.log(result.ops);
    //   })
    //   .catch(err => console.log("unable to insert document " + err));

    // db.collection("users")
    //   .insertMany([
    //     {
    //       name: "faizan",
    //       age: "20"
    //     },
    //     {
    //       name: "shani",
    //       age: "30"
    //     }
    //   ])
    //   .then(result => console.log(result.ops))
    //   .catch(err => console.log("unable to insert documents " + err));

    // db.collection("tasks")
    //   .insertMany([
    //     {
    //       description: "good",
    //       compeleted: true
    //     },
    //     {
    //       description: "better",
    //       compeleted: false
    //     },
    //     {
    //       description: "best",
    //       compeleted: false
    //     }
    //   ])
    //   .then(result => console.log(result.ops))
    //   .catch(err => console.log("unable to insert documents " + err));

    //reading from database

    // db.collection("users")
    //   .findOne({ _id: ObjectID("5d11274ec7f30e332899e22e") })
    //   .then(user => console.log(user))
    //   .catch(err => console.log(err));

    // db.collection("users")
    //   .find({ age: 21 }) // find method return cursor to memory
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    // db.collection("users")
    //   .find({ age: 21 })
    //   .count((error, count) => {
    //     console.log(count);
    //   });

    // db.collection("tasks")
    //   .findOne({
    //     _id: ObjectID("5d128e2ec941652b54226e47")
    //   })
    //   .then(task => console.log(task))
    //   .catch(err => console.log(err));

    // db.collection("tasks")
    //   .find({ compeleted: false })
    //   .toArray((error, tasks) => {
    //     console.log(tasks);
    //   });

    //updating the record

    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: ObjectID("5d11274ec7f30e332899e22e")
    //     },
    //     {
    //       $inc: {
    //         age: 5
    //       }
    //     }
    //   )
    //   .then(result => console.log(result))
    //   .catch(error => console.log(error));

    // db.collection("tasks")
    //   .updateMany(
    //     { compeleted: false },
    //     {
    //       $set: {
    //         compeleted: true
    //       }
    //     }
    //   )
    //   .then(result => console.log(result))
    //   .catch(error => console.log(error));

    //Delete document

    // db.collection("users")
    //   .deleteMany({ age: "30" })
    //   .then(result => console.log(result))
    //   .catch(error => console.log(error));

    // db.collection("tasks")
    //   .deleteOne({
    //     description: "good"
    //   })
    //   .then(result => console.log(result))
    //   .catch(error => console.log(error));
  }
);
