import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';
import { DashboardOverview } from '../pages/Overview';
import { BackgroundRemoval } from '../features/background-removal/BackgroundRemoval';
import { BillingPage } from '../pages/Billing';
import { SettingsPage } from '../pages/Settings';
import { MyImages } from '../pages/MyImages';

export const DashboardRoot: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/remove-background" element={<BackgroundRemoval />} />
        <Route path="/my-images" element={<MyImages />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
}; 