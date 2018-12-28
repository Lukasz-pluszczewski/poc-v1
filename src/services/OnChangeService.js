import EventEmitter from 'events';

class OnChange extends EventEmitter {
    constructor(interval = 1000, getValue) {
        super();

        this.value = 0;
        this.interval = interval;
        this.getValue = getValue;
    }

    check() {
        const value = this.getValue();
        if (this.value !== value) {
            this.emit('change', value, this.value);
            this.value = value;
        }
    }

    initialize() {
        setInterval(() => this.check(), this.interval);
    }
}

export default OnChange;
