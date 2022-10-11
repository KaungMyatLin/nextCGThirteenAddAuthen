import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
// import { useSession, getSession } from 'next-auth/react'
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

function UserProfile() {
  // UNCOMMENT these below codes if you are not doing SSR getSession.
  // const router = useRouter();
  // useEffect( () => {
  //   getSession().then(sessObj => {
  //     setLoadedSession(sessObj)
  //     if (!sessObj) {
  //       // windows.location.href= '/auth';
  //       router.push('/auth')
  //     }
  //     else {
  //       setIsLoading(false)
  //     }
  //     console.log("userProfile:22 sessObj=")
  //     console.log(sessObj)
  //   })
  // }, [])
  // // Redirect away if NOT auth
  // const {data: sessionD, status } = useSession();
  // console.log("UserProfile:28 sessionD=");
  // console.log(sessionD);
  // console.log("UserProfile:30 status=");
  // console.log(status);
  // if ( status === "loading" ) {
  //   return <p className={classes.profile}>Loading ...</p>
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
