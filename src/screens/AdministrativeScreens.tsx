import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Award, 
  ChevronRight, 
  Settings, 
  BookOpen, 
  Compass, 
  Briefcase, 
  ShieldCheck, 
  HelpCircle, 
  Calculator, 
  TrendingUp, 
  AlertCircle, 
  AwardIcon, 
  MapPin, 
  Layers, 
  Building2,
  CheckCircle,
  FolderDot,
  UserCheck2,
  CheckSquare,
  Sparkles
} from 'lucide-react';
import { LEADERSHIP_ROLES, SELECTION_PROCESS } from '../data/appData';
import { LeadershipRole } from '../types';

// ==========================================
// 1. LEADERSHIP SCREEN
// ==========================================
export function LeadershipScreen() {
  const [activeRole, setActiveRole] = useState<LeadershipRole | null>(LEADERSHIP_ROLES[0]);
  const [activeTab, setActiveTab] = useState<'pioneers' | 'national' | 'general'>('national');

  const filteredRoles = LEADERSHIP_ROLES.filter(role => role.category === activeTab);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary dark:text-white">المناصب والمجلس القيادي للكشافة التونسية</h1>
        <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">تصفّح الهيكل التنظيمي التقييمي، صلاحيات كل منصب ومسار ترقي القادة</p>
      </div>

      {/* Category Tabs */}
      <div className="flex bg-gray-100/60 dark:bg-[#150e0f] p-1 rounded-2xl border border-gray-100 dark:border-red-950/20 max-w-md">
        {(['national', 'general', 'pioneers'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-secondary dark:text-gray-300 hover:bg-white/40 dark:hover:bg-[#201012]'
            }`}
          >
            {tab === 'national' ? 'الهياكل الوطنية العليا' : tab === 'general' ? 'القيادة العامة' : 'الرواد والأحباء'}
          </button>
        ))}
      </div>

      {/* Interactive 2-Column Split: Node Tree on right/left, detail preview window on the other */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Leadership node selectors */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 p-5 rounded-3xl shadow-sm space-y-3">
            <span className="text-xs font-bold text-text-secondary dark:text-gray-400 block pb-2 border-b border-gray-50 dark:border-red-950/20">اختر منصب قراءة الصلاحيات:</span>
            {filteredRoles.map((role) => (
              <button
                key={role.id}
                onClick={() => setActiveRole(role)}
                className={`w-full p-4 rounded-xl text-right transition-all flex items-center justify-between border ${
                  activeRole?.id === role.id 
                    ? 'bg-primary/5 dark:bg-primary/20 border-primary text-primary dark:text-primary-light font-bold' 
                    : 'bg-gray-50 dark:bg-[#150e0f] border-gray-100 dark:border-red-950/20 text-text-secondary dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-[#201012]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${activeRole?.id === role.id ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-[#201012]'}`}>
                    <Users className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-sm">{role.title}</span>
                </div>
                {role.membersCount && (
                  <span className="text-[10px] bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400 font-bold px-2 py-0.5 rounded-full">
                    {role.membersCount} عضواً
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Role preview window */}
        <div className="lg:col-span-7">
          {activeRole ? (
            <motion.div 
              key={activeRole.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 p-6 md:p-8 rounded-3xl shadow-sm space-y-6 text-right"
            >
              <div>
                <h3 className="font-extrabold text-xl text-text-primary dark:text-white">{activeRole.title}</h3>
                <span className="text-xs text-secondary mt-1 block font-bold">جهة السلطة: المجلس الأعلى للكشافة التونسية</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-text-primary dark:text-white">وصف وحوكمة الدور الكشفي:</h4>
                  <p className="text-sm text-text-secondary dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-red-950/25 p-4 rounded-2xl border-r-4 border-primary font-medium">
                    {activeRole.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-3">
                    <h5 className="font-bold text-sm text-text-primary dark:text-white border-b border-gray-50 pb-1.5 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      <span>المسؤوليات والصلاحيات القانونية:</span>
                    </h5>
                    <ul className="space-y-2 text-xs text-text-secondary dark:text-gray-300 leading-relaxed font-semibold">
                      {activeRole.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-primary">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-sm text-text-primary dark:text-white border-b border-gray-50 pb-1.5 flex items-center gap-1">
                      <Award className="w-4 h-4 text-secondary" />
                      <span>المؤهلات المطلوبة للتولية:</span>
                    </h5>
                    <ul className="space-y-2 text-xs text-text-secondary dark:text-gray-300 leading-relaxed font-semibold">
                      {activeRole.qualifications.map((qual, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-secondary">•</span>
                          <span>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 dark:bg-[#150e0f] h-full rounded-3xl border border-dashed border-gray-200 dark:border-red-950/20 flex flex-col items-center justify-center p-8 text-center space-y-2">
              <Users className="w-12 h-12 text-gray-300 dark:text-gray-700" strokeWidth="1.5" />
              <p className="text-sm font-bold text-text-primary dark:text-white">الرجاء اختيار أحد القادة لاستعراض التفاصيل</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// 2. STRUCTURE SCREEN
// ==========================================
export function StructureScreen() {
  const levels = [
    {
      title: '1. الهيكلية الوطنية العليا (المركزية في تونس العاصمة)',
      sub: 'مسؤولة عن التخطيط الكشفي الشامل وصناعة المناهج التربوية والتمثيل الدولي',
      elements: [
        { name: 'المؤتمر الوطني', desc: 'أعلى سلطة تقريرية تشريعية للكشافة، ينتخب القائد العام وأعضاء مجلس الشرف الأعلى.' },
        { name: 'المجلس الأعلى', desc: 'جهاز تشريعي رقابي عام بين المؤتمرات يقر القرارات الحاكمة والسياسات المالية لـ الكشافة تونس.' },
        { name: 'القيادة العامة', desc: 'المجلس التنفيذي الأهم كشعب وإدارات لتنفيذ وتسيير شؤون الأفواج المحلية والاتحادات للكشافة التونسية.' }
      ],
      icon: Building2,
      color: 'border-orange-100 dark:border-orange-950/20 bg-orange-50/50 dark:bg-[#201c18]'
    },
    {
      title: '2. الهيكلية الجهوية (مستوى الولايات والجهات الـ 24)',
      sub: 'تنسيق الجهود بين القادة والأفواج ضمن النطاق الجغرافي للولايات الكشفية',
      elements: [
        { name: 'المؤتمر الجهوي للولاية', desc: 'هيئة تجميع قادة الأفواج، ينتخب المفوض الجهوي والمكلفين ويسجل لجان الدعم.' },
        { name: 'الهيئة الجهوية (مفوضية الولاية)', desc: 'تتابع خطط الأفواج وتقدم رخص المخيمات والرحلات الطويلة للبرق والأفواج.' },
        { name: 'المجلس الجهوي الاستشاري', desc: 'يضم خبراء وقدماء الكشافة بالولاية لتقديم العون وتوجيه المشاريع التنموية.' }
      ],
      icon: MapPin,
      color: 'border-red-100 dark:border-red-950/20 bg-red-50/50 dark:bg-[#201012]'
    },
    {
      title: '3. الهيكلية المحلية (الأفواج ووحدات النشاط الميدانية)',
      sub: 'التنشيط والتربية المباشرة للأطفال والفتية الكشفية في الفروع بمختلف ربوع الجمهورية',
      elements: [
        { name: 'هيئة الفوج ومجلسه', desc: 'مسؤول المتابعة الإدارية وسجلات الإمساك لجميع المنخرطين والأموال.' },
        { name: 'مجلس الشرف للفوج', desc: 'يضم قادة الوحدات وعائلات الفتية للتزكية، فض الإشكالات، والمكافآت التقديرية.' },
        { name: 'وحدات النشاط الميداني', desc: 'فرق البراعم، الأشبال، الكشافة، الجوالة، حيث يطبق المنهج التربوي بشكل عملي.' }
      ],
      icon: Layers,
      color: 'border-teal-100 dark:border-teal-950/20 bg-teal-50/50 dark:bg-[#15201d]'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary dark:text-white">الدليل الهيكلي والتنطيمي للأفواج</h1>
        <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">
          تعرف على هيئات وصلاحيات المستويات الثلاث للكشافة التونسية (وطني، جهوي، ومحلي)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {levels.map((level, idx) => {
          const LevelIcon = level.icon;
          return (
            <div 
              key={idx}
              className={`border rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-5 ${level.color}`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#150e0f] text-primary dark:text-primary-light flex items-center justify-center shadow-xs">
                    <LevelIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-text-primary dark:text-white leading-snug">{level.title}</h3>
                </div>
                <p className="text-xs text-text-secondary dark:text-gray-400 leading-relaxed font-semibold">
                  {level.sub}
                </p>
              </div>

              <div className="space-y-3.5 pt-2">
                {level.elements.map((elem, eIdx) => (
                  <div key={eIdx} className="bg-white/80 dark:bg-[#150e0f] p-4 rounded-xl border border-black/5 dark:border-red-950/20 relative">
                    <span className="font-bold text-xs text-primary dark:text-primary-light block">{elem.name}</span>
                    <p className="text-[11px] text-text-secondary dark:text-gray-400 mt-1.5 leading-relaxed font-medium">
                      {elem.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ==========================================
// 3. SELECTION SCREEN
// ==========================================
export function SelectionScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary dark:text-white">آلية ومنهجية الاختيار للبرامج الدولية والوطنية</h1>
        <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">توضيح نظام تقدير المترشحين، وتطبيق مصفوفة المائة خيار لضمان الشفافية</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Guidelines columns */}
        <div className="lg:col-span-12 space-y-6">
          <div className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 p-6 rounded-3xl shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-text-primary dark:text-white border-b border-gray-50 dark:border-red-950/20 pb-3">مستويات الترشيح التنافسي الكشفي</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SELECTION_PROCESS.levels.map((lvl, index) => (
                <div key={index} className="bg-gray-50/50 dark:bg-[#150e0f] p-5 rounded-2xl border border-gray-100 dark:border-red-950/20 space-y-3 text-right">
                  <span className="text-[10px] bg-secondary/10 text-secondary dark:bg-orange-950/30 dark:text-orange-400 font-bold px-3 py-1 rounded-full">{lvl.type}</span>
                  <h4 className="font-extrabold text-sm text-text-primary dark:text-white leading-normal">{lvl.name}</h4>
                  <p className="text-xs text-text-secondary dark:text-gray-400 leading-relaxed font-semibold pb-2 border-b border-gray-100 dark:border-red-950/20">
                    {lvl.description}
                  </p>
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-extrabold text-text-primary dark:text-white block">خطوات سلك المترشح:</span>
                    <ul className="space-y-1.5 text-[11px] text-text-secondary dark:text-gray-400 leading-normal font-medium">
                      {lvl.steps.map((st, sIdx) => (
                        <li key={sIdx} className="flex gap-1.5 items-start">
                          <span className="text-primary">{sIdx + 1}.</span>
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scoring Index distribution guide */}
          <div className="bg-gradient-to-tr from-red-50 to-red-100/50 dark:from-red-950/20 dark:to-[#201012] border border-red-100 dark:border-red-900/30 rounded-3xl p-6 md:p-8 space-y-5">
            <div>
              <h3 className="font-extrabold text-lg text-primary dark:text-primary-light">مصفوفة توزيع المائة نقطة (100% الشاملة)</h3>
              <p className="text-xs text-text-secondary dark:text-gray-300 mt-1">تعتمد القيادة العامة هذه الحدود لتصفية المقبولين دولياً ووطنياً لضمان النزاهية التخطيطية التربوية.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {SELECTION_PROCESS.scoringPoints.map((pt, idx) => (
                <div key={idx} className="bg-white dark:bg-[#110708] border border-red-100/40 dark:border-red-900/30 p-4 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden text-right">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-secondary">{pt.weight}%</span>
                    <span className="text-[10px] text-text-secondary dark:text-gray-400 font-bold">الحصة</span>
                  </div>
                  <div>
                    <span className="font-extrabold text-xs text-text-primary dark:text-white block leading-snug">{pt.category}</span>
                    <p className="text-[10px] text-text-secondary dark:text-gray-400 mt-1.5 leading-relaxed font-semibold">
                      {pt.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// 4. CALCULATOR SCREEN (حاسبة فرص الترشح)
// ==========================================
export function CalculatorScreen() {
  const [experienceYears, setExperienceYears] = useState(3); // Up to 30 pts
  const [scoutingRank, setScoutingRank] = useState('none'); // Up to 25 pts (Badge rank)
  const [assessmentScore, setAssessmentScore] = useState('excellent'); // Up to 20 pts
  const [educationLevel, setEducationLevel] = useState('bac'); // Up to 15 pts
  const [scoutingCommitment, setScoutingCommitment] = useState('full'); // Up to 10 pts

  // Dynamic calculations inside function
  const calculateTotal = () => {
    let experiencePoints = Math.min(experienceYears * 3, 30);
    
    let rankPoints = 0;
    if (scoutingRank === 'wood_badge') rankPoints = 15;
    if (scoutingRank === 'assistant_trainer') rankPoints = 20;
    if (scoutingRank === 'trainer') rankPoints = 25;

    let assessmentPoints = 0;
    if (assessmentScore === 'excellent') assessmentPoints = 20;
    if (assessmentScore === 'very_good') assessmentPoints = 15;
    if (assessmentScore === 'good') assessmentPoints = 10;

    let educationPoints = 0;
    if (educationLevel === 'bac') educationPoints = 10;
    if (educationLevel === 'licence') educationPoints = 12;
    if (educationLevel === 'master_doctorate') educationPoints = 15;

    let commitmentPoints = 0;
    if (scoutingCommitment === 'full') commitmentPoints = 10;
    if (scoutingCommitment === 'medium') commitmentPoints = 7;
    if (scoutingCommitment === 'low') commitmentPoints = 4;

    return experiencePoints + rankPoints + assessmentPoints + educationPoints + commitmentPoints;
  };

  const totalPoints = calculateTotal();

  const getResultsAndAdvice = () => {
    if (totalPoints >= 80) {
      return {
        status: 'مؤهل بامتياز لـ البرامج الدولية والوطنية 🏆',
        color: 'text-primary bg-primary/5 dark:bg-primary/20 dark:text-primary-light border-primary/20',
        advice: 'سيرتك الكشفية ممتازة وتستوفي معايير اللجنة الكشفية الدولية التونسية. يمكنك التقديم للتمثيل والمؤتمرات الخارجية بكل ثقة. ننصحك بإعداد ملف الترشح بلغتين (العربية والفرنسية أو الإنجليزية) مع إبراز مساهمتك في مشروع أكاديمية دار الفياضة.'
      };
    } else if (totalPoints >= 55) {
      return {
        status: 'مؤهل للمشاركة بـ البرامج والمشاريع الوطنية الكبرى 🇹🇳',
        color: 'text-secondary bg-orange-50 dark:bg-orange-950/20 dark:text-orange-400 border-orange-100 dark:border-orange-900/10',
        advice: 'نقاطك جيدة وتؤهلك لقيادة لجان وطنية هامة أو المشاركة في منتديات الشباب بالجمهورية. لزيادة فرصتك وتأهلك الدولي، ننصحك بالعمل على استكمال مشروع الشارة الكشفية الخشبية بشكل رسمي وحضور دورات تخصصية إضافية في الإدارة أو الإعلام.'
      };
    } else {
      return {
        status: 'مؤهل محلياً للتنمية والعمل بالوحدات الكشفية جهوياً 🤝',
        color: 'text-[#D32F2F] bg-red-50 dark:bg-red-950/20 dark:text-red-400 border-red-100 dark:border-red-900/10',
        advice: 'أنت في بداية طريقك ومؤهلك ممتاز لدعم قادة الأفواج والوحدات بالولاية. لزيادة نقاط التأهيل وحصد مراتب متقدمة، يرجى زيادة فترة الممارسة الميدانية، واستكمال دورة قادة الوحدات الأساسية، والحرص على التواجد المستمر في مخيمات وندوات تنمية القيادة بجهتك.'
      };
    }
  };

  const resultDetails = getResultsAndAdvice();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary dark:text-white">حاسبة فرص الترشح وتقييم الأهلية</h1>
        <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">تحديد رصيد نقاطك والمناصب الأكثر ملاءمة لخبرات كشفية تونسية لعام 2026</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Sliders and Selection fields */}
        <div className="lg:col-span-7 bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-text-primary dark:text-white">حقول تفاعلية لحساب نقاط السيرة كشفياً</h3>

          <div className="space-y-5">
            {/* Experience Years Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-text-primary dark:text-white">
                <span>1. سنوات الخبرة والعمل الميداني الموثق بالأفواج</span>
                <span className="text-primary dark:text-primary-light font-black">{experienceYears} سنوات ({Math.min(experienceYears * 3, 30)} ن)</span>
              </div>
              <input 
                type="range"
                min="1"
                max="12"
                value={experienceYears}
                onChange={(e) => setExperienceYears(parseInt(e.target.value))}
                className="w-full text-primary accent-primary h-2 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[10px] text-text-secondary dark:text-gray-400 block font-semibold">كل سنة توازي 3 نقاط حتى 30 نقطة حداً أقصى.</span>
            </div>

            {/* Accreditations */}
            <div>
              <label className="text-xs font-bold text-text-primary dark:text-gray-300 block mb-1">2. الرتبة والشارة الكشفية الحاصل عليها رسمياً</label>
              <select
                value={scoutingRank}
                onChange={(e) => setScoutingRank(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#150e0f] border border-gray-200 dark:border-red-950/20 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-right font-bold text-text-primary dark:text-white"
              >
                <option value="none">قائد وحدة لم يتلقى توسيم الشارة الكشفية (0 ن)</option>
                <option value="wood_badge">قائد حاصل على الشارة الخشبية كاملة (15 ن)</option>
                <option value="assistant_trainer">قائد برتبة مساعد قائد تدريب كشفي (20 ن)</option>
                <option value="trainer">قائد مبرمج ومعتمد كـ قائد تدريب رسمي (25 ن)</option>
              </select>
            </div>

            {/* Audit Score selector */}
            <div>
              <label className="text-xs font-bold text-text-primary dark:text-gray-300 block mb-1">3. تقييم النشاط والأداء السابق (من المفوضين والمفتشين)</label>
              <div className="grid grid-cols-3 gap-2 bg-gray-50 dark:bg-[#150e0f] p-1 rounded-xl border border-gray-200 dark:border-red-950/20">
                {(['excellent', 'very_good', 'good'] as const).map((score) => (
                  <button
                    key={score}
                    onClick={() => setAssessmentScore(score)}
                    className={`text-xs font-bold py-2.5 rounded-lg transition-all ${
                      assessmentScore === score
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-text-secondary dark:text-gray-300 hover:bg-white/50'
                    }`}
                  >
                    {score === 'excellent' ? 'امتياز (20 ن)' : score === 'very_good' ? 'جيد جداً (15 ن)' : 'جيد ومقبول (10 ن)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Academic level dropdown */}
            <div>
              <label className="text-xs font-bold text-text-primary dark:text-gray-300 block mb-1">4. المستوى الأكاديمي والشهادات الجامعية</label>
              <div className="grid grid-cols-3 gap-2 bg-gray-50 dark:bg-[#150e0f] p-1 rounded-xl border border-gray-200 dark:border-red-950/20">
                {(['bac', 'licence', 'master_doctorate'] as const).map((edu) => (
                  <button
                    key={edu}
                    onClick={() => setEducationLevel(edu)}
                    className={`text-xs font-bold py-2.5 rounded-lg transition-all ${
                      educationLevel === edu
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-text-secondary dark:text-gray-300 hover:bg-white/50'
                    }`}
                  >
                    {edu === 'bac' ? 'باكالوريا (10 ن)' : edu === 'licence' ? 'إجازة / ليسانس (12 ن)' : 'ماجستير / دكتوراه (15 ن)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Scouting commitment ratio */}
            <div>
              <label className="text-xs font-bold text-text-primary dark:text-gray-300 block mb-1">5. التفرغ للبرامج والمبادرات التطوعية بالولاية</label>
              <select
                value={scoutingCommitment}
                onChange={(e) => setScoutingCommitment(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#150e0f] border border-gray-200 dark:border-red-950/20 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-right font-bold text-text-primary dark:text-white"
              >
                <option value="full">متفرغ بالكامل وبشكل نشط ويومي (10 ن)</option>
                <option value="medium">متفرغ بحسب الورشات لمبادرتين شهرياً (7 ن)</option>
                <option value="low">مساهم جزئي لساعات العطل الرسمية الأسبوعية (4 ن)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Scoring gauge output result */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 p-6 md:p-8 rounded-3xl shadow-sm text-center space-y-5 relative">
            <h3 className="font-extrabold text-base text-text-primary dark:text-white text-right">مؤشر ومحصل رصيد تقييم السيرة:</h3>

            {/* Radial scoreboard */}
            <div className="relative w-36 h-36 mx-auto rounded-full border-8 border-gray-50 dark:border-[#201012] flex flex-col items-center justify-center shadow-inner">
              {/* Dynamic decorative circular border depending on score */}
              <div className="absolute inset-[-8px] rounded-full border-8 border-primary/30"></div>
              <span className="text-4xl font-extrabold text-primary dark:text-primary-light tracking-tight">{totalPoints}</span>
              <span className="text-[10px] text-text-secondary dark:text-gray-400 font-bold">من 100 نقطة</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-text-secondary dark:text-gray-400 block font-semibold">حالة الأهلية المبدئية:</span>
              <span className={`inline-block px-4.5 py-2 rounded-full border text-xs font-extrabold ${resultDetails.color}`}>
                {resultDetails.status}
              </span>
            </div>

            {/* Customized advice paragraph block */}
            <div className="text-right bg-gray-50/50 dark:bg-red-950/10 p-4 rounded-xl border-r-2 border-secondary space-y-1.5">
              <span className="text-[11px] font-black text-secondary block">نصائح القادة الموجهة لك:</span>
              <p className="text-xs text-text-secondary dark:text-gray-300 leading-relaxed font-semibold">
                {resultDetails.advice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
