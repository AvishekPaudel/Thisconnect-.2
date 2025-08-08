const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },

    subtitle:{
        type: String,
        required: true,
        trim: true
    },

    image: {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    }
   },
   
   genre:{
    type: String,
    required: true
   },

   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', 
    required: true
  },

  likes:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }

}, {timestamps: true})

module.exports = mongoose.model('Posts', postSchema);