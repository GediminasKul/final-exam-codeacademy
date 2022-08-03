import css from './footer.module.css';

function Footer() {
  return (
    <div className={css['footer']}>
      <p className={css['footer-text']}>
        &copy; {new Date().getFullYear()} Gediminas @ CodeAcademy Exam.
      </p>
    </div>
  );
}

export default Footer;
