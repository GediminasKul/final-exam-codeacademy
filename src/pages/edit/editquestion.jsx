import { useFormik } from 'formik';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useAuthCtx } from '../../';
import { baseUrl, myPatchAuth } from '../../utils';
import css from './editquestion.module.css';
import Button from '../../components/UI/button/button';
import { useEffect, useState } from 'react';

function EditQuestionPage() {
  const title = localStorage.getItem('title');
  const content = localStorage.getItem('content');

  const [updatedTitleAndAnswer, setUpdatedTitleAndAnswer] = useState({
    title,
    content,
  });

  // const initValues = {
  //   title: title,
  //   content: content,
  // };

  useEffect(() => {
    setUpdatedTitleAndAnswer({ title, content });
  }, [title, content]);

  const history = useHistory();
  const { token } = useAuthCtx();
  const { id } = useParams();

  if (!token) {
    toast.error('To view this content you must be logged in');
    history.push('/login');
  }

  const formik = useFormik({
    initialValues: updatedTitleAndAnswer,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, 'At least 5 characters')
        .max(255, 'Maximum title length reached')
        .required(),
      content: Yup.string()
        .min(5, 'At least 5 characters')
        .max(500, 'Maximum content length reached')
        .required(),
    }),

    onSubmit: async (values) => {
      myPatchAuth(id);
      // const valueCopy = { ...values };

      const editResult = await myPatchAuth(
        `${baseUrl}/api/questions/${id}`,
        'PATCH',
        token,
        values
      );

      if (editResult === 'Question successfully edited') {
        toast.success('Question was edited.');
        history.replace('/questions');
      }
      console.log('addResult ===', editResult);
      if (editResult === 'Question was not edited') {
        toast.error('Question edit fail');
        return;
      }
    },
  });

  return (
    <div className={css['form-container']}>
      <h3 className={css['form-title']}>Edit a question</h3>

      <form onSubmit={formik.handleSubmit} className={css['add-form']}>
        <div className={css['form-group']}>
          <label htmlFor="title">Edit title</label>
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

export default EditQuestionPage;
