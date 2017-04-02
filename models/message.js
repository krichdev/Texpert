var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
  userName:     String,
  userId:       String,
  userPhoto:    String,
  issueTitle:   String,
  device:       String,
  description:  String,
  claimed:      String,
  chatId:       String
});

MessageSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      userName:     ret.userName,
      userId:       ret.userId,
      userPhoto:    ret.userPhoto,
      issueTitle:   ret.issueTitle,
      device:       ret.device,
      description:  ret.description,
      claimed:      ret.claimed,
      chatId:       ret.chatId
    };
    return returnJson;
  }
});

module.exports = mongoose.model('Message', MessageSchema);