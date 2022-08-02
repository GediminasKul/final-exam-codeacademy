import css from './footer.module.css';

function Footer() {
  return (
    <div className={css['footer']}>
      <p className={css['footer-text']}>
        &copy; {new Date().getFullYear()} All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
