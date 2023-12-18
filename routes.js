const express = require ('express');
const router = express.Router();

const patientController = require('./controllers/patientController');
const encounterController = require('./controllers/encounterController');
const vitalsController = require('./controllers/vitalsController');

router.post('/patients', patientController.createPatient);
router.post('/encounters', encounterController.createEncounter);
router.post('/vitals', vitalsController.submitVitals);
router.get('/patients', patientController.getPatients);
router.get('/patients/:patientId', patientController.getPatientById);

module.exports = router;
