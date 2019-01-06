class PasswordVerifier {
    constructor(password) {
        this.password = password;
    }

    verify(password) {
        return password === this.password;
    }
}

export default PasswordVerifier;
