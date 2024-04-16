import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let emailRef = useRef();
  let passwordRef = useRef();

  let navigate = useNavigate();

  useEffect(() => {
    emailRef.current.value = localStorage.getItem("email");
    passwordRef.current.value = localStorage.getItem("password");
    // tokenValidation();
  });

  let sendLoginDatatoServer = async () => {
    let dataToSend = new FormData();

    dataToSend.append("email", emailRef.current.value);
    dataToSend.append("password", passwordRef.current.value);

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:3333/loginData", reqOptions);

    let JSOData = await JSONData.json();

    if (JSOData.status == "success") {
      // localStorage.setItem("email", emailInputRef.current.value);
      // localStorage.setItem("password", passwordInputRef.current.value);
      localStorage.setItem("token", JSOData.token);
      navigate("/home", { state: JSOData });
    } else {
      alert("Something went wrong");
    }
    console.log(JSOData);
  };

  //Token Validation//

  let tokenValidation = async () => {
    let dataToSend = new FormData();

    dataToSend.append("token".localStorage.getItem("token"));

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:3333/loginData", reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
  };
  return (
    <div className="login-container">
      <div>
        <h2 style={{ textAlign: "center", fontSize: "30px" }}>
          Well done is better than well said.
        </h2>
        <img
          className="brandPic"
          src="https://play-lh.googleusercontent.com/9pKDjjkhw4BOXQks2R7ubpIlv4TR5JjuqbVcVolLX2ylYa6QHWNrKGQyvyZvtimC4Stu"
          alt=""
        ></img>

        <h2>Login Now.</h2>
      </div>
      <form className="form-container">
        <h1>Login</h1>

        <div>
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter Your Email"
          ></input>
        </div>
        <div>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter Your Password"
          ></input>
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              sendLoginDatatoServer();
            }}
          >
            Login
          </button>
        </div>
        <div>
          <p>
            Don't have an account
            <Link className="loginLink" to="/signup">
              Signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
