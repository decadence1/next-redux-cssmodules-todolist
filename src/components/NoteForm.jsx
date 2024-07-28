import styles from "../styles/NoteForm.module.css";

const NoteForm = ({
  title,
  setTitle,
  content,
  setContent,
  handleSubmit,
  handleClose,
}) => {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className="form-group">
        <label htmlFor="title">Название</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Подробности</label>
        <textarea
          className={`form-control ${styles.noResize}`}
          id="content"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className="d-flex justify-content-between mt-3">
        <button type="submit" className="btn btn-primary">
          Сохранить
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClose}
        >
          Закрыть
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
