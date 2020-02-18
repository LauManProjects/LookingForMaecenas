const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schemaUser = new Schema(
    {
        name: {type: String, required: true},
        lastName: {type: String, required: true},
        email:{type: String, required: true, unique: true},
        phone: {type: Number, required: true},
        password:{type: String, required: true},
        location: {
          lat: {type: Number},
          lon: {type: Number}
      },
        image: {type: String},
        type: {type: String, enum:["Admin", "Economic Maecenas", "Technical Maecenas", "Tourist Maecenas"], required: true},
        personalDescription: {type: String, required: true},
        economicContribution: {type: Number},
        project_id: { type: Schema.Types.ObjectId, ref: 'Project'}
    },
    { timestamps: true }
  );

module.exports = mongoose.model('User', schemaUser)
