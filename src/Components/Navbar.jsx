import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <nav className="bg-slate-900 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
            <Link 
            to="/"
            className="text-2xl font-bold text-orange-400"
            >AI Recipe</Link>
            <div className="flex gap-6 text-white">
                <Link
                to="/"
                className="hover:text-orange-400 transition"
                >
                Home
                </Link>
                <Link
                to="/favorites"
                className="hover:text-orange-400 transition"
                >
                    Favorites
                </Link>
                <Link
                to="/history"
                className="hover:text-orange-400 transition"
                >
                    History
                </Link>
                <Link
                to="/login"
                className="hover:text-orange-400 transition"
                >
                    Login
                </Link>
            </div>
        </div>
    </nav>
  );
}
export default Navbar;