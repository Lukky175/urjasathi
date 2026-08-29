import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import Home from "./pages/Home/Home";
import FAQ from "./pages/FAQ/FAQ";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";

function App() {
return ( <BrowserRouter> <div className="flex min-h-screen flex-col bg-app-bg text-text"> <Navbar />

    <main className="flex-1">
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/home" replace />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/faq"
          element={<FAQ />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<div>Dashboard</div>}
        />

        <Route
          path="/dashboard/overview"
          element={<div>Dashboard Overview</div>}
        />

        <Route
          path="/dashboard/analytics"
          element={<div>Dashboard Analytics</div>}
        />

        <Route
          path="*"
          element={<Navigate to="/home" replace />}
        />
      </Routes>
    </main>

    <Footer />
  </div>
</BrowserRouter>


);
}

export default App;
