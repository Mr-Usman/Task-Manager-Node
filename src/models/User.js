const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const Task = require("./Task");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Provided Email is invalid!");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("password should not contain string password");
      }
    }
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number"); //custom validation
      }
    },
    default: 0 
  },
  tokens : [
    {
    token : {
      type: String,
      required : true
    }
    }
]
});

userSchema.virtual('tasks', {
  ref : "Task",
  localField : '_id',
  foreignField : 'owner'
})

userSchema.methods.getProfileLink = async function() {
   const user = this
   const userObject = user.toObject()
   //removing the secret stuff
   
   delete userObject.password
   delete userObject.tokens

   return userObject
}

//methods apply on Models instances(current user object)
userSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({ _id : user._id.toString()} , 'ilovejs')
  
  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

userSchema.statics.findByCredentials = async (email, password) => { //statics method directly apply on Methods
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login!");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login!");
  }
  return user;
};

// Mongoose middleware for hashing the password(pre,post)
userSchema.pre("save", async function(next) {
  //pre before save to database and post after save to database
  // next will execute as the async function complete
  const user = this;
  // Now, check if password field is modified or not
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//Cascading(delete user task when user is removed)
userSchema.pre('remove', async function(next){
  const user = this
  await Task.deleteMany({ owner : user._id})
  next()
})


const User = mongoose.model("User", userSchema);

module.exports = User;
