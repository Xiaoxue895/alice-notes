import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchNotes } from "../../redux/notes";
import { Link, useNavigate } from "react-router-dom"; 
import "./NotesList.css";
import SearchBar from "./SearchBar";

function NotesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notes = useSelector((state) => state.notes.notes);
  const user = useSelector((state) => state.session.user); 

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return; 
    }
    dispatch(thunkFetchNotes());
  }, [dispatch, user, navigate]);

  return (
    <div className="notes-list">
      <SearchBar />
      {/* <h1>Your Notes</h1> */}
      <h1 className="notes-count">You have {notes.length} {notes.length === 1 ? "note" : "notes"}</h1>

      <Link to="/notes/create">
        <button className="create-note-button">Create New Note</button>
      </Link>

      {notes.length === 0 ? (
        <p className="no-notes-message">You have no notes. Start creating one!</p>
      ) : (
        <ul className="notes-list-items">
          {notes.map((note) => (
            <li key={note.id} className="note-item">
              <Link to={`/notes/${note.id}`} className="note-link">
                <h2 className="note-title">{note.title}</h2>
                <p className="note-preview">{note.content.slice(0, 20).replace(/<[^>]+>/g, '')}...</p>

              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotesList;

