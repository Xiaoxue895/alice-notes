import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchNoteDetail, thunkUpdateNote } from "../../redux/notes";
import { useParams, useNavigate } from "react-router-dom";
import "./NoteDetail.css";

function NoteDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const note = useSelector((state) => state.notes.noteDetail);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [isEditing, setIsEditing] = useState(false); 

  useEffect(() => {
    dispatch(thunkFetchNoteDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setImageUrl(note.image_url || "");
      setLink(note.link || "");
    }
  }, [note]);

  const handleDelete = async () => {
    const response = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });

    if (response) {
      navigate("/");
    } else {
      const errorMessages = await response.json();
      console.error(errorMessages);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedNote = {
      title,
      content,
      image_url: imageUrl,
      link,
    };

    const response = await dispatch(thunkUpdateNote(id, updatedNote));

    if (response && response.id) {
      dispatch(thunkFetchNoteDetail(id));
      setIsEditing(false);
    } else {
      const errorMessages = await response.json();
      console.error(errorMessages);
    }
  };

  if (!note) {
    return <p>Loading...</p>;
  }

  return (
    <div className="note-detail-container">
      <h1 className="note-title">{note.title}</h1>
      <p className="note-content">{note.content}</p>
      {note.image_url && <img src={note.image_url} alt="Note Image" className="note-image" />}
      {note.link && (
        <a href={note.link} target="_blank" rel="noopener noreferrer" className="note-link">
          Visit Link
        </a>
      )}

      {!isEditing && (
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          Update Note
        </button>
      )}

      {isEditing && (
        <form onSubmit={handleUpdate} className="note-update-form">
          <label className="form-label">
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-input"
            />
          </label>
          <label className="form-label">
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="form-textarea"
            />
          </label>
          <label className="form-label">
            Image URL:
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Link:
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="form-input"
            />
          </label>
          <button type="submit" className="submit-button">
            Save Changes
          </button>
        </form>
      )}

      <button onClick={handleDelete} className="delete-button">
        Delete Note
      </button>
    </div>
  );
}

export default NoteDetail;



