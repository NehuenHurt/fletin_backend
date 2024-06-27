const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  name: {
    type: String,
    required: true,
  },
  dni: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  isFreight:{
    type: Boolean,
    required:true,
  },
  adress: {
    province: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postal_code: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
  },
  phone_num_prefix: {
    type: Number,
    required: true,
  },
  phone_num: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
    maxlength: [128, "Password must be less than 128 characters long"],
    validate: {
      validator: function (value) {
        // Require at least one uppercase letter, one lowercase letter, one special character and one number
        const regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/])[a-zA-Z\d!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/]{8,}$/;
        return regex.test(value);
      },
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one special character and one number",
    },
  },
  created: {
    type: Date,
    default: Date.now,
  },
  update: {
    type: Date,
  },
});
// Compare password with hashed password in database
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Generate a JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY_JWT, {
    expiresIn: "1d",
  });
  return token;
};
userSchema.statics.findByToken = function (token) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
    return this.findOne({ _id: decoded._id });
  } catch (err) {
    throw new Error(`Error verifying token: ${err.message}`);
  }
};
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
    } catch (err) {
      return next(err);
    }
  } else {
    return next();
  }
});

module.exports = mongoose.model("User", userSchema);
