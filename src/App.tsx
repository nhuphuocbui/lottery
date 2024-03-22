import React from 'react';
import './App.css';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import { Routes, Route } from 'react-router-dom'
import Content from './pages/Content';
import AuditTrial from './pages/content/AuditTrial';
import AuditForm from './pages/content/AuditForm';
import Dashboard from './pages/content/Dashboard';
import Monitoring from './pages/content/Monitoring';
import AuditManagerForm from './pages/content/AuditManagerForm';
import AuditeeConfirm from './pages/AuditeeConfirm';
import ManagerConfirm from './pages/ManagerConfirm';
import UserInfor from './pages/UserInfor';
import LotteryAdd from './pages/content/LotteryAdd';
import LotteryDashboard from './pages/content/LotteryDashboard';
function App() {
  return (
    <>
      {/* <LoginPage /> */}
      <Header />
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/content" element={<Content />}>
              <Route index element={<Dashboard />} />
              <Route path="lottery_add" element={<LotteryAdd />} />
              <Route path="lottery_summary" element={<LotteryDashboard />} />
              <Route path="monitoring" element={<Monitoring />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="audit_form" element={<AuditForm />} />
              <Route path="audit_manager_form" element={<AuditManagerForm />} />
              <Route path="audit_trial" element={<AuditTrial />} />
        </Route>
        <Route path="/users" element={<UserInfor />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<Content />} />
      </Routes>
    </>
  );
}

export default App;
