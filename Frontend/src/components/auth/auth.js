class Auth {
    constructor() {
        this.authenticated = localStorage.getItem('session') || null;
    }

    login(obj, cb) {
        localStorage.setItem('session', JSON.stringify(obj));
        this.authenticated = localStorage.getItem('session');
        cb();
    }

    logout(cb) {
        // Debo cambiar ambos
        this.authenticated = null;
        localStorage.clear();
        cb();
    }

    isAuthenticated() {
        return this.authenticated !== null;
    }

    isAdmin() {
        if (this.isAuthenticated()) {
            return JSON.parse(this.authenticated).role === 1;
        } else {
            return false
        }
    }

    getSession() {
        return JSON.parse(this.authenticated);
    }

    getIdName(){
        let email = this.getSession().id;
        let arr = email.split("@");
        let name = arr[0];
        return name;
    }
}

export default new Auth();