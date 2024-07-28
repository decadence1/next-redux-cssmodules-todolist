import React from "react";
import styles from "../styles/FilterSort.module.css";

const FilterSort = ({ notes, setFilteredNotes }) => {
  const handleFilter = (status) => {
    if (status === "all") {
      setFilteredNotes(notes);
    } else if (status === "completed") {
      setFilteredNotes(notes.filter((note) => note.completed));
    } else {
      setFilteredNotes(notes.filter((note) => !note.completed));
    }
  };

  return (
    <div className={styles.filterSortContainer}>
      <button
        className={`${styles.filterButton} ${styles.allButton}`}
        onClick={() => handleFilter("all")}
      >
        Все
      </button>
      <button
        className={`${styles.filterButton} ${styles.completedButton}`}
        onClick={() => handleFilter("completed")}
      >
        Завершенные
      </button>
      <button
        className={`${styles.filterButton} ${styles.inProgressButton}`}
        onClick={() => handleFilter("inProgress")}
      >
        Активные
      </button>
    </div>
  );
};

export default FilterSort;
