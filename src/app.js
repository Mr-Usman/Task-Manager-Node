const express = require("express");
require("./db/mongoose");

//importing rosources
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

//middlewares
// app.use((req,res,next) => {
//    if(req.method === 'GET'){
//      res.send('GET requests are disabled')
//    }else{
//      next();
//    }
// })
  
// app.use((req,res,next) => {
//   if(req.method){
//     res.status(503).send('service is temporarily unavailable!')
//   }else{
//     next()
//   }
// })

app.use(express.json()); // it parses the json string into object
//in order to use router , we have to register with express
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken")
  const Task = require("./models/Task")
  const User = require("./models/User")

const myFunction = async () => {

  // const task = await Task.findById("5d2adcce027355238874327e")
  // await task.populate('owner').execPopulate() 
  // console.log(task.owner)
    
    const user = await User.findById("5d2ada1571a3211c08623975")
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)   

//   // jsonwebtoken
//   const token = jwt.sign({ _id : "abc123"} , 'thisissecret')
//   console.log(token)

//   //verification of token with secret
//   const data = jwt.verify(token, 'thisissecret')
//   console.log(data)
  
// //   const password = "Red12345";
// //   const hashedPassword = await bcrypt.hash(password, 8);

// //   console.log(password);
// //   console.log(hashedPassword);

// //   const isMatched = await bcrypt.compare("Red12345", hashedPassword);
// //   console.log(isMatched);
};

myFunction();
