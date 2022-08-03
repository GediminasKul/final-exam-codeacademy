import { useState, useEffect } from 'react';
import { useAuthCtx } from '../../store/authContext';
import { NavLink } from 'react-router-dom';
import { baseUrl, myDeleteAuth, myFetch } from '../../utils';
import Button from '../../components/UI/button/button';
import css from './question.module.css';
import Card from '../../components/UI/card/card';
import toast from 'react-hot-toast';

function QuestionsPage() {
  const { token } = useAuthCtx();
  const [questions, setQuestions] = useState('');
  // const [answers, setAnswers] = useState('');
  const getQuestions = async (values) => {
    const fetchResult = await myFetch(
      `${baseUrl}/api/questions`,
      'GET',
      values
    );
    if (Array.isArray(fetchResult)) {
      setQuestions(fetchResult);
      // setAnswers(fetchResult);
    }
  };

  const getQuestionsAsc = async () => {
    const fetchResult = await myFetch(`${baseUrl}/api/questionsASC`);
    if (Array.isArray(fetchResult)) {
      setQuestions(fetchResult);
      // setAnswers(fetchResult);
    }
  };
  const getQuestionsDesc = async () => {
    const fetchResult = await myFetch(`${baseUrl}/api/questionsDESC`);
    if (Array.isArray(fetchResult)) {
      setQuestions(fetchResult);
      // setAnswers(fetchResult);
    }
  };

  // dar neveikia
  // const getQuestionByAnswersAsc = async () => {
  //   const fetchResult = await myFetch(`${baseUrl}/api/answersASC`);
  //   if (Array.isArray(fetchResult)) {
  //     setQuestions(fetchResult);
  //   }
  // };

  // dar neveikia
  // const getQuestionByAnswersDesc = async () => {
  //   const fetchResult = await myFetch(`${baseUrl}/api/answersDESC`);
  //   if (Array.isArray(fetchResult)) {
  //     setQuestions(fetchResult);
  //   }
  // };

  useEffect(() => {
    getQuestions();
  }, []);

  // useEffect(() => {
  //   getQuestionsAsc();
  // }, []);

  // useEffect(() => {
  //   getQuestionsDesc();
  // }, []);

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
      <div className={css['sort-questions']}>
        {questions.length > 1 && (
          <>
            <Button
              button
              primary
              className={css['asc-button']}
              onClick={getQuestionsAsc}
            >
              Sort Ascending
            </Button>
            <Button
              button
              primary
              className={css['desc-button']}
              onClick={getQuestionsDesc}
            >
              Sort Descending
            </Button>
          </>
        )}
      </div>
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
