import SamplePage from "./pages/SamplePage";
import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Session from "./pages/Session";
import JoinSession from "./pages/JoinSession";
import InSession from "./pages/InSession";

function App() {
  return (
    <Router>
      <Routes>

        {/* NOTE KAY MGA GWAPO MAN TA 
            // ineg test sa sites, dapat naay '#' before backslash sa url tungods sa HashRouter
            Sample:
              instead of http://localhost:3000/login, http://localhost:3000/#/login


        */}
        <Route path="/">
          <Route index element={< SamplePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="session" element={<Session />} />
          <Route path="joinsession/:id" element={<JoinSession />} />
          <Route path="insession/:id" element={<InSession />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
