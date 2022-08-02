import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, myFetchAuth } from '../../utils';
import Button from '../UI/Button/Button';
import css from './AddForm.module.css';

const initValues = {
  title: '',
  content: '',
};

function AddForm() {
  const history = useHistory();
  const { token } = useAuthCtx();
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(10, 'At least 5 characters')
        .max(255, 'Maximum title length reached')
        .required(),
      content: Yup.string()
        .min(5, 'At least 5 characters')
        .max(500, 'Maximum content length reached')
        .required(),
    }),

    onSubmit: async (values) => {
      const addResult = await myFetchAuth(
        `${baseUrl}/api/questions`,
        'POST',
        token,
        values
      );
      console.log('addResult ===', addResult);

      if (addResult === 'Question successfully added') {
        toast.success('New question was added.');
        history.replace('/questions');
      }
      console.log('addResult ===', addResult);
      if (addResult === 'Question was not added') {
        toast.error('Error while adding questions. Please try again.');
        return;
      }
      console.log('submiting values ===', values);
    },
  });

  return (
    <div className={css['form-container']}>
      <h3 className={css['form-title']}>Ask a question</h3>

      <form onSubmit={formik.handleSubmit} className={css['add-form']}>
        <div className={css['form-group']}>
          <label htmlFor="title">Enter title</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            type="text"
            className={
              formik.touched.title && formik.errors.title ? css['invalid'] : ''
            }
            id="title"
            name="title"
          />
          {formik.touched.title && formik.errors.title && (
            <p className={css['error-msg']}>{formik.errors.title}</p>
          )}
        </div>
        <div className={css['form-group']}>
          <label htmlFor="content">Add content</label>
          <textarea
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
            type="content"
            className={
              formik.touched.content && formik.errors.content
                ? css['invalid']
                : ''
            }
            id="content"
            name="content"
          ></textarea>
          {formik.touched.content && formik.errors.content && (
            <p className={css['error-msg']}>{formik.errors.content}</p>
          )}
        </div>
        <Button submit primary>
          Add
        </Button>
      </form>
    </div>
  );
}

export default AddForm;
