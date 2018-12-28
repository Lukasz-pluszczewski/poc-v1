// returns promise in case we'd need to rely on some async req in future;
export default (client, verifier, sensor) => (password) => {
    if (!verifier.verify(password)) {
        return Promise.reject('socket_login_error');
    }

    client.join('users');
    client.on('disconnect', () => client.leave('users'));
    client.emit('sensor', sensor.read());
    return Promise.resolve();
}
