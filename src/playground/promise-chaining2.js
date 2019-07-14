require("../db/mongoose");
const Task = require("../models/task");

// Task.findByIdAndDelete({ _id: "5d13e2da5ced2d1e04d5bb58" })
//   .then(task => {
//     console.log("Deleted Task " + task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then(tasks => {
//     console.log(tasks);
//   })
//   .catch(err => console.log(err));

const deleteTaskAndCount = async id => {
  const deletedTask = await Task.findByIdAndDelete({ _id: id });
  const countTask = await Task.countDocuments({ completed: false });
  return countTask;
};

deleteTaskAndCount("5d1526683694581c60c39099")
  .then(count => console.log(count))
  .catch(err => console.log(err));
