const uuid = require('uuid');
const mongoose = require('mongoose');

const moveListSchema = mongoose.Schema({
  name:{type:String, required: true},
  status: Boolean,
  value: String,
  location: String,
  user:{ type: mongoose.Schema.Types.ObjectId, ref: "User" }

});

moveListSchema.methods.serialize = function(){
  return {
    id: this.id,
    name:this.name,
    value: this.value,
    location: this.location,
    status: this.status,
    user: this.user
  };
};

const MoveList = mongoose.model('MoveList', moveListSchema);

module.exports = {MoveList};


/*
function StorageException(message){
  this.message = message;
  this.name = "StorageException";
}

const MoveList = {
  create: function(name, value, status){
    console.log('Creating new move item');
    const item = {
      name: name,
      id: uuid.v4(),
      value: value,
      status: status
    };
    this.items[item.id] = item;
    return item;
  },
  get: function() {
    console.log('Retrieving move items');
    return Object.keys(this.items).map(key => this.items[key]);
  },
  delete: function(id) {
    console.log(`Deleting move item \`${id}\``);
    delete this.items[id];
  },
  update: function(updatedItem) {
    console.log(`Updating item \`${updatedItem.id}\``);
    const {id} = updatedItem;
    if (!(id in this.items)) {
      throw StorageException(
        `Can't update item \`${id}\` because doesn't exist.`)
    }
    this.items[updatedItem.id] = updatedItem;
    return updatedItem;
  }
};
function createMoveList(){
  const storage = Object.create(MoveList);
  storage.items={};
  return storage;
}

*/