import styles from "../styles/Layout.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Layout({ children }) {
  return (
    <div className="container">
      <main className={styles.main}>{children}</main>
    </div>
  );
}
