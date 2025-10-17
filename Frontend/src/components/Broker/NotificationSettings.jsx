import React, { useState, useEffect } from 'react';
import {
  BellIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    email: {
      newLeads: true,
      leadUpdates: true,
      followupReminders: false,
      paymentNotifications: true,
      systemUpdates: true,
    },
    push: {
      newLeads: true,
      leadUpdates: false,
      followupReminders: true,
      paymentNotifications: true,
      systemUpdates: false,
    },
    sms: {
      urgentLeads: true,
      appointmentReminders: true,
      paymentAlerts: false,
    },
    preferences: {
      quietHours: false,
      quietStart: '22:00',
      quietEnd: '08:00',
      weeklyDigest: true,
      marketingEmails: false,
    }
  });
  
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleToggle = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const handleTimeChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [setting]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('saving');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('notificationSettings', JSON.stringify(settings));
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const getStatusText = () => {
    switch (saveStatus) {
      case 'saving': return 'Saving changes...';
      case 'success': return 'Settings saved successfully!';
      case 'error': return 'Failed to save settings. Please try again.';
      default: return '';
    }
  };

  const NotificationSection = ({ title, icon: Icon, description, children }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Icon className="h-6 w-6 text-[#ff9c00]" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );

  const ToggleItem = ({ label, description, checked, onChange, category, setting }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex-1">
        <label htmlFor={setting} className="font-medium text-gray-900 cursor-pointer">
          {label}
        </label>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(category, setting)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          checked ? 'bg-[#ff9c00]' : 'bg-gray-200'
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BellIcon className="h-8 w-8 text-blue-600" />
            Notification Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage how you receive notifications and alerts
          </p>
        </div>

        {/* Save Status */}
        {saveStatus && (
          <div className={`mb-6 p-4 rounded-lg ${
            saveStatus === 'success' ? 'bg-green-50 text-green-800' :
            saveStatus === 'error' ? 'bg-red-50 text-red-800' :
            'bg-blue-50 text-blue-800'
          }`}>
            {getStatusText()}
          </div>
        )}

        {/* Email Notifications */}
        <NotificationSection
          title="Email Notifications"
          icon={EnvelopeIcon}
          description="Receive important updates and alerts via email"
        >
          <div className="space-y-1">
            <ToggleItem
              label="New Leads"
              description="Get notified when new leads are assigned to you"
              checked={settings.email.newLeads}
              onChange={handleToggle}
              category="email"
              setting="newLeads"
            />
            <ToggleItem
              label="Lead Status Updates"
              description="Updates when lead status changes"
              checked={settings.email.leadUpdates}
              onChange={handleToggle}
              category="email"
              setting="leadUpdates"
            />
            <ToggleItem
              label="Follow-up Reminders"
              description="Reminders for scheduled follow-ups"
              checked={settings.email.followupReminders}
              onChange={handleToggle}
              category="email"
              setting="followupReminders"
            />
            <ToggleItem
              label="Payment Notifications"
              description="Alerts for payments and transactions"
              checked={settings.email.paymentNotifications}
              onChange={handleToggle}
              category="email"
              setting="paymentNotifications"
            />
            <ToggleItem
              label="System Updates"
              description="Important platform updates and announcements"
              checked={settings.email.systemUpdates}
              onChange={handleToggle}
              category="email"
              setting="systemUpdates"
            />
          </div>
        </NotificationSection>

        {/* Push Notifications */}
        <NotificationSection
          title="Push Notifications"
          icon={DevicePhoneMobileIcon}
          description="Instant alerts on your device"
        >
          <div className="space-y-1">
            <ToggleItem
              label="New Leads"
              description="Instant alerts for new lead assignments"
              checked={settings.push.newLeads}
              onChange={handleToggle}
              category="push"
              setting="newLeads"
            />
            <ToggleItem
              label="Lead Updates"
              description="Real-time updates on lead activities"
              checked={settings.push.leadUpdates}
              onChange={handleToggle}
              category="push"
              setting="leadUpdates"
            />
            <ToggleItem
              label="Follow-up Reminders"
              description="Push reminders for upcoming follow-ups"
              checked={settings.push.followupReminders}
              onChange={handleToggle}
              category="push"
              setting="followupReminders"
            />
            <ToggleItem
              label="Payment Alerts"
              description="Instant payment confirmation alerts"
              checked={settings.push.paymentNotifications}
              onChange={handleToggle}
              category="push"
              setting="paymentNotifications"
            />
            <ToggleItem
              label="System Alerts"
              description="Important system notifications"
              checked={settings.push.systemUpdates}
              onChange={handleToggle}
              category="push"
              setting="systemUpdates"
            />
          </div>
        </NotificationSection>

        {/* SMS Notifications */}
        <NotificationSection
          title="SMS Notifications"
          icon={ChatBubbleLeftRightIcon}
          description="Text message alerts for critical updates"
        >
          <div className="space-y-1">
            <ToggleItem
              label="Urgent Leads"
              description="SMS alerts for high-priority leads"
              checked={settings.sms.urgentLeads}
              onChange={handleToggle}
              category="sms"
              setting="urgentLeads"
            />
            <ToggleItem
              label="Appointment Reminders"
              description="SMS reminders for site visits and meetings"
              checked={settings.sms.appointmentReminders}
              onChange={handleToggle}
              category="sms"
              setting="appointmentReminders"
            />
            <ToggleItem
              label="Payment Alerts"
              description="SMS for payment receipts and due dates"
              checked={settings.sms.paymentAlerts}
              onChange={handleToggle}
              category="sms"
              setting="paymentAlerts"
            />
          </div>
        </NotificationSection>

        {/* Preferences */}
        <NotificationSection
          title="Preferences"
          icon={ShieldCheckIcon}
          description="Customize your notification experience"
        >
          <div className="space-y-1">
            <div className="flex items-center justify-between py-4 border-b border-gray-100">
              <div className="flex-1">
                <label className="font-medium text-gray-900">Quiet Hours</label>
                <p className="text-sm text-gray-600 mt-1">
                  Do not disturb during specified hours
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.preferences.quietHours}
                onClick={() => handleToggle('preferences', 'quietHours')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  settings.preferences.quietHours ? 'bg-[#ff9c00]' : 'bg-gray-200'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.preferences.quietHours ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {settings.preferences.quietHours && (
              <div className="flex items-center gap-4 py-4 border-b border-gray-100">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quiet Hours Period
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={settings.preferences.quietStart}
                      onChange={(e) => handleTimeChange('quietStart', e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="time"
                      value={settings.preferences.quietEnd}
                      onChange={(e) => handleTimeChange('quietEnd', e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            <ToggleItem
              label="Weekly Digest"
              description="Receive a weekly summary of your activities"
              checked={settings.preferences.weeklyDigest}
              onChange={handleToggle}
              category="preferences"
              setting="weeklyDigest"
            />
            <ToggleItem
              label="Marketing Emails"
              description="Receive tips, updates, and promotional content"
              checked={settings.preferences.marketingEmails}
              onChange={handleToggle}
              category="preferences"
              setting="marketingEmails"
            />
          </div>
        </NotificationSection>

        {/* Save Button */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-[#ff9c00] text-white rounded-lg hover:bg-[#154056] focus:ring-2 focus:ring-white focus:ring-offset-2 disabled:opacity-50 cursor-pointer transition-colors"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Notification Tips */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 mt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <BellIcon className="h-5 w-5" />
            Notification Tips
          </h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>Enable push notifications for time-sensitive alerts like new leads</li>
            <li>Use quiet hours to avoid disturbances during personal time</li>
            <li>SMS notifications are recommended for critical appointment reminders</li>
            <li>Weekly digest helps you stay informed without constant interruptions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;