const uuid = require('uuid');
const mongoose = require('mongoose');

const budgetSchema = mongoose.Schema({
  name:{type:String, required: true},
  status: Boolean,
  value: Number,
  location: String,
  user:{ type: mongoose.Schema.Types.ObjectId, ref: "User" }

});

budgetSchema.methods.serialize = function(){
  return {
    id: this.id,
    name: this.name,
    value: this.value,
    location: this.location,
    status: this.status,
    user: this.user
  };
};

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = {Budget};

