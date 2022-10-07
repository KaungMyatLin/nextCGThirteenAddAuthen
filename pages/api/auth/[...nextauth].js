import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import connectToDb from '../../../lib_common/db';

export default NextAuth({
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                const client = await connectToDb();
                const users = client.db().collection('users')
                const user = users.findOne({email: credentials.email})
                if (!user) {
                    throw new Error('No user found')
                }
                client.close();
            }
        })
    ]
});