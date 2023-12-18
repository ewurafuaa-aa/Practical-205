const express = require ('express')
const router = express.Router();
const Patient = require('../models/patient')

router.post('/', async (req, res) => {
    try {
        const {patientId, surname, otherNames, gender, phoneNumber, residentialAddress, emergencyName, emergencyContact, emergencyRelationship} = req.body;

        const patient = new Patient({
            patientId,
            surname,
            otherNames, 
            gender, 
            phoneNumber, 
            residentialAddress, 
            emergencyName, 
            emergencyContact, 
            emergencyRelationship
        })
    }
})