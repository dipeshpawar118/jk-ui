import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import PrivateLayout from "./layout/PrivateLayout";
import NotFound from "./page/NotFound";
import Header from "./layout/Header";
import CreatePost from "./page/CreatePost";
import ViewPost from "./page/ViewPost";
import HomePage from "./page/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<PrivateLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create-post" element={<CreatePost />} />
          </Route>
          <Route path="/view/:id" element={<ViewPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
