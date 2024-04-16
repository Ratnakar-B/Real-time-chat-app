import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { useState, useEffect } from "react";

function Home({ username }) {
  let loc = useLocation();
  console.log(loc);

  let navigate = useNavigate();

  let deleteAccount = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", loc.state.data.email);
    let reqOptions = {
      method: "DELETE",
      body: dataToSend,
    };

    let JSONData = await fetch(
      "http://localhost:3333/deleteProfile",
      reqOptions
    );

    let JSOData = await JSONData.json();

    if (JSOData.status == "success") {
      alert(JSOData.msg);
      localStorage.clear();
      navigate("/");
    } else {
      alert("Something went wrong");
    }
    console.log(JSOData);
  };

  return (
    <div>
      <Nav fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link className="navBar-tab" href="/Home">
            <Link className="navBar-tab" to="/Home">
              Home
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="navBar-tab">
            <button
              className="navBar-tab"
              type="button"
              onClick={() => {
                navigate("/Profile", { state: loc.state.data });
              }}
            >
              User Profile
            </button>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="navBar-tab" eventKey="link-2">
            <Link to="/">
              <button
                className="navBar-tab"
                type="button"
                onClick={() => {
                  deleteAccount();
                }}
              >
                deleteAccount
              </button>
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="navBar-tab" href="/Home">
            <Link className="navBar-tab" to="/">
              Logout
            </Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Home;
