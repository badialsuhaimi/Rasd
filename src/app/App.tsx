import React, { useState } from 'react';
import { Sidebar, PageId } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/Dashboard';
import { AIInsights } from './components/AIInsights';
import { AlertManagement } from './components/AlertManagement';
import { ThreatFeed } from './components/ThreatFeed';
import { PlaceholderPage } from './components/PlaceholderPage';
// 1️⃣ استيراد مكون الـ Demo التفاعلي الجديد بمساره الصحيح
import Demo from '../Demo'; 

import {
  Globe, Camera, Cpu, Siren, BarChart3, Bug, FileText, Users, Settings
} from 'lucide-react';

// 2️⃣ إضافة معرف صفحة الـ Demo إلى العناوين الرئيسية ليظهر في شريط الـ TopBar
const PAGE_TITLES: Record<PageId, string> = {
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
  // تم ربط العنوان هنا للـ Demo 🎮
  demo: 'بيئة المحاكاة الحية والاستجابة الآلية (SOAR Demo)' 
};

function PageContent({ page }: { page: PageId }) {
  switch (page) {
    case 'dashboard':
      return <Dashboard />;
    case 'ai-insights':
      return <AIInsights />;
    case 'incident-response':
      return (
        <div style={{ height: '100%', overflow: 'hidden' }}>
          <AlertManagement />
        </div>
      );
    case 'threat-intelligence':
      return (
        <div style={{ height: '100%', overflow: 'hidden' }}>
          <ThreatFeed />
        </div>
      );
    // 3️⃣ تفعيل الـ case الخاص بصفحة الـ Demo لتعرض الواجهة الحية والمتحركة
    case 'demo':
      return <Demo />;
      
    case 'national-overview':
      return (
        <PlaceholderPage
          title="النظرة الوطنية"
          description="خريطة تفاعلية مفصّلة لجميع مناطق المملكة مع إمكانية التعمق في تفاصيل كل منطقة وكاميراتها."
          icon={<Globe size={32} />}
        />
      );
    case 'camera-inventory':
      return (
        <PlaceholderPage
          title="مخزون الكاميرات"
          description="قاعدة بيانات شاملة لجميع الكاميرات المتصلة مع إمكانية البحث والتصفية والإدارة."
          icon={<Camera size={32} />}
        />
      );
    case 'device-management':
      return (
        <PlaceholderPage
          title="إدارة الأجهزة"
          description="مركز تحكم مركزي لإدارة جميع أجهزة إنترنت الأشياء والكاميرات على المستوى الوطني."
          icon={<Cpu size={32} />}
        />
      );
    case 'security-analytics':
      return (
        <PlaceholderPage
          title="تحليلات الأمن"
          description="تقارير تحليلية متعمقة ومؤشرات أداء شاملة لتقييم الوضع الأمني الوطني."
          icon={<BarChart3 size={32} />}
        />
      );
    case 'vulnerability':
      return (
        <PlaceholderPage
          title="إدارة الثغرات"
          description="نظام شامل لرصد وتتبع وإصلاح الثغرات الأمنية في جميع الأجهزة والأنظمة."
          icon={<Bug size={32} />}
        />
      );
    case 'reports':
      return (
        <PlaceholderPage
          title="التقارير"
          description="منظومة تقارير متكاملة تشمل التقارير اليومية والأسبوعية والشهرية والسنوية."
          icon={<FileText size={32} />}
        />
      );
    case 'user-management':
      return (
        <PlaceholderPage
          title="إدارة المستخدمين"
          description="إدارة حسابات المحللين والمشرفين مع نظام صلاحيات متعدد المستويات."
          icon={<Users size={32} />}
        />
      );
    case 'settings':
      return (
        <PlaceholderPage
          title="إعدادات النظام"
          description="تكوين وضبط جميع معلمات المنصة من سياسات الأمان إلى التكاملات الخارجية."
          icon={<Settings size={32} />}
        />
      );
    default:
      return <Dashboard />;
  }
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      dir="rtl"
      style={{
        width: '100vw',
        height: '100vh',
        background: '#0B1220',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'Cairo, Noto Kufi Arabic, sans-serif',
        color: '#E2E8F0',
      }}
    >
      {/* Top bar */}
      <TopBar pageTitle={PAGE_TITLES[activePage]} />

      {/* Body: sidebar + content */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Main content */}
        <main
          style={{
            flex: 1,
            minWidth: 0,
            padding: '16px',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            // zIndex تم تعديله لضمان عدم تداخل الخلفية مع الأزرار التفاعلية
            position: 'relative',
          }}
        >
          <PageContent page={activePage} />
        </main>

        {/* Sidebar (right side in RTL) */}
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Global styles */}
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
        body { margin: 0; padding: 0; background: #0B1220; }

        /* Subtle animated background */
        main::before {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background:
            radial-gradient(ellipse at 80% 20%, rgba(10, 132, 255, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(191, 90, 242, 0.03) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        main > * {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}
