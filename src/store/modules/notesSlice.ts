import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  createNote,
  deleteNote,
  listNotes,
  updateNote,
} from "../../services/api.service";
import {
  CreateNoteType,
  DeleteNoteType,
  UpdateNoteType,
} from "../../types";

const notesAdapter = createEntityAdapter<any>({
  selectId: (note) => note._id,
});

export const listNotesAction = createAsyncThunk(
  "list/notes",
  async (userId: string) => {
    const result = await listNotes(userId);

    if (result.ok) {
      return result.data;
    }
    return [];
  }
);

export const createNoteAction = createAsyncThunk(
  "create/notes",
  async (data: CreateNoteType) => {
    const result = await createNote(data);
    console.log(result.data);

    if (result.ok) {
      return result.data;
    }
    alert(result.message);
  }
);

export const deleteNoteAction = createAsyncThunk(
  "delete/notes",
  async (path: DeleteNoteType) => {
    const result = await deleteNote(path);

    console.log(result.data);

    if (result.ok) {
      return result.data[0]._id;
    }
    alert(result.message);
  }
);

export const updateNoteAction = createAsyncThunk(
  "update/notes",
  async (data: UpdateNoteType) => {
    const result = await updateNote(data);
    let changes = {};
    console.log(result.data.note);
    if (result.ok) {
      changes = {
        _title: data.title,
        _description: data.description,
        _filed: data.filed,
      };
    }
    console.log(changes);

    return {
      id: data.noteId,
      changes,
    };
  }
);
export const { selectAll, selectById } =
  notesAdapter.getSelectors(
    (state: any) => state.notes
  );

const notesSlice = createSlice({
  name: "notes",
  initialState: notesAdapter.getInitialState(),
  reducers: {
    addOne: notesAdapter.addOne,
    updateOne: notesAdapter.updateOne,
    setAll: notesAdapter.setAll,
    removeOne: notesAdapter.removeOne,
  },
  extraReducers(builder) {
    builder.addCase(
      listNotesAction.fulfilled,
      notesAdapter.setAll
    );
    builder.addCase(
      createNoteAction.fulfilled,
      notesAdapter.addOne
    );
    builder.addCase(
      deleteNoteAction.fulfilled,
      notesAdapter.removeOne
    );
    builder.addCase(
      updateNoteAction.fulfilled,
      notesAdapter.updateOne
    );
  },
});

export const {
  addOne,
  updateOne,
  setAll,
  removeOne,
} = notesSlice.actions;
export default notesSlice.reducer;
