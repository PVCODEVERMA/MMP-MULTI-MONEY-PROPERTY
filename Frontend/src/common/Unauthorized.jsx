import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-red-600">403</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Unauthorized</h2>
        <p className="text-gray-600 mb-8">You don't have permission to access this page.</p>
        <Link to="/" className="btn-primary">
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Unauthorized;
