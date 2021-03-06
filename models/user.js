var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema({
  mobile:       Boolean,
  pc:           Boolean,
  homeTheater:  Boolean,
  printer:      Boolean,
  homeRouter:   Boolean,
  tv:           Boolean,
  name:         String,
  reviews:      String,
  bio:          String,
  profilePic:   String,
  email: {
    type:     String,
    required: true,
    unique:   true
  },
  password: {
    type:     String,
    required: true
  },
  phone: {
    type:     String,
    required: true
  },
  userType: {
    type:     String,
    required: true
  },
  chatHistory: {
    type:     Object,
    required: false
  }
});

UserSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id:           ret._id,
      email:        ret.email,
      name:         ret.name,
      reviews:      ret.reviews,
      bio:          ret.bio,
      phone:        ret.phone,
      mobile:       ret.mobile,
      pc:           ret.pc,
      homeTheater:  ret.homeTheater,
      printer:      ret.printer,
      homeRouter:   ret.homeRouter,
      tv:           ret.tv,
      userType:     ret.userType,
      profilePic:   ret.profilePic,
      chatHistory:  ret.chatHistory
    };
    return returnJson;
  }
});

UserSchema.methods.authenticated = function(password) {
  var provider = this;
  var isAuthenticated = bcrypt.compareSync(password, provider.password);
  return isAuthenticated ? provider : false;
};

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});

module.exports = mongoose.model('User', UserSchema);
