import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute"

//Components or Pages Here
import Login from "./pages/LoginPage/Login";
import Register from "./pages/Registration/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddSession from "./pages/AddSession/AddSession";
import SessionRoom from "./pages/Session/SessionRoom";
import JoinSession from "./pages/JoinSession/JoinSession";
import Profile from "./pages/Profile/Profile";
import AverageSession from "./pages/Rating/AverageSession";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style/flexboxgrid.min.css";
import './style/index.css';
import "./style/dark.scss";
import LandingPage from "./pages/LandingPage";
import { DarkModeContext } from "./context/darkModeContext";
import { useContext } from "react";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>

      <Router>
        <Routes>
          {/* NOTE KAY MGA GWAPO MAN TA 
            // ineg test sa sites, dapat naay '#' before backslash sa url tungods sa HashRouter
            Sample:
              instead of http://localhost:3000/login, http://localhost:3000/#/login
        */}
          <Route path="/">
            <Route index element={<LandingPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="add_session" element={<AddSession />} />
              <Route path="session/:id" element={<SessionRoom />} />
              <Route path="average_session" element={<AverageSession />} />
              <Route path="joinsession/:id" element={<JoinSession />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
