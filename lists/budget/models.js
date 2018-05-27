const uuid = require('uuid');
const mongoose = require('mongoose');

const moveListSchema = mongoose.Schema({
  name:{type:String, required: true},
  status: Boolean,
  value: Number,
  location: String,
  user:{ type: mongoose.Schema.Types.ObjectId, ref: "User" }

});

moveListSchema.methods.serialize = function(){
  return {
    id: this.id,
    name: this.name,
    value: this.value,
    location: this.location,
    status: this.status,
    user: this.user
  };
};

const MoveList = mongoose.model('MoveList', moveListSchema);

module.exports = {MoveList};

