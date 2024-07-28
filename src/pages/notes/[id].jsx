import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import styles from "../../styles/NoteDetail.module.css";
import axios from "axios";

const NoteDetail = ({ note }) => {
  const router = useRouter();

  if (!note) {
    return (
      <Layout>
        <div className={styles.noteDetail}>
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  const handleBack = () => {
    router.push("/");
  };

  return (
    <Layout>
      <div className={styles.noteDetail}>
        <h1>{note.title}</h1>
        <p>{note.content}</p>
        <p>Статус: {note.completed ? "Completed" : "In progress"}</p>
        <p>
          Задача создана:{" "}
          {note.createdAt
            ? new Date(note.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Unknown"}
        </p>
        <button className="btn btn-secondary" onClick={handleBack}>
          Закрыть
        </button>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const response = await axios.get("http://localhost:3001/notes");
  const notes = response.data;

  const paths = notes.map((note) => ({
    params: { id: note.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const response = await axios.get(`http://localhost:3001/notes/${params.id}`);
  const note = response.data;

  return {
    props: {
      note: note || null,
    },
  };
}

export default NoteDetail;
