import connectToDb from '../../../lib_common/db'
import { c_hashPw } from '../../../lib_common/auth'

async function signupHdl(req, res) {
    console.log("line 5")
    if (req.method === 'POST') {
        const data = req.body;
        const { em, pw } = data;
        if ( !em || !em.includes('@') || !pw ) {
            console.log("inside api")
            res.status(422).json({message: 'Invalid input - password should be at least 7 characters long'})
            return;
        }
        const hashDigest = await c_hashPw(pw);
        const client = await connectToDb();
        const db = client.db();
        const insertResult = await db.collection('users').insertOne({
            em
            , password: hashDigest
        })
        res.status(201).json({message: 'created user!'})
    }
}

export default signupHdl