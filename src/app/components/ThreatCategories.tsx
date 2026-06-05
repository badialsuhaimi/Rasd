import React from 'react';
import {
  ShieldAlert, Zap, KeyRound, Bug, Network, ServerCrash,
  Terminal, Code2, Cpu, Activity, ScanSearch, ArrowLeftRight,
  AlertTriangle, Wifi, TrendingUp, TrendingDown
} from 'lucide-react';
import { THREAT_CATEGORIES } from './data';

const ICONS: Record<string, React.ReactNode> = {
  ShieldAlert: <ShieldAlert size={16} />,
  Zap: <Zap size={16} />,
  KeyRound: <KeyRound size={16} />,
  Bug: <Bug size={16} />,
  Network: <Network size={16} />,
  ServerCrash: <ServerCrash size={16} />,
  Terminal: <Terminal size={16} />,
  Code2: <Code2 size={16} />,
  Cpu: <Cpu size={16} />,
  Activity: <Activity size={16} />,
  ScanSearch: <ScanSearch size={16} />,
  ArrowLeftRight: <ArrowLeftRight size={16} />,
  AlertTriangle: <AlertTriangle size={16} />,
  Wifi: <Wifi size={16} />,
};

export function ThreatCategories() {
  const maxCount = Math.max(...THREAT_CATEGORIES.map(c => c.count));

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
        <span style={{ color: '#64748B', fontSize: '12px' }}>14 فئة مراقبة</span>
        <span style={{ color: '#E2E8F0', fontSize: '14px', fontWeight: '700' }}>فئات التهديدات</span>
      </div>

      <div
        style={{
          padding: '12px',
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px',
        }}
      >
        {THREAT_CATEGORIES.map((cat) => (
          <CategoryCard key={cat.id} cat={cat} maxCount={maxCount} />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ cat, maxCount }: { cat: typeof THREAT_CATEGORIES[0]; maxCount: number }) {
  const barPct = (cat.count / maxCount) * 100;

  return (
    <div
      style={{
        background: `${cat.color}08`,
        border: `1px solid ${cat.color}20`,
        borderRadius: '10px',
        padding: '12px 10px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = `${cat.color}15`;
        (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}45`;
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${cat.color}20`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = `${cat.color}08`;
        (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}20`;
        (e.currentTarget as HTMLElement).style.transform = 'none';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Icon + trend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          {cat.trend > 0 ? (
            <TrendingUp size={10} color="#FF3B30" />
          ) : (
            <TrendingDown size={10} color="#30D158" />
          )}
          <span
            style={{
              fontSize: '9px',
              color: cat.trend > 0 ? '#FF3B30' : '#30D158',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {cat.trend > 0 ? '+' : ''}{cat.trend}%
          </span>
        </div>
        <div style={{ color: cat.color, opacity: 0.85 }}>
          {ICONS[cat.icon]}
        </div>
      </div>

      {/* Count */}
      <div
        style={{
          color: cat.color,
          fontSize: '20px',
          fontWeight: '800',
          fontFamily: 'JetBrains Mono, monospace',
          textAlign: 'right',
          lineHeight: 1,
        }}
      >
        {cat.count}
      </div>

      {/* Name */}
      <div
        style={{
          color: '#94A3B8',
          fontSize: '10px',
          fontWeight: '500',
          textAlign: 'right',
          lineHeight: 1.3,
        }}
      >
        {cat.name}
      </div>

      {/* Bar */}
      <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${barPct}%`,
            height: '100%',
            background: cat.color,
            borderRadius: '2px',
            opacity: 0.7,
          }}
        />
      </div>
    </div>
  );
}
