import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  userNumber:   { type: Number},
  name:         { type: String, required: [true, "Please enter a name"] },
  lastname:     { type: String, required: [true, "Please enter a last name"] },
  email:        { type: String, required: [true, "Please enter an email"] },
  phone:        { type: String, required: [true, "Please enter a phone number"] },
  password:     { type: String, required: [true, "Please enter a password"] },
  typeofuser:  { type: String, default: "user" }, // Tipo de usuario, por defecto es "user" // Admin
  source: { type: String, enum: ['web', 'mobile'], default: 'web' },
   lastLogin: Date, // Fecha del último inicio de sesión
  hasMatch: { type: Boolean, default: false },
},  { timestamps: true });

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);