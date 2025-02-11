import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";

import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate("/");
    }
  };

  const loginAsDemoUser = async () => {
    const demoUser = {
      email: "demo@aa.io",
      password: "password",
    };

    const serverResponse = await dispatch(thunkLogin(demoUser));

    if (!serverResponse) {
      closeModal();
      navigate("/");
    } else {
      setErrors(serverResponse);
    }
  };

  return (
    <div className="login-form-modal">
      <h1 className="login-title">Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label className="login-label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
        </label>
        {errors.email && <p className="login-error">{errors.email}</p>}
        <label className="login-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </label>
        {errors.password && <p className="login-error">{errors.password}</p>}
        <button type="submit" className="login-button">Log In</button>
        <button type="button" onClick={loginAsDemoUser} className="demo-button">
          Log in as Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;

