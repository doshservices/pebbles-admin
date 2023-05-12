import "../style/login.css";
import LoginForm from "../components/loginForm/form";
import loginv2 from "../assets/login-v2.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/helpers";

const Login = () => {

  const navigate = useNavigate()
  const authenticated = isAuthenticated();

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
  }, [authenticated]);
  return (
    <>
      <section className="login">
        <figure>
          <img src={loginv2} alt="pebbles" />
        </figure>
        <div>
          <h2>Welcome to Pebbles! 👋</h2>
          <p>Please sign-in to your account and start the adventure</p>
          <LoginForm />
        </div>
      </section>
    </>
  );
};

export default Login;
