import UserProfile from '../components/profile/user-profile';
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from "./api/auth/[...nextauth]"

function ProfilePage(props) {
  return <UserProfile />;
}
export async function getServerSideProps(context) {
  const sessionObj = await unstable_getServerSession(context.req, context.res, authOptions)
  console.log(sessionObj)
  if (!sessionObj) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,       // if only times session is not loggedin.
      }
    }
  }
  return {
    props: { session: sessionObj}
  }
}

export default ProfilePage;
