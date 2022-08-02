import AddForm from '../../components/addForm/addForm';

import css from './addquestion.module.css';

function AddQuestion() {
  return (
    <div className={css['questions-container']}>
      <AddForm />
    </div>
  );
}

export default AddQuestion;
