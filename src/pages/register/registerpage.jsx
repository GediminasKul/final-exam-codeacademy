import RegisterForm from '../../components/registerForm/registerForm';
import css from './registerpage.module.css';

function RegisterPage() {
  return (
    <div className={css['main-register-form-container']}>
      <h1 className={css['register-title']}>Register page</h1>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
