require("../db/mongoose");
const User = require("../models/user");

// User.findByIdAndUpdate({ _id: "5d148f3e25ae1c271c42f27d" }, { age: 1 })
//   .then(user => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(err => console.log(err));

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate({ _id: id }, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("5d148f3e25ae1c271c42f27d", 5)
  .then(count => console.log(count))
  .catch(err => console.log(err));
