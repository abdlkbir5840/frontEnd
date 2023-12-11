import Login from "./authentication/Login/Login";
import SignUp from "./authentication/SignUp/SignUp";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Home from "./views/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./views/Main";
import "./App.css";

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/main" element={<Main/>} />
        <Route path="/dashboard/" element={<ProtectedRoutes />}>
          <Route path="main" element={<Main/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
