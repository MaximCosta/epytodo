module.exports = {
    isEmail: (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    },
    isId: (id) => {
        return /^\d+$/.test(id);
    },
    checkParams: (req, methode, get) => {
        let params = req[methode === "get" ? "query" : "body"];
        for (let val of get) {
            if (Array.isArray(val)) {
                if (!params[val[0]]) return false;
                if (val[1] && !val[1](params[val[0]])) return false;
                continue;
            }
            if (!params[val]) return false;
        }
        return true;
    },
};
