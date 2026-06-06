import React, { useState, useEffect } from 'react';

// إعداد واجهة برمجية لخطوات الـ SOAR Playbook
interface PlaybookStep {
  id: number;
  title: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  timestamp?: string;
}

export default function Demo() {
  const [isAttacked, setIsAttacked] = useState(false);
  const [soarRunning, setSoarRunning] = useState(false);
  const [steps, setSteps] = useState<PlaybookStep[]>([
    { id: 1, title: 'استقبال التنبيه اللحظي من الكاميرا الحقيقية', status: 'pending' },
    { id: 2, title: 'تحليل سلوك البيانات وعزل IP المهاجم تلقائياً', status: 'pending' },
    { id: 3, title: 'إغلاق المنافذ الثغرة (RTSP Port 554) في جدار الحماية', status: 'pending' },
    { id: 4, title: 'توليد تذكرة الحادثة الأمنية وإشعار الـ SOC', status: 'pending' },
  ]);

  // محاكاة استجابة الـ SOAR الآلية خطوة بخطوة عند حدوث الهجوم
  useEffect(() => {
    if (isAttacked && !soarRunning) {
      setSoarRunning(true);
      let currentStep = 0;

      const interval = setInterval(() => {
        if (currentStep < steps.length) {
          setSteps(prevSteps =>
            prevSteps.map((step, idx) =>
              idx === currentStep
                ? { ...step, status: 'completed', timestamp: new Date().toLocaleTimeString() }
                : idx === currentStep + 1
                ? { ...step, status: 'processing' }
                : step
            )
          );
          currentStep++;
        } else {
          clearInterval(interval);
        }
      }, 3000); // الانتقال بين خطوات الدفاع كل 3 ثوانٍ

      return () => clearInterval(interval);
    }
  }, [isAttacked]);

  // إعادة ضبط المحاكاة لوضعها الطبيعي
  const resetSimulation = () => {
    setIsAttacked(false);
    setSoarRunning(false);
    setSteps([
      { id: 1, title: 'استقبال التنبيه اللحظي من الكاميرا الحقيقية', status: 'pending' },
      { id: 2, title: 'تحليل سلوك البيانات وعزل IP المهاجم تلقائياً', status: 'pending' },
      { id: 3, title: 'إغلاق المنافذ الثغرة (RTSP Port 554) في جدار الحماية', status: 'pending' },
      { id: 4, title: 'توليد تذكرة الحادثة الأمنية وإشعار الـ SOC', status: 'pending' },
    ]);
  };

  return (
    <div className="p-8 min-h-screen bg-[#0b0f19] text-white">
      {/* الهيدر العلوي */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#10b981]">🎮 بيئة المحاكاة الحية والاستجابة الآلية (SOAR Demo)</h1>
          <p className="text-gray-400 mt-1">ربط تفاعلي مباشر بين الكاميرا الحقيقية وسيناريوهات التصدي السيبراني الذاتي</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsAttacked(true)} 
            disabled={isAttacked}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${isAttacked ? 'bg-gray-700 text-gray-400' : 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/40'}`}
          >
            💥 إطلاق هجوم محاكي (Simulate Attack)
          </button>
          <button 
            onClick={resetSimulation}
            className="px-6 py-2 bg-gray-850 hover:bg-gray-800 border border-gray-700 rounded-lg font-bold"
          >
            🔄 إعادة ضبط النظام
          </button>
        </div>
      </div>

      {/* ساحة العرض الرئيسية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* القسم الأيسر: شاشة بث الكاميرا الحية */}
        <div className="bg-[#111827] rounded-xl p-6 border border-gray-800 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              📹 تدفق فيديو الكاميرا الحية (IoT Stream)
              {isAttacked ? <span className="text-red-500 animate-pulse text-sm">● UNDER ATTACK</span> : <span className="text-green-500 text-sm">● LIVE</span>}
            </h2>
            
            {/* نافذة الفيديو الافتراضية - هنا يمكنك وضع رابط كاميرتك الحقيقي */}
            <div className={`w-full h-80 rounded-lg flex flex-col items-center justify-center border-2 transition-all duration-500 ${isAttacked ? 'border-red-600 bg-red-950/20' : 'border-emerald-600 bg-emerald-950/10'}`}>
              {isAttacked ? (
                <div className="text-center animate-bounce">
                  <span className="text-6xl">⚠️</span>
                  <p className="text-red-500 font-bold text-xl mt-4">تم رصد هجوم حجب خدمة وتزوير حزم الفيديو!</p>
                  <p className="text-gray-400 text-sm mt-1">Target IP: 192.168.10.51 | Attack Vector: RTSP Flooding</p>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <span className="text-6xl block mb-4">📸</span>
                  <p className="text-emerald-400 font-bold">بث مستقر وآمن من الكاميرا</p>
                  <p className="text-xs text-gray-500 mt-1">يمكنك دمج كود بث الكاميرا (HTTP/WebRTC) هنا مباشرة</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 bg-[#1f2937] p-4 rounded-lg border border-gray-700">
            <p className="text-sm font-semibold text-gray-300">📄 بيانات الكاميرا الفنية:</p>
            <p className="text-xs text-gray-400 mt-1">عنوان الـ IP: <code className="text-emerald-400">192.168.10.51</code> | البروتوكول: <code className="text-emerald-400">RTSP</code> | حالة الأمان: {isAttacked ? '❌ مخترقة جزئياً' : '✅ محمية'}</p>
          </div>
        </div>

        {/* القسم الأيمن: محرك الاستجابة الآلية SOAR Playbook */}
        <div className="bg-[#111827] rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            🤖 محرك الاستجابة التلقائية (SOAR Playbook Engine)
          </h2>

          <div className="space-y-6 relative border-r-2 border-gray-800 pr-6 mr-2">
            {steps.map((step) => (
              <div key={step.id} className="relative">
                {/* أيقونة الحالة الدائرية */}
                <div className={`absolute -right-[35px] top-0 w-4 h-4 rounded-full border-2 bg-[#111827] transition-all duration-300 ${
                  step.status === 'completed' ? 'border-emerald-500 bg-emerald-500' :
                  step.status === 'processing' ? 'border-yellow-500 animate-ping' : 'border-gray-750'
                }`} />

                <div className={`p-4 rounded-lg border transition-all duration-300 ${
                  step.status === 'completed' ? 'bg-emerald-950/20 border-emerald-900/50 text-emerald-300' :
                  step.status === 'processing' ? 'bg-yellow-950/20 border-yellow-800 text-yellow-300' : 'bg-gray-900/40 border-gray-800 text-gray-500'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm">الخطوة {step.id}: {step.title}</span>
                    {step.status === 'completed' && <span className="text-xs bg-emerald-900/60 px-2 py-0.5 rounded text-emerald-400">✓ نُفّذت بنجاح {step.timestamp}</span>}
                    {step.status === 'processing' && <span className="text-xs bg-yellow-900/60 px-2 py-0.5 rounded text-yellow-400 animate-pulse">⏳ جاري التنفيذ...</span>}
                    {step.status === 'pending' && <span className="text-xs bg-gray-800 px-2 py-0.5 rounded text-gray-400">💤 قيد الانتظار</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {soarRunning && (
            <div className="mt-6 bg-emerald-950/10 border border-emerald-900/50 p-4 rounded-lg text-center text-emerald-400 font-bold animate-pulse text-sm">
              🛡️ تم احتواء التهديد بالكامل بنجاح وعزل المهاجم ذاتياً عبر نظام SOAR!
            </div>
          )}
        </div>

      </div>
    </div>
  );
}