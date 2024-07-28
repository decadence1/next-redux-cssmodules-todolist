import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../components/Layout";
import NoteForm from "../../components/NoteForm";
import styles from "../../styles/NoteForm.module.css";

const NewNote = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newNote = {
      title,
      content,
      createdAt: new Date().toISOString(),
      completed: false,
    };
    await axios.post("http://localhost:3001/notes", newNote);

    router.push("/");
  };

  const handleClose = () => {
    router.push("/");
  };

  return (
    <Layout>
      <h1 className={styles.customHeader}>Создать заметку</h1>
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

export default NewNote;
