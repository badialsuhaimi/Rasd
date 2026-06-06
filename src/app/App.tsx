import React, { useState, useEffect } from 'react';
import { Sidebar, PageId } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/Dashboard';
import { AIInsights } from './components/AIInsights';
import { AlertManagement } from './components/AlertManagement';
import { ThreatFeed } from './components/ThreatFeed';
import { PlaceholderPage } from './components/PlaceholderPage';
import Demo from '../Demo'; 

import {
  Globe, Camera, Cpu, Siren, BarChart3, Bug, FileText, Users, Settings
} from 'lucide-react';

const PAGE_TITLES: Record<any, string> = {
  dashboard: 'لوحة التحكم الرئيسية — رصد للمراقبة الأمنية',
  'national-overview': 'النظرة الوطنية — خريطة المراقبة الشاملة',
  'threat-intelligence': 'استخبارات التهديدات — التحليل المتقدم',
  'camera-inventory': 'مخزون الكاميرات — إدارة الأصول',
  'device-management': 'إدارة الأجهزة — مركز التحكم',
  'incident-response': 'الاستجابة للحوادث — إدارة الأزمات',
  'security-analytics': 'تحليلات الأمن — المؤشرات المتقدمة',
  vulnerability: 'إدارة الثغرات الأمنية',
  reports: 'التقارير والإحصاءات',
  'ai-insights': 'رؤى الذكاء الاصطناعي — التحليل الاستباقي',
  'user-management': 'إدارة المستخدمين والصلاحيات',
  settings: 'إعدادات النظام',
  demo: 'بيئة المحاكاة الحية والاستجابة الآلية (SOAR Demo)'
};

function PageContent({ page }: { page: any }) {
  switch (page) {
    case 'dashboard': return <Dashboard />;
    case 'ai-insights': return <AIInsights />;
    case 'demo': return <Demo />;
    case 'incident-response': return <div style={{ height: '100%', overflow: 'hidden' }}><AlertManagement /></div>;
    case 'threat-intelligence': return <div style={{ height: '100%', overflow: 'hidden' }}><ThreatFeed /></div>;
    default: return <Dashboard />;
  }
}

export default function App() {
  const [activePage, setActivePage] = useState<any>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 🔔 الفكرة السحرية: إذا فتحت الرابط وبنهايته كلمة #demo سيفتح الدمو فوراً بشكل إجباري ومضمون!
  useEffect(() => {
    if (window.location.hash === '#demo') {
      setActivePage('demo');
    }
  }, []);

  return (
    <div dir="rtl" style={{ width: '100vw', height: '100vh', background: '#0B1220', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'Cairo, sans-serif', color: '#E2E8F0' }}>
      
      {/* هيدر علوي يحتوي على زر دخول مباشر وإجباري للدمو لضمان ظهوره أمام المشرفين */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0D1626', paddingLeft: '20px' }}>
        <div style={{ flex: 1 }}><TopBar pageTitle={PAGE_TITLES[activePage] || 'بيئة المحاكاة الحية والاستجابة الآلية (SOAR Demo)'} /></div>
        <button 
          onClick={() => setActivePage(activePage === 'demo' ? 'dashboard' : 'demo')}
          style={{
            padding: '10px 20px',
            background: activePage === 'demo' ? '#ef4444' : '#10b981',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)',
            zIndex: 9999
          }}
        >
          {activePage === 'demo' ? '🔙 العودة للوحة التحكم' : '🎮 تشغيل الـ Live Demo (SOAR)'}
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <main style={{ flex: 1, minWidth: 0, padding: '16px', overflowY: 'auto', position: 'relative' }}>
          <PageContent page={activePage} />
        </main>
        <Sidebar activePage={activePage} onNavigate={setActivePage} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      </div>
    </div>
  );
}
