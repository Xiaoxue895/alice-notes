import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkSearchNotesByCategory } from "../../redux/notes";
import { useParams } from "react-router-dom"; 
import { Link } from 'react-router-dom'; 
// import "./CategoryNotes.css";


function CategoryNotes() {
  const dispatch = useDispatch();
  const { category } = useParams(); 
  const notes = useSelector((state) => state.notes.categoryNotes); 
  const user = useSelector((state) => state.session.user); 

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return; 
    }
    if (category) {
      dispatch(thunkSearchNotesByCategory(category)); 
    }
  }, [dispatch, user, category]);

  return (
    <div className="category-notes">
      <h1>Notes in {category}</h1>
      {/* <h1 className="notes-count">您有 {notes.length} 个 {notes.length === 1 ? "note" : "notes"} 在 {category} 类别。</h1> */}

      {notes.length === 0 ? (
        <p className="no-notes-message">No notes found in this category.</p>
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

export default CategoryNotes;
