import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { isAuthenticated } from "../../utils/helpers";
import { CssLoader } from "../spinner/spinner";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    loginId: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(err);
  console.log(formErrors);
  console.log(formValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSaveAuth = (id, token) => {
    // logic for localStorage
    // Once logic is complete/ Navigate
    localStorage.setItem("Pebbles__Super_Admin___iD", JSON.stringify(id));
    localStorage.setItem("Pebbles__Super_Admin___toKen", JSON.stringify(token));

    const authToken = localStorage.getItem("Pebbles__Super_Admin___toKen");
    const ID = localStorage.getItem("Pebbles__Super_Admin___iD");

    if (authToken && ID !== "") {
      navigate("/");
    }
    return;
  };
  const api = process.env.REACT_APP_BASE_URL;
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const checkTextFields = validate(formValues);

    if (JSON.stringify(checkTextFields) === "{}") {
      axios
        .post(api, {
          loginId: formValues.loginId,
          password: formValues.password,
        })
        .then((response) => {
          setLoading(false);
          console.log(response);
          const authToken = response.data.data.token;
          const authID = response.data.data.userDetails._id;
          window.location.reload(true)
          handleSaveAuth(authID, authToken);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          setErr(error);
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
    if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!";
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
      {loading && <CssLoader />}
      {/* <>{err && <p className="api-error">{err}</p>}</> */}
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
      <>{formErrors.email && <p className="error">{formErrors.email}</p>}</>
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
      <>
        {formErrors.password && <p className="error">{formErrors.password}</p>}
      </>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default LoginForm;
