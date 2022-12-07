const oracledb = require('oracledb');
require('dotenv').config()

const getAllCompany = (req, res) => {
    const fetchData = async () => {
        try {
            const conn = await oracledb.getConnection({
                user: process.env.user,
                password: process.env.password,
                connectionString: process.env.connectionString
            })
            const result = await conn.execute('select company.cnumber,company.name from company');
            return result
        } catch (err) {
            console.log(err);
        }
    }
    fetchData().then(data => res.json(data.rows));
}

module.exports = {
    getAllCompany
}