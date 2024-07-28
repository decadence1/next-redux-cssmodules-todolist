import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../store/notesSlice";
import Layout from "../components/Layout";
import NoteList from "../components/NoteList";
import FilterSort from "../components/FilterSort";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import styles from "../styles/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  return (
    <Layout>
      <div className={styles.header}>
        <Link href="/notes/new" legacyBehavior>
          <a className={`btn btn-primary ${styles.addNoteButton}`}>+</a>
        </Link>
        <div className={styles.datePickerContainer}>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            customInput={
              <CustomInput value={format(selectedDate, "dd.MM.yyyy")} />
            }
            dateFormat="dd.MM.yyyy"
          />
        </div>
      </div>
      <FilterSort notes={notes} setFilteredNotes={setFilteredNotes} />
      <NoteList notes={filteredNotes} />
    </Layout>
  );
}

const CustomInput = ({ value, onClick }) => (
  <button
    className={`btn btn-secondary ${styles.datePickerButton}`}
    onClick={onClick}
  >
    {value}
  </button>
);

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3001/notes");
  const notes = await response.json();

  return {
    props: {
      initialNotes: notes,
    },
  };
}
