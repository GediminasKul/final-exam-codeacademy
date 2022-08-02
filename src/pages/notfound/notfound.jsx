import { Link } from 'react-router-dom';
import css from './notfound.module.css';

function NotFoundPage() {
  return (
    <div className={css['not-found-container']}>
      <h1>Page not found</h1>
      <p className={css['message']}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link className={css['nav-link']} to={'/login'}>
        Go to login page
      </Link>
    </div>
  );
}

export default NotFoundPage;
