import React from 'react';
import { Camera, Wifi, WifiOff, ShieldAlert, ShieldCheck, Clock, AlertTriangle, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { KPI_METRICS } from './data';

interface KPICardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  glowColor: string;
  trend?: number;
  mono?: boolean;
  large?: boolean;
}

function KPICard({ icon, label, value, sub, color, glowColor, trend, mono, large }: KPICardProps) {
  return (
    <div
      style={{
        background: '#111827',
        border: `1px solid ${glowColor}30`,
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        position: 'relative',
        overflow: 'hidden',
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          left: '-30px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: `${glowColor}12`,
          pointerEvents: 'none',
        }}
      />

      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#64748B', fontSize: '11px', fontWeight: '500' }}>{label}</div>
          {sub && <div style={{ color: '#475569', fontSize: '10px', marginTop: '2px' }}>{sub}</div>}
        </div>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: `${glowColor}18`,
            border: `1px solid ${glowColor}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      </div>

      {/* Value */}
      <div
        style={{
          color,
          fontSize: large ? '28px' : '22px',
          fontWeight: '800',
          fontFamily: mono !== false ? 'JetBrains Mono, monospace' : 'Cairo, sans-serif',
          lineHeight: 1.1,
          textAlign: 'right',
        }}
      >
        {typeof value === 'number' ? value.toLocaleString('ar-SA') : value}
      </div>

      {/* Trend */}
      {trend !== undefined && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            justifyContent: 'flex-end',
          }}
        >
          {trend > 0 ? (
            <TrendingUp size={12} color="#FF3B30" />
          ) : (
            <TrendingDown size={12} color="#30D158" />
          )}
          <span
            style={{
              color: trend > 0 ? '#FF3B30' : '#30D158',
              fontSize: '11px',
              fontWeight: '600',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {Math.abs(trend)}%
          </span>
          <span style={{ color: '#475569', fontSize: '10px' }}>
            {trend > 0 ? 'ارتفاع' : 'انخفاض'}
          </span>
        </div>
      )}
    </div>
  );
}

export function KPICards() {
  const cards: KPICardProps[] = [
    {
      icon: <Camera size={18} />,
      label: 'إجمالي الكاميرات',
      sub: 'جميع المناطق',
      value: KPI_METRICS.totalCameras,
      color: '#0A84FF',
      glowColor: '#0A84FF',
    },
    {
      icon: <Wifi size={18} />,
      label: 'كاميرات نشطة',
      sub: 'متصلة الآن',
      value: KPI_METRICS.activeCameras,
      color: '#30D158',
      glowColor: '#30D158',
    },
    {
      icon: <WifiOff size={18} />,
      label: 'كاميرات غير نشطة',
      sub: 'مقطوعة الاتصال',
      value: KPI_METRICS.offlineCameras,
      color: '#FF3B30',
      glowColor: '#FF3B30',
      trend: 3.2,
    },
    {
      icon: <ShieldAlert size={18} />,
      label: 'تهديدات اليوم',
      sub: 'آخر 24 ساعة',
      value: KPI_METRICS.threatsToday,
      color: '#FF3B30',
      glowColor: '#FF3B30',
      trend: KPI_METRICS.threatTrend,
    },
    {
      icon: <ShieldCheck size={18} />,
      label: 'تهديدات محظورة',
      sub: 'تم التصدي لها',
      value: KPI_METRICS.threatsBlocked,
      color: '#30D158',
      glowColor: '#30D158',
    },
    {
      icon: <Clock size={18} />,
      label: 'متوسط وقت الاكتشاف',
      sub: 'MTTD',
      value: `${KPI_METRICS.mttd} د`,
      color: '#FFD60A',
      glowColor: '#FFD60A',
      mono: false,
    },
    {
      icon: <Activity size={18} />,
      label: 'متوسط وقت الاستجابة',
      sub: 'MTTR',
      value: `${KPI_METRICS.mttr} د`,
      color: '#FF9500',
      glowColor: '#FF9500',
      mono: false,
    },
    {
      icon: <AlertTriangle size={18} />,
      label: 'مؤشر الأمان الوطني',
      sub: 'National Security Score',
      value: `${KPI_METRICS.nationalSecurityScore}%`,
      color: '#30D158',
      glowColor: '#30D158',
      mono: false,
      large: true,
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gap: '10px',
        flexShrink: 0,
      }}
    >
      {cards.map((card, i) => (
        <KPICard key={i} {...card} />
      ))}
    </div>
  );
}
