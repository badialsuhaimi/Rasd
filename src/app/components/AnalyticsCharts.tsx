import React, { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { HOURLY_THREATS, WEEKLY_THREATS, ATTACK_SOURCES, REGIONS } from './data';

type TimeRange = '24h' | '7d' | '30d';

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: '#111827',
        borderRadius: '12px',
        border: '1px solid rgba(10, 132, 255, 0.18)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {subtitle && <span style={{ color: '#64748B', fontSize: '11px' }}>{subtitle}</span>}
        <span style={{ color: '#E2E8F0', fontSize: '13px', fontWeight: '700' }}>{title}</span>
      </div>
      <div style={{ padding: '12px' }}>{children}</div>
    </div>
  );
}

const CustomTooltipStyle: React.CSSProperties = {
  background: '#1A2540',
  border: '1px solid rgba(10,132,255,0.25)',
  borderRadius: '8px',
  padding: '8px 12px',
  color: '#E2E8F0',
  fontSize: '11px',
  fontFamily: 'Cairo, sans-serif',
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={CustomTooltipStyle}>
      <div style={{ marginBottom: '4px', fontWeight: '600', textAlign: 'right' }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: p.color, fontFamily: 'JetBrains Mono, monospace', fontWeight: '600' }}>{p.value}</span>
          <span style={{ color: '#64748B' }}>{p.name}</span>
        </div>
      ))}
    </div>
  );
}

export function ThreatTrendChart() {
  const [range, setRange] = useState<TimeRange>('24h');

  return (
    <ChartCard title="اتجاه التهديدات">
      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', justifyContent: 'flex-end' }}>
        {(['24h', '7d', '30d'] as TimeRange[]).map(r => (
          <button
            key={r}
            onClick={() => setRange(r)}
            style={{
              padding: '3px 10px',
              borderRadius: '5px',
              border: range === r ? '1px solid rgba(10,132,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
              background: range === r ? 'rgba(10,132,255,0.15)' : 'transparent',
              color: range === r ? '#0A84FF' : '#64748B',
              fontSize: '11px',
              cursor: 'pointer',
              fontFamily: 'Cairo, sans-serif',
            }}
          >
            {r === '24h' ? '٢٤ ساعة' : r === '7d' ? '٧ أيام' : '٣٠ يوم'}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={HOURLY_THREATS} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="gradCritical" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF3B30" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FF3B30" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradHigh" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF9500" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#FF9500" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradMedium" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFD60A" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#FFD60A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="hour"
            tick={{ fill: '#475569', fontSize: 9, fontFamily: 'JetBrains Mono' }}
            axisLine={false}
            tickLine={false}
            interval={3}
          />
          <YAxis
            tick={{ fill: '#475569', fontSize: 9, fontFamily: 'JetBrains Mono' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="critical" name="حرج" stroke="#FF3B30" fill="url(#gradCritical)" strokeWidth={2} dot={false} />
          <Area type="monotone" dataKey="high" name="عالي" stroke="#FF9500" fill="url(#gradHigh)" strokeWidth={1.5} dot={false} />
          <Area type="monotone" dataKey="medium" name="متوسط" stroke="#FFD60A" fill="url(#gradMedium)" strokeWidth={1} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function WeeklyBarChart() {
  return (
    <ChartCard title="التهديدات الأسبوعية" subtitle="تم الرصد والحظر">
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={WEEKLY_THREATS} margin={{ top: 5, right: 5, bottom: 0, left: -20 }} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fill: '#475569', fontSize: 10, fontFamily: 'Cairo' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#475569', fontSize: 9, fontFamily: 'JetBrains Mono' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="threats" name="تهديدات" fill="#FF3B30" fillOpacity={0.7} radius={[3, 3, 0, 0]} maxBarSize={24} />
          <Bar dataKey="blocked" name="محظورة" fill="#30D158" fillOpacity={0.7} radius={[3, 3, 0, 0]} maxBarSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function AttackSourcesChart() {
  return (
    <ChartCard title="مصادر الهجمات">
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <ResponsiveContainer width={140} height={140}>
          <PieChart>
            <Pie
              data={ATTACK_SOURCES}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={65}
              paddingAngle={2}
              dataKey="count"
            >
              {ATTACK_SOURCES.map((s, i) => (
                <Cell key={i} fill={s.color} fillOpacity={0.85} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div style={{ ...CustomTooltipStyle, padding: '6px 10px' }}>
                    <span>{d.flag} {d.country}: </span>
                    <span style={{ color: d.color, fontFamily: 'JetBrains Mono', fontWeight: '600' }}>{d.count}</span>
                  </div>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {ATTACK_SOURCES.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '28px', height: '4px', borderRadius: '2px', background: s.color, opacity: 0.85, flexShrink: 0 }} />
              <span style={{ color: '#94A3B8', fontSize: '11px', flex: 1, textAlign: 'right' }}>
                {s.flag} {s.country}
              </span>
              <span
                style={{
                  color: s.color,
                  fontSize: '12px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: '600',
                  minWidth: '36px',
                  textAlign: 'left',
                }}
              >
                {s.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}

export function RegionRiskChart() {
  const regionData = REGIONS
    .sort((a, b) => b.threats - a.threats)
    .slice(0, 8)
    .map(r => ({
      name: r.name,
      threats: r.threats,
      score: r.securityScore,
      color: r.threatLevel === 'critical' ? '#FF3B30' : r.threatLevel === 'high' ? '#FF9500' : r.threatLevel === 'medium' ? '#FFD60A' : '#30D158',
    }));

  return (
    <ChartCard title="أعلى المناطق تعرضاً للتهديدات" subtitle="مرتبة حسب عدد التهديدات">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={regionData} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: '#475569', fontSize: 9, fontFamily: 'JetBrains Mono' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'Cairo' }}
            axisLine={false}
            tickLine={false}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="threats" name="التهديدات" radius={[0, 4, 4, 0]} maxBarSize={16}>
            {regionData.map((d, i) => (
              <Cell key={i} fill={d.color} fillOpacity={0.75} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
