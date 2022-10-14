import SamplePage from "./pages/SamplePage";
import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
          <Route index element={<SamplePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
