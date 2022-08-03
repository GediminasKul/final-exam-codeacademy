import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './home.module.css';

function HomePage() {
  return (
    <div className={css['home-page-container']}>
      <h1>The place to ask questions (and receive answers, of course).</h1>
      <NavLink to={'/questions'} className={css['nav-link']}>
        Here is a list of questions!
      </NavLink>
    </div>
  );
}

export default HomePage;
