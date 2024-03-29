import axios from "axios";
import { eye } from "react-icons-kit/feather/eye";
import { Icon } from "react-icons-kit";
import { toast } from 'react-toastify';
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { useState } from "react";
import { CssLoader } from "../spinner/spinner";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSaveAuth = (id, token, authname, role) => {
    // logic for localStorage
    // Once logic is complete/ Navigate

    const authToken = localStorage.getItem("pstk");
    const ID = localStorage.getItem("psid");

    if (role === "SUPER-ADMIN") {
      localStorage.setItem("psid", JSON.stringify(id));
      localStorage.setItem("pstk", JSON.stringify(token));
      localStorage.setItem("user-name", JSON.stringify(authname))
      localStorage.setItem("role", JSON.stringify(role))
    }

    if (authToken && ID !== "") {
      navigate("/");
    }
    return;
  };

  const api = process.env.REACT_APP_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const checkTextFields = validate(formValues);

    if (JSON.stringify(checkTextFields) === "{}") {
      axios
        .post(`${api}/api/users/login`, {
          loginId: formValues.loginId,
          password: formValues.password,
        })
        .then((response) => {
          setLoading(false);
          // console.log(response);
          if (response.data.data.userDetails.role !== "SUPER-ADMIN") {
            toast.error("You have to be a Super Admin to login!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } if (response.data.data.userDetails.role === "SUPER-ADMIN") {
            toast.success("Login Successful", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            window.location.reload(true)
          }
          const authToken = response.data.data.token;
          const authID = response.data.data.userDetails._id;
          const authName = response.data.data.userDetails.firstName;
          const role = response.data.data.userDetails.role;
          handleSaveAuth(authID, authToken, authName, role);
        })
        .catch((error) => {
          setLoading(false);
          // console.log(error);
          setErr(error.message);
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    } else {
      setFormErrors(checkTextFields);
    }
  };

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
      <label htmlFor="email">Email</label>
      <input
        value={formValues.email}
        onChange={handleChange}
        name="loginId"
        id="email"
        type="email"
        placeholder="Enter your email"
        className={formErrors.email ? "input-error mail" : "mail"}
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
          autoComplete='on'
        />
        <span onClick={handleToggle}>
          <Icon icon={icon} size={18} />
        </span>
      </div>
      <button disabled={formErrors === ""} type="submit">Sign In</button>
    </form>
  );
};

export default LoginForm;
