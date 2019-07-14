const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth")
const Task = require("../models/Task");

router.post("/task", auth, async (req, res) => {
  // const task = new Task(req.body);
     const task = new Task({
       ...req.body,
       owner : req.user._id
     })
  // task
  //   .save()
  //   .then(() => {
  //     res.status(201).send(task);
  //   })
  //   .catch(err => {
  //     res.status(400).send(err);
  //   });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/tasks", auth, async (req, res) => {
  // Task.find({})
  //   .then(tasks => {
  //     res.send(tasks);
  //   })
  //   .catch(err => {
  //     res.status(500).send();
  //   });
  try {
     const tasks = await Task.find({ owner : req.user._id});
    // await req.user.populate('tasks').exePopulate()
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/task/:id", auth, async (req, res) => {
  const _id = req.params.id;
  // Task.findById({ _id })
  //   .then(task => {
  //     if (!task) {
  //       return res.status(404).send();
  //     }
  //     res.status(200).send(task);
  //   })
  //   .catch(err => res.status(500).send());
  try {
    const task = await Task.findOne({ _id , owner : req.user._id})
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send();
  }
});
 
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });

    // const task = await Task.findById(req.params.id);
    const task = await Task.findOne({ _id : req.params.id , owner : req.user._id})
    if (!task) {
      return res.status(404).send();
    }

    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({_id : req.params.id, owner : req.user._id})
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
