const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        // minlength: [3, 'Minimum password length is 6 characters']
    },
    email: {
      type: String,
      required: true,
      // unique: true,
      lowercase: true,
      // validate: [isEmail, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: true,
      minLength: 5
    }
}, {timestamps: true});

// Before saving data in DB, password should be bcrypt through pre function
userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//updated by MyVu:
const User= mongoose.model('user', userSchema);

module.exports = User;