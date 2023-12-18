const express = require ('express');
const router = express.Router();
const Patient = require('./models/patient');

async function createPatient(req, res) {
    try {
        const {
            patientId,
            surname,
            otherNames,
            gender,
            phoneNumber,
            residentialAddress,
            emergencyContact,
        } = req.body;

        const newPatient = new Patient({
            patientId,
            surname,
            otherNames,
            gender,
            phoneNumber,
            residentialAddress,
            emergencyContact,
        });

        const createdPatient = await newPatient.save();
        
        res.status(200).json(createdPatient);

    } catch (error) {
        console.error('Error creating patient:', error)
        res.status(500).json({error: 'Unable to create patient'});
    }
}

router.post('/patients', createPatient);

module.exports = router;