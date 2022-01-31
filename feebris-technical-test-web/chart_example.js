/**
 * Boilerplate to demonstrate how to use chart.js server-side.
 *
 * Usage:
 *
 *  ```
 *  node chart_example.js
 *  ```
 */
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const moment = require('moment');
const chartjs_adapter_moment = require('chartjs-adapter-moment');
const fs = require('fs');

const getPrecedingSPO2Avg = (currentTime, data, totalAvg) => {
  const precedingTimestamps = data.filter(({TIMESTAMP}) => TIMESTAMP <= currentTime);
  if(!precedingTimestamps.length)
    return totalAvg;

  const nearestTimeStamp = precedingTimestamps[precedingTimestamps.length - 1].TIMESTAMP;
  const precedingTimestamp = parseInt(moment(nearestTimeStamp).subtract(5, 's').format('x'));
  const precedingData = data.filter(({TIMESTAMP}) => (TIMESTAMP >= precedingTimestamp && TIMESTAMP <= currentTime));
  const avgValue = (precedingData.map(({SPO2}) => SPO2).reduce((a,b) => a+b) / precedingData.length).toFixed(2);
  return avgValue;
}

const generateNormalizeData = (checkUpData, data) => {
  const updateData = JSON.parse(JSON.stringify(data));
  updateData.forEach(pulseData => {
    const inside_normal_range_data = pulseData.filter(({SPO2}) => (SPO2 >= 80 && SPO2 <= 100));
    pulseData.forEach(({TIMESTAMP, SPO2}, i) => {
      if(SPO2 < 80 || SPO2 > 100) {
        pulseData[i].SPO2 = getPrecedingSPO2Avg(TIMESTAMP, inside_normal_range_data, checkUpData.meanSPO2);
      }
    });
  });
  return updateData;
}

function ExampleSPO2Graph(checkUpData, data) {
  const config = {
    type: 'line',
    data: {
      datasets: [
        ...(generateNormalizeData(checkUpData, [...data]).map((pulseData) => ({
          data: pulseData.map(({TIMESTAMP, SPO2}) => ({'x': moment(TIMESTAMP), 'y': SPO2})),
          label: 'Normalised SPO2 data',
          backgroundColor: 'rgba(54, 162, 235, 0.5)', // transparent blue
          borderColor: 'rgb(54, 162, 235)', // blue
          type: 'line',
          pointRadius: 0,
          fill: false,
          lineTension: 0,
          borderWidth: 2,
        }))),
        ...(data.map((pulseData) => ({
          data: pulseData.map(({TIMESTAMP, SPO2}) => ({'x': moment(TIMESTAMP), 'y': SPO2})),
          label: 'SPO2 data',
          backgroundColor: 'rgba(255, 99, 132, 0.5)', // transparent red
          borderColor: 'rgb(255, 99, 132)', // red
          type: 'line',
          pointRadius: 0,
          fill: false,
          lineTension: 0,
          borderWidth: 2,
        })))
      ],
    },
    options: {
      animation: {
        duration: 0
      },
      scales: {
        x: {
            type: 'time',
            distribution: 'series',
            time: {
              unit: 'second'
            },
            ticks: {
              major: {
                enabled: true,
                fontStyle: 'bold'
              },
              source: 'data',
              autoSkip: true,
              autoSkipPadding: 75,
              maxRotation: 0,
              sampleSize: 100
            },
          },
      }
    }
  }

  const canvasRenderService = new ChartJSNodeCanvas({width: 1024, height: 800, plugins: {
    modern: ['chartjs-adapter-moment'],
    requireLegacy: ['chartjs-adapter-moment']
  }});
  return canvasRenderService.renderToBuffer(config);
}

function GenerateSPO2Graph(checkUpData, data) {
  return new Promise((resolve, reject) => {
    ExampleSPO2Graph(checkUpData, data)
    .then((imageBuffer) => {
      fs.writeFileSync('./static/checkups_chart.png', imageBuffer);
      resolve();
    });
  });
}

module.exports = GenerateSPO2Graph;
