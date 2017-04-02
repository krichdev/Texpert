var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
  issueTitle: String,
  device: String,
  description: String
});

MessageSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      issueTitle: ret.issueTitle,
      device: ret.device,
      description: ret.description
    };
    return returnJson;
  }
});

module.exports = mongoose.model('Message', MessageSchema);