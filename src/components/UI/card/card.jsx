import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useAuthCtx } from '../../../store/authContext';
import Button from '../button/button';
import css from './card.module.css';

function Card(props) {
  const userId = useAuthCtx();
  const { isUserLoggedIn } = useAuthCtx();
  // const [counterValue, setCounterValue] = useState(0);
  // const [edited, setEdited] = useState(false);

  // const [questions, setQuestions] = useState([]);
  // const [question, setQuestion] = useState('');
  // const [editingQuestion, setEditingQuestion] = useState(null);
  // const [editingText, setEditingText] = useState('');

  // function handleCounterInc() {
  //   setCounterValue((prevState) => prevState + 1);
  // }

  // function handleCounterDec() {
  //   setCounterValue((prevState) => prevState - 1);
  // }

  function handleValues() {
    localStorage.setItem('title', props.title);
    localStorage.setItem('content', props.content);
  }

  return (
    <div className={css['card-container']}>
      <div className={css['card']}>
        <h2 className={css['title']}>{props.title}</h2>
        <h3 className={css['content']}>{props.content}</h3>

        <NavLink to={`/${props.id}/answers/&title=${props.title}`}>
          <p>click to see answers</p>
        </NavLink>

        {/* <div className={css['like-dislike']}>
          <div className={css['like-container']}>
            <span className={css['arrow-up']}>
              <button className={css['like-button']} onClick={handleCounterInc}>
                <Icon icon='fa-arrow-circle-o-up' />
              </button>
              <p>Like</p>
            </span>
          </div>
          <p className={css['counter-value']}>{counterValue}</p>
          <div className={css['dislike-container']}>
            <span className={css['arrow-down']}>
              <button className={css['dislike-button']} onClick={handleCounterDec}>
                <Icon icon='fa-arrow-circle-o-down' />
              </button>
              <p>Dislike</p>
            </span>
          </div>
        </div> */}

        <article className={css['created-edited-deleted']}>
          <div>
            <p className={css['created']}>
              <i>Created at:</i>
              {props.created_at.split('T').join(' ').split('.000Z')}
            </p>

            <p className={css['edited']}>
              {props.edited_at && (
                <i>
                  Edited at:
                  {props.edited_at?.split('T').join(' ').split('.000Z')}{' '}
                </i>
              )}
            </p>
          </div>

          <div className={css['delete-edit']}>
            {+userId.userId == props.user_id && isUserLoggedIn && (
              <Button button secondary onClick={() => props.onDelete(props.id)}>
                Delete
              </Button>
            )}

            <NavLink
              to={`/editQuestion/${props.id}/&title=${props.title}&content=${props.content}`}
            >
              {+userId.userId === props.user_id && isUserLoggedIn && (
                <Button button primary onClick={handleValues}>
                  Edit
                </Button>
              )}
            </NavLink>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Card;
