import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

const BrokerFooter = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [supportStatus, setSupportStatus] = useState('online');

  // Update time every second and check support status
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate support status (in real app, this would be an API call)
      const hour = new Date().getHours();
      const isOnline = hour >= 9 && hour < 21; // 9 AM to 9 PM
      setSupportStatus(isOnline ? 'online' : 'offline');
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <footer className="fixed bottom-0 w-[96%] bg-white border-t border-gray-200">
      {/* Emergency Contact Strip */}
      <div className="bg-[#154056] text-white px-6 py-1">
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="w-3 h-3 mr-2" />
            <span>24/7 Emergency Support: +91-98765 432101</span>
          </div>
          <div className="flex items-center space-x-4 mt-1 sm:mt-0">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                supportStatus === 'online' ? 'bg-[#ff9c00] animate-pulse' : 'bg-[#ff9c00]'
              }`}></div>
              <span>Support: {supportStatus === 'online' ? 'Online' : 'Offline'}</span>
            </div>
            
            <span>Time: {formatTime(currentTime)}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BrokerFooter;