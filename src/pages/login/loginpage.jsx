import LoginForm from '../../components/loginForm/loginForm';
import css from './loginpage.module.css';

function LoginPage() {
  return (
    <div className={css['login-form-main-container']}>
      <h1 className={css['login-title']}>Login page</h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
