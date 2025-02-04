import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Counter } from "./components/Counter";
import { UserDataForm } from "./components/UserDataForm";
import { RichTextEditor } from "./components/RichTextEditor";
import { Dashboard } from "./components/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/user-form" element={<UserDataForm />} />
        <Route path="/editor" element={<RichTextEditor />} />
      </Routes>
    </Router>
  );
};

export default App;
