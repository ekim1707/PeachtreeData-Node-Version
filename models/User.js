const db = require('../db');
const bcrypt = require('bcrypt');

async function checkPassword( { email, password } ) {
    try {

        const query = await db.one(`
            select * from users where email=$1
        `, [email]);

        const correctPass = bcrypt.compareSync(password, query.password);

        if (correctPass) {
            return query;
        } else {
            return {
                msg: 'Wrong password'
            }
        }

    } catch (error) {

        return {
            msg: 'Some error occured'
        }

    }
}

async function checkUser( {first_name, last_name, email, password} ) {
    try {

        const checkUser = await db.any(`
            select * from users where email=$1
        `, [email]);

        if (checkUser.length > 0) {
            return {
                msg: "Already exists"
            }
        } else {
            return createUser( {first_name, last_name, email, password} );
        }

    } catch (error) {

        return {
            msg: "Error!"
        }

    }
}

async function createUser( {first_name, last_name, email, password} ) {
    try {

        const hash = bcrypt.hashSync(password, 10);

        const user = await db.one(`
            insert into users
                (first_name, last_name, email, password)
            values ($1, $2, $3, $4)

            returning id, first_name, last_name, email
        `, [first_name, last_name, email, hash]);

        return user;

    } catch (error) {

        return {
            msg: "Some kind of error occured!"
        }

    }
}

module.exports = {

    checkPassword,
    checkUser,
    createUser

}