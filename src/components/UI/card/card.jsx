import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useAuthCtx } from '../../../store/authContext';
import Button from '../button/button';
import css from './card.module.css';

function Card(props) {
  // const [answers, setAnswers] = useState('');
  const userId = useAuthCtx();
  const { isUserLoggedIn } = useAuthCtx();

  function handleValues() {
    localStorage.setItem('title', props.title);
    localStorage.setItem('content', props.content);
  }

  return (
    <div className={css['card-container']}>
      <div className={css['card']}>
        {/* <h3 className={css['count-answers']}>Total answers: {props.answers}</h3> */}
        <h2 className={css['title']}>{props.title}</h2>
        <h3 className={css['content']}>{props.content}</h3>

        <NavLink onClick={handleValues} to={`/${props.id}/answers`}>
          <p>click to see answers</p>
        </NavLink>

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

            <NavLink to={`/editQuestion/${props.id}`}>
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
