const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schemaProject = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    lat: {
      type: Number
    },
    lon: {
      type: Number
    }
  },
  date: {
    type: String
  },
  colaborationType: {
    type: String,
    enum: ["Economic Maecenas", "Technical Maecenas", "Tourist Maecenas"],
    required: true
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