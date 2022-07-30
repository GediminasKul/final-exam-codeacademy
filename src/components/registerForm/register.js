import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { baseUrl, myFetch } from '../../utils';
import Button from '../button/button';
import css from './registerform.module.css';

const initValues = {
  email: '',
  password: '',
  repeatPassword: '',
};

function RegisterForm() {
  const history = useHistory();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string().email('Please check your email').required(),
      password: Yup.string().min(4, 'At least 4 characters').max(20).required(),
      repeatPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password'), null], 'Passwords must match!'),
    }),

    onSubmit: async (values) => {
      const valuesCopy = { ...values };
      delete valuesCopy['repeatPassword'];
      const registerResult = await myFetch(
        `${baseUrl}v1/auth/register`,
        'POST',
        valuesCopy
      );
      if (registerResult.changes === 1) {
        alert('Register successfull! Redirecting to login page...');
        history.replace('/login');
      }
      if (registerResult.changes === 0) {
        alert('Register failed. Try again.');
        return;
      }
    },
  });

  function matchPass() {
    const { password, repeatPassword } = initValues;
    if (password !== repeatPassword) {
      console.log('Passwords does not match');
    }
  }

  return (
    <div className={css['form-container']}>
      <h3 className={css['form-title']}>Register here</h3>

      <form
        onSubmit={formik.handleSubmit}
        onBlur={matchPass}
        className={css['register-form']}
      >
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
        <div className={css['form-group']}>
          <label htmlFor="repeatPassword">Repeat Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeatPassword}
            type="password"
            className={
              formik.touched.repeatPassword && formik.errors.repeatPassword
                ? css['invalid']
                : ''
            }
            id="repeatPassword"
            name="repeatPassword"
          />
          {formik.touched.repeatPassword && formik.errors.repeatPassword && (
            <p className={css['error-msg']}>{formik.errors.repeatPassword}</p>
          )}
        </div>
        <Button submit primary>
          Register
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
