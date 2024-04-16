import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Profile() {
  let firstNameRef = useRef();
  let lastNameRef = useRef();
  let mobileNumberRef = useRef();
  let emailRef = useRef();
  let passwordRef = useRef();
  let profilePicRef = useRef();
  let loc = useLocation();
  console.log(loc);

  useEffect(() => {
    firstNameRef.current.value = loc.state.firstName;
    lastNameRef.current.value = loc.state.lastName;
    mobileNumberRef.current.value = loc.state.mobileNumber;
    emailRef.current.value = loc.state.email;
    passwordRef.current.value = loc.state.password;
    // setProfilePic(`http://localhost:3333/${loc.state.profilePic}`);
    console.log("UseEffect is Calling");
  });

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
      method: "PATCH",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:3333/updateData", reqOptions);

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
      </div>
      <form className="form-container">
        <h1>User Profile</h1>
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
            Profile Update
          </button>
        </div>
        <div>
          <p>
            <Link className="loginLink" to="/Home">
              Back to Home
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Profile;
