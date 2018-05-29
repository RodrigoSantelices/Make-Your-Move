const uuid = require('uuid');
const mongoose = require('mongoose');

const budgetSchema = mongoose.Schema({
  budget:{type: Number, required: true},
  user:{ type: mongoose.Schema.Types.ObjectId, ref: "User" }

});

budgetSchema.methods.serialize = function(){
  return {
    id: this.id,
    budget: this.budget,
    user: this.user
  };
};

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = {Budget};

