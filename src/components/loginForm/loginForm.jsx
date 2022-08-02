import { useFormik } from 'formik';
import { NavLink, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, myFetch } from '../../utils';
import Button from '../UI/button/button';
import css from './loginform.module.css';
import toast from 'react-hot-toast';

const initValues = {
  email: '',
  password: '',
};

function LoginForm() {
  const history = useHistory();
  const ctx = useAuthCtx();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string().email('Please check your email').required(),
      password: Yup.string().min(4, 'At least 4 characters').max(20).required(),
    }),

    onSubmit: async (values) => {
      const loginResult = await myFetch(`${baseUrl}/api/login`, 'POST', values);
      if (loginResult.success === true) {
        toast.success('Login successfull!');
        ctx.login(loginResult.token, values.email, loginResult.payload.userId);
        history.replace('/questions');
      }
      if (!loginResult.success) {
        toast.error('Login failed!');
        return;
      }
    },
  });

  return (
    <div className={css['form-container']}>
      <h3 className={css['form-title']}>Login here</h3>

      <form onSubmit={formik.handleSubmit} className={css['login-form']}>
        <div className={css['form-group']}>
          <label htmlFor="email">Email</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            className={
              formik.touched.email && formik.errors.email ? css['invalid'] : ''
            }
            id="email"
            name="email"
          />
          {formik.touched.email && formik.errors.email && (
            <p className={css['error-msg']}>{formik.errors.email}</p>
          )}
        </div>
        <div className={css['form-group']}>
          <label htmlFor="password">Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            className={
              formik.touched.password && formik.errors.password
                ? css['invalid']
                : ''
            }
            id="password"
            name="password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className={css['error-msg']}>{formik.errors.password}</p>
          )}
        </div>
        <p className={css['register-here']}>
          New User?
          <NavLink to={'/register'} className={css['reg-link']}>
            Register here!
          </NavLink>
        </p>
        <Button submit primary>
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
