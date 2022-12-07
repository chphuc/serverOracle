const oracledb = require('oracledb');
require('dotenv').config()

const getAllSeason = (req, res) => {
    const fetchData = async () => {
        try {
            const conn = await oracledb.getConnection({
                user: process.env.user,
                password: process.env.password,
                connectionString: process.env.connectionString
            })
            const result = await conn.execute('select year from season');
            return result
        } catch (err) {
            console.log(err);
        }
    }
    fetchData().then(data => res.json(data.rows));
}

module.exports = {
    getAllSeason
}