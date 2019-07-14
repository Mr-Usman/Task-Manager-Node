const express = require("express");
const router = express.Router();
const User = require("../models/User");

//importing middleware
const auth = require("../middlewares/auth")

router.post("/user", async (req, res) => {
  const user = new User(req.body);
  // user
  //   .save()
  //   .then(() => {
  //     res.status(201).send(user);
  //   })
  //   .catch(err => { 
  //     res.status(400).send(err);
  //   });
  try {
    await user.save();
    const token = await user.generateAuthToken()
    res.status(201).send({user: await user.getProfileLink()});
  } catch (err) {
    res.status(400).send(err);
  }
});

// logging user
router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      // findByCredentials defind in User model file
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken()
    res.send({ user :await user.getProfileLink() , token});
  } catch (e) {
    res.status(400).send();
  }
});

//logout with current token
router.post("/users/logout", auth, async (req,res) => {
  try{
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send()
  }catch(err){
        res.status(500).send()
  }
})

//logout from all sessions
router.post("/users/logoutall", auth, async(req,res) => {
      try{
        req.user.tokens = []
        await req.user.save()
        res.send()
      }catch(err){
        res.status(500).send()
      }
})

router.get("/users/me", auth, async (req, res) => {
     res.send(req.user)   
}); 

router.patch("/users/me", auth, async (req, res) => {
  //check whether property exists or not
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  ); //every method return true if all values true otherwisw false
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }
  try {
    // findByIdAndUpdate bypasses the mongoose middleware

    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });

    // so we will use another method, to make middleware work

    // const user = await User.findById(req.params.id);

    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
     await req.user.remove() // reomve is a mongoose method 
     res.send(req.user)
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
