const express = require('express');
const app = express();
const hbs = require('hbs');
const DataUtils = require('./data-utils');
const getJsonDataFromCsv = require('./csvtojson');
const GenerateSPO2Graph = require('./chart_example');

app.use(express.static("static"));

app.set('view engine', 'hbs');
app.set('views', './views')

app.get('/', (req, res) => {
   res.render('index', {title: 'Care Homes', data: DataUtils.getCareHomesAndPatients()});
});

app.get('/patients/:patientId', (req, res) => {
   res.render('patient', {
     title: 'Patient', 
     patient: DataUtils.getPatientInfo(req.params.patientId)
  });
});

app.get('/patients/:patientId/checkups/:checkupId', async (req, res) => {
  const patient = DataUtils.getPatientInfo(req.params.patientId);
  const checkUpData = patient && patient.checkups && patient.checkups.find(({id}) => id == req.params.checkupId);
  if (checkUpData && checkUpData.pulseOximeterData) {
    const pulseOximeterData = checkUpData.pulseOximeterData.map((path) => getJsonDataFromCsv(path))
    await GenerateSPO2Graph(checkUpData, pulseOximeterData)
  }
  res.render('checkup', {
    title: 'Checkup', 
    patient,
    checkUpData,
  });
});

const server = app.listen(3000, () => {
  console.log('⚙️ feebris-technical-test2 listening at http://localhost:3000')
});

module.exports = server;
