import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { baseUrl, myFetch } from '../../utils';
import Button from '../UI/button/button';
import css from './registerform.module.css';

const initValues = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
};
function RegisterForm() {
  const history = useHistory();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      name: Yup.string().min(4, 'At least 4 characters').max(20).required(),
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
        `${baseUrl}/api/register`,
        'POST',
        valuesCopy
      );
      if (registerResult === 'user created') {
        toast.success('Register successfull! Redirecting to login page...');
        history.replace('/login');
      }
      if (registerResult === 'Cannot create user') {
        toast.error('Register failed. Try again.');
        return;
      }
    },
  });

  return (
    <div className={css['form-container']}>
      <h3 className={css['form-title']}>Register here</h3>

      <form onSubmit={formik.handleSubmit} className={css['register-form']}>
        <div className={css['form-group']}>
          <label htmlFor="name" className={css['addFont']}>
            Name
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={
              formik.touched.name && formik.errors.name ? css['invalid'] : ''
            }
            name="name"
            type="text"
            id="name"
          />
          {formik.touched.name && formik.errors.name && (
            <p className={css['error-msg']}>{formik.errors.name}</p>
          )}
        </div>
        <div className={css['form-group']}>
          <label htmlFor="email" className={css['addFont']}>
            Email
          </label>
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
          <label htmlFor="password" className={css['addFont']}>
            Password
          </label>
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
          <label htmlFor="repeatPassword" className={css['addFont']}>
            Repeat Password
          </label>
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
        <Button submit primary className={css['addFont']}>
          Register
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
