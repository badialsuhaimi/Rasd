import React, { useState } from 'react';
import { Flame, AlertTriangle, ShieldAlert, CheckCircle2, User, Clock, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { ALERTS, ThreatSeverity, ThreatStatus } from './data';

const SEV_CONFIG: Record<ThreatSeverity, { label: string; color: string; icon: React.ReactNode }> = {
  critical: { label: 'حرج', color: '#FF3B30', icon: <Flame size={14} /> },
  high: { label: 'عالي', color: '#FF9500', icon: <AlertTriangle size={14} /> },
  medium: { label: 'متوسط', color: '#FFD60A', icon: <ShieldAlert size={14} /> },
  low: { label: 'منخفض', color: '#30D158', icon: <ShieldAlert size={14} /> },
};

const STATUS_MAP: Record<ThreatStatus, { label: string; color: string; steps: number }> = {
  active: { label: 'نشط', color: '#FF3B30', steps: 1 },
  investigating: { label: 'قيد التحقيق', color: '#FF9500', steps: 2 },
  contained: { label: 'محتوى', color: '#FFD60A', steps: 3 },
  resolved: { label: 'محلول', color: '#30D158', steps: 4 },
};

const WORKFLOW_STEPS = ['رصد', 'تحقيق', 'احتواء', 'حل'];

function AlertCard({ alert }: { alert: typeof ALERTS[0] }) {
  const [expanded, setExpanded] = useState(false);
  const sev = SEV_CONFIG[alert.severity];
  const stat = STATUS_MAP[alert.status];

  return (
    <div
      style={{
        background: `${sev.color}06`,
        border: `1px solid ${sev.color}22`,
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '8px',
        transition: 'all 0.2s',
      }}
    >
      {/* Header */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '12px 14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
        }}
      >
        {/* Severity icon */}
        <div
          style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: `${sev.color}18`,
            border: `1px solid ${sev.color}35`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: sev.color,
            flexShrink: 0,
          }}
        >
          {sev.icon}
        </div>

        <div style={{ flex: 1 }}>
          {/* Title + ID */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', justifyContent: 'flex-end' }}>
            <span
              style={{
                color: '#475569',
                fontSize: '10px',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {alert.id}
            </span>
            <span style={{ color: '#E2E8F0', fontSize: '12px', fontWeight: '600' }}>{alert.title}</span>
          </div>

          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={10} color="#64748B" />
              <span style={{ color: '#64748B', fontSize: '10px' }}>{alert.updated.split(' ')[1]}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <User size={10} color="#64748B" />
              <span style={{ color: '#64748B', fontSize: '10px' }}>{alert.analyst}</span>
            </div>
            <div
              style={{
                padding: '2px 8px',
                borderRadius: '4px',
                background: `${stat.color}15`,
              }}
            >
              <span style={{ color: stat.color, fontSize: '10px', fontWeight: '600' }}>{stat.label}</span>
            </div>
          </div>
        </div>

        <div style={{ color: '#475569', flexShrink: 0 }}>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </div>

      {/* Expanded */}
      {expanded && (
        <div
          style={{
            padding: '0 14px 14px',
            borderTop: `1px solid ${sev.color}15`,
          }}
        >
          {/* Description */}
          <p
            style={{
              color: '#94A3B8',
              fontSize: '11px',
              lineHeight: 1.6,
              textAlign: 'right',
              margin: '10px 0 12px',
            }}
          >
            {alert.description}
          </p>

          {/* Workflow progress */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ color: '#64748B', fontSize: '10px', marginBottom: '6px', textAlign: 'right' }}>مسار الاستجابة</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              {WORKFLOW_STEPS.map((step, i) => {
                const isCompleted = i < stat.steps;
                const isCurrent = i === stat.steps - 1;
                return (
                  <React.Fragment key={i}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                      <div
                        style={{
                          width: '24px', height: '24px', borderRadius: '50%',
                          background: isCompleted ? (isCurrent ? stat.color : '#30D158') : 'rgba(255,255,255,0.06)',
                          border: `1px solid ${isCompleted ? (isCurrent ? stat.color : '#30D158') : 'rgba(255,255,255,0.1)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: isCurrent ? `0 0 8px ${stat.color}50` : 'none',
                        }}
                      >
                        {isCompleted && !isCurrent && <CheckCircle2 size={12} color="#30D158" />}
                        {isCurrent && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: stat.color }} />}
                        {!isCompleted && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />}
                      </div>
                      <span style={{ color: isCompleted ? '#94A3B8' : '#475569', fontSize: '9px' }}>{step}</span>
                    </div>
                    {i < WORKFLOW_STEPS.length - 1 && (
                      <div
                        style={{
                          flex: 1,
                          height: '1px',
                          background: i < stat.steps - 1 ? '#30D158' : 'rgba(255,255,255,0.06)',
                          marginBottom: '12px',
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Details grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '10px' }}>
            <InfoItem label="المنطقة" value={alert.region} />
            <InfoItem label="الأجهزة المتأثرة" value={`${alert.affectedDevices} جهاز`} mono />
            <InfoItem label="تاريخ الإنشاء" value={alert.created.split(' ')[0]} mono />
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '5px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            {alert.tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: 'rgba(10, 132, 255, 0.1)',
                  border: '1px solid rgba(10, 132, 255, 0.2)',
                  color: '#60A5FA',
                  fontSize: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <Tag size={9} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoItem({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div style={{ textAlign: 'right' }}>
      <div style={{ color: '#475569', fontSize: '10px', marginBottom: '2px' }}>{label}</div>
      <div
        style={{
          color: '#94A3B8',
          fontSize: '11px',
          fontFamily: mono ? 'JetBrains Mono, monospace' : 'Cairo, sans-serif',
        }}
      >
        {value}
      </div>
    </div>
  );
}

export function AlertManagement() {
  const critical = ALERTS.filter(a => a.severity === 'critical').length;
  const high = ALERTS.filter(a => a.severity === 'high').length;
  const active = ALERTS.filter(a => a.status === 'active').length;

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
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Chip label={`${active} نشط`} color="#FF3B30" />
            <Chip label={`${critical} حرج`} color="#FF3B30" />
            <Chip label={`${high} عالي`} color="#FF9500" />
          </div>
          <span style={{ color: '#E2E8F0', fontSize: '14px', fontWeight: '700' }}>قائمة الحوادث والتنبيهات</span>
        </div>
      </div>

      {/* Alerts list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px', scrollbarWidth: 'none' }}>
        {ALERTS.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}

function Chip({ label, color }: { label: string; color: string }) {
  return (
    <div
      style={{
        padding: '3px 10px',
        borderRadius: '5px',
        background: `${color}12`,
        border: `1px solid ${color}30`,
      }}
    >
      <span style={{ color, fontSize: '11px', fontWeight: '600' }}>{label}</span>
    </div>
  );
}
