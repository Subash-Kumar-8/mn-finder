import React, { useState } from 'react';
import { Button } from '../components/common/Button';
import { User, Bell, Map, Monitor, Server, ShieldCheck, Check } from 'lucide-react';
import { useToast } from '../hooks/useToast';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const { addToast } = useToast();

  const handleSave = () => {
    addToast({ title: 'Settings Saved', message: 'System configuration updated successfully.', type: 'success' });
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">System Settings</h2>
        <p className="text-xs text-slate-500 mt-1">
          Configure platform preferences, geospatial basemaps, notification parameters, and system credentials.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col md:flex-row">
        {/* Settings Navigation Tabs */}
        <div className="w-full md:w-64 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-3 space-y-1 text-xs">
          {[
            { id: 'profile', label: 'User Profile', icon: User },
            { id: 'notifications', label: 'AI Alert Thresholds', icon: Bell },
            { id: 'map', label: 'Map & GIS Preferences', icon: Map },
            { id: 'display', label: 'Display & Layout', icon: Monitor },
            { id: 'system', label: 'System Information', icon: Server }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                  isActive
                    ? 'bg-[#0b2545] text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="flex-1 p-6 space-y-6 text-xs text-slate-700">
          {activeTab === 'profile' && (
            <div className="space-y-4 max-w-lg">
              <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">User Profile</h3>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue="Arvind Kumar"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Official Email</label>
                <input
                  type="email"
                  defaultValue="demo.geologist@gov.in"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Role / Designation</label>
                <input
                  type="text"
                  defaultValue="Senior Geologist (GSI AI Exploration Cell)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4 max-w-lg">
              <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">AI Alert Thresholds</h3>
              <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div>
                  <span className="font-bold text-slate-900">Production Shortfall Alerts</span>
                  <p className="text-[11px] text-slate-500">Trigger alert when shortfall probability exceeds 70%</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div>
                  <span className="font-bold text-slate-900">Equipment Imminent Failure Warnings</span>
                  <p className="text-[11px] text-slate-500">Trigger notification when telemetry health drops below 65%</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
              </label>
            </div>
          )}

          {activeTab === 'map' && (
            <div className="space-y-4 max-w-lg">
              <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">GIS Map Preferences</h3>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Default Basemap Provider</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800">
                  <option>Sentinel-2 Multispectral Imagery</option>
                  <option>Esri World Topographic Basemap</option>
                  <option>OpenStreetMap Standard Tile Provider</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'display' && (
            <div className="space-y-4 max-w-lg">
              <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">Display Settings</h3>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Theme Color Mode</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800">
                  <option>Government Deep Navy Light Mode (Recommended)</option>
                  <option>GIS High-Contrast Dark Mode</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-4 max-w-lg">
              <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">System Information</h3>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Platform Version</span>
                  <span className="font-bold text-slate-900">SIH 2026 v1.0.4 Prototype</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service API Layer</span>
                  <span className="font-mono text-slate-900">Express REST Mock Service Layer</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">GIS Engine</span>
                  <span className="font-mono text-slate-900">Leaflet / Custom Vector Engine</span>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100">
            <Button variant="primary" icon={Check} onClick={handleSave}>
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
