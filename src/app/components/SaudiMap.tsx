import React, { useState } from 'react';
import { REGIONS, Region, ThreatLevel } from './data';

const THREAT_COLORS: Record<ThreatLevel, string> = {
  critical: '#FF3B30',
  high: '#FF9500',
  medium: '#FFD60A',
  low: '#30D158',
  normal: '#0A84FF',
};

const THREAT_FILL: Record<ThreatLevel, string> = {
  critical: 'rgba(255, 59, 48, 0.25)',
  high: 'rgba(255, 149, 0, 0.2)',
  medium: 'rgba(255, 214, 10, 0.15)',
  low: 'rgba(48, 209, 88, 0.12)',
  normal: 'rgba(10, 132, 255, 0.1)',
};

interface SaudiMapProps {
  onRegionClick?: (region: Region) => void;
  selectedRegion?: string | null;
}

export function SaudiMap({ onRegionClick, selectedRegion }: SaudiMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; region: Region } | null>(null);

  const handleMouseEnter = (region: Region, e: React.MouseEvent<SVGPathElement>) => {
    setHoveredRegion(region.id);
    const rect = (e.currentTarget.closest('svg') as SVGElement).getBoundingClientRect();
    setTooltip({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 10,
      region,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGPathElement>) => {
    if (tooltip) {
      const rect = (e.currentTarget.closest('svg') as SVGElement).getBoundingClientRect();
      setTooltip((prev) => prev ? { ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top - 10 } : null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredRegion(null);
    setTooltip(null);
  };

  const criticalCount = REGIONS.filter(r => r.threatLevel === 'critical').length;
  const highCount = REGIONS.filter(r => r.threatLevel === 'high').length;

  return (
    <div
      style={{
        background: '#0D1A2D',
        borderRadius: '12px',
        border: '1px solid rgba(10, 132, 255, 0.2)',
        overflow: 'hidden',
        position: 'relative',
        flex: 1,
        minHeight: 0,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid rgba(10, 132, 255, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <LegendDot color="#FF3B30" label={`${criticalCount} حرجة`} />
          <LegendDot color="#FF9500" label={`${highCount} عالية`} />
          <LegendDot color="#FFD60A" label="متوسطة" />
          <LegendDot color="#30D158" label="منخفضة" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#30D158', boxShadow: '0 0 6px #30D158',
            }}
          />
          <span style={{ color: '#30D158', fontSize: '11px', fontWeight: '600' }}>مباشر</span>
          <span style={{ color: '#94A3B8', fontSize: '13px', fontWeight: '700' }}>خريطة المملكة - المراقبة الوطنية</span>
        </div>
      </div>

      {/* SVG Map */}
      <div style={{ position: 'relative', padding: '8px' }}>
        <svg
          viewBox="0 0 560 540"
          style={{ width: '100%', height: '100%', maxHeight: '380px' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background gradient */}
          <defs>
            <radialGradient id="bg-grad" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#0D1A2D" />
              <stop offset="100%" stopColor="#060E1A" />
            </radialGradient>
            <filter id="glow-filter">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="region-glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Scan line gradient */}
            <linearGradient id="scan-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(10, 132, 255, 0)" />
              <stop offset="50%" stopColor="rgba(10, 132, 255, 0.08)" />
              <stop offset="100%" stopColor="rgba(10, 132, 255, 0)" />
            </linearGradient>
          </defs>

          <rect width="560" height="540" fill="url(#bg-grad)" />

          {/* Grid lines */}
          {Array.from({ length: 14 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 40} y1="0" x2={i * 40} y2="540"
              stroke="rgba(10, 132, 255, 0.06)" strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1="0" y1={i * 40} x2="560" y2={i * 40}
              stroke="rgba(10, 132, 255, 0.06)" strokeWidth="0.5"
            />
          ))}

          {/* Compass */}
          <g transform="translate(520, 40)">
            <circle cx="0" cy="0" r="18" fill="rgba(10,132,255,0.08)" stroke="rgba(10,132,255,0.3)" strokeWidth="1" />
            <text textAnchor="middle" x="0" y="-6" fill="rgba(10,132,255,0.8)" fontSize="10" fontFamily="Cairo">ش</text>
            <text textAnchor="middle" x="0" y="12" fill="rgba(10,132,255,0.5)" fontSize="8" fontFamily="Cairo">ج</text>
            <text textAnchor="middle" x="12" y="3" fill="rgba(10,132,255,0.5)" fontSize="8" fontFamily="Cairo">ش</text>
            <text textAnchor="middle" x="-12" y="3" fill="rgba(10,132,255,0.5)" fontSize="8" fontFamily="Cairo">غ</text>
          </g>

          {/* Region polygons */}
          {REGIONS.map((region) => {
            const isHovered = hoveredRegion === region.id;
            const isSelected = selectedRegion === region.id;
            const color = THREAT_COLORS[region.threatLevel];
            const fill = THREAT_FILL[region.threatLevel];

            return (
              <g key={region.id}>
                <path
                  d={region.svgPath}
                  fill={isHovered || isSelected ? `${THREAT_FILL[region.threatLevel].replace(')', ', 1.8)').replace('rgba', 'rgba')}` : fill}
                  stroke={isHovered || isSelected ? color : `${color}60`}
                  strokeWidth={isHovered || isSelected ? 2 : 1}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    filter: isHovered || isSelected ? `url(#region-glow)` : 'none',
                  }}
                  onMouseEnter={(e) => handleMouseEnter(region, e)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => onRegionClick?.(region)}
                />
                {/* Pulsing dot for critical/high */}
                {(region.threatLevel === 'critical' || region.threatLevel === 'high') && (
                  <g>
                    <circle
                      cx={region.center[0]}
                      cy={region.center[1]}
                      r="5"
                      fill={color}
                      opacity="0.9"
                      style={{ animation: `mapPulse 2s ease-in-out infinite` }}
                    />
                    <circle
                      cx={region.center[0]}
                      cy={region.center[1]}
                      r="5"
                      fill="none"
                      stroke={color}
                      strokeWidth="1.5"
                      opacity="0.4"
                      style={{ animation: `mapRipple 2s ease-out infinite` }}
                    />
                  </g>
                )}
              </g>
            );
          })}

          {/* Region labels */}
          {REGIONS.map((region) => {
            const isHovered = hoveredRegion === region.id;
            const [cx, cy] = region.center;
            const shouldShowLabel = region.id !== 'al-baha';
            if (!shouldShowLabel) return null;
            return (
              <text
                key={`label-${region.id}`}
                x={cx}
                y={cy + (region.id === 'riyadh' ? -5 : 0)}
                textAnchor="middle"
                fill={isHovered ? '#fff' : 'rgba(226, 232, 240, 0.65)'}
                fontSize={region.id === 'riyadh' || region.id === 'eastern' ? '11' : '9'}
                fontFamily="Cairo, sans-serif"
                fontWeight={isHovered ? '700' : '500'}
                style={{ pointerEvents: 'none', transition: 'all 0.2s' }}
              >
                {region.name}
              </text>
            );
          })}

          {/* Tooltip */}
          {tooltip && (
            <g transform={`translate(${Math.min(tooltip.x, 400)}, ${Math.max(tooltip.y - 100, 10)})`}>
              <rect
                x="-4" y="-4" width="180" height="100"
                rx="8" ry="8"
                fill="#111827"
                stroke={`${THREAT_COLORS[tooltip.region.threatLevel]}80`}
                strokeWidth="1"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
              />
              <text x="170" y="14" textAnchor="end" fill="#E2E8F0" fontSize="12" fontFamily="Cairo" fontWeight="700">
                {tooltip.region.name}
              </text>
              <line x1="0" y1="20" x2="176" y2="20" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
              <text x="170" y="34" textAnchor="end" fill="#64748B" fontSize="10" fontFamily="Cairo">كاميرات متصلة</text>
              <text x="10" y="34" fill="#0A84FF" fontSize="10" fontFamily="JetBrains Mono" fontWeight="600">
                {tooltip.region.cameras.toLocaleString('ar-SA')}
              </text>
              <text x="170" y="50" textAnchor="end" fill="#64748B" fontSize="10" fontFamily="Cairo">تهديدات نشطة</text>
              <text x="10" y="50" fill={THREAT_COLORS[tooltip.region.threatLevel]} fontSize="10" fontFamily="JetBrains Mono" fontWeight="600">
                {tooltip.region.threats}
              </text>
              <text x="170" y="66" textAnchor="end" fill="#64748B" fontSize="10" fontFamily="Cairo">نقاط الأمان</text>
              <text x="10" y="66" fill={tooltip.region.securityScore >= 85 ? '#30D158' : tooltip.region.securityScore >= 70 ? '#FFD60A' : '#FF3B30'} fontSize="10" fontFamily="JetBrains Mono" fontWeight="600">
                {tooltip.region.securityScore}%
              </text>
              <text x="170" y="82" textAnchor="end" fill="#64748B" fontSize="10" fontFamily="Cairo">مستوى التهديد</text>
              <rect
                x="6" y="72"
                width="55" height="14"
                rx="4" ry="4"
                fill={`${THREAT_COLORS[tooltip.region.threatLevel]}20`}
              />
              <text x="34" y="83" textAnchor="middle" fill={THREAT_COLORS[tooltip.region.threatLevel]} fontSize="9" fontFamily="Cairo" fontWeight="600">
                {tooltip.region.threatLevel === 'critical' ? 'حرج' :
                  tooltip.region.threatLevel === 'high' ? 'عالي' :
                    tooltip.region.threatLevel === 'medium' ? 'متوسط' :
                      tooltip.region.threatLevel === 'low' ? 'منخفض' : 'طبيعي'}
              </text>
            </g>
          )}

          {/* Scan line animation */}
          <rect
            x="0" y="0" width="560" height="80"
            fill="url(#scan-grad)"
            style={{ animation: 'scanLine 6s linear infinite' }}
          />
        </svg>

        {/* Stats overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            display: 'flex',
            gap: '8px',
          }}
        >
          <StatChip label="مناطق حرجة" value="1" color="#FF3B30" />
          <StatChip label="مناطق عالية" value="3" color="#FF9500" />
          <StatChip label="إجمالي المناطق" value="13" color="#0A84FF" />
        </div>
      </div>

      <style>{`
        @keyframes mapPulse {
          0%, 100% { r: 5; opacity: 0.9; }
          50% { r: 6; opacity: 1; }
        }
        @keyframes mapRipple {
          0% { r: 5; opacity: 0.6; }
          100% { r: 16; opacity: 0; }
        }
        @keyframes scanLine {
          0% { transform: translateY(-80px); }
          100% { transform: translateY(540px); }
        }
      `}</style>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}80` }} />
      <span style={{ color: '#94A3B8', fontSize: '11px' }}>{label}</span>
    </div>
  );
}

function StatChip({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      style={{
        padding: '4px 10px',
        borderRadius: '6px',
        background: `${color}15`,
        border: `1px solid ${color}30`,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <span style={{ color, fontSize: '13px', fontWeight: '700', fontFamily: 'JetBrains Mono, monospace' }}>{value}</span>
      <span style={{ color: '#64748B', fontSize: '10px' }}>{label}</span>
    </div>
  );
}
