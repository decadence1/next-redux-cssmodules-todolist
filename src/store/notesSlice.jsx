import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001/notes";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const fetchNoteById = createAsyncThunk(
  "notes/fetchNoteById",
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

export const addNote = createAsyncThunk("notes/addNote", async (note) => {
  const response = await axios.post(API_URL, note);
  return response.data;
});

export const updateNote = createAsyncThunk("notes/updateNote", async (note) => {
  const response = await axios.put(`${API_URL}/${note.id}`, note);
  return response.data;
});

export const deleteNote = createAsyncThunk("notes/deleteNote", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const toggleNoteCompleted = createAsyncThunk(
  "notes/toggleNoteCompleted",
  async (id) => {
    const note = await axios.get(`${API_URL}/${id}`);
    const updatedNote = { ...note.data, completed: !note.data.completed };
    await axios.put(`${API_URL}/${id}`, updatedNote);
    return updatedNote;
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchNoteById.fulfilled, (state, action) => {
        const note = action.payload;
        const index = state.findIndex((n) => n.id === note.id);
        if (index >= 0) {
          state[index] = note;
        } else {
          state.push(note);
        }
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const note = action.payload;
        const index = state.findIndex((n) => n.id === note.id);
        if (index >= 0) {
          state[index] = note;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        return state.filter((note) => note.id !== action.payload);
      })
      .addCase(toggleNoteCompleted.fulfilled, (state, action) => {
        const note = action.payload;
        const index = state.findIndex((n) => n.id === note.id);
        if (index >= 0) {
          state[index] = note;
        }
      });
  },
});

export default notesSlice.reducer;
