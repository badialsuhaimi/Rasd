import React, { useState, useEffect } from 'react';
import { Bell, Search, User, ChevronDown, AlertTriangle, RefreshCw } from 'lucide-react';
import { KPI_METRICS } from './data';

interface TopBarProps {
  pageTitle: string;
}

export function TopBar({ pageTitle }: TopBarProps) {
  const [time, setTime] = useState(new Date());
  const [showAlerts, setShowAlerts] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateStr = time.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header
      style={{
        background: 'rgba(13, 22, 38, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(10, 132, 255, 0.18)',
        padding: '0 20px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexShrink: 0,
        position: 'relative',
        zIndex: 100,
      }}
    >
      {/* Page title */}
      <div style={{ flex: 1 }}>
        <h1 style={{ color: '#E2E8F0', fontSize: '16px', fontWeight: '700', margin: 0 }}>{pageTitle}</h1>
        <p style={{ color: '#64748B', fontSize: '11px', margin: 0 }}>{dateStr}</p>
      </div>

      {/* National score indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '8px',
          background: 'rgba(10, 132, 255, 0.08)',
          border: '1px solid rgba(10, 132, 255, 0.2)',
        }}
      >
        <span style={{ color: '#64748B', fontSize: '12px' }}>مؤشر الأمان الوطني</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
          <span
            style={{
              color: '#30D158',
              fontSize: '18px',
              fontWeight: '800',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {KPI_METRICS.nationalSecurityScore}
          </span>
          <span style={{ color: '#64748B', fontSize: '12px' }}>/100</span>
        </div>
        <div
          style={{
            width: '48px',
            height: '6px',
            borderRadius: '3px',
            background: 'rgba(255,255,255,0.1)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${KPI_METRICS.nationalSecurityScore}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #0A84FF, #30D158)',
              borderRadius: '3px',
            }}
          />
        </div>
      </div>

      {/* Live threats count */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          borderRadius: '8px',
          background: 'rgba(255, 59, 48, 0.08)',
          border: '1px solid rgba(255, 59, 48, 0.2)',
        }}
      >
        <div
          style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: '#FF3B30',
            animation: 'pulse-red 1.5s infinite',
          }}
        />
        <span style={{ color: '#FF3B30', fontSize: '12px', fontWeight: '600' }}>
          {KPI_METRICS.threatsToday} تهديد نشط
        </span>
      </div>

      {/* Search */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          borderRadius: '8px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          minWidth: '180px',
        }}
      >
        <Search size={14} color="#64748B" />
        <input
          placeholder="بحث في النظام..."
          style={{
            background: 'none',
            border: 'none',
            outline: 'none',
            color: '#94A3B8',
            fontSize: '13px',
            width: '100%',
            textAlign: 'right',
            fontFamily: 'Cairo, sans-serif',
          }}
        />
      </div>

      {/* Clock */}
      <div style={{ textAlign: 'center', minWidth: '80px' }}>
        <div
          style={{
            color: '#0A84FF',
            fontSize: '16px',
            fontWeight: '700',
            fontFamily: 'JetBrains Mono, monospace',
            lineHeight: 1.2,
          }}
        >
          {timeStr}
        </div>
        <div style={{ color: '#64748B', fontSize: '9px', letterSpacing: '0.1em' }}>LIVE</div>
      </div>

      {/* Refresh */}
      <button
        style={{
          background: 'none',
          border: '1px solid rgba(10, 132, 255, 0.2)',
          borderRadius: '8px',
          padding: '7px',
          cursor: 'pointer',
          color: '#64748B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title="تحديث البيانات"
      >
        <RefreshCw size={15} />
      </button>

      {/* Alerts bell */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowAlerts(!showAlerts)}
          style={{
            background: 'none',
            border: '1px solid rgba(255, 149, 0, 0.3)',
            borderRadius: '8px',
            padding: '7px',
            cursor: 'pointer',
            color: '#FF9500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <Bell size={15} />
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: '#FF3B30',
              color: '#fff',
              fontSize: '9px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            4
          </span>
        </button>

        {showAlerts && (
          <div
            style={{
              position: 'absolute',
              top: '44px',
              left: 0,
              width: '320px',
              background: '#111827',
              border: '1px solid rgba(10, 132, 255, 0.2)',
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              overflow: 'hidden',
              zIndex: 200,
            }}
          >
            <div
              style={{
                padding: '14px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ color: '#64748B', fontSize: '12px' }}>4 تنبيهات جديدة</span>
              <span style={{ color: '#E2E8F0', fontSize: '14px', fontWeight: '600' }}>التنبيهات</span>
            </div>
            {[
              { msg: 'هجوم حرج على المنطقة الشرقية', time: 'منذ 2 دقيقة', color: '#FF3B30' },
              { msg: 'اختراق بيانات اعتماد - الرياض', time: 'منذ 5 دقائق', color: '#FF3B30' },
              { msg: 'نشاط بوت مكتشف جديد', time: 'منذ 12 دقيقة', color: '#FF9500' },
              { msg: 'تحديث: حادثة تبوك تم احتواؤها', time: 'منذ 18 دقيقة', color: '#30D158' },
            ].map((alert, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
              >
                <AlertTriangle size={14} color={alert.color} style={{ marginTop: '2px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#E2E8F0', fontSize: '12px', textAlign: 'right' }}>{alert.msg}</div>
                  <div style={{ color: '#64748B', fontSize: '11px', textAlign: 'right' }}>{alert.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 10px',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.08)',
          cursor: 'pointer',
        }}
      >
        <ChevronDown size={12} color="#64748B" />
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#E2E8F0', fontSize: '12px', fontWeight: '600' }}>م. بادي الحربي</div>
          <div style={{ color: '#64748B', fontSize: '10px' }}>محلل أمني أول</div>
        </div>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0A84FF, #005BC4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '13px',
            color: '#fff',
          }}
        >
          عغ
        </div>
      </div>

      <style>{`
        @keyframes pulse-red {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255, 59, 48, 0.4); }
          50% { opacity: 0.8; box-shadow: 0 0 0 4px rgba(255, 59, 48, 0); }
        }
      `}</style>
    </header>
  );
}
