import { unstable_getServerSession } from 'next-auth/next'
import { pwCanbeSameHarsh, c_hashPw } from '../../../lib_common/auth';
import connectToMongoClient from '../../../lib_common/db';
import { authOptions } from "../auth/[...nextauth]"

const chgPwHdl = async (req, res) => {
    if (req.method !== "PATCH") {
        return;
    }
    // serverside Session checking for /auth changepw restapi.
    const sessionObj = await unstable_getServerSession(req, res, authOptions) // unstable_getServerSession is experimental, no alternative in v4.
    console.log("chgPwHdl:11 sessionObj=")
    console.log(sessionObj)
    if (!sessionObj) {
        res.status(401).json({message: `401 Not authenticated by sensing request to this api's header cookie's authorization code`})
        return;
    }
    const r_em_SessionObj = sessionObj?.user?.email;
    const oldPw = req.body.oldPassword
    const newPw = req.body.newPassword

    const client = await connectToMongoClient();
    const users = client.db().collection('users')
    const user = await users.findOne({email: r_em_SessionObj})
    if (!users) {
        res.status(404).json({message: `user not found.!`})
        client.close();
        return;
    }

    const currentPw = user.password
    const isSamePw = await pwCanbeSameHarsh(oldPw, currentPw)
    if (!isSamePw) {
        // res.status(403).json({message: `403 Not authorized, you don't have permission to do this operation.`})
        res.status(422).json({message: `422 Not valid user input. Could not perform changing password.`})
        client.close();
        throw new Error('Invalid password! Try again!');
    }

    const hashDigest = await c_hashPw(newPw);
    const result = await users.updateOne({email: r_em_SessionObj}, {$set: {password: hashDigest}})
    client.close();
    console.log("chngPw:42 result=")
    console.log(result)
    res.status(200).json({message: `password has been successfully changed!`})
}

export default chgPwHdl