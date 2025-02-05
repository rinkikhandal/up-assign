import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Counter } from "./components/Counter";
import { UserDataForm } from "./components/UserDataForm";
import { RichTextEditor } from "./components/RichTextEditor";
import { Dashboard } from "./components/Dashboard";
import { AuthContextProvider } from "./Context/AuthContext";
import { Navbar } from "./components/Navbar";
import { PrivateRoutes } from "./GoogleSignIn/PrivateRoutes";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Protected Routes */}
          <Route
            path="/counter"
            element={
              <PrivateRoutes>
                <Counter />
              </PrivateRoutes>
            }
          />
          <Route
            path="/user-form"
            element={
              <PrivateRoutes>
                <UserDataForm />
              </PrivateRoutes>
            }
          />
          <Route
            path="/editor"
            element={
              <PrivateRoutes>
                <RichTextEditor />
              </PrivateRoutes>
            }
          />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
