const oracledb = require('oracledb');
require('dotenv').config()

const getAllTrainee = (req, res) => {
    const fetchData = async () => {
        try {
            const conn = await oracledb.getConnection({
                user: process.env.user,
                password: process.env.password,
                connectionString: process.env.connectionString
            })
            const result = await conn.execute('select person.ssn,person.fname,person.lname,person.address,person.phone,trainee.photo from trainee,person where person.ssn = trainee.ssn');
            return result
        } catch (err) {
            console.log(err);
        }
    }
    fetchData().then(data => res.json(data.rows));
}

const searchTrainee = (req, res) => {
    const fetchData = async () => {
        try {
            const conn = await oracledb.getConnection({
                user: process.env.user,
                password: process.env.password,
                connectionString: process.env.connectionString
            })
            const result = await conn.execute(
                `SELECT
                *
            FROM
                (
                    SELECT
                        person.ssn,
                        person.fname AS firstname,
                        person.lname AS lastname,
                        person.address,
                        person.phone
                    FROM
                        person,
                        trainee
                    WHERE
                        person.ssn = trainee.ssn
                )
            WHERE
                REGEXP_LIKE ( firstname
                              || ' '
                              || lastname,
                              '${req.body.value}',
                              'i' )`
            );
            return result
        } catch (err) {
            console.log(err);
        }
    }
    fetchData().then(data => {
        return res.json(data.rows)
    });
}

const getTraineeDetail = (req, res) => {
    const fetchData = async () => {
        try {
            const conn = await oracledb.getConnection({
                user: process.env.user,
                password: process.env.password,
                connectionString: process.env.connectionString
            })
            const result = await conn.execute(
                `SELECT *
                FROM
                (SELECT T.SSN, P.FNAME,P.LNAME, P.PHONE, P.ADDRESS, T.PHOTO
                        FROM Trainee T, Person P
                        WHERE T.SSN = P.SSN AND T.SSN= ${req.body.value}
                ) 
                JOIN 
                (SELECT count(*) as no_seasons_participating
                        FROM (SELECT DISTINCT year 
                              FROM stageincludetrainee S, person P
                              WHERE S.ssn_trainee = P.ssn AND P.SSN= ${req.body.value})
                ) ON 1 = 1
                JOIN
                (SELECT max(ep_no) as best_achievement
                        FROM stageincludetrainee S, Person P
                             WHERE S.ssn_trainee = P.ssn AND P.SSN= ${req.body.value}
                )
                  ON 1 = 1
                `
            )
            return result
        } catch (err) {
            console.log(err);
        }
    }
    fetchData().then(data => res.json(data.rows))
}

const createTrainee = async (req, res) => {
    const conn = await oracledb.getConnection({
        user: process.env.user,
        password: process.env.password,
        connectionString: process.env.connectionString
    })
    const checkExistenceSSN = await conn.execute(`select * from person where person.ssn = ${+req.body.ssn}`);
    if (checkExistenceSSN.rows.length != 0) {
        return res.json({
            errCode: '1',
            mess: "SSN already exists!"
        })
    }
    else {
        try {
            const result1 = await conn.execute(`INSERT INTO PERSON VALUES (:ssn, :fname, :lname, :address, :phone)`,
                [req.body.ssn, req.body.firstname, req.body.lastname, req.body.address, req.body.phone],
                { autoCommit: true }
            );
            const result2 = await conn.execute(`INSERT INTO TRAINEE VALUES (:ssn, :dob, :photo, :company_id)`,
                [req.body.ssn, new Date(req.body.year, req.body.month, req.body.day, 0, 0, 0, 0), req.body.image, req.body.company],
                { autoCommit: true }
            );
        } catch (e) { console.log(e); return }
        return res.json({
            errCode: '0',
            mess: "Create success!"
        })
    }
}

const getTraineeResult = async (req, res) => {
    const conn = await oracledb.getConnection({
        user: process.env.user,
        password: process.env.password,
        connectionString: process.env.connectionString
    })
    const result = await conn.execute('SELECT result_trainee(:p1, :p2) from dual', { p1: req.body.ssn, p2: req.body.year });
    return res.json(result.rows)
}
module.exports = {
    getAllTrainee,
    searchTrainee,
    getTraineeDetail,
    createTrainee,
    getTraineeResult
}