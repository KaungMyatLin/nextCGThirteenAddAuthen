import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"
import classes from './main-navigation.module.css';

function MainNavigation() {
  const { data: sessionD , status } = useSession()
  console.log("MainNavigation:7 sessionD=");
  console.log(sessionD);
  console.log("MainNavigation:9 status=");
  console.log(status);

  const logoutHld = () => {
    signOut();
  }
  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          { status === 'unauthenticated' && 
            <li>
              <Link href='/auth'>Login</Link>
            </li>
          }
          { status === 'authenticated' && 
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          }
          { status === 'authenticated' && 
            <li>
              <button onClick={logoutHld}>Logout</button>
            </li>
          }
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
