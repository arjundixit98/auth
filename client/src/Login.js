import { Link } from "react-router-dom";
import "./Login.css";
function Login() {
  return (
    <div>
      <div className="login">
        <label for="username">UserName</label>
        <input type="text" />
        <label for="password">Password</label>
        <input type="password" />
        <button>Login</button>
        <Link to="/signup">Register here</Link>
      </div>
    </div>
  );
}

export default Login;
