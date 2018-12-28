import { Router as router } from 'express';

export default ({ sensor }) => {
  const api = router();

  api.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      dbConnected: db.serverConfig.isConnected(),
    });
  });

  api.get('/sensor', (req, res) => {
    const readout = sensor.read();
    if (readout) {
      return res.json(readout);
    }
    res.status(500).json({ message: 'Could not read sensor data' });
  });

  return api;
};
