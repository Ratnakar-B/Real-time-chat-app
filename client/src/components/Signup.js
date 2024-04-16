import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  let firstNameRef = useRef();
  let lastNameRef = useRef();
  let mobileNumberRef = useRef();
  let emailRef = useRef();
  let passwordRef = useRef();
  let profilePicRef = useRef();

  let [profile, setProfile] = useState(
    "https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
  );

  let sendDatatoServer = async () => {
    let dataToSend = new FormData();

    dataToSend.append("fn", firstNameRef.current.value);
    dataToSend.append("ln", lastNameRef.current.value);
    dataToSend.append("mobileNumber", mobileNumberRef.current.value);
    dataToSend.append("email", emailRef.current.value);
    dataToSend.append("password", passwordRef.current.value);

    for (let i = 0; i < profilePicRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicRef.current.files[i]);
    }
    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:3333/sendData", reqOptions);

    let JSOData = await JSONData.json();

    if (JSOData.status == "success") {
      alert(JSOData.msg);
    } else {
      alert("Something went wrong");
    }
    console.log(JSOData);
  };
  return (
    <div className="signup-container">
      <div>
        <h2 style={{ textAlign: "center", fontSize: "30px" }}>
          Well done is better than well said.
        </h2>
        <img
          className="brandPic"
          src="https://play-lh.googleusercontent.com/9pKDjjkhw4BOXQks2R7ubpIlv4TR5JjuqbVcVolLX2ylYa6QHWNrKGQyvyZvtimC4Stu"
          alt=""
        ></img>

        <h2>Register Now!.</h2>
      </div>
      <form className="form-container">
        <h1>SignUp</h1>
        <div>
          <input
            ref={firstNameRef}
            type="text"
            placeholder="Enter Your First Name"
          ></input>
        </div>
        <div>
          <input
            ref={lastNameRef}
            type="text"
            placeholder="Enter Your Last Name"
          ></input>
        </div>
        <div>
          <img className="pic" src={profile} alt="profilePic"></img>
          <input
            className="fileInput"
            ref={profilePicRef}
            type="file"
            onChange={() => {
              let imageURLPath = URL.createObjectURL(
                profilePicRef.current.files[0]
              );
              setProfile(imageURLPath);
            }}
          ></input>
        </div>
        <div>
          <input
            ref={mobileNumberRef}
            type="text"
            placeholder="+91- Enter Your Mobile Number"
          ></input>
        </div>
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
              sendDatatoServer();
            }}
          >
            Submit
          </button>
        </div>
        <div>
          <p>
            Already have an account?
            <Link className="loginLink" to="/">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
