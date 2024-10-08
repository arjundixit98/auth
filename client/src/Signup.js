import "./Signup.css";
function Signup() {
  return (
    <div>
      <div className="signup">
        <label for="username">UserName</label>
        <input type="text" />
        <label for="password">Password</label>
        <input type="password" />
        <button>SignUp</button>
      </div>
    </div>
  );
}

export default Signup;
