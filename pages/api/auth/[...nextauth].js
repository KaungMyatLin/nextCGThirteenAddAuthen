import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { pwCanbeSameHarsh } from '../../../lib_common/auth';
import connectToMongoClient from '../../../lib_common/db';

export default NextAuth({
    session: {
        strategy: "jwt",       // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                console.log('credentials= ', credentials)
                const client = await connectToMongoClient();
                const users = client.db().collection('users')
                const user = await users.findOne({email: credentials.email})
                if (!user) {
                    client.close();
                    throw new Error('No user found')
                }
                const isSamePw = await pwCanbeSameHarsh(credentials.password, user.password)
                if (!isSamePw) {
                    client.close();
                    throw new Error('Invalid password! Try again!');
                }
                client.close();
                return {email: user.email}       // return obj to let authorize know succeeded!.
            }
        })
    ]
});