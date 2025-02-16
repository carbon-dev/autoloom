import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';
import { DashboardOverview } from '../pages/Overview';
import { BackgroundRemoval } from '../features/background-removal/BackgroundRemoval';
import { BillingPage } from '../pages/Billing';
import { Settings } from '../pages/Settings';

export const DashboardRoot: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/remove-background" element={<BackgroundRemoval />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
}; 