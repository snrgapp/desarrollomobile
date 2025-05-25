import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  userNumber:   { type: Number},
  name:         { type: String, required: [true, "Please enter a name"] },
  lastname:     { type: String, required: [true, "Please enter a last name"] },
  email:        { type: String, required: [true, "Please enter an email"] },
  phone:        { type: String, required: [true, "Please enter a phone number"] },
  password:     { type: String, required: [true, "Please enter a password"] },

});

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);