const uuid = require('uuid');
const mongoose = require('mongoose');

const sellListSchema = mongoose.Schema({
  name:{type:String, required: true},
  status: Boolean,
  value: Number,
  location: String,
  user:{ type: mongoose.Schema.Types.ObjectId, ref: "User" }

});

sellListSchema.methods.serialize = function(){
  return {
    id: this.id,
    name: this.name,
    value: this.value,
    location: this.location,
    status: this.status,
    user: this.user
  };
};

const SellList = mongoose.model('SellList', sellListSchema);

module.exports = {SellList};

