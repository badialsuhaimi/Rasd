import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, Flame, ChevronDown, ChevronUp, ExternalLink, Filter } from 'lucide-react';
import { THREATS, Threat, ThreatSeverity, ThreatStatus } from './data';

const SEVERITY_CONFIG: Record<ThreatSeverity, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  critical: { label: 'حرج', color: '#FF3B30', bg: 'rgba(255, 59, 48, 0.12)', icon: <Flame size={13} /> },
  high: { label: 'عالي', color: '#FF9500', bg: 'rgba(255, 149, 0, 0.12)', icon: <AlertTriangle size={13} /> },
  medium: { label: 'متوسط', color: '#FFD60A', bg: 'rgba(255, 214, 10, 0.12)', icon: <ShieldAlert size={13} /> },
  low: { label: 'منخفض', color: '#30D158', bg: 'rgba(48, 209, 88, 0.1)', icon: <ShieldAlert size={13} /> },
};

const STATUS_CONFIG: Record<ThreatStatus, { label: string; color: string }> = {
  active: { label: 'نشط', color: '#FF3B30' },
  investigating: { label: 'قيد التحقيق', color: '#FF9500' },
  contained: { label: 'محتوى', color: '#FFD60A' },
  resolved: { label: 'محلول', color: '#30D158' },
};

