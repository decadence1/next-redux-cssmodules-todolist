import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>MyNotes</h1>
      <a>©</a>
    </header>
  );
};

export default Header;
