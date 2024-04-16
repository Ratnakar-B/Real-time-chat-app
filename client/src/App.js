import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./components/Profile";

import ChatRoom from "./components/ChatRoom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>

      <ChatRoom />
    </div>
  );
}

export default App;
