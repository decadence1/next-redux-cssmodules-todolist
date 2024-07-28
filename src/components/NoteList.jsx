import styles from "../styles/NoteList.module.css";
import NoteItem from "./NoteItem";

const NoteList = ({ notes }) => {
  return (
    <div className={styles.noteListContainer}>
      {notes.length === 0 ? (
        <div className={styles.noNotesContainer}>
          <p className={styles.noNotes}>Чем будем сегодня заниматься?</p>
        </div>
      ) : (
        notes.map((note) => <NoteItem key={note.id} note={note} />)
      )}
    </div>
  );
};

export default NoteList;
