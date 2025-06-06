const SET_NOTES = 'notes/setNotes';
const SET_NOTE_DETAIL = 'notes/setNoteDetail';
const ADD_NOTE = 'notes/addNote';
const UPDATE_NOTE = 'notes/updateNote';
const REMOVE_NOTE = 'notes/removeNote';

const SET_SEARCH_NOTES = 'notes/setSearchNotes'; 
const SET_CATEGORY_NOTES = 'notes/setCategoryNotes'; 

const SET_NOTE_STATS = 'notes/setNoteStats';

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

const setSearchNotes = (notes) => ({
  type: SET_SEARCH_NOTES,
  payload: notes,
});

const setCategoryNotes = (notes) => ({
  type: SET_CATEGORY_NOTES,
  payload: notes,
});

const setNoteStats = (stats) => ({
  type: SET_NOTE_STATS,
  payload: stats,
});

export const thunkFetchNotes = () => async (dispatch) => {
  const response = await fetch("/api/notes/");
  if (response.ok) {
    const data = await response.json();
    dispatch(setNotes(data.notes));
  }
};

// 新增 按内容搜索
export const thunkSearchNotes = (query) => async (dispatch) => {
  console.log("Fetching notes with query:", query);
  const response = await fetch(`/api/notes/search?query=${query}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setSearchNotes(data.notes));
  }
};

// 新增 按类别搜索
export const thunkSearchNotesByCategory = (category) => async (dispatch) => {
  const response = await fetch(`/api/notes/category/${category}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setCategoryNotes(data.notes));
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

// 返回统计数据
export const thunkFetchNoteStats = () => async (dispatch) => {
  const response = await fetch("/api/notes/stats");
  if (response.ok) {
    const data = await response.json();
    dispatch(setNoteStats(data));
  } else {
    const errorMessages = await response.json();
    return errorMessages;
  }
};

const initialState = { 
  notes: [], 
  noteDetail: null, 
  searchNotes: [], 
  categoryNotes: [],
  noteStats: null, 
};

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
    case SET_SEARCH_NOTES:
      return { ...state, searchNotes: action.payload };
    case SET_CATEGORY_NOTES:
      return { ...state, categoryNotes: action.payload };
    case SET_NOTE_STATS: 
      return { ...state, noteStats: action.payload };
    default:
      return state;
  }
}

export default notesReducer;

