var sensor = require('node-dht-sensor');
var dht = require('dht-sensor');

// sensor.read(22, 4, function(err, temperature, humidity) {
//   console.log('----------');
//   console.log('node-dht-sensor: ');
//   if (!err) {
//     console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
//       'humidity: ' + humidity.toFixed(1) + '%'
//     );
//   }
//   console.log('error: ', err);
// });

console.log('---------');
console.log('dht-sensor: ');

var current = dht.read(22, 4); // 11 : DHT11, 18 : BCM GPIO

console.log('dht himidity', current.humidity);
console.log('dht temperature', current.temperature);


// ==============================
console.log('----------');
console.log('node-dht-sensor: ');

var sensorType = 22; // 11 for DHT11, 22 for DHT22 and AM2302
var sensorPin  = 4;  // The GPIO pin number for sensor signal
if (!sensor.initialize(sensorType, sensorPin)) {
  console.warn('Failed to initialize sensor');
  process.exit(1);
}

// Automatically update sensor value every 2 seconds
setInterval(function() {
  var readout = sensor.read();
  // blynk.virtualWrite(3, readout.temperature.toFixed(1));
  // blynk.virtualWrite(4, readout.humidity.toFixed(1));

  console.log('Temperature:', readout.temperature.toFixed(1) + 'C');
  console.log('Humidity:   ', readout.humidity.toFixed(1)    + '%');
}, 2000);
