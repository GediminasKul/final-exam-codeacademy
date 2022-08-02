import { useState, useEffect } from 'react';
import { useAuthCtx } from '../../store/authContext';
import { NavLink } from 'react-router-dom';
import { baseUrl, myDeleteAuth, myFetch } from '../../utils';

import css from './question.module.css';
import Card from '../../components/UI/card/card';
import toast from 'react-hot-toast';

function QuestionsPage() {
  // const { id } = useParams();
  // const history = useHistory();
  const { token } = useAuthCtx();
  const idFromToken = useAuthCtx();

  const [questions, setQuestions] = useState('');

  const getQuestions = async (values) => {
    const fetchResult = await myFetch(
      `${baseUrl}/api/questions`,
      'GET',
      values
    );

    if (Array.isArray(fetchResult)) {
      setQuestions(fetchResult);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  async function deleteQuestion(id) {
    const fetchResult = await myDeleteAuth(
      `${baseUrl}/api/questions/${id}`,
      'DELETE',
      token
    );
    if (fetchResult === 'Question successfully deleted') {
      toast.success('Question was deleted');
      getQuestions();
    }
    if (fetchResult === 'Question was not deleted') {
      toast.error('Question was not deleted');
    }
    if (!token) {
      toast.error('Only registered users can delete questions');
    }
  }

  return (
    <div className={css['cards-container']}>
      <h1 className={css['title']}>Questions Page</h1>
      <div className={css['cards-output']}>
        {!Array.isArray(questions) ? (
          <h2 className={css['loading']}>Loading...</h2>
        ) : questions.length === 0 ? (
          <div className={css['add-questions-error']}>
            <h2 className={css['questions-error']}>
              No questions found. Please add a new question.
            </h2>
            <NavLink to={'/add'} className={css['add-link']}>
              Add new question!
            </NavLink>
          </div>
        ) : (
          questions.length > 0 &&
          questions.map((qObj) => (
            <Card key={qObj.id} {...qObj} onDelete={deleteQuestion} />
          ))
        )}
      </div>
    </div>
  );
}

export default QuestionsPage;
