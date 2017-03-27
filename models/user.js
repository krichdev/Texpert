var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  skills: [
    {
      type: Boolean,
      skill: 'mobile'
    },
    {
      type: Boolean,
      skills: 'pc'
    },
    {
      type: Boolean,
      skills: 'homeTheater'
    },
    {
      type: Boolean,
      skills: 'printer'
    },
    {
      type: Boolean,
      skills: 'homeRouter'
    },
    {
      type: Boolean,
      skills: 'tv'
    }
  ],
  reviews: String,
  bio: String,
  phone: {
    type: String,
    required: true
  }


});

UserSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      email: ret.email,
      name: ret.name,
      reviews: ret.reviews,
      bio: ret.bio,
      phone: ret.phone,
      skills: ret.skills
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
