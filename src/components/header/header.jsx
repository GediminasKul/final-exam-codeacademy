import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import css from './header.module.css';
import { useAuthCtx } from '../../store/authContext';

function Header() {
  const { isUserLoggedIn, logout, userEmail } = useAuthCtx();
  return (
    <div className={css['header-container']}>
      <div className={css['hr']}></div>
      <header className={css['header']}>
        <div className={css['image-container']}>
          <img className={css['logo']} src="./src/assets/stack.png" alt="" />
          <NavLink className={`${css['nav-link']} ${css['left-nav']}`} to={'/'}>
            Home
          </NavLink>

          <NavLink
            to={'/questions'}
            className={`${css['nav-link']} ${css['left-nav']}`}
          >
            Questions
          </NavLink>
          <NavLink
            to={'/add'}
            className={`${css['nav-link']} ${css['left-nav']}`}
          >
            Ask Question
          </NavLink>
        </div>
        <nav className={css['main-nav']}>
          {!isUserLoggedIn && (
            <>
              <NavLink
                className={`${css['nav-link']} ${css['login']}`}
                to={'login'}
              >
                Login
              </NavLink>
              <NavLink
                className={`${css['nav-link']} ${css['register']}`}
                to={'register'}
              >
                Sign up
              </NavLink>
            </>
          )}
          <div className={css['current-user']}>
            {isUserLoggedIn && (
              <>
                {isUserLoggedIn && (
                  <p className={css['user-email']}>
                    You are logged in as: {userEmail}
                  </p>
                )}
                <NavLink
                  onClick={() => {
                    logout();
                    isUserLoggedIn
                      ? toast.success('You are logged out.')
                      : toast.error('Error in logout.');
                  }}
                  className={`${css['nav-link']} ${css['logout']}`}
                  to={'/login'}
                >
                  Logout
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
