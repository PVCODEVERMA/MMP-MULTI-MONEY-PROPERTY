
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  WrenchScrewdriverIcon,
  ServerIcon,
  CircleStackIcon,
  CloudIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  PlayIcon,
  StopIcon
} from "@heroicons/react/24/outline";

const PlatformMaintenance = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    database: { status: 'healthy', uptime: '99.9%', lastCheck: '2 minutes ago' },
    api: { status: 'healthy', uptime: '99.8%', lastCheck: '1 minute ago' },
    storage: { status: 'warning', uptime: '98.5%', lastCheck: '5 minutes ago' },
    email: { status: 'healthy', uptime: '99.7%', lastCheck: '3 minutes ago' },
    cdn: { status: 'healthy', uptime: '99.9%', lastCheck: '1 minute ago' }
  });

  const [maintenanceTasks, setMaintenanceTasks] = useState([
    {
      id: 1,
      title: "Database Optimization",
      description: "Optimize database indexes and clean up old data",
      status: "completed",
      scheduledTime: "2024-08-28 02:00",
      duration: "2 hours",
      priority: "high"
    },
    {
      id: 2,
      title: "Security Updates",
      description: "Apply latest security patches to all servers",
      status: "scheduled",
      scheduledTime: "2024-08-30 03:00",
      duration: "1 hour",
      priority: "critical"
    },
    {
      id: 3,
      title: "Storage Cleanup",
      description: "Clean up temporary files and old backups",
      status: "in_progress",
      scheduledTime: "2024-08-29 01:00",
      duration: "30 minutes",
      priority: "medium"
    }
  ]);

  const systemServices = [
    { name: "Database", icon: CircleStackIcon, status: systemStatus.database },
    { name: "API Services", icon: ServerIcon, status: systemStatus.api },
    { name: "File Storage", icon: CloudIcon, status: systemStatus.storage },
    { name: "Email Service", icon: ShieldCheckIcon, status: systemStatus.email },
    { name: "CDN", icon: CloudIcon, status: systemStatus.cdn }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const classes = {
      healthy: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTaskStatusBadge = (status) => {
    const classes = {
      completed: "bg-green-100 text-green-800",
      scheduled: "bg-blue-100 text-blue-800",
      in_progress: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes[status]}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const classes = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      critical: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes[priority]}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  const handleMaintenanceToggle = () => {
    setMaintenanceMode(!maintenanceMode);
    // Here you would typically make an API call to toggle maintenance mode
  };

  const handleRunTask = (taskId) => {
    setMaintenanceTasks(tasks =>
      tasks.map(task =>
        task.id === taskId ? { ...task, status: 'in_progress' } : task
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Platform Maintenance</h1>
            <p className="text-gray-600">Monitor system health and manage maintenance tasks</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-3">Maintenance Mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={handleMaintenanceToggle}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        {maintenanceMode && (
          <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-orange-500 mr-2" />
              <span className="text-orange-800 font-medium">
                Maintenance mode is ACTIVE. The platform is currently unavailable to users.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* System Status Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemServices.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <service.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{service.name}</div>
                  <div className="text-sm text-gray-500">Uptime: {service.status.uptime}</div>
                </div>
              </div>
              <div className="text-right">
                {getStatusIcon(service.status.status)}
                <div className="text-xs text-gray-500 mt-1">{service.status.lastCheck}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Maintenance Tasks */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Maintenance Tasks</h3>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Schedule New Task
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {maintenanceTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                      <div className="text-sm text-gray-500">{task.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{task.scheduledTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{task.duration}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(task.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTaskStatusBadge(task.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {task.status === 'scheduled' && (
                        <button
                          onClick={() => handleRunTask(task.id)}
                          className="p-1 text-green-600 hover:text-green-800"
                          title="Run Now"
                        >
                          <PlayIcon className="h-5 w-5" />
                        </button>
                      )}
                      {task.status === 'in_progress' && (
                        <button className="p-1 text-red-600 hover:text-red-800" title="Stop">
                          <StopIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
          <DatabaseIcon className="h-8 w-8 mx-auto mb-2" />
          <div className="font-medium">Database Backup</div>
        </button>
        <button className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
          <ServerIcon className="h-8 w-8 mx-auto mb-2" />
          <div className="font-medium">System Health Check</div>
        </button>
        <button className="p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
          <CloudIcon className="h-8 w-8 mx-auto mb-2" />
          <div className="font-medium">Clear Cache</div>
        </button>
        <button className="p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
          <WrenchScrewdriverIcon className="h-8 w-8 mx-auto mb-2" />
          <div className="font-medium">Run Diagnostics</div>
        </button>
      </div>
    </div>
  );
};

export default PlatformMaintenance;
