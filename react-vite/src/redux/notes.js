const SET_NOTES = 'notes/setNotes';
const SET_NOTE_DETAIL = 'notes/setNoteDetail';
const ADD_NOTE = 'notes/addNote';
const UPDATE_NOTE = 'notes/updateNote';
const REMOVE_NOTE = 'notes/removeNote';

const setNotes = (notes) => ({
  type: SET_NOTES,
  payload: notes,
});

const setNoteDetail = (note) => ({
  type: SET_NOTE_DETAIL,
  payload: note,
});

const addNote = (note) => ({
  type: ADD_NOTE,
  payload: note,
});

const updateNote = (note) => ({
  type: UPDATE_NOTE,
  payload: note,
});

const removeNote = (noteId) => ({
  type: REMOVE_NOTE,
  payload: noteId,
});

export const thunkFetchNotes = () => async (dispatch) => {
  const response = await fetch("/api/notes/");
  if (response.ok) {
    const data = await response.json();
    dispatch(setNotes(data.notes));
  }
};

export const thunkFetchNoteDetail = (id) => async (dispatch) => {
  const response = await fetch(`/api/notes/${id}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setNoteDetail(data));
  } else {
    const errorMessages = await response.json();
    return errorMessages;
  }
};

export const thunkCreateNote = (noteData) => async (dispatch) => {
  const response = await fetch("/api/notes/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addNote(data));
    return data; 
  } else {
    const errorMessages = await response.json();
    return errorMessages;
  }
};

export const thunkUpdateNote = (id, noteData) => async (dispatch) => {
  const response = await fetch(`/api/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateNote(data));
    return data;
  } else {
    const errorMessages = await response.json();
    return errorMessages;
  }
};

export const thunkDeleteNote = (id) => async (dispatch) => {
  const response = await fetch(`/api/notes/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeNote(id));
  } else {
    const errorMessages = await response.json();
    return errorMessages;
  }
};

const initialState = { notes: [], noteDetail: null };

function notesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NOTES:
      return { ...state, notes: action.payload };
    case SET_NOTE_DETAIL:
      return { ...state, noteDetail: action.payload };
    case ADD_NOTE:
      return { ...state, notes: [...state.notes, action.payload] };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case REMOVE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    default:
      return state;
  }
}

export default notesReducer;

