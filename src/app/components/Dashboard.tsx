import React from 'react';
import { KPICards } from './KPICards';
import { SaudiMap } from './SaudiMap';
import { ThreatFeed } from './ThreatFeed';
import { ThreatCategories } from './ThreatCategories';
import { ThreatTrendChart, WeeklyBarChart, AttackSourcesChart, RegionRiskChart } from './AnalyticsCharts';
import { LiveMonitor } from './LiveMonitor';
import { AlertManagement } from './AlertManagement';

export function Dashboard() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        height: '100%',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        padding: '0 2px 16px',
      }}
    >
      {/* Row 1: KPI Cards */}
      <KPICards />

      {/* Row 2: Map + Threat Feed */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 480px', gap: '14px', minHeight: '420px' }}>
        <SaudiMap />
        <ThreatFeed />
      </div>

      {/* Row 3: Threat Categories */}
      <ThreatCategories />

      {/* Row 4: Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '14px' }}>
        <ThreatTrendChart />
        <WeeklyBarChart />
        <AttackSourcesChart />
        <RegionRiskChart />
      </div>

      {/* Row 5: Live monitor + Alert management */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', minHeight: '380px' }}>
        <LiveMonitor />
        <AlertManagement />
      </div>
    </div>
  );
}
