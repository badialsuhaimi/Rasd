import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, AlertCircle, ShieldOff, AlertTriangle } from 'lucide-react';
import { LIVE_EVENTS } from './data';

type EventType = 'critical' | 'high' | 'medium' | 'low' | 'blocked';

const EVENT_CONFIG: Record<EventType, { icon: React.ReactNode; color: string; label: string }> = {
  critical: { icon: <AlertCircle size={12} />, color: '#FF3B30', label: 'حرج' },
  high: { icon: <AlertTriangle size={12} />, color: '#FF9500', label: 'عالي' },
  medium: { icon: <AlertTriangle size={12} />, color: '#FFD60A', label: 'متوسط' },
  low: { icon: <AlertTriangle size={12} />, color: '#30D158', label: 'منخفض' },
  blocked: { icon: <ShieldOff size={12} />, color: '#0A84FF', label: 'محظور' },
};

export function LiveMonitor() {
  const [events, setEvents] = useState(LIVE_EVENTS);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
      const types: EventType[] = ['critical', 'high', 'medium', 'low', 'blocked'];
      const msgs = [
        'محاولة وصول مشبوهة مكتشفة',
        'تنبيه: نشاط غير طبيعي للشبكة',
        'تم حظر عنوان IP خبيث تلقائياً',
        'محاولة تسجيل دخول فاشلة متكررة',
        'فحص منافذ من مصدر خارجي',
        'كشف برمجية خبيثة جديدة',
      ];
      const cameras = ['CAM-RY-', 'CAM-EP-', 'CAM-MK-', 'CAM-NB-', 'CAM-TB-'];
      const newEvent = {
        id: Date.now(),
        time: timeStr,
        type: types[Math.floor(Math.random() * types.length)],
        msg: msgs[Math.floor(Math.random() * msgs.length)],
        camera: cameras[Math.floor(Math.random() * cameras.length)] + String(Math.floor(Math.random() * 9999)).padStart(4, '0'),
      };
      setEvents(prev => [newEvent, ...prev.slice(0, 14)]);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: '#111827',
        borderRadius: '12px',
        border: '1px solid rgba(10, 132, 255, 0.18)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#30D158', animation: 'livePulse 1.5s infinite' }} />
            <span style={{ color: '#30D158', fontSize: '10px', fontWeight: '600' }}>LIVE</span>
          </div>
        </div>
        <span style={{ color: '#E2E8F0', fontSize: '14px', fontWeight: '700' }}>سجل الأحداث المباشر</span>
      </div>

      {/* Events feed */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          scrollbarWidth: 'none',
          padding: '6px 0',
        }}
      >
        {events.map((ev, i) => {
          const config = EVENT_CONFIG[ev.type as EventType];
          return (
            <div
              key={ev.id}
              style={{
                padding: '7px 14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                borderBottom: '1px solid rgba(255,255,255,0.03)',
                animation: i === 0 ? 'fadeIn 0.3s ease' : 'none',
              }}
            >
              {/* Time */}
              <span
                style={{
                  color: '#475569',
                  fontSize: '10px',
                  fontFamily: 'JetBrains Mono, monospace',
                  minWidth: '58px',
                  paddingTop: '1px',
                  flexShrink: 0,
                }}
              >
                {ev.time}
              </span>

              {/* Icon + type */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  color: config.color,
                  minWidth: '52px',
                  flexShrink: 0,
                }}
              >
                {config.icon}
                <span style={{ fontSize: '9px', fontWeight: '600' }}>{config.label}</span>
              </div>

              {/* Message */}
              <div style={{ flex: 1, textAlign: 'right' }}>
                <div style={{ color: '#CBD5E1', fontSize: '11px', lineHeight: 1.4 }}>{ev.msg}</div>
                <div
                  style={{
                    color: '#475569',
                    fontSize: '9px',
                    fontFamily: 'JetBrains Mono, monospace',
                    marginTop: '2px',
                  }}
                >
                  {ev.camera}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(48, 209, 88, 0.4); }
          50% { box-shadow: 0 0 0 4px rgba(48, 209, 88, 0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); background: rgba(10, 132, 255, 0.08); }
          to { opacity: 1; transform: translateY(0); background: transparent; }
        }
      `}</style>
    </div>
  );
}
