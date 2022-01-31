# Feebris Take Home Exercise

Thank you for taking the time to do our technical test. The purpose of this test is to challenge your development skills. We expect you to demonstrate your ability to develop, test and deliver robust code.

The exercise is designed with several tasks of increasing difficulty. Please don't worry if you don't reach completion of all the tasks within the time allotted. We use the same exercise for all seniorities of developers.

Please don't publish your solution as a public repository, but submit your code as a zip via Google Drive or any file sharing service and email us the link.

### Description

The Feebris product helps carers perform medical checkups of elderly patients that reside in care homes. We would like you to design a basic HTML interface for navigating our patients and analysing their Feebris checkups.

### Terminology

* Care home: A facility where several elderly residents live together. These institutions have staff who perform various types of assistance and care.
* Patient: An elderly resident of a Care Home.
* Checkup: A record of health measurements and readings taken for a Patient.
* GP Practice: The office or location of a general practitioner doctor. Most Patients will be assigned to a particular GP, sometimes multiple GP's.
* [Pulse Oximeter](https://en.wikipedia.org/wiki/Pulse_oximetry): A medical device used to determine blood oxygen levels in a Patient.
* [SPO2](https://en.wikipedia.org/wiki/Oxygen_saturation_(medicine)): Peripheral blood oxygen saturation. A pulse oximeter will produce a SPO2 readings (many per second).

### Setup

You may install and run the exercise like this:

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run the app, connect with a web browser to http://localhost:3000
node index.js
```

### Tasks

  1. At the `/` route, render a list of Care Homes and Patients (see `example.png`, it uses different data though!).

  2. Add a `/patients/:patientId` route. On this page display the patient's name and a list of their checkups, link to this from the Care Homes and Patients list (`/` route).

  3. Adjust the Care Home + Patients list (`/` route) such that next to each patient is a list of which GP practices are assigned to that patient.

  4. Adjust the `/patients/:patientId` route. Next to each checkup display the mean (average) of the SPO2 value of the latest pulse oximeter measurement. Do not display this if checkup has no pulse oximeter measurements.

  5. Add a `/patients/:patientId/checkups/:checkupId` route, link to this for each checkup on `/patients/:patientId`. This checkup view should render each checkup's pulseox measurement on a different plot, X-axis should be time and Y-axis should be the SPO2 value (you can use the `chart_example.js` skeleton provided, or some other approach).

  6. Adjust the checkup plots to include an additional normalized SPO2 line. The rules for normalising are: for any parts of the graph with SPO2 value less than 80 or greater than 100 (i.e. outside normal range), replace those with an average of the nearest preceding 5 seconds of values that are not outside-normal-range. If this occurs at the start of the signal, use the overall signal average of values not outside-normal range. 
  
  > Note: The TIMESTAMP column in the  pulse oximeter measurements is the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC

### Files

Patients and related entities are provided in the `data/` directory. Please treat these as API stubs in this exercise, of course a more realistic situation would have the data provided by a real API.

For later tasks there are pulse oximeter signal captures in the `data/pulseox/` directory.

### What we are looking for

* Code quality
* Good testing practice
* Completion of tasks
* Performance (how would your solution scale up to many patients / care homes / GPs / checkups?)

### Task requirements

* If you want to use other language than Javascript, feel free to do so
* Feel free to use whatever frameworks / libraries / packages you like
* Using React is not necessary to solve the exercise, but you can use it if you think it will help you complete the tasks faster
* Even though the exercise includes some boilerplate code, depending on your skills you can decide how much you implement server side vs. client side - it's acceptable to submit an exercise without a backend
* Please avoid including artifacts from your local build in your final zip file (eg: node_modules)
