
import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  HomeIcon
} from "@heroicons/react/24/outline";

const RouterErrorBoundary = () => {
  const error = useRouteError();
  
  console.error('Router Error:', error);

  let errorMessage = "An unexpected error occurred";
  let errorStatus = "Error";
  
  if (isRouteErrorResponse(error)) {
    errorStatus = `${error.status} ${error.statusText}`;
    errorMessage = error.data?.message || error.statusText || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full bg-white rounded-lg shadow-xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {errorStatus}
        </h1>
        
        <p className="text-gray-600 mb-8">
          {errorMessage}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleGoBack}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Go Back
          </button>
          
          <button
            onClick={handleGoHome}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Home
          </button>
        </div>

        {/* Development error details */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              View Error Details (Development)
            </summary>
            <pre className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 whitespace-pre-wrap">
              {JSON.stringify(error, null, 2)}
            </pre>
          </details>
        )}
      </motion.div>
    </div>
  );
};

export default RouterErrorBoundary;
