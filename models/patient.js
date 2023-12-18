const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema ({
    patientId: {
        type: String,
        required: true,
        unique: true,
    },
    surname: {
        type:String,
        required:true,
    },
    otherNames: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    residentialAddress: {
        type: String,
        required: true,
    },
    emergencyContact: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    relationship: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Patient', patientSchema);