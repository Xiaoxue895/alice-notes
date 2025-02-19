import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate} from "react-router-dom"; 
// import "./SearchResult.css";

function SearchResult() {

  const notes = useSelector((state) => state.notes.searchNotes); 


  return (
    <div className="search-result">
      {/* <h1>Search Results</h1> */}
      <h1 className="notes-count">You have {notes.length} {notes.length === 1 ? "note" : "notes"}</h1>

      {notes.length === 0 ? (
        <p className="no-notes-message">No notes found. Try another search!</p>
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

export default SearchResult;
