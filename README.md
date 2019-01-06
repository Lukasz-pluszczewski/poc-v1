# Temperature and humidity raspberry server

### Environment variables
- **PORT** (default: 8080)
- **ADMIN_PASSWORD** - (*required*) password to access API

### Run development build
`ADMIN_PASSWORD=foobarbaz npm run dev`

### Run production build
`ADMIN_PASSWORD=foobarbaz npm run start`

### WebSocket
Server uses socket.io to communicate.

It listens on `login` event. You should send password as a payload.

It emits following events:

- `sensor`, event payload is the same as `/sensor` endpoint. Emitted after succesfull login
- `temperature:changed`
- `humidity:changed`

`temperature:changed`, and `humidity:changed` events payload is as follows:
```
{
    value: currentValue, // float number
    oldValue: oldValue, // float number
}
 ```
