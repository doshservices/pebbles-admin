import "../style/login.css";
import LoginForm from "../components/loginForm/form";
import loginv2 from "../assets/login-v2.svg";

const Login = () => {
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
