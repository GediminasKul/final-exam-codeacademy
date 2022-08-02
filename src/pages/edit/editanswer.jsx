import { useFormik } from 'formik';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, myPatchAuth } from '../../utils';
import css from './editanswer.module.css';
import Button from '../../components/UI/button/button';
import { useState, useEffect } from 'react';

function EditAnswerPage() {
  const content = localStorage.getItem('content');

  const initValues = {
    content: content,
  };

  const [updatedAnswer, setUpdatedAnswer] = useState(initValues);

  useEffect(() => {
    setUpdatedAnswer({ content: localStorage.getItem('content') });
  }, [content]);

  const history = useHistory();
  const { token } = useAuthCtx();
  const { id } = useParams();

  if (!token) {
    toast.error('To view this content you must be logged in');
    history.push('/login');
  }

  const formik = useFormik({
    initialValues: updatedAnswer,
    validationSchema: Yup.object({
      content: Yup.string()
        .min(5, 'At least 5 characters')
        .max(500, 'Maximum content length reached')
        .required(),
    }),

    onSubmit: async (values) => {
      myPatchAuth(id);

      const editResult = await myPatchAuth(
        `${baseUrl}/api/answers/${id}`,
        'PATCH',
        token,
        values
      );
      if (editResult === 'Answer updated successfully') {
        toast.success('Answer was edited.');
        history.goBack();
      }
      if (editResult === 'Answer update fail') {
        toast.error('Answer edit fail');
        return;
      }
    },
  });

  return (
    <div className={css['form-container']}>
      <h3 className={css['form-title']}>Edit answer</h3>

      <form onSubmit={formik.handleSubmit} className={css['add-form']}>
        <div className={css['form-group']}>
          <label htmlFor="content">Edit content</label>
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
          Edit
        </Button>
        <NavLink to={'/questions'} className={css['nav-link']}>
          Back to questions
        </NavLink>
      </form>
    </div>
  );
}

export default EditAnswerPage;
