const care_homes = require('./data/care_homes.json');
const patients = require('./data/patients.json');
const gp_practices = require('./data/gp_practices.json');
const gp_practices_patients = require('./data/gp_practices_patients.json');
const checkups = require('./data/checkups.json');
const getJsonDataFromCsv = require('./csvtojson');
const moment = require('moment');

const patientsWithGps = () => {
    const patientsWithGpPractises = [...patients];
    [...patientsWithGpPractises].forEach((patient) => {
        patient['gp_practices'] = gp_practices_patients.filter(({patientId}) => patientId === patient.id)
            .map(({gpPracticeId}) => gp_practices.find(({id}) => gpPracticeId === id));
    });
    return patientsWithGpPractises;
}

const getPatientInfo = (patientId) => {
    const patient = patientsWithGps().find(({id}) => id == patientId);
    if(patient) {
        patient['checkups'] = checkups.filter(({patientId: pid}) => pid == patientId);
        if(patient['checkups'].length > 0) {
            patient['checkups'].forEach((checkup) => {
                checkup['createdDate'] = moment(checkup.createdAt).toString();
                if(checkup.pulseOximeterData) {
                    const latestOximeterData = getJsonDataFromCsv(checkup.pulseOximeterData[0])
                    checkup['meanSPO2'] = (latestOximeterData.map(({SPO2}) => SPO2).reduce((a,b) => a+b) / latestOximeterData.length).toFixed(2);
                }
            });
        }
    }
    return patient;
}

const getCareHomesAndPatients = () => {
    const homes = [...care_homes];
    homes.forEach((home) => {
        home['patients'] = patientsWithGps().filter(({careHomeId}) => careHomeId === home.id);
    });
    return homes;
};

const getCheckUpData = (id) => {
    return checkups.find(({id: cid}) => cid == id);
}


const DataUtils = {
    getCareHomesAndPatients,
    getPatientInfo,
    getCheckUpData,
};

module.exports = DataUtils;