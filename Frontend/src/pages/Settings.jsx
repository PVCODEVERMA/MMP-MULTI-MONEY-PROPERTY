import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeftIcon,
  Cog6ToothIcon,
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  LanguageIcon,
  MoonIcon,
  SunIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckIcon,
  XMarkIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";

const Settings = () => {
  // State for various settings
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      whatsapp: true,
      sms: false,
      lowBalance: true,
      newLeads: true,
      leadUpdates: true
    },
    privacy: {
      profileVisible: true,
      showContact: true,
      searchIndexing: true
    },
    preferences: {
      language: "english",
      theme: "light",
      leadsPerPage: 20,
      autoRefresh: true
    },
    billing: {
      plan: "premium",
      autoRenew: true,
      billingCycle: "monthly"
    }
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("notifications");
  const [saveStatus, setSaveStatus] = useState(""); // '', 'saving', 'saved', 'error'

  const handleNotificationChange = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handlePrivacyChange = (key) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key]
      }
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleBillingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      billing: {
        ...prev.billing,
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    setSaveStatus('saving');
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
    }, 1000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Handle password change logic here
    toast.success("Password change functionality would be implemented here");
  };

  const handleExportData = () => {
    // Handle data export logic
    toast.success("Data export functionality would be implemented here");
  };

  const handleDeleteAccount = () => {
    // Handle account deletion logic
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast.success("Account deletion functionality would be implemented here");
    }
  };

  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center px-4 py-3 rounded-lg transition-colors w-full text-left ${activeTab === id ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </button>
  );

  const ToggleSwitch = ({ checked, onChange, id }) => (
    <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        id={id}
        checked={checked} 
        onChange={onChange} 
        className="sr-only" 
      />
      <div className={`w-11 h-6 rounded-full ${checked ? 'bg-blue-600' : 'bg-gray-300'} transition-colors`}></div>
      <div className={`absolute left-0.5 top-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform ${checked ? 'transform translate-x-5' : ''}`}></div>
    </label>
  );

  return (
    <>
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-blue-700 text-white py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-blue-100 hover:text-white">
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold flex items-center">
              <Cog6ToothIcon className="w-6 h-6 mr-2" />
              Settings
            </h1>
          </div>
          <button
            onClick={handleSaveSettings}
            disabled={saveStatus === 'saving'}
            className="flex items-center bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {saveStatus === 'saving' ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Saving...
              </>
            ) : saveStatus === 'saved' ? (
              <>
                <CheckIcon className="w-5 h-5 mr-1" />
                Saved
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-4 sticky top-24">
              <h2 className="font-semibold text-gray-500 text-xs uppercase tracking-wide mb-3 px-2">Settings</h2>
              <div className="space-y-1">
                <TabButton id="notifications" icon={BellIcon} label="Notifications" />
                <TabButton id="privacy" icon={ShieldCheckIcon} label="Privacy & Security" />
                <TabButton id="preferences" icon={Cog6ToothIcon} label="Preferences" />
                <TabButton id="billing" icon={CreditCardIcon} label="Billing & Plans" />
                <TabButton id="appearance" icon={MoonIcon} label="Appearance" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <BellIcon className="w-6 h-6 mr-2 text-blue-600" />
                  Notification Settings
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Notification Channels</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive important updates via email</p>
                        </div>
                        <ToggleSwitch 
                          checked={settings.notifications.email} 
                          onChange={() => handleNotificationChange('email')}
                          id="email-notifications"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">WhatsApp Notifications</p>
                          <p className="text-sm text-gray-500">Get instant alerts on WhatsApp</p>
                        </div>
                        <ToggleSwitch 
                          checked={settings.notifications.whatsapp} 
                          onChange={() => handleNotificationChange('whatsapp')}
                          id="whatsapp-notifications"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-gray-500">Receive text message alerts</p>
                        </div>
                        <ToggleSwitch 
                          checked={settings.notifications.sms} 
                          onChange={() => handleNotificationChange('sms')}
                          id="sms-notifications"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Notification Types</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Low Balance Alerts</p>
                          <p className="text-sm text-gray-500">Get notified when your wallet balance is low</p>
                        </div>
                        <ToggleSwitch 
                          checked={settings.notifications.lowBalance} 
                          onChange={() => handleNotificationChange('lowBalance')}
                          id="low-balance-notifications"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">New Lead Alerts</p>
                          <p className="text-sm text-gray-500">Get notified when you receive new leads</p>
                        </div>
                        <ToggleSwitch 
                          checked={settings.notifications.newLeads} 
                          onChange={() => handleNotificationChange('newLeads')}
                          id="new-leads-notifications"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Lead Status Updates</p>
                          <p className="text-sm text-gray-500">Get updates when lead status changes</p>
                        </div>
                        <ToggleSwitch 
                          checked={settings.notifications.leadUpdates} 
                          onChange={() => handleNotificationChange('leadUpdates')}
                          id="lead-updates-notifications"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy & Security Settings */}
            {activeTab === "privacy" && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <ShieldCheckIcon className="w-6 h-6 mr-2 text-blue-600" />
                  Privacy & Security
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Privacy Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Profile Visibility</p>
                          <p className="text-sm text-gray-500">Allow other brokers to see your profile</p>
                        </div>
                        <ToggleSwitch 
                          checked={settings.privacy.profileVisible} 
                          onChange={() => handlePrivacyChange('profileVisible')}
                          id="profile-visibility"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Show Contact Information</p>
                          <p className="text-sm text-gray-500">Display your contact details to others</p>
                        </div>
                        <ToggleSwitch 
                          checked={settings.privacy.showContact} 
                          onChange={() => handlePrivacyChange('showContact')}
                          id="show-contact"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Search Engine Indexing</p>
                          <p className="text-sm text-gray-500">Allow search engines to index your profile</p>
                        </div>
                        <ToggleSwitch 
                          checked={settings.privacy.searchIndexing} 
                          onChange={() => handlePrivacyChange('searchIndexing')}
                          id="search-indexing"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Change Password</h3>
                    <form onSubmit={handlePasswordChange} className="bg-gray-50 p-4 rounded-lg space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >
                            {showCurrentPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >
                            {showNewPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >
                            {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Update Password
                      </button>
                    </form>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-red-700 mb-3">Danger Zone</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium text-red-800">Export Your Data</p>
                          <p className="text-sm text-red-600">Download a copy of all your data</p>
                        </div>
                        <button
                          onClick={handleExportData}
                          className="px-3 py-1 bg-white border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors"
                        >
                          Export Data
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium text-red-800">Delete Account</p>
                          <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                        </div>
                        <button
                          onClick={handleDeleteAccount}
                          className="flex items-center px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                          <TrashIcon className="w-4 h-4 mr-1" />
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Settings */}
            {activeTab === "preferences" && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <Cog6ToothIcon className="w-6 h-6 mr-2 text-blue-600" />
                  Preferences
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Language & Region</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select
                        value={settings.preferences.language}
                        onChange={(e) => handlePreferenceChange('language', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                        <option value="marathi">Marathi</option>
                        <option value="gujarati">Gujarati</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Leads Management</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Leads Per Page</p>
                          <p className="text-sm text-gray-500">Number of leads to show on each page</p>
                        </div>
                        <select
                          value={settings.preferences.leadsPerPage}
                          onChange={(e) => handlePreferenceChange('leadsPerPage', parseInt(e.target.value))}
                          className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Auto-Refresh Leads</p>
                          <p className="text-sm text-gray-500">Automatically refresh leads list every 5 minutes</p>
                        </div>
                        <ToggleSwitch 
                          checked={settings.preferences.autoRefresh} 
                          onChange={() => handlePreferenceChange('autoRefresh', !settings.preferences.autoRefresh)}
                          id="auto-refresh"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Billing & Plans Settings */}
            {activeTab === "billing" && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <CreditCardIcon className="w-6 h-6 mr-2 text-blue-600" />
                  Billing & Plans
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Current Plan</h3>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-blue-800">Premium Broker Plan</p>
                          <p className="text-sm text-blue-600">60 leads per month • ₹4,999/month</p>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Active</span>
                      </div>
                      <div className="mt-4 bg-blue-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <p className="text-sm text-blue-600 mt-2">45 of 60 leads used this month</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Billing Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Auto-Renewal</p>
                          <p className="text-sm text-gray-500">Automatically renew your plan</p>
                        </div>
                        <ToggleSwitch 
                          checked={settings.billing.autoRenew} 
                          onChange={() => handleBillingChange('autoRenew', !settings.billing.autoRenew)}
                          id="auto-renew"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Billing Cycle</p>
                          <p className="text-sm text-gray-500">How often you want to be billed</p>
                        </div>
                        <select
                          value={settings.billing.billingCycle}
                          onChange={(e) => handleBillingChange('billingCycle', e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly (Save 10%)</option>
                          <option value="yearly">Yearly (Save 20%)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Payment Methods</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between p-3 bg-white rounded border">
                        <div className="flex items-center">
                          <div className="w-10 h-6 bg-gray-200 rounded mr-3"></div>
                          <div>
                            <p className="font-medium">Visa ending in 4567</p>
                            <p className="text-sm text-gray-500">Expires 12/2024</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Edit
                        </button>
                      </div>
                      <button className="mt-4 flex items-center text-blue-600 hover:text-blue-800">
                        <span className="text-lg mr-1">+</span> Add Payment Method
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Billing History</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between p-3 bg-white rounded border mb-2">
                        <div>
                          <p className="font-medium">Premium Plan - October 2023</p>
                          <p className="text-sm text-gray-500">October 1, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹4,999.00</p>
                          <p className="text-sm text-green-600">Paid</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded border">
                        <div>
                          <p className="font-medium">Premium Plan - September 2023</p>
                          <p className="text-sm text-gray-500">September 1, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹4,999.00</p>
                          <p className="text-sm text-green-600">Paid</p>
                        </div>
                      </div>
                      <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View All Billing History
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <MoonIcon className="w-6 h-6 mr-2 text-blue-600" />
                  Appearance
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Theme</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div 
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${settings.preferences.theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => handlePreferenceChange('theme', 'light')}
                      >
                        <div className="flex items-center mb-2">
                          <div className={`w-4 h-4 rounded-full border mr-2 ${settings.preferences.theme === 'light' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}></div>
                          <span className="font-medium">Light Mode</span>
                        </div>
                        <div className="bg-white rounded p-2 border border-gray-200 h-20 flex items-center justify-center">
                          <SunIcon className="w-8 h-8 text-yellow-500" />
                        </div>
                      </div>
                      
                      <div 
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${settings.preferences.theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => handlePreferenceChange('theme', 'dark')}
                      >
                        <div className="flex items-center mb-2">
                          <div className={`w-4 h-4 rounded-full border mr-2 ${settings.preferences.theme === 'dark' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}></div>
                          <span className="font-medium">Dark Mode</span>
                        </div>
                        <div className="bg-gray-800 rounded p-2 border border-gray-700 h-20 flex items-center justify-center">
                          <MoonIcon className="w-8 h-8 text-blue-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Font Size</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Small</span>
                        <span className="text-sm">Default</span>
                        <span className="text-sm">Large</span>
                        <span className="text-sm">X-Large</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="3" 
                        defaultValue="1" 
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Density</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:border-blue-300 transition-colors">
                        <div className="space-y-1 mb-2 mx-auto w-16">
                          <div className="h-1 bg-gray-300 rounded"></div>
                          <div className="h-1 bg-gray-300 rounded"></div>
                          <div className="h-1 bg-gray-300 rounded"></div>
                        </div>
                        <p className="font-medium">Compact</p>
                        <p className="text-sm text-gray-500">More content visible</p>
                      </div>
                      
                      <div className="border border-blue-500 rounded-lg p-4 text-center cursor-pointer bg-blue-50">
                        <div className="space-y-2 mb-2 mx-auto w-16">
                          <div className="h-2 bg-blue-500 rounded"></div>
                          <div className="h-2 bg-blue-500 rounded"></div>
                          <div className="h-2 bg-blue-500 rounded"></div>
                        </div>
                        <p className="font-medium">Default</p>
                        <p className="text-sm text-gray-500">Balanced spacing</p>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:border-blue-300 transition-colors">
                        <div className="space-y-3 mb-2 mx-auto w-16">
                          <div className="h-3 bg-gray-300 rounded"></div>
                          <div className="h-3 bg-gray-300 rounded"></div>
                          <div className="h-3 bg-gray-300 rounded"></div>
                        </div>
                        <p className="font-medium">Comfortable</p>
                        <p className="text-sm text-gray-500">More spacing</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    <Toaster
  position="top-center"
  reverseOrder={false}
/>
  </>
  );
};

export default Settings;