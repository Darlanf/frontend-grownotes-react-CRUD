import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  createNote,
  listNotes,
} from "../../services/api.service";
import { CreateNoteType } from "../../types";

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
export const { selectAll, selectById } =
  notesAdapter.getSelectors(
    (state: any) => state.notes
  );

const notesSlice = createSlice({
  name: "notes",
  initialState: notesAdapter.getInitialState(),
  reducers: {
    addOne: notesAdapter.addOne,
    addMany: notesAdapter.addMany,
    updateOne: notesAdapter.updateOne,
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
  },
});

export const { addOne, addMany, updateOne } =
  notesSlice.actions;
export default notesSlice.reducer;
