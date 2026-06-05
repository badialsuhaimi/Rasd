import React from 'react';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: '16px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '72px', height: '72px', borderRadius: '20px',
          background: 'rgba(10, 132, 255, 0.08)',
          border: '1px solid rgba(10, 132, 255, 0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#0A84FF',
          boxShadow: '0 0 24px rgba(10, 132, 255, 0.2)',
        }}
      >
        {icon || <Construction size={32} />}
      </div>
      <div>
        <h2 style={{ color: '#E2E8F0', margin: '0 0 8px', fontSize: '20px', fontWeight: '700' }}>{title}</h2>
        <p style={{ color: '#64748B', margin: 0, fontSize: '13px', maxWidth: '360px', lineHeight: 1.6 }}>
          {description || 'هذه الصفحة قيد التطوير وستكون متاحة في الإصدار القادم من المنصة.'}
        </p>
      </div>
      <div
        style={{
          padding: '8px 20px',
          borderRadius: '8px',
          background: 'rgba(10, 132, 255, 0.08)',
          border: '1px solid rgba(10, 132, 255, 0.2)',
          color: '#60A5FA',
          fontSize: '12px',
        }}
      >
        قيد التطوير — الإصدار 2.1
      </div>
    </div>
  );
}
