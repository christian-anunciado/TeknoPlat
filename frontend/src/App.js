import SamplePage from "./pages/SamplePage";
import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { useEffect } from 'react'
import { useState } from 'react'
import Login from "./pages/LoginPage/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddSession from "./pages/AddSession/AddSession";
import Session from "./pages/JoinSession/Session";
import JoinSession from "./pages/JoinSession/JoinSession";
import InSession from "./pages/JoinSession/InSession";
// import "./style/style.scss";
import Navbar from "./components/Navbar/Navbar";
function App() {
    const [name, setName] = useState("")

    useEffect(() => {
        (
            async () => {
                const user = await fetch('http://localhost:8000/api/authUser', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });
                const loggedUser = await user.json()
                setName(loggedUser.username)
            }
        )();
    },[])
    
  return (
    <Router>
      <Routes>

        {/* NOTE KAY MGA GWAPO MAN TA 
            // ineg test sa sites, dapat naay '#' before backslash sa url tungods sa HashRouter
            Sample:
              instead of http://localhost:3000/login, http://localhost:3000/#/login


        */}
        <Route path="/">
          <Route index element={<SamplePage/>} />
          <Route path="dashboard" element={<Dashboard name={name}/>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="add_session" element={<AddSession />}/>
          <Route path="session" element={<Session />} />
          <Route path="joinsession/:id" element={<JoinSession />} />
          <Route path="insession/:id" element={<InSession />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
