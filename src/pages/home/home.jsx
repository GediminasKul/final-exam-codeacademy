import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './home.module.css';

function HomePage() {
  return (
    <div className={css['home-page-container']}>
      <h1>Welcome, to the forum.</h1>
      <p>Here you can ask and answer question related to programming.</p>
      <NavLink to={'/questions'} className={css['nav-link']}>
        View questions.
      </NavLink>
    </div>
  );
}

export default HomePage;
