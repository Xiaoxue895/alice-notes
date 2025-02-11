import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkCreateNote } from "../../redux/notes";
import "./CreateNote.css";

function CreateNote() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title,
      content,
      image_url: imageUrl,
      link,
    };

    const response = await dispatch(thunkCreateNote(newNote));

    if (response && response.id) {
      navigate(`/notes/${response.id}`);
    } else {
      console.error("Error creating note:", response);
    }
  };

  return (
    <div className="create-note-container">
      <h1 className="create-note-title">Create New Note</h1>
      <form onSubmit={handleSubmit} className="create-note-form">
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
        <button type="submit" className="submit-button">Create Note</button>
      </form>
    </div>
  );
}

export default CreateNote;



