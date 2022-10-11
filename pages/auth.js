import AuthForm from '../components/auth/auth-form';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import classes from '../components/profile/user-profile.module.css';

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();
  // clientside Session checking for /auth.
  useEffect( () => {
    getSession().then(sessionObj => {
      console.log("AuthPage:11 sessionObj=")
      if (sessionObj) {
        router.replace('/')
      }
      else {
        setIsLoading(false)
      }
    })
  }, [])

  if ( isLoading ) {
    return <p className={classes.profile}>Loading ...</p>
  }
  return <AuthForm />;
}

export default AuthPage;
