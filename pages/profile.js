import UserProfile from '../components/profile/user-profile';
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from "./api/auth/[...nextauth]"

function ProfilePage(props) {
  return <UserProfile />;
}
// adding serversidepage guard.
export async function getServerSideProps(context) {
  const sessionObj = await unstable_getServerSession(context.req, context.res, authOptions) // unstable_getServerSession is experimental, no alternative in v4.
  console.log("ProfilePage:11 sessionObj=")
  console.log(sessionObj)
  if (!sessionObj) {
    // return {
    //   redirect: {
    //     destination: '/auth',
    //     permanent: false,       // if only times session is not loggedin.
    //   }
    // }
  }
  const jsonStr = JSON.stringify(sessionObj)
  const converted_sessObj = JSON.parse(jsonStr)
  console.log("ProfilePage:22 converted_sessObj=")
  console.log(converted_sessObj)
  return {
    props: { session: converted_sessObj}
  }
}

export default ProfilePage;
