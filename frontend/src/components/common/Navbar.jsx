import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "../../utils/axios";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
    } catch (err) {
      console.error("Logout request failed:", err.response?.data || err.message);
    }
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50 border-b">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Mindful Journal
      </Link>

      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`md:flex items-center gap-4 space-y-4 md:space-y-0 md:space-x-4 absolute md:static top-16 left-0 w-full md:w-auto bg-white px-6 md:px-0 py-4 md:py-0 z-40 transition-all duration-300 ${menuOpen ? "block" : "hidden"}`}>
        <Link to="/" className="block text-gray-700 hover:text-blue-600 transition">Home</Link>
        <Link to="/about" className="block text-gray-700 hover:text-blue-600 transition">About</Link>
        <Link to="/faq" className="block text-gray-700 hover:text-blue-600 transition">FAQ</Link>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-blue-700 font-medium hover:underline"
            >
              Hello, {user?.name || "User"}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-md z-50">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setDropdownOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="block text-gray-700 hover:text-blue-600 transition">Login</Link>
            <Link to="/signup" className="block text-gray-700 hover:text-blue-600 transition">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
