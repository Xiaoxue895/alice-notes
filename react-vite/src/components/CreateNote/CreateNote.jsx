import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkCreateNote } from "../../redux/notes";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CreateNote.css";

function CreateNote() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("学习");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title,
      content,
      image_url: imageUrl,
      link,
      category,
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
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="form-input"
          >
            <option value="学习">学习</option>
            <option value="工作">工作</option>
            <option value="生活">生活</option>
            <option value="其他">其他</option>
          </select>
        </label>
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
          <ReactQuill 
            value={content}
            onChange={setContent}  
            required
            className="form-textarea"
            modules={{
              toolbar: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline'],
                [{ 'align': [] }],
                ['link'],
                ['image']
              ],
            }}
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



