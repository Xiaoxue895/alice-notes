import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="signup-form-modal">
      <h1 className="signup-title">Sign Up</h1>
      {errors.server && <p className="signup-error">{errors.server}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <label className="signup-label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input"
          />
        </label>
        {errors.email && <p className="signup-error">{errors.email}</p>}
        <label className="signup-label">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="signup-input"
          />
        </label>
        {errors.username && <p className="signup-error">{errors.username}</p>}
        <label className="signup-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-input"
          />
        </label>
        {errors.password && <p className="signup-error">{errors.password}</p>}
        <label className="signup-label">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="signup-input"
          />
        </label>
        {errors.confirmPassword && <p className="signup-error">{errors.confirmPassword}</p>}
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;

