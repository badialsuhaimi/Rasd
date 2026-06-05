import React from 'react';
import {
  LayoutDashboard, Globe, ShieldAlert, Camera, Cpu, Siren,
  BarChart3, Bug, FileText, Brain, Users, Settings,
  ChevronLeft, ChevronRight, Wifi, Shield
} from 'lucide-react';

export type PageId =
  | 'dashboard'
  | 'national-overview'
  | 'threat-intelligence'
  | 'camera-inventory'
  | 'device-management'
  | 'incident-response'
  | 'security-analytics'
  | 'vulnerability'
  | 'reports'
  | 'ai-insights'
  | 'user-management'
  | 'settings';

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  badgeColor?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'لوحة التحكم', icon: <LayoutDashboard size={18} /> },
  { id: 'national-overview', label: 'النظرة الوطنية', icon: <Globe size={18} />, badge: 3, badgeColor: '#FF3B30' },
  { id: 'threat-intelligence', label: 'استخبارات التهديدات', icon: <ShieldAlert size={18} />, badge: 12, badgeColor: '#FF3B30' },
  { id: 'camera-inventory', label: 'مخزون الكاميرات', icon: <Camera size={18} /> },
  { id: 'device-management', label: 'إدارة الأجهزة', icon: <Cpu size={18} />, badge: 5, badgeColor: '#FFD60A' },
  { id: 'incident-response', label: 'الاستجابة للحوادث', icon: <Siren size={18} />, badge: 4, badgeColor: '#FF9500' },
  { id: 'security-analytics', label: 'تحليلات الأمن', icon: <BarChart3 size={18} /> },
  { id: 'vulnerability', label: 'إدارة الثغرات', icon: <Bug size={18} />, badge: 28, badgeColor: '#FFD60A' },
  { id: 'reports', label: 'التقارير', icon: <FileText size={18} /> },
  { id: 'ai-insights', label: 'رؤى الذكاء الاصطناعي', icon: <Brain size={18} /> },
  { id: 'user-management', label: 'إدارة المستخدمين', icon: <Users size={18} /> },
  { id: 'settings', label: 'إعدادات النظام', icon: <Settings size={18} /> },
];

interface SidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ activePage, onNavigate, collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      style={{
        width: collapsed ? '64px' : '240px',
        transition: 'width 0.3s ease',
        background: '#0D1626',
        borderLeft: '1px solid rgba(10, 132, 255, 0.18)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        flexShrink: 0,
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? '20px 0' : '20px 16px',
          borderBottom: '1px solid rgba(10, 132, 255, 0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0A84FF 0%, #005BC4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(10, 132, 255, 0.4)',
            flexShrink: 0,
          }}
        >
          <Shield size={20} color="#fff" />
        </div>
        {!collapsed && (
          <div>
            <div style={{ color: '#E2E8F0', fontSize: '16px', fontWeight: '700', lineHeight: 1.2 }}>رصد</div>
            <div style={{ color: '#64748B', fontSize: '10px', fontWeight: '400', letterSpacing: '0.05em' }}>RASAD PLATFORM</div>
          </div>
        )}
      </div>

      {/* Status indicator */}
      {!collapsed && (
        <div
          style={{
            margin: '12px 12px 0',
            padding: '8px 12px',
            borderRadius: '8px',
            background: 'rgba(48, 209, 88, 0.08)',
            border: '1px solid rgba(48, 209, 88, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#30D158',
                boxShadow: '0 0 8px #30D158',
              }}
            />
            <div
              style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: '#30D158', opacity: 0.4,
                animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#30D158', fontSize: '11px', fontWeight: '600' }}>النظام نشط</div>
            <div style={{ color: '#64748B', fontSize: '10px' }}>المراقبة مستمرة</div>
          </div>
          <Wifi size={12} color="#30D158" />
        </div>
      )}

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 8px', scrollbarWidth: 'none' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: collapsed ? '10px' : '10px 12px',
                borderRadius: '8px',
                marginBottom: '2px',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'right',
                justifyContent: collapsed ? 'center' : 'flex-start',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(10, 132, 255, 0.18), rgba(10, 132, 255, 0.08))'
                  : 'transparent',
                borderLeft: isActive && !collapsed ? '2px solid #0A84FF' : '2px solid transparent',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }
              }}
            >
              <span style={{ color: isActive ? '#0A84FF' : '#64748B', flexShrink: 0 }}>
                {item.icon}
              </span>
              {!collapsed && (
                <>
                  <span
                    style={{
                      color: isActive ? '#E2E8F0' : '#94A3B8',
                      fontSize: '13px',
                      fontWeight: isActive ? '600' : '400',
                      flex: 1,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                  </span>
                  {item.badge !== undefined && (
                    <span
                      style={{
                        background: item.badgeColor || '#0A84FF',
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: '700',
                        padding: '2px 6px',
                        borderRadius: '10px',
                        fontFamily: 'JetBrains Mono, monospace',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && item.badge !== undefined && (
                <div
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: item.badgeColor || '#0A84FF',
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(10, 132, 255, 0.15)' }}>
        <button
          onClick={onToggle}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid rgba(10, 132, 255, 0.2)',
            background: 'rgba(10, 132, 255, 0.05)',
            color: '#64748B',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(10, 132, 255, 0.4)';
            (e.currentTarget as HTMLElement).style.color = '#0A84FF';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(10, 132, 255, 0.2)';
            (e.currentTarget as HTMLElement).style.color = '#64748B';
          }}
        >
          {collapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          {!collapsed && <span style={{ fontSize: '12px' }}>طي القائمة</span>}
        </button>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </aside>
  );
}
