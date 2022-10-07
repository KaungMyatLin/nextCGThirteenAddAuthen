import connectToDb from '../../../lib_common/db'
import { c_hashPw } from '../../../lib_common/auth'

async function signupHdl(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const { em, pw } = data;
        if ( !em || !em.includes('@') || !pw ) {
            res.status(422).json({message: 'Invalid input - password should be at least 7 characters long'})
            return;
        }
        const hashDigest = await c_hashPw(pw);
        const client = await connectToDb();
        const db = client.db();
        const r_existingOrNot = await db.collection('users').findOne({email: em})
        if (r_existingOrNot) {
            res.status(422).json({message: 'user exists already'})
            client.close();
            return;
        }
        const insertResult = await db.collection('users').insertOne({
            email: em
            , password: hashDigest
        })
        res.status(201).json({message: 'created user!'})
        client.close();
    }
}

export default signupHdl