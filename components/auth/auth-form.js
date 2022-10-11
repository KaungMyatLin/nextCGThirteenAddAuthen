import { useState, useRef } from 'react';
import classes from './auth-form.module.css';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

const createUser = async (em, pw) => {
  const resp = await fetch('/api/auth/signup', {
    method: 'POST'
    , body: JSON.stringify({em, pw})
    , headers: {
      'content-type': 'application/json'
    }
  })

  const data = await resp.json();

  if (!resp.ok) {
    throw new Error(data.message || 'something went wrong')
  }

  return data;
}

function AuthForm() {
  const emInpRef = useRef();
  const pwInpRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submHdl (e) {
    e.preventDefault();
    const entEm = emInpRef.current.value;
    const entPw = pwInpRef.current.value;

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false
        , email: entEm
        , password: entPw
      }) //will always resolve, will not reject even if there's error in api backend.
      console.log(result)
      if (!result.error) {
        router.replace("/profile")
      }
    }
    else {
      try {
        const result_cUser = await createUser(entEm, entPw);
        console.log(result_cUser)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submHdl}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emInpRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={pwInpRef}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
