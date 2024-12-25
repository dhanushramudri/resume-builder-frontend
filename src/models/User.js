// src/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  collegeName: String,
  specialization: String,
  course: String,
  branch: String,
  passOutYear: Number,
  cgpaOrPercentage: Number,
  gender: String,
  githubProfile: String,
  linkedinProfile: String,
  jobPreferredCountries: [String],
  jobPreferredStates: [String],
  jobPreferredCities: [String],
  dob: Date,
  step2Completed: { type: Boolean, default: false },
});

// Log when a new user is being created
userSchema.pre('save', function (next) {
  if (this.isNew) {
    console.log('Creating a new user with Clerk ID:', this.clerkId);
  }
  next();
});

// Log when a user is updated
userSchema.pre('findOneAndUpdate', function (next) {
  console.log('Updating user with Clerk ID:', this._conditions.clerkId);
  next();
});

// Log any validation errors
userSchema.post('save', function (doc) {
  console.log('User saved successfully:', doc._id);
});

userSchema.post('save', function (error, doc, next) {
  if (error) {
    console.error('Error saving user:', error);
  }
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
