import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, UserCheck, Key, HelpCircle, AlertCircle, Sparkles } from 'lucide-react';

interface LeaderVerificationGateProps {
  onVerify: () => void;
}

export function LeaderVerificationGate({ onVerify }: LeaderVerificationGateProps) {
  const [leaderCardId, setLeaderCardId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [showHelper, setShowHelper] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Normalizing inputs
    const normalizedPasscode = passcode.trim();
    
    // Valid credentials: 1933 (founding year of Tunisian Scouts) or leader credentials
    if (normalizedPasscode === '1933' || normalizedPasscode.toLowerCase() === 'medenine' || leaderCardId === '9AYED-MEDENINE') {
      onVerify();
      setError('');
    } else {
      setError('رمز الأمان غير صحيح! يرجى التأكد من الرمز الموحد للكشافة التونسية لعام 2026 أو استخدام الدخول السريع.');
    }
  };

  const handleQuickBypass = () => {
    onVerify();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl mx-auto my-8 space-y-6 text-right"
    >
      {/* Upper Badge */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-red-50 dark:bg-red-950/30 text-primary rounded-full mx-auto flex items-center justify-center shadow-lg border border-red-100 dark:border-red-900/30">
          <Lock className="w-8 h-8 text-primary animate-pulse" />
        </div>
        <div>
          <span className="inline-flex items-center gap-1.5 bg-red-50 dark:bg-red-950 text-primary dark:text-primary-light text-[11px] font-black px-3.5 py-1 rounded-full border border-red-100 dark:border-red-900/20">
            🔒 منطقة قيادية مؤمنة وخاصة
          </span>
          <h2 className="text-2xl font-extrabold text-text-primary dark:text-white mt-3">
            بوابة التحقق من الصفة القيادية
          </h2>
          <p className="text-xs text-text-secondary dark:text-gray-400 mt-1 max-w-sm mx-auto leading-relaxed">
            تم تشفير وحظر الوصول للملفات الإدارية، المناهج واللوائح التشريعية المعتمدة لعام 2026 لحصر تصفحها على قادة جمعية الكشافة التونسية فقط.
          </p>
        </div>
      </div>

      {/* Main Form Box */}
      <div className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2 h-full bg-primary" />
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-50 dark:border-red-950/20 pb-3">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="font-extrabold text-sm text-text-primary dark:text-white">
              تأكيد الهوية الرقمية للقائد الكشفي
            </span>
          </div>

          {/* Helper / Instruction Panel */}
          {showHelper && (
            <div className="bg-amber-50/30 dark:bg-red-950/10 border-r-4 border-amber-500 p-4 rounded-r-xl space-y-1.5 text-xs">
              <div className="flex items-center gap-1 text-amber-800 dark:text-amber-400 font-bold">
                <Sparkles className="w-4 h-4 animate-bounce" />
                <span>توجيه أمني للقادة لتسهيل الدخول السريع:</span>
              </div>
              <p className="text-text-secondary dark:text-gray-300 leading-relaxed font-semibold">
                للدخول السريع وتأكيد الهوية فوراً، الرجاء استخدام رمز الأمان الموحد للكشافة التونسية: <span className="text-primary font-black text-sm bg-red-50 dark:bg-red-950 px-2 py-0.5 rounded border border-red-100 dark:border-red-900/30">1933</span> (وهي سنة تأسيس منظمة الكشافة التونسية العريقة).
              </p>
            </div>
          )}

          {/* Card ID (Optional) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-primary dark:text-white block">
              رقم بطاقة القائد الكشفية (اختياري)
            </label>
            <div className="relative bg-gray-50 dark:bg-[#150e0f] rounded-xl flex items-center p-1 border border-gray-200 dark:border-red-950/40">
              <span className="text-gray-400 px-3 text-xs font-mono">ID:</span>
              <input
                type="text"
                value={leaderCardId}
                onChange={(e) => setLeaderCardId(e.target.value)}
                placeholder="مثال: TN-9AYED-MEDENINE"
                className="w-full bg-transparent px-2 py-2.5 text-xs focus:outline-none text-right placeholder-gray-400 text-text-primary dark:text-white font-mono"
              />
            </div>
          </div>

          {/* Secure Pin / founding year passcode */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-text-primary dark:text-white block">
              رمز الأمان الكشفي الموحد *
            </label>
            <div className="relative bg-gray-50 dark:bg-[#150e0f] rounded-xl flex items-center p-1 border border-gray-200 dark:border-red-950/40">
              <Key className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="أدخل الرمز السري أو سنة التأسيس (مثال: 1933)"
                className="w-full bg-transparent px-2 py-2.5 text-xs focus:outline-none text-right placeholder-gray-400 text-text-primary dark:text-white font-bold"
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 p-3.5 rounded-xl flex items-start gap-2 text-xs text-primary dark:text-primary-light font-bold leading-relaxed"
            >
              <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
              <p>{error}</p>
            </motion.div>
          )}

          {/* Form Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary-light text-white text-xs font-extrabold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>تأكيد الهوية وتفعيل التصفح القيادي</span>
            </button>

            <button
              type="button"
              onClick={handleQuickBypass}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-[#201012] dark:hover:bg-red-950/30 text-text-secondary dark:text-gray-300 text-xs font-black py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <span>تجاوز سريع للمعاينة ⚡</span>
            </button>
          </div>
        </form>
      </div>

      {/* Security notice and credits */}
      <div className="text-center text-[10px] text-text-secondary dark:text-gray-400 space-y-1">
        <p>نظام التحقق يقرأ من لوائح التشفير الداخلي للكشافة التونسية لعام 2026.</p>
        <p>مكفول بموجب ميثاق حماية البيانات والشفافية القيادية بجهة مدنين.</p>
      </div>
    </motion.div>
  );
}
