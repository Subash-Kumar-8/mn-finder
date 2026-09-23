import React, { useState } from 'react';
import { ToastProvider } from './hooks/useToast';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';

// Pages
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ExplorationPage } from './pages/ExplorationPage';
import { ProspectivityPage } from './pages/ProspectivityPage';
import { ProductionPage } from './pages/ProductionPage';
import { EquipmentPage } from './pages/EquipmentPage';
import { EquipmentDetailPage } from './pages/EquipmentDetailPage';
import { AlertsPage } from './pages/AlertsPage';
import { ReportsPage } from './pages/ReportsPage';
import { ModelsPage } from './pages/ModelsPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Opens Login page first
  const [currentRoute, setCurrentRoute] = useState('/dashboard');
  const [selectedEquipmentId, setSelectedEquipmentId] = useState('DRL-02');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  const navigateTo = (route) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEquipment = (eqId) => {
    setSelectedEquipmentId(eqId);
    setCurrentRoute('/equipment/detail');
  };

  return (
    <ToastProvider>
      <div className="h-screen w-screen bg-slate-50 text-slate-900 flex overflow-hidden font-sans">
        {/* Desktop Sidebar (Spans top to bottom 100%) */}
        <div className="hidden lg:block shrink-0 h-screen">
          <Sidebar
            currentRoute={currentRoute.startsWith('/equipment') ? '/equipment' : currentRoute}
            onNavigate={navigateTo}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            onSignOut={handleSignOut}
          />
        </div>

        {/* Mobile Drawer */}
        <MobileNav
          isOpen={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          currentRoute={currentRoute.startsWith('/equipment') ? '/equipment' : currentRoute}
          onNavigate={navigateTo}
          onSignOut={handleSignOut}
        />

        {/* Main Area */}
        <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
          {/* Header */}
          <Header
            currentRoute={currentRoute}
            onToggleMobileSidebar={() => setMobileNavOpen(true)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSignOut={handleSignOut}
          />


          {/* Content Page Router (Scrolls independently) */}
          <main className="flex-1 overflow-y-auto p-0">
            {currentRoute === '/dashboard' && (
              <DashboardPage onNavigate={navigateTo} />
            )}
            {currentRoute === '/exploration' && (
              <ExplorationPage onNavigate={navigateTo} />
            )}
            {currentRoute === '/prospectivity' && (
              <ProspectivityPage onNavigate={navigateTo} />
            )}
            {currentRoute === '/production' && (
              <ProductionPage onNavigate={navigateTo} />
            )}
            {currentRoute === '/equipment' && (
              <EquipmentPage onSelectEquipment={handleSelectEquipment} />
            )}
            {currentRoute === '/equipment/detail' && (
              <EquipmentDetailPage
                equipmentId={selectedEquipmentId}
                onBack={() => navigateTo('/equipment')}
              />
            )}
            {currentRoute === '/alerts' && (
              <AlertsPage onNavigate={navigateTo} />
            )}
            {currentRoute === '/reports' && (
              <ReportsPage />
            )}
            {currentRoute === '/models' && (
              <ModelsPage />
            )}
            {currentRoute === '/settings' && (
              <SettingsPage />
            )}

            {/* Footer Status Bar */}
            <footer className="bg-white border-t border-slate-200/80 px-6 py-3 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 mt-8">
              <div>
                <strong className="text-slate-700">Government of India • Ministry of Mines</strong> — Smart India Hackathon 2026 Decision Support System
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  REST API Abstraction Layer Connected
                </span>
                <span>Version 1.0.4 Prototype</span>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </ToastProvider>
  );

}