function ThreatRow({ threat }: { threat: Threat }) {
  const [expanded, setExpanded] = useState(false);
  const sev = SEVERITY_CONFIG[threat.severity];
  const stat = STATUS_CONFIG[threat.status];

  return (
    <div
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        transition: 'background 0.15s',
      }}
    >
      {/* Main row */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '10px 14px',
          display: 'grid',
          gridTemplateColumns: '110px 1fr 90px 80px 30px',
          gap: '8px',
          alignItems: 'center',
          cursor: 'pointer',
          background: expanded ? 'rgba(10, 132, 255, 0.04)' : 'transparent',
        }}
        onMouseEnter={(e) => { if (!expanded) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}
        onMouseLeave={(e) => { if (!expanded) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
      >
        {/* Severity badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '3px 8px',
            borderRadius: '5px',
            background: sev.bg,
            border: `1px solid ${sev.color}30`,
            width: 'fit-content',
          }}
        >
          <span style={{ color: sev.color }}>{sev.icon}</span>
          <span style={{ color: sev.color, fontSize: '11px', fontWeight: '600' }}>{sev.label}</span>
        </div>

        {/* Threat name */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#E2E8F0', fontSize: '12px', fontWeight: '500', lineHeight: 1.3 }}>
            {threat.name}
          </div>
          <div style={{ color: '#475569', fontSize: '10px', marginTop: '2px', fontFamily: 'JetBrains Mono, monospace' }}>
            {threat.id} · {threat.cameraId}
          </div>
        </div>

        {/* Region + source */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#94A3B8', fontSize: '11px' }}>{threat.regionName}</div>
          <div style={{ color: '#475569', fontSize: '10px' }}>
            {threat.sourceFlag} {threat.sourceCountry}
          </div>
        </div>

        {/* Status */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 8px',
              borderRadius: '4px',
              background: `${stat.color}15`,
            }}
          >
            {threat.status === 'active' && (
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: stat.color, animation: 'pulse-dot 1.5s infinite' }} />
            )}
            <span style={{ color: stat.color, fontSize: '10px', fontWeight: '600' }}>{stat.label}</span>
          </div>
        </div>

        {/* Expand */}
        <div style={{ color: '#475569', display: 'flex', justifyContent: 'center' }}>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div
          style={{
            padding: '12px 14px 14px',
            background: 'rgba(10, 132, 255, 0.04)',
            borderTop: '1px solid rgba(10, 132, 255, 0.08)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              marginBottom: '12px',
            }}
          >
            <DetailField label="عنوان IP" value={threat.ip} mono />
            <DetailField label="المنفذ" value={String(threat.port)} mono />
            <DetailField label="الفئة" value={threat.category} />
            <DetailField label="وقت الاكتشاف" value={threat.timestamp} mono />
          </div>
          {/* Progress bar */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: '#475569', fontSize: '10px', fontFamily: 'JetBrains Mono, monospace' }}>{threat.progress}%</span>
              <span style={{ color: '#64748B', fontSize: '10px' }}>تقدم الاستجابة</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${threat.progress}%`,
                  height: '100%',
                  background: threat.progress === 100 ? '#30D158' : threat.progress > 60 ? '#FFD60A' : sev.color,
                  borderRadius: '2px',
                  transition: 'width 0.5s ease',
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <ActionBtn label="تحليل" color="#0A84FF" />
            <ActionBtn label="عزل الجهاز" color="#FF9500" />
            <ActionBtn label="حظر IP" color="#FF3B30" />
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

function DetailField({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div style={{ color: '#475569', fontSize: '10px', marginBottom: '2px' }}>{label}</div>
      <div style={{ color: '#94A3B8', fontSize: '11px', fontFamily: mono ? 'JetBrains Mono, monospace' : 'Cairo, sans-serif' }}>{value}</div>
    </div>
  );
}

function ActionBtn({ label, color }: { label: string; color: string }) {
  return (
    <button
      style={{
        padding: '4px 12px',
        borderRadius: '5px',
        border: `1px solid ${color}40`,
        background: `${color}12`,
        color,
        fontSize: '11px',
        fontFamily: 'Cairo, sans-serif',
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${color}22`; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${color}12`; }}
    >
      {label}
    </button>
  );
}

export function ThreatFeed() {
  const [filter, setFilter] = useState<ThreatSeverity | 'all'>('all');

  const filtered = filter === 'all' ? THREATS : THREATS.filter(t => t.severity === filter);
  const critCount = THREATS.filter(t => t.severity === 'critical').length;
  const highCount = THREATS.filter(t => t.severity === 'high').length;

  return (
    <div
      style={{
        background: '#111827',
        borderRadius: '12px',
        border: '1px solid rgba(10, 132, 255, 0.18)',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
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
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['all', 'critical', 'high', 'medium', 'low'] as const).map((f) => {
            const config = f !== 'all' ? SEVERITY_CONFIG[f] : null;
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '3px 10px',
                  borderRadius: '5px',
                  border: isActive ? `1px solid ${config?.color || '#0A84FF'}60` : '1px solid transparent',
                  background: isActive ? `${config?.color || '#0A84FF'}15` : 'transparent',
                  color: isActive ? (config?.color || '#0A84FF') : '#64748B',
                  fontSize: '11px',
                  cursor: 'pointer',
                  fontFamily: 'Cairo, sans-serif',
                }}
              >
                {f === 'all' ? 'الكل' :
                  f === 'critical' ? 'حرج' :
                    f === 'high' ? 'عالي' :
                      f === 'medium' ? 'متوسط' : 'منخفض'}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '2px 8px',
              borderRadius: '5px',
              background: 'rgba(255, 59, 48, 0.1)',
            }}
          >
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FF3B30', animation: 'pulse-dot 1.5s infinite' }} />
            <span style={{ color: '#FF3B30', fontSize: '11px', fontWeight: '600' }}>{critCount} حرج</span>
          </div>
          <span style={{ color: '#FF9500', fontSize: '11px', fontWeight: '600' }}>{highCount} عالي</span>
          <span style={{ color: '#E2E8F0', fontSize: '14px', fontWeight: '700' }}>خلاصة التهديدات النشطة</span>
        </div>
      </div>

      {/* Table header */}
      <div
        style={{
          padding: '7px 14px',
          display: 'grid',
          gridTemplateColumns: '110px 1fr 90px 80px 30px',
          gap: '8px',
          background: 'rgba(255,255,255,0.02)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          flexShrink: 0,
        }}
      >
        {['مستوى التهديد', 'اسم التهديد / المعرّف', 'المنطقة', 'الحالة', ''].map((h, i) => (
          <div key={i} style={{ color: '#475569', fontSize: '10px', fontWeight: '600', textAlign: i === 0 || i === 2 || i === 3 ? 'center' : 'right' }}>
            {h}
          </div>
        ))}
      </div>

      {/* Threat rows */}
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
        {filtered.map((threat) => (
          <ThreatRow key={threat.id} threat={threat} />
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '8px 14px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'none',
            border: '1px solid rgba(10,132,255,0.2)',
            borderRadius: '6px',
            padding: '4px 10px',
            color: '#0A84FF',
            fontSize: '11px',
            cursor: 'pointer',
            fontFamily: 'Cairo, sans-serif',
          }}
        >
          <ExternalLink size={11} />
          عرض الكل
        </button>
        <span style={{ color: '#475569', fontSize: '11px' }}>
          عرض {filtered.length} من {THREATS.length} تهديد
        </span>
      </div>
    </div>
  );
}
