const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String, // Set the type to String
    required: true,
    minlength: 3,
  },
  email: {
    type: String, // Set the type to String
    required: true,
    unique: true,
  },
  gender:{
    type:String,
    required:true

  },
  phone: {
    type: Number, // Set the type to Number
    required: true,
    unique: true,
  },
  password: {
    type: String, // Set the type to String
    required: true,
  },
  confirmpassword: {
    type: String, 
    required: true,
  },
});

// we will create a new collection

// It creates a Mongoose model named "Student" based on the schema and exports it for use in other parts of your application.
const Register = mongoose.model("Register", studentSchema);

module.exports = Register;

