import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { isAuthenticated } from "../../utils/helpers";

const LoginForm = () => {
  const navigate = useNavigate();
  const api = process.env.REACT_APP_BASE_URL;
  const initialValues = {
    loginId: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [err, setErr] = useState("");
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  console.log(id);
  console.log(err);
  console.log(formErrors);
  console.log(formValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSaveAuth = (id, token) => {
    // Run your logic for localStorage
    // Once your logic is complete/ Navigate
    localStorage.setItem("id", JSON.stringify(id));
    localStorage.setItem("token", JSON.stringify(token));

    const authToken = localStorage.getItem("id");
    const ID = localStorage.getItem("token");

    if (authToken && ID !== "") {
      console.log("NOT EMPTY!!!");
      navigate("/");
    }
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkTextFields = validate(formValues);

    if (JSON.stringify(checkTextFields) === "{}") {
      axios
        .post(api, {
          loginId: formValues.loginId,
          password: formValues.password,
        })
        .then((response) => {
          console.log(response);
          setToken(response.data.data.token);
          setId(response.data.data.userDetails._id);
          const authToken = response.data.data.token;
          const authID = response.data.data.userDetails._id;

          handleSaveAuth(authID, authToken);
          // navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setErr(error.response.data.message);
        });
    } else {
      setFormErrors(checkTextFields);
    }
  };

  const authenticated = isAuthenticated();

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
  }, [authenticated]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.loginId) {
      errors.loginId = "LoginId is required!";
    } else if (!regex.test(values.loginId)) {
      errors.loginId = "This is not a valid format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters!";
    }
    if (values.password.length > 100000000000) {
      errors.password = "Password must not exceed 10 characters!";
    }
    return errors;
  };

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      {err && <p className="api-error">{err}</p>}
      <label htmlFor="email">Email</label>
      <input
        value={formValues.email}
        onChange={handleChange}
        name="loginId"
        id="email"
        type="email"
        placeholder="Enter your email"
        className={formErrors.email ? "input-error" : ""}
      />
      {formErrors.email && <p className="error">{formErrors.email}</p>}
      <label htmlFor="password">Password</label>
      <div className="password" style={{ color: "hsl(253, 13%, 40%)" }}>
        <input
          id="password"
          type={type}
          name="password"
          placeholder="Enter your password"
          value={formValues.password}
          onChange={handleChange}
        />
        <span onClick={handleToggle}>
          <Icon icon={icon} size={18} />
        </span>
      </div>
      {formErrors.password && <p className="error">{formErrors.password}</p>}
      <button type="submit">Sign In</button>
    </form>
  );
};

export default LoginForm;
