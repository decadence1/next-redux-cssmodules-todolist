import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { deleteNote, toggleNoteCompleted } from "../store/notesSlice";
import styles from "../styles/NoteItem.module.css";

const NoteItem = ({ note }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      dispatch(deleteNote(note.id));
    }, 1000);
  };

  const handleToggleCompleted = () => {
    dispatch(toggleNoteCompleted(note.id));
  };

  return (
    <div
      className={`${styles.noteItem} ${
        note.completed ? styles.completed : ""
      } ${isDeleting ? styles.fadeOut : ""}`}
    >
      <div className={styles.header}>
        <input
          type="checkbox"
          checked={note.completed}
          onChange={handleToggleCompleted}
          className={styles.checkbox}
        />
        <h2>
          <Link href={`/notes/${note.id}`}>{note.title}</Link>
        </h2>
      </div>
      <p>{note.content}</p>
      <div className={styles.buttons}>
        <Link href={`/notes/${note.id}/edit`} legacyBehavior>
          <a className="btn btn-secondary">Изменить</a>
        </Link>
        <button className="btn btn-danger" onClick={handleDelete}>
          Удалить
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
