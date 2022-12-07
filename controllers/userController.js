require('dotenv').config()

const login = (req, res) => {
    if (!req.body.username || !req.body.password)
        return res.json({ errCode: "1", message: "Missing data" });
    if (req.body.username == process.env.user) {
        if (req.body.password == process.env.password) {
            return res.json({ errCode: "0", message: "Login success" });
        } else {
            return res.json({ errCode: "1", message: "Password is wrong" });
        }
    } else {
        return res.json({ errCode: "1", message: "Username is wrong" });
    }
}

module.exports = {
    login
}