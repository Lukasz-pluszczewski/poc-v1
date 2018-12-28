import dhtSensor from 'node-dht-sensor';
/**
 * Creates dhtSensor instance
 * @param {number} sensorPin The GPIO pin number for sensor signal
 * @constructor
 */
const DhtService = (sensorPin = 4) => {
  const dhtServiceInstance = {
    errors: null,
  };

  const sensorType = 22; // 11 for DHT11, 22 for DHT22 and AM2302

  if (!dhtSensor.initialize(sensorType, sensorPin)) {
    console.warn('Failed to initialize sensor on pin ' + sensorPin);
    dhtServiceInstance.errors = 'Failed to initialize sensor';
  }

  dhtServiceInstance.read = () => {
    if (!dhtServiceInstance.errors) {
      const readout = dhtSensor.read();
      return readout;
    }
    return null;
  };

  return dhtServiceInstance;
};

export default DhtService;