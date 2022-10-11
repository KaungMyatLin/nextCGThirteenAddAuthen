import { unstable_getServerSession } from 'next-auth/next'

const chgPwHdl = async (req, res) => {
    if (req.method !== "PATCH") {
        return;
    }
    // serverside Session checking for /auth changepw restapi.
    const sessionObj = await unstable_getServerSession(context.req, context.res, authOptions) // unstable_getServerSession is experimental, no alternative in v4.
    console.log("chgPwHdl:11 sessionObj=")
    console.log(sessionObj)
    if (!sessionObj) {
        res.status(401).json({message: `Not authenticated by sensing request to this api's header cookie's authorization code`})
        return;
    }
}

export default chgPwHdl