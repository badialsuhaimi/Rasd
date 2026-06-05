import React from 'react';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Target, Cpu } from 'lucide-react';

const PREDICTIONS = [
  {
    id: 1,
    title: 'ارتفاع محتمل في هجمات القوة الغاشمة',
    probability: 87,
    region: 'المنطقة الشرقية',
    timeframe: 'خلال 6 ساعات',
    color: '#FF3B30',
    type: 'prediction',
  },
  {
    id: 2,
    title: 'نشاط شبكة بوت جديد متوقع',
    probability: 72,
    region: 'الرياض',
    timeframe: 'خلال 12 ساعة',
    color: '#FF9500',
    type: 'prediction',
  },
  {
    id: 3,
    title: 'استهداف محتمل لأجهزة Hikvision',
    probability: 65,
    region: 'جميع المناطق',
    timeframe: 'خلال 24 ساعة',
    color: '#FFD60A',
    type: 'prediction',
  },
  {
    id: 4,
    title: 'انخفاض في هجمات DDoS متوقع',
    probability: 80,
    region: 'تبوك',
    timeframe: 'خلال 3 ساعات',
    color: '#30D158',
    type: 'improvement',
  },
];

const RECOMMENDATIONS = [
  {
    id: 1,
    text: 'تحديث فوري لبرامج الكاميرات في المنطقة الشرقية - ثغرة حرجة مكتشفة',
    priority: 'عاجل',
    color: '#FF3B30',
  },
  {
    id: 2,
    text: 'تفعيل المصادقة الثنائية على جميع حسابات إدارة النظام',
    priority: 'مهم',
    color: '#FF9500',
  },
  {
    id: 3,
    text: 'مراجعة قواعد جدار الحماية لمنافذ RTSP و ONVIF',
    priority: 'متوسط',
    color: '#FFD60A',
  },
  {
    id: 4,
    text: 'زيادة تكرار نسخ البيانات الاحتياطية في الحدود الشمالية',
    priority: 'منخفض',
    color: '#30D158',
  },
];

export function AIInsights() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', overflowY: 'auto', scrollbarWidth: 'none' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(10, 132, 255, 0.1), rgba(191, 90, 242, 0.1))',
          border: '1px solid rgba(10, 132, 255, 0.2)',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '56px', height: '56px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #0A84FF, #BF5AF2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 24px rgba(10, 132, 255, 0.3)',
            flexShrink: 0,
          }}
        >
          <Brain size={28} color="#fff" />
        </div>
        <div style={{ textAlign: 'right' }}>
          <h2 style={{ color: '#E2E8F0', margin: 0, fontSize: '18px', fontWeight: '800' }}>محرك الذكاء الاصطناعي</h2>
          <p style={{ color: '#94A3B8', margin: '4px 0 0', fontSize: '12px' }}>
            تحليل استباقي للتهديدات · توقعات بدقة 94.3% · آخر تحديث: منذ 47 ثانية
          </p>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: '12px' }}>
          <AIStat label="دقة التنبؤ" value="94.3%" color="#30D158" />
          <AIStat label="نماذج نشطة" value="7" color="#0A84FF" />
          <AIStat label="توقعات اليوم" value="142" color="#BF5AF2" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Predictions */}
        <div
          style={{
            background: '#111827',
            borderRadius: '12px',
            border: '1px solid rgba(10, 132, 255, 0.18)',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TrendingUp size={16} color="#0A84FF" />
            <span style={{ color: '#E2E8F0', fontSize: '14px', fontWeight: '700' }}>توقعات التهديدات</span>
          </div>
          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {PREDICTIONS.map((pred) => (
              <div
                key={pred.id}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: `${pred.color}08`,
                  border: `1px solid ${pred.color}20`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                  <div
                    style={{
                      padding: '2px 8px', borderRadius: '4px',
                      background: `${pred.color}15`,
                      color: pred.color, fontSize: '10px', fontWeight: '600', whiteSpace: 'nowrap',
                    }}
                  >
                    {pred.timeframe}
                  </div>
                  <span style={{ color: '#CBD5E1', fontSize: '12px', fontWeight: '500', textAlign: 'right' }}>{pred.title}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#475569', fontSize: '10px', whiteSpace: 'nowrap' }}>
                    {pred.region}
                  </span>
                  <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div
                      style={{ width: `${pred.probability}%`, height: '100%', background: pred.color, borderRadius: '2px', opacity: 0.8 }}
                    />
                  </div>
                  <span
                    style={{
                      color: pred.color,
                      fontSize: '12px',
                      fontWeight: '700',
                      fontFamily: 'JetBrains Mono, monospace',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {pred.probability}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div
          style={{
            background: '#111827',
            borderRadius: '12px',
            border: '1px solid rgba(10, 132, 255, 0.18)',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Lightbulb size={16} color="#FFD60A" />
            <span style={{ color: '#E2E8F0', fontSize: '14px', fontWeight: '700' }}>التوصيات الأمنية</span>
          </div>
          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {RECOMMENDATIONS.map((rec) => (
              <div
                key={rec.id}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: `${rec.color}06`,
                  border: `1px solid ${rec.color}18`,
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: `${rec.color}15`,
                    color: rec.color,
                    fontSize: '10px',
                    fontWeight: '600',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {rec.priority}
                </div>
                <span style={{ color: '#94A3B8', fontSize: '11px', lineHeight: 1.5, textAlign: 'right' }}>{rec.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Model status */}
      <div
        style={{
          background: '#111827',
          borderRadius: '12px',
          border: '1px solid rgba(10, 132, 255, 0.18)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Cpu size={16} color="#0A84FF" />
          <span style={{ color: '#E2E8F0', fontSize: '14px', fontWeight: '700' }}>حالة نماذج الذكاء الاصطناعي</span>
        </div>
        <div style={{ padding: '12px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {[
            { name: 'كشف الشذوذ', status: 'نشط', accuracy: 96.2, color: '#30D158' },
            { name: 'تصنيف التهديدات', status: 'نشط', accuracy: 94.8, color: '#0A84FF' },
            { name: 'توقع الهجمات', status: 'نشط', accuracy: 91.5, color: '#BF5AF2' },
            { name: 'تحليل السلوك', status: 'تحديث', accuracy: 88.3, color: '#FFD60A' },
          ].map((model, i) => (
            <div
              key={i}
              style={{
                padding: '12px',
                borderRadius: '8px',
                background: `${model.color}08`,
                border: `1px solid ${model.color}20`,
                textAlign: 'right',
              }}
            >
              <div style={{ color: model.color, fontSize: '10px', fontWeight: '600', marginBottom: '4px' }}>{model.status}</div>
              <div style={{ color: '#E2E8F0', fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>{model.name}</div>
              <div
                style={{
                  color: model.color,
                  fontSize: '20px',
                  fontWeight: '800',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {model.accuracy}%
              </div>
              <div style={{ color: '#475569', fontSize: '9px', marginTop: '2px' }}>دقة النموذج</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ color, fontSize: '20px', fontWeight: '800', fontFamily: 'JetBrains Mono, monospace' }}>{value}</div>
      <div style={{ color: '#64748B', fontSize: '10px', marginTop: '2px' }}>{label}</div>
    </div>
  );
}
