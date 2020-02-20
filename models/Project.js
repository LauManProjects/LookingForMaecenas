const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schemaProject = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      // required: true
    },
    coordinates: {
      type: [Number],
      // required: true
    }
  },
  date: {
    type: String
  },
  imagen: {
    type: String
  },
  colaborationType: {
    type: String,
    enum: ["Economic Maecenas", "Technical Maecenas", "Tourist Maecenas"]
  },
  projectDescription: {
    type: String,
    required: true
  },
  projectTracking: {
    type: String,
    timestamps: true
  },
  totalRaised: {
    type: Number
  },
  totalRequired: {
    type: Number
  },
  adminId: {
    type: String
  }
}, {
  timestamps: true
});

const Model = mongoose.model('Project', schemaProject)

module.exports = Model