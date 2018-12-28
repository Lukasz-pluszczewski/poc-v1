import Auth from './Auth';
import OnChange from '../services/OnChangeService';

const TEMPERATURE_CHECK_INTERVAL = 500;
const HUMIDITY_CHECK_INTERVAL = 500;

export default (io, verifier, sensor) => {
    io.on('connection', (client) => {
        client.on('login', Auth(client, verifier, sensor));
    });

    const t = new OnChange(TEMPERATURE_CHECK_INTERVAL, () => sensor.read().temperature);
    const h = new OnChange(HUMIDITY_CHECK_INTERVAL, () => sensor.read().humidity);

    h.on('change', (value, oldValue) => {
        io.to('users').emit('humidity:changed', {
            value,
            oldValue,
        });
    });
    t.on('change', (value, oldValue) => {
        io.to('users').emit('temperature:changed', {
            value,
            oldValue,
        });
    });

    t.initialize();
    h.initialize();
}
