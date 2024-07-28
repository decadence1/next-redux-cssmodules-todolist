import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { updateNote, fetchNoteById } from "../../../store/notesSlice";
import Layout from "../../../components/Layout";
import NoteForm from "../../../components/NoteForm";
import styles from "../../../styles/NoteForm.module.css";

const EditNote = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const note = useSelector((state) =>
    state.notes.find((note) => note.id === id)
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchNoteById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCreatedAt(note.createdAt);
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateNote({
        id,
        title,
        content,
        createdAt,
        completed: note.completed,
      })
    );
    router.push("/");
  };

  const handleClose = () => {
    router.push("/");
  };

  return (
    <Layout>
      <h1 className={styles.customHeader}>Редактировать заметку</h1>
      <NoteForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    </Layout>
  );
};

export default EditNote;
