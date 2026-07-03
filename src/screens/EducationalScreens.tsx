import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Search, 
  ChevronRight, 
  ChevronLeft,
  BookOpen, 
  Clock, 
  Users, 
  CheckCircle, 
  HelpCircle, 
  ChevronDown, 
  ArrowUpRight,
  Bookmark,
  Calendar,
  Sparkles,
  AwardIcon,
  ShieldCheck,
  CheckCircle2,
  BookmarkCheck,
  Trash2,
  FileText,
  Bell,
  BellRing,
  Plus,
  Check,
  Printer
} from 'lucide-react';
import { EDUCATIONAL_PLANS, CURRICULA, TRAINING_PATHS } from '../data/appData';
import { EducationalPlan, Curriculum } from '../types';

// ==========================================
// 1. EDUCATION SCREEN
// ==========================================
interface EducationScreenProps {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export function EducationScreen({ favorites, toggleFavorite }: EducationScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<EducationalPlan | null>(null);

  const filteredPlans = EDUCATIONAL_PLANS.filter(plan => 
    plan.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plan.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary dark:text-white">الشروط الدراسية والتأهيل القيادي</h1>
        <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">
          تعرف على المستوى التعليمي المطلوب والشروط الدستورية لتولي قيادة الوحدات والهياكل الإدارية (12 خطة قيادية كاملة).
        </p>
      </div>

      {/* Global Filter Search Inside Education */}
      <div className="relative max-w-md bg-white dark:bg-[#1a201b] rounded-2xl border border-gray-100 dark:border-emerald-950 p-1 flex items-center shadow-sm">
        <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن خطة (مثال: قائد جهة، أمين مال)..."
          className="w-full bg-transparent px-2 py-2.5 text-sm focus:outline-none text-right"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="text-xs text-text-secondary dark:text-gray-400 font-bold px-3 pl-1 hover:text-text-primary"
          >
            مسح
          </button>
        )}
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-[#1a201b] border border-gray-100 dark:border-emerald-900/35 rounded-3xl p-6 shadow-sm flex flex-col justify-between group cursor-pointer"
            onClick={() => setSelectedPlan(plan)}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="bg-primary/5 text-primary dark:bg-primary/25 dark:text-primary-light text-xs font-bold px-3 py-1.5 rounded-full border border-primary/10">
                  {plan.level}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(`edu_${plan.id}`);
                  }}
                  className={`p-1.5 rounded-full transition-colors ${
                    favorites.includes(`edu_${plan.id}`) ? 'text-orange-500' : 'text-gray-300 hover:text-orange-500'
                  }`}
                >
                  <BookmarkCheck className="w-5 h-5" fill={favorites.includes(`edu_${plan.id}`) ? 'currentColor' : 'none'} />
                </button>
              </div>

              <h3 className="text-lg font-bold text-text-primary dark:text-white group-hover:text-primary transition-colors leading-snug">
                {plan.role}
              </h3>
              <p className="text-sm text-text-secondary dark:text-gray-400 leading-relaxed line-clamp-3">
                {plan.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 dark:border-emerald-950/40 flex items-center justify-between text-xs font-bold text-primary dark:text-primary-light">
              <span>تفاصيل الشروط والبحوث المعتمدة</span>
              <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors shrink-0" />
            </div>
          </motion.div>
        ))}

        {filteredPlans.length === 0 && (
          <div className="col-span-full py-12 text-center text-text-secondary dark:text-gray-400 shadow-sm border border-gray-100 rounded-3xl bg-white dark:bg-[#1a201b]">
            <HelpCircle className="w-10 h-10 mx-auto text-gray-200 dark:text-gray-700" />
            <p className="text-sm font-bold mt-2">لا يوجد مطابقة لـ خطة البحث</p>
            <p className="text-xs text-text-secondary dark:text-gray-500 mt-1">تأكد من إدخال رتب قيادية صحيحة مثل "أشبال" أو "جهة"</p>
          </div>
        )}
      </div>

      {/* Detail Bottom-Sheet / Drawer Modal Simulation */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white dark:bg-[#151c16] rounded-t-3xl sm:rounded-3xl p-6 md:p-8 w-full max-w-xl max-h-[85vh] overflow-y-auto text-right space-y-6 shadow-2xl border border-gray-100 dark:border-emerald-900/30"
            >
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-emerald-950 pb-4">
                <div>
                  <h3 className="font-extrabold text-xl text-text-primary dark:text-white leading-snug">{selectedPlan.role}</h3>
                  <p className="text-xs text-primary dark:text-primary-light font-semibold mt-1">المستوى التعليمي: {selectedPlan.level}</p>
                </div>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="bg-gray-100 dark:bg-[#202921] text-text-secondary dark:text-gray-300 font-bold px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors text-xs"
                >
                  إغلاق
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-text-primary dark:text-white">طبيعة ومهام هذه الرتبة القيادية:</h4>
                  <p className="text-sm text-text-secondary dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-emerald-950/20 p-4 rounded-2xl border-r-4 border-primary">
                    {selectedPlan.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-sm text-text-primary dark:text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-5 h-5 text-secondary" />
                    <span>متطلبات كسب ورخصة هذا الهيكل:</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedPlan.requirements.map((req, idx) => (
                      <li key={idx} className="text-sm text-text-secondary dark:text-gray-300 flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-primary dark:text-primary-light flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-emerald-950 flex justify-between">
                <button
                  onClick={() => {
                    toggleFavorite(`edu_${selectedPlan.id}`);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-[#202a21] hover:bg-gray-100 rounded-full text-xs font-bold transition-all ${
                    favorites.includes(`edu_${selectedPlan.id}`) ? 'text-orange-500' : 'text-text-secondary dark:text-gray-300'
                  }`}
                >
                  <Bookmark className="w-4 h-4" fill={favorites.includes(`edu_${selectedPlan.id}`) ? 'currentColor' : 'none'} />
                  <span>{favorites.includes(`edu_${selectedPlan.id}`) ? 'مضافة للمفضلة' : 'حفظ في المفضلة'}</span>
                </button>

                <button
                  onClick={() => setSelectedPlan(null)}
                  className="bg-primary text-white font-bold text-xs px-5 py-2.5 rounded-full hover:bg-primary-light shadow-md shadow-primary/10"
                >
                  موافق
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ==========================================
// 2. CURRICULUM SCREEN
// ==========================================
export function CurriculumScreen() {
  const [activeSegment, setActiveSegment] = useState<'wolves' | 'boys' | 'rovers' | 'leaders'>('wolves');
  const [activeSubTab, setActiveSubTab] = useState<'goals' | 'principles' | 'progression' | 'activities'>('goals');

  const selectedCurriculum = CURRICULA.find(c => c.section === activeSegment);

  const segments = [
    { id: 'wolves', label: 'قسم الأشبال', age: '7-12 سنة' },
    { id: 'boys', label: 'قسم الفتيان', age: '12-16 سنة' },
    { id: 'rovers', label: 'قسم الجوالة', age: '15-18 سنة' },
    { id: 'leaders', label: 'الرواد والأحباء', age: 'قدماء' }
  ];

  if (!selectedCurriculum) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary dark:text-white flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-primary" />
          <span>المناهج ومقررات الأقسام الكشفية المعتمدة لعام 2026</span>
        </h1>
        <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">
          تصفح الأهداف التربوية، المبادئ، الوعد والقانون، مسارات الترقي وشارات الجدارة التفصيلية لكل قسم كشفي بتونس.
        </p>
      </div>

      {/* Horizontal Tabs Selection Segmented Control */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-gray-100/60 dark:bg-[#131914] p-1.5 rounded-2xl border border-gray-100 dark:border-emerald-950/30">
        {segments.map((seg) => (
          <button
            key={seg.id}
            onClick={() => {
              setActiveSegment(seg.id as any);
              setActiveSubTab('goals'); // Reset sub-tab
            }}
            className={`py-3.5 px-3 rounded-xl transition-all text-center flex flex-col items-center justify-center gap-1 ${
              activeSegment === seg.id 
                ? 'bg-primary text-white shadow-md shadow-primary/10' 
                : 'text-text-secondary dark:text-gray-300 hover:bg-white/50 dark:hover:bg-[#1e271f]/60'
            }`}
          >
            <span className="font-extrabold text-sm">{seg.label}</span>
            <span className={`text-[10px] ${activeSegment === seg.id ? 'text-white/80' : 'text-text-secondary dark:text-gray-400 font-medium'}`}>{seg.age}</span>
          </button>
        ))}
      </div>

      {/* Sub-tabs Navigation */}
      <div className="flex flex-wrap items-center justify-start gap-1.5 border-b border-gray-100 dark:border-emerald-950/40 pb-2">
        <button
          onClick={() => setActiveSubTab('goals')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
            activeSubTab === 'goals'
              ? 'bg-primary text-white shadow-sm'
              : 'text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1e271f]/60'
          }`}
        >
          <span>🎯 الأهداف والمنهج</span>
        </button>
        <button
          onClick={() => setActiveSubTab('principles')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
            activeSubTab === 'principles'
              ? 'bg-primary text-white shadow-sm'
              : 'text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1e271f]/60'
          }`}
        >
          <span>📜 الوعد والقانون</span>
        </button>
        <button
          onClick={() => setActiveSubTab('progression')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
            activeSubTab === 'progression'
              ? 'bg-primary text-white shadow-sm'
              : 'text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1e271f]/60'
          }`}
        >
          <span>⚜️ شارات الترقي</span>
        </button>
        <button
          onClick={() => setActiveSubTab('activities')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
            activeSubTab === 'activities'
              ? 'bg-primary text-white shadow-sm'
              : 'text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1e271f]/60'
          }`}
        >
          <span>🛠️ مجالات التنشيط والبرنامج</span>
        </button>
      </div>

      {/* Curriculum Canvas Layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeSegment}-${activeSubTab}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2"
        >
          {/* Left Column: Core Badge and Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-primary to-emerald-950 text-white p-6 rounded-3xl space-y-4 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-white/15 backdrop-blur-md text-accent text-xs font-bold px-3 py-1.5 rounded-full border border-white/10">
                    {selectedCurriculum.badge}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-300 bg-[#122815]/80 px-2 py-0.5 rounded-md border border-emerald-900/30">
                    دليل 2026
                  </span>
                </div>
                <h3 className="text-xl font-extrabold">{selectedCurriculum.title}</h3>
                <p className="text-sm text-white/85 leading-relaxed">
                  {selectedCurriculum.description}
                </p>

                {selectedCurriculum.motto && (
                  <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                    <span className="text-xs text-emerald-300 font-bold">الشعار الرسمي للقسم:</span>
                    <span className="text-xs font-black text-accent bg-emerald-900/50 px-2.5 py-1 rounded-xl">
                      « {selectedCurriculum.motto} »
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Official Source Reference Box */}
            <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-3xl border border-emerald-100/50 dark:border-emerald-950/50 space-y-2 text-right">
              <div className="flex items-center gap-2 text-primary dark:text-emerald-400 font-extrabold text-xs">
                <Sparkles className="w-4 h-4 animate-pulse text-accent" />
                <span>توثيق رسمي كشفي معتمد لعام 2026:</span>
              </div>
              <p className="text-[11px] text-text-secondary dark:text-gray-300 leading-relaxed font-bold">
                تم تدقيق وتثبيت معلومات المناهج ومسارات الترقي استناداً للموقع الإلكتروني الرسمي لجمعية الكشافة التونسية والدليل التربوي القياسي المنشور بصفحتها الرسمية.
              </p>
            </div>
          </div>

          {/* Right Column: Display of Sub-tab specific content */}
          <div className="lg:col-span-8">
            {/* 1. GOALS TAB */}
            {activeSubTab === 'goals' && (
              <div className="bg-white dark:bg-[#1a201b] border border-gray-100 dark:border-emerald-950 p-6 rounded-3xl shadow-sm space-y-6">
                <div>
                  <h4 className="font-extrabold text-base text-text-primary dark:text-white flex items-center gap-2 border-b border-gray-50 dark:border-emerald-950 pb-3">
                    <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-primary dark:text-emerald-300">🎯</span>
                    <span>الأهداف التربوية الأساسية للبرنامج</span>
                  </h4>
                  <p className="text-xs text-text-secondary dark:text-gray-400 mt-2 leading-relaxed">
                    يسعى هذا المنهج إلى صياغة شخصية الكشاف من خلال الأبعاد التربوية القياسية المعتمدة من المنظمة العالمية للحركة الكشفية.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedCurriculum.educationalGoals.map((goal, idx) => (
                    <div 
                      key={idx} 
                      className="flex gap-3 items-start bg-gray-50/60 dark:bg-[#131914] p-4 rounded-2xl border border-gray-100/50 dark:border-emerald-950/40 hover:border-emerald-200 dark:hover:border-emerald-900 transition-colors"
                    >
                      <CheckCircle className="w-5 h-5 text-primary dark:text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-text-primary dark:text-gray-200 leading-relaxed font-bold">
                        {goal}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. PRINCIPLES & PROMISE TAB */}
            {activeSubTab === 'principles' && (
              <div className="bg-white dark:bg-[#1a201b] border border-gray-100 dark:border-emerald-950 p-6 rounded-3xl shadow-sm space-y-6">
                {/* Promise Callout Card */}
                {selectedCurriculum.promise && (
                  <div className="bg-gradient-to-l from-red-50 to-red-100/30 dark:from-[#351914] dark:to-[#1a1010] p-6 rounded-3xl border border-red-100/60 dark:border-red-950/50 relative overflow-hidden">
                    <div className="absolute left-4 top-4 opacity-5 pointer-events-none select-none">
                      <svg className="w-20 h-20 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                      </svg>
                    </div>
                    <div className="space-y-3 relative z-10">
                      <span className="text-[10px] text-red-700 dark:text-red-400 font-black bg-red-100/60 dark:bg-red-950/50 px-2.5 py-1 rounded-full border border-red-200/50">
                        📜 الوعد الكشفي الرسمي للقسم
                      </span>
                      <p className="text-sm md:text-base font-black text-red-900 dark:text-red-200 leading-relaxed text-right italic font-serif">
                        « {selectedCurriculum.promise} »
                      </p>
                    </div>
                  </div>
                )}

                {/* Laws Section */}
                {selectedCurriculum.law && (
                  <div className="space-y-3">
                    <h5 className="font-extrabold text-sm text-text-primary dark:text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>بنود قانون القسم والالتزام الأخلاقي:</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {selectedCurriculum.law.map((item, idx) => (
                        <div key={idx} className="bg-gray-50/50 dark:bg-[#131914] p-3.5 rounded-2xl border border-gray-100/50 dark:border-emerald-950/30 flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-emerald-100/70 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-xs text-text-secondary dark:text-gray-300 leading-relaxed font-bold">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* General Principles */}
                <div className="space-y-3 pt-2">
                  <h5 className="font-extrabold text-sm text-text-primary dark:text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                    <span>المبادئ المنهجية التطبيقية للقسم:</span>
                  </h5>
                  <ul className="space-y-2.5">
                    {selectedCurriculum.principles.map((p, idx) => (
                      <li key={idx} className="text-xs text-text-secondary dark:text-gray-300 flex items-start gap-2 leading-relaxed font-semibold">
                        <span className="text-primary dark:text-emerald-400 mt-0.5">◀</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 3. PROGRESSION & BADGES TAB */}
            {activeSubTab === 'progression' && (
              <div className="bg-white dark:bg-[#1a201b] border border-gray-100 dark:border-emerald-950 p-6 rounded-3xl shadow-sm space-y-6">
                <div>
                  <h4 className="font-extrabold text-base text-text-primary dark:text-white flex items-center gap-2 border-b border-gray-50 dark:border-emerald-950 pb-3">
                    <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-primary dark:text-emerald-300">⚜️</span>
                    <span>مسار مراحل الترقي الكشفية وشارات الجدارة لعام 2026</span>
                  </h4>
                  <p className="text-xs text-text-secondary dark:text-gray-400 mt-2 leading-relaxed">
                    يعتمد النظام الكشفي التونسي على الترقي التدريجي للفتى لضمان تنمية قيادية شاملة ومستقلة.
                  </p>
                </div>

                {/* Vertical Stepper Timeline */}
                {selectedCurriculum.progression && (
                  <div className="relative space-y-6 pt-2">
                    <div className="absolute right-4 top-2 bottom-2 w-0.5 bg-gray-100 dark:bg-emerald-950"></div>
                    {selectedCurriculum.progression.map((prog, idx) => {
                      const [title, desc] = prog.split(': ');
                      return (
                        <div key={idx} className="relative flex gap-4 pr-9 text-right">
                          <div className="absolute right-2 top-1.5 w-4.5 h-4.5 rounded-full bg-primary border-4 border-white dark:border-[#1a201b] shadow-sm shrink-0 z-10"></div>
                          <div className="space-y-1 bg-gray-50/50 dark:bg-[#131914] p-4 rounded-2xl border border-gray-100/50 dark:border-emerald-950/30 w-full hover:shadow-xs transition-shadow">
                            <span className="text-[10px] text-primary dark:text-primary-light font-black uppercase tracking-wider block">
                              المرحلة {idx + 1}
                            </span>
                            <h5 className="font-extrabold text-xs text-text-primary dark:text-white">{title}</h5>
                            {desc && <p className="text-[11px] text-text-secondary dark:text-gray-400 leading-relaxed font-bold">{desc}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* 4. ACTIVITIES TAB */}
            {activeSubTab === 'activities' && (
              <div className="bg-white dark:bg-[#1a201b] border border-gray-100 dark:border-emerald-950 p-6 rounded-3xl shadow-sm space-y-5">
                <div>
                  <h4 className="font-extrabold text-base text-text-primary dark:text-white flex items-center gap-2 border-b border-gray-50 dark:border-emerald-950 pb-3">
                    <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-primary dark:text-emerald-300">🛠️</span>
                    <span>تفصيل البرنامج العملي ومجالات التنشيط للقسم</span>
                  </h4>
                  <p className="text-xs text-text-secondary dark:text-gray-400 mt-2 leading-relaxed">
                    قائمة بالبرامج والأنشطة المقررة رسمياً والتي ينبغي على قادة الأفواج والوحدات برمجتها وتنفيذها في مخيماتهم واجتماعاتهم الأسبوعية.
                  </p>
                </div>
                
                <div className="space-y-4">
                  {selectedCurriculum.activities.map((act, index) => (
                    <div 
                      key={index}
                      className="bg-gray-50/50 dark:bg-[#131914] p-4.5 rounded-2xl border border-gray-100/60 dark:border-emerald-950/40 relative overflow-hidden group hover:border-emerald-200 dark:hover:border-emerald-900 transition-all text-right"
                    >
                      <div className="absolute right-0 top-0 w-1.5 h-full bg-secondary group-hover:bg-primary transition-colors"></div>
                      <h5 className="font-extrabold text-sm text-text-primary dark:text-white group-hover:text-primary transition-colors">{act.title}</h5>
                      <p className="text-xs text-text-secondary dark:text-gray-400 mt-2 leading-relaxed font-semibold">
                        {act.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// ==========================================
// 3. TRAINING SCREEN (with interactive checklists)
// ==========================================
export function TrainingScreen() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const handleToggleStep = (stepId: string) => {
    setCompletedSteps(prev => {
      if (prev.includes(stepId)) {
        return prev.filter(id => id !== stepId);
      } else {
        return [...prev, stepId];
      }
    });
  };

  const progressPercentage = Math.round((completedSteps.length / TRAINING_PATHS.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary dark:text-white">مسارات وحقائب التدريب الكشفي</h1>
        <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">تتبع مسارك الذاتي من الإعداد التمهيدي إلى قيادة التدريب (مع متعقب تطبيقي مستقل)</p>
      </div>

      {/* Tracker Dashboard Widget */}
      <div className="bg-gradient-to-tr from-amber-50 to-amber-100/50 dark:from-[#2d2218] dark:to-[#1f1a14] border border-amber-100 dark:border-amber-900/30 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-md text-right">
          <h3 className="font-extrabold text-lg text-secondary dark:text-amber-500">متتبع رتب وحقائب التدريب لعام 2026</h3>
          <p className="text-xs text-text-secondary dark:text-gray-300 mt-1 leading-normal">
            هذا المتعقب التفاعلي يحاكي محفظة إنجازك. اضغط على الدوائر البيضاء أو مربعات الاختيار في الأسفل لتأكيد إتمامك لكل مستوى ليحسب مؤشر كفاءتك الكشفية العام.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="relative w-24 h-24 rounded-full bg-white dark:bg-[#131914] shadow-md border border-amber-100 dark:border-amber-950/20 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-secondary">{progressPercentage}%</span>
            <span className="text-[10px] text-text-secondary dark:text-gray-400 font-bold">نسبة التأهيل</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-text-primary dark:text-white">المستوى الحالي المكتسب:</span>
            <p className="text-sm font-extrabold text-primary dark:text-primary-light">
              {progressPercentage === 0 ? 'مبتدئ بقسم التطوع' : progressPercentage < 50 ? 'قائد وحدة مؤهل تكتيكياً' : progressPercentage < 100 ? 'مدرب تحت الإشراف المنهجي' : 'قائد تدريب وطني متكامل 🌟'}
            </p>
          </div>
        </div>
      </div>

      {/* Structured Vertical Chronological Timeline */}
      <div className="relative max-w-4xl mx-auto space-y-8 pt-4">
        {/* Central connecting line */}
        <div className="absolute right-6 top-10 bottom-10 w-1 bg-gray-100 dark:bg-emerald-950"></div>

        {TRAINING_PATHS.map((step, idx) => {
          const isCompleted = completedSteps.includes(step.id);
          return (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex gap-6"
            >
              {/* Timeline custom active badge pointer */}
              <button 
                onClick={() => handleToggleStep(step.id)}
                className={`w-12 h-12 rounded-full shrink-0 z-10 border-4 ${
                  isCompleted 
                    ? 'bg-primary border-primary-light text-white' 
                    : 'bg-white border-gray-200 dark:bg-[#131914] dark:border-emerald-950 text-gray-300'
                } flex items-center justify-center shadow-md cursor-pointer transition-all hover:scale-105`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <span className="font-extrabold text-xs">{idx + 1}</span>
                )}
              </button>

              <div className="bg-white dark:bg-[#1a201b] border border-gray-100 dark:border-emerald-950 p-6 rounded-3xl shadow-sm flex-1 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold text-lg text-text-primary dark:text-white">{step.title}</h3>
                    <span className="text-xs text-text-secondary dark:text-gray-400 flex items-center gap-1 mt-1 font-medium">
                      <Clock className="w-4 h-4 text-secondary ml-1" />
                      البرنامج الزمني التقريبي: {step.duration}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    step.level === 'basic' ? 'bg-blue-50 text-blue-800 border-blue-100 dark:bg-blue-950/40 dark:text-blue-300' :
                    step.level === 'functional' ? 'bg-orange-50 text-orange-800 border-orange-100 dark:bg-orange-950/40 dark:text-p-400' :
                    step.level === 'advanced' ? 'bg-red-50 text-red-800 border-red-100 dark:bg-red-950/40 dark:text-red-400' :
                    'bg-teal-50 text-teal-800 border-teal-100 dark:bg-teal-950/40 dark:text-teal-300'
                  }`}>
                    {step.level === 'basic' ? 'تأسيسي' : step.level === 'functional' ? 'وظيفي مالي وإعلامي' : step.level === 'advanced' ? 'متقدم تدريب' : 'مرشدو أفواج'}
                  </span>
                </div>

                <p className="text-sm text-text-secondary dark:text-gray-300 leading-relaxed font-semibold">
                  {step.description}
                </p>

                {/* Sub-requirements dropdown details */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-text-primary dark:text-white">شروط التسجيل وحضور الحقيبة:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {step.requirements.map((req, rIdx) => (
                      <div key={rIdx} className="flex gap-2 items-center bg-gray-50/50 dark:bg-[#131914] p-2 rounded-xl text-xs text-text-secondary dark:text-gray-300 border border-gray-100 dark:border-emerald-950/40 font-medium">
                        <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleToggleStep(step.id)}
                    className={`text-xs font-bold py-1.5 px-3.5 rounded-full transition-all ${
                      isCompleted 
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' 
                        : 'bg-primary/5 text-primary hover:bg-primary/15 dark:bg-[#202b21] dark:text-primary-light'
                    }`}
                  >
                    {isCompleted ? '✓ أتممت بنجاح' : 'تأكيد اجتياز المستوى'}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ==========================================
// 4. ACTIVITY PLANNER SCREEN (مخطط الأنشطة الكشفية والتقويم التفاعلي)
// ==========================================
interface Activity {
  id: string;
  title: string;
  section: string;
  goal: string;
  duration: string;
  description: string;
  materials: string;
  date: string; // YYYY-MM-DD
  isCustom?: boolean;
}

interface Reminder {
  id: string;
  activityId: string;
  activityTitle: string;
  reminderTime: string; // HH:MM
  reminderDate: string; // YYYY-MM-DD
  note: string;
  isActive: boolean;
  alertType: 'in_app' | 'browser' | 'both';
  createdAt: string;
}

const DEFAULT_ACTIVITIES: Activity[] = [
  {
    id: 'act1',
    title: 'مخيم البيئة والمحافظة على الغابات',
    section: 'الكشاف المتقدم',
    goal: 'الارتباط بالطبيعة وحماية البيئة',
    duration: 'يومان (نهاية الأسبوع)',
    description: 'مخيم ميداني يركز على استكشاف الطبوغرافيا الغابية الكشفية، صياغة محطات فرز وتثمين النفايات العضوية، ومبادرات تنظيف ممرات جبل عين دراهم.',
    materials: 'خيام، أكياس القمامة الصديقة للبيئة، قفازات، بوصلات',
    date: '2026-06-12'
  },
  {
    id: 'act2',
    title: 'ألعاب المغامرة وفك الرموز الكشفية',
    section: 'الأشبال',
    goal: 'ألعاب الذكاء والريادة التقنية',
    duration: '3 ساعات',
    description: 'لعبة كنز تفاعلية داخل الفناء الخارجي للفوج، تتطلب فك شفرات بسيطة مأخوذة من تاريخ القادة التاريخيين للكشافة التونسية.',
    materials: 'بطاقات شفرات، خريطة الفوج سرية، هدايا تذكارية للأشبال الفائزين',
    date: '2026-06-16'
  },
  {
    id: 'act3',
    title: 'ورشات الإسعافات الأولية والإنقاذ الميداني',
    section: 'الفتيان / الكشاف',
    goal: 'اللياقة البدنية والصحة ومهام التخييم',
    duration: '4 ساعات',
    description: 'تدريب تطبيقي مكثف بالاشتراك مع الحماية المدنية لتعلم مهارات ربط الجروح، حيازة الجبائر المؤقتة ومواجهة طوارئ التجمعات.',
    materials: 'حقائب إسعاف أولية، جبائر تثبيت خشبية، كتيب الإشارات الكشفية للتنبيه',
    date: '2026-06-18'
  },
  {
    id: 'act4',
    title: 'محاكاة مؤتمر برلمان الشباب الكشفي التونسي',
    section: 'الجوالة',
    goal: 'تنمية المهارات القيادية وتحمل المسؤولية',
    duration: 'يوم كامل',
    description: 'محاكاة لآليات اتخاذ القرار والتصويت بالهياكل العليا للبلاد، وإعداد خطط ومشاريع تنشيط البلديات التونسية ريفاً وحضراً.',
    materials: 'أوراق صياغة السياسات، نموذج دستور الكشافة التونسية المعتمد، منصة حوار',
    date: '2026-06-20'
  },
  {
    id: 'act5',
    title: 'أيام التضامن والدعم الاجتماعي بالأرياف',
    section: 'الجوالة',
    goal: 'الخدمة المجتمعية والإغاثة التضامنية',
    duration: '3 أيام متتالية',
    description: 'مبادرة تضامنية لتوزيع الأدوات والمستلزمات الدراسية وحقائب البرد الشتوي على تلامذة وعائلات المناطق الداخلية بالجمهورية التونسية.',
    materials: 'مستلزمات مدرسية، ملابس شتوية، شاحنات نقل لوجستي للفوج',
    date: '2026-06-24'
  },
  {
    id: 'act6',
    title: 'حفل تذكر تاريخ توحيد الكشافة التونسية 1956',
    section: 'الرواد',
    goal: 'تنمية الحس الوطني والمواطنة',
    duration: 'ساعتان',
    description: 'ندوة فكرية وجلسة حكواتي يروي فيها قادة رواد الحركة ملاحم دمج الكشافة الإسلامية والدستورية عام الاستقلال ودور كشافة تونس بمساندة الدولة.',
    materials: 'أجهزة عرض رقمية، صور فوتوغرافية تاريخية للقائد البشير الفاني، تسجيلات التوحيد',
    date: '2026-06-27'
  },
  {
    id: 'act7',
    title: 'مسابقة الطهي الخلوي ومهارات النيران',
    section: 'الفتيان / الكشاف',
    goal: 'اللياقة البدنية والصحة ومهام التخييم',
    duration: 'نصف يوم',
    description: 'تدريب حي على إيقاد النيران المتنوعة (حطبية، حفرية) وطهي وجبة كشفية تقليدية متكاملة تحت معايير السلامة التامة ومراقبة المفوض العام.',
    materials: 'أعواد جافة، أواني معدنية طين، مواد طعام أولية، فؤوس صغيرة للنماذج',
    date: '2026-06-29'
  },
  {
    id: 'act8',
    title: 'مهرجان مسرح العرائس وتجسيد الوعد الكشفي',
    section: 'الأشبال',
    goal: 'التعبير الروحي والديني القويم',
    duration: '3 ساعات',
    description: 'عروض مسرحية تفاعلية يؤدي فيها القادة أدواراً تلخص معاني بنود قانون الكشاف العشرة لترسيخ الوفاء والشهامة بروح الشبل السيرية.',
    materials: 'دمى يدوية، مسرح ستائر قماش، نص مسرحي كشفي مبسط، ألحان كشفية تونسية',
    date: '2026-06-30'
  }
];

const MONTH_NAMES = [
  'جانفي (يناير)',
  'فيفري (فبراير)',
  'مارس (مارس)',
  'أفريل (أبريل)',
  'ماي (مايو)',
  'جوان (يونيو)',
  'جويلية (يوليو)',
  'أوت (أغسطس)',
  'سبتمبر (أيلول)',
  'أكتوبر (تشرين الأول)',
  'نوفمبر (تشرين الثاني)',
  'ديسمبر (كانون الأول)',
];

const WEEKDAY_NAMES = [
  { short: 'الأحد', class: 'text-red-500' },
  { short: 'الإثنين', class: '' },
  { short: 'الثلاثاء', class: '' },
  { short: 'الأربعاء', class: '' },
  { short: 'الخميس', class: '' },
  { short: 'الجمعة', class: '' },
  { short: 'السبت', class: '' }
];

export function ActivityPlannerScreen() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'reminders'>('calendar');
  const [sectionFilter, setSectionFilter] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Year & Month status of calendar
  const [year, setYear] = useState<number>(2026);
  const [month, setMonth] = useState<number>(5); // Default to June (0-indexed 5)
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // Highlight & filter selected day

  // Custom activities (from localStorage)
  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('scout-custom-activities');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...DEFAULT_ACTIVITIES, ...parsed];
      } catch (e) {
        return DEFAULT_ACTIVITIES;
      }
    }
    return DEFAULT_ACTIVITIES;
  });

  // Local reminders storage
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('scout-activity-reminders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Triggered reminder for on-screen notification toast
  const [toastReminder, setToastReminder] = useState<Reminder | null>(null);
  
  // Modals status
  const [showAddActivityModal, setShowAddActivityModal] = useState<boolean>(false);
  const [reminderModalActivity, setReminderModalActivity] = useState<Activity | null>(null);
  
  // Custom activity form inputs
  const [newTitle, setNewTitle] = useState('');
  const [newSection, setNewSection] = useState('الأشبال');
  const [newGoal, setNewGoal] = useState('الارتباط بالطبيعة وحماية البيئة');
  const [newDuration, setNewDuration] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newMaterials, setNewMaterials] = useState('');
  const [newDate, setNewDate] = useState('2026-06-16');

  // Reminder form inputs
  const [reminderTime, setReminderTime] = useState('09:00');
  const [reminderDate, setReminderDate] = useState('2026-06-16');
  const [reminderNote, setReminderNote] = useState('');
  const [reminderAlertType, setReminderAlertType] = useState<'in_app' | 'browser' | 'both'>('in_app');

  // PDF / Print Export Modal States
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [scoutGroup, setScoutGroup] = useState<string>('فوج قرطاج الكشفي');
  const [scoutLeader, setScoutLeader] = useState<string>('القائد محمد الهادي');
  const [scoutRegion, setScoutRegion] = useState<string>('جهة تونس');
  const [scoutSeason, setScoutSeason] = useState<string>('2025 - 2026');
  const [printTitle, setPrintTitle] = useState<string>('مخطط الأنشطة والرزنامة الكشفية والتربوية لشهر جوان 2026');
  const [printSectionFilter, setPrintSectionFilter] = useState<string>('الكل');
  const [includeMaterials, setIncludeMaterials] = useState<boolean>(true);
  const [includeReminders, setIncludeReminders] = useState<boolean>(false);
  const [includeSignatures, setIncludeSignatures] = useState<boolean>(true);

  // Custom print notes saved on-the-fly for the printable report
  const [printNotes, setPrintNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('scout-print-notes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  const handleSavePrintNote = (actId: string, text: string) => {
    const updated = { ...printNotes, [actId]: text };
    setPrintNotes(updated);
    localStorage.setItem('scout-print-notes', JSON.stringify(updated));
  };

  const SECTIONS = ['الكل', 'الأشبال', 'الفتيان / الكشاف', 'المرشدات', 'الكشاف المتقدم', 'الجوالة', 'الرواد'];
  const ADD_SECTIONS = ['الأشبال', 'الفتيان / الكشاف', 'المرشدات', 'الكشاف المتقدم', 'الجوالة', 'الرواد'];
  const ADD_GOALS = [
    'الارتباط بالطبيعة وحماية البيئة',
    'ألعاب الذكاء والريادة التقنية',
    'اللياقة البدنية والصحة ومهام التخييم',
    'تنمية المهارات القيادية وتحمل المسؤولية',
    'الخدمة المجتمعية والإغاثة التضامنية',
    'تنمية الحس الوطني والمواطنة',
    'التعبير الروحي والديني القويم'
  ];

  // Live timer simulation checking every 30 seconds for upcoming reminders
  React.useEffect(() => {
    const checkInterval = setInterval(() => {
      const now = new Date();
      // Format now as HH:MM and YYYY-MM-DD
      const nowTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const nowDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

      // Check for any active reminder matching both today's date and timing
      const matched = reminders.find(rem => rem.isActive && rem.reminderTime === nowTime && rem.reminderDate === nowDate);
      if (matched) {
        setToastReminder(matched);
        
        // Deactivate reminder to prevent spamming
        const updated = reminders.map(r => r.id === matched.id ? { ...r, isActive: false } : r);
        setReminders(updated);
        localStorage.setItem('scout-activity-reminders', JSON.stringify(updated));

        // Attempt browser notification if supported and granted
        if ((matched.alertType === 'browser' || matched.alertType === 'both') && 'Notification' in window) {
          if (Notification.permission === 'granted') {
            new Notification(`تنبيه كشفي: ${matched.activityTitle}`, {
              body: matched.note || 'حان وقت النشاط الكشفي المخطط له الآن!',
              icon: '/icon.png'
            });
          }
        }
      }
    }, 15000);

    return () => clearInterval(checkInterval);
  }, [reminders]);

  // Request browser notification permission once loaded
  React.useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Calendar days generation
  const getCalendarDays = (yearId: number, monthId: number) => {
    const firstDayOfMonth = new Date(yearId, monthId, 1);
    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sunday, 1 is Monday ...
    
    const days = [];
    
    // Get days of previous month to pad start
    const prevMonthIdx = monthId === 0 ? 11 : monthId - 1;
    const prevYear = monthId === 0 ? yearId - 1 : yearId;
    const daysInPrevMonth = new Date(prevYear, prevMonthIdx + 1, 0).getDate();
    
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const dateString = `${prevYear}-${String(prevMonthIdx + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      days.push({
        day: dayNum,
        month: prevMonthIdx,
        year: prevYear,
        isCurrentMonth: false,
        dateString
      });
    }
    
    // Get days of current month
    const daysInCurrentMonth = new Date(yearId, monthId + 1, 0).getDate();
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const dateString = `${yearId}-${String(monthId + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({
        day: i,
        month: monthId,
        year: yearId,
        isCurrentMonth: true,
        dateString
      });
    }
    
    // Get days of next month to complete 42 slots layout (6 rows)
    const remaining = 42 - days.length;
    const nextMonthIdx = monthId === 11 ? 0 : monthId + 1;
    const nextYear = monthId === 11 ? yearId + 1 : yearId;
    for (let i = 1; i <= remaining; i++) {
      const dateString = `${nextYear}-${String(nextMonthIdx + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({
        day: i,
        month: nextMonthIdx,
        year: nextYear,
        isCurrentMonth: false,
        dateString
      });
    }
    
    return days;
  };

  const calendarDays = getCalendarDays(year, month);

  // Filter activities
  const filteredActivities = activities.filter(act => {
    const matchSection = sectionFilter === 'الكل' || act.section === sectionFilter;
    const matchDateSelected = !selectedDate || act.date === selectedDate;
    
    // If no selectedDate, filter partially by calendar's active month & year to keep list relevant
    const actDate = new Date(act.date);
    const matchCalendarMonth = selectedDate || (actDate.getFullYear() === year && actDate.getMonth() === month);

    const matchSearch = searchQuery.trim() === '' || 
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.materials.toLowerCase().includes(searchQuery.toLowerCase());

    return matchSection && matchDateSelected && matchCalendarMonth && matchSearch;
  });

  // Check how many activities are scheduled for a specific date
  const getActivitiesForDate = (dateStr: string) => {
    return activities.filter(act => act.date === dateStr);
  };

  // Switch Month
  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
    setSelectedDate(null);
  };

  // Add Custom Activity
  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim() || !newDate) return;

    const newAct: Activity = {
      id: 'custom_act_' + Date.now(),
      title: newTitle,
      section: newSection,
      goal: newGoal,
      duration: newDuration || 'غير محددة',
      description: newDescription,
      materials: newMaterials || 'أدوات كشفية عامة',
      date: newDate,
      isCustom: true
    };

    const updated = [...activities, newAct];
    setActivities(updated);
    
    // Save to custom activities list
    const savedCustom = localStorage.getItem('scout-custom-activities');
    let customList: Activity[] = [];
    if (savedCustom) {
      try {
        customList = JSON.parse(savedCustom);
      } catch (err) {}
    }
    customList.push(newAct);
    localStorage.setItem('scout-custom-activities', JSON.stringify(customList));

    // Jump calendar view to the new activity's year/month
    const actDate = new Date(newDate);
    setYear(actDate.getFullYear());
    setMonth(actDate.getMonth());
    setSelectedDate(newDate);

    setShowAddActivityModal(false);

    // Reset Form
    setNewTitle('');
    setNewSection('الأشبال');
    setNewGoal('الارتباط بالطبيعة وحماية البيئة');
    setNewDuration('');
    setNewDescription('');
    setNewMaterials('');
    setNewDate('2026-06-16');
  };

  // Delete Custom Activity
  const handleDeleteCustomActivity = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const updated = activities.filter(act => act.id !== id);
    setActivities(updated);

    const savedCustom = localStorage.getItem('scout-custom-activities');
    if (savedCustom) {
      try {
        const parsed = JSON.parse(savedCustom) as Activity[];
        const filtered = parsed.filter(act => act.id !== id);
        localStorage.setItem('scout-custom-activities', JSON.stringify(filtered));
      } catch (err) {}
    }

    // Clean scheduled reminders for that activity as well
    const updatedReminders = reminders.filter(rem => rem.activityId !== id);
    setReminders(updatedReminders);
    localStorage.setItem('scout-activity-reminders', JSON.stringify(updatedReminders));

    if (selectedDate) {
      const remainingForDay = updated.filter(act => act.date === selectedDate);
      if (remainingForDay.length === 0) {
        setSelectedDate(null);
      }
    }
  };

  // Initiate reminder setup
  const openReminderModal = (act: Activity, e: React.MouseEvent) => {
    e.stopPropagation();
    setReminderModalActivity(act);
    setReminderDate(act.date);
    setReminderTime('09:00');
    setReminderNote('');
    setReminderAlertType('in_app');
  };

  // Save Local reminder
  const handleSaveReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminderModalActivity) return;

    const newReminder: Reminder = {
      id: 'rem_' + Date.now(),
      activityId: reminderModalActivity.id,
      activityTitle: reminderModalActivity.title,
      reminderTime,
      reminderDate,
      note: reminderNote,
      isActive: true,
      alertType: reminderAlertType,
      createdAt: new Date().toISOString()
    };

    const updated = [...reminders, newReminder];
    setReminders(updated);
    localStorage.setItem('scout-activity-reminders', JSON.stringify(updated));

    setReminderModalActivity(null);

    // Friendly alert simulation
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  };

  // Delete Reminder
  const handleDeleteReminder = (id: string) => {
    const updated = reminders.filter(rem => rem.id !== id);
    setReminders(updated);
    localStorage.setItem('scout-activity-reminders', JSON.stringify(updated));
  };

  // Toggle Reminder Status
  const handleToggleReminder = (id: string) => {
    const updated = reminders.map(rem => 
      rem.id === id ? { ...rem, isActive: !rem.isActive } : rem
    );
    setReminders(updated);
    localStorage.setItem('scout-activity-reminders', JSON.stringify(updated));
  };

  // Simulated Test Reminder Action
  const handleTriggerTestReminder = (rem: Reminder) => {
    setToastReminder(rem);
  };

  // Simple Arabic weekday formatting
  const formatArabicFriendlyDate = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const d = parseInt(parts[2], 10);
      const dateObj = new Date(y, m, d);
      
      const ArabicDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
      const dayName = ArabicDays[dateObj.getDay()];
      const monthName = MONTH_NAMES[m].split(' ')[0]; // Pick جوان / جويلية
      
      return `${dayName}، ${d} ${monthName} ${y}`;
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6 text-right"
    >
      {/* TRIGGERED ALERTS NOTIFICATION POPUP */}
      <AnimatePresence>
        {toastReminder && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 left-6 z-50 bg-red-600 text-white rounded-3xl p-6 shadow-2xl max-w-sm border border-red-500 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                  <BellRing className="w-5.5 h-5.5 text-white" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-white/10 text-white px-2.5 py-1 rounded-md">تنبيه كشفي عاجل</span>
                  <h4 className="font-extrabold text-sm text-white mt-1 leading-snug">{toastReminder.activityTitle}</h4>
                </div>
              </div>
              <button 
                onClick={() => setToastReminder(null)}
                className="text-white/80 hover:text-white font-bold bg-white/10 w-6 h-6 rounded-full flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
            
            <p className="text-xs text-red-50 leading-relaxed font-medium">
              📅 {formatArabicFriendlyDate(toastReminder.reminderDate)} <br />
              ⏱️ الوقت المضبوط: <span className="font-mono bg-black/20 p-0.5 px-1 rounded">{toastReminder.reminderTime}</span>
            </p>

            {toastReminder.note && (
              <div className="bg-black/10 p-3 rounded-xl border border-white/10 text-[11px] leading-normal font-semibold">
                <span className="font-extrabold block text-yellow-300">ملاحظة التوجيه القيادية:</span>
                <p className="mt-0.5 font-medium">{toastReminder.note}</p>
              </div>
            )}

            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={() => setToastReminder(null)}
                className="flex-1 bg-white text-red-700 hover:bg-red-50 text-xs font-bold py-2 px-4 rounded-xl text-center transition-colors shadow-sm"
              >
                علم، تم التحضير!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BAR & COUNTER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary dark:text-white flex items-center gap-2">
            <Calendar className="w-7 h-7 text-red-600 dark:text-red-400" />
            <span>مخطط الأنشطة والتقويم الكشفي التفاعلي</span>
          </h1>
          <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">
            جدول زمني متكامل لإداراة المهرجانات والمخيمات الكشفية مع ميزات التذكير المحلي للأفواج التونسية.
          </p>
        </div>

        {/* BUTTON ACTION + SWITCHER */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
          <button
            onClick={() => {
              // Pre-fill print title with correct dynamic month & year names
              const currentMonthName = MONTH_NAMES[month].split(' ')[0];
              setPrintTitle(`مخطط الأنشطة والرزنامة الكشفية والتربوية لشهر ${currentMonthName} ${year}`);
              setPrintSectionFilter(sectionFilter);
              setShowPrintModal(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800 text-white font-extrabold text-xs px-5 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-emerald-600/10 transition-all hover:scale-[1.02]"
          >
            <Printer className="w-4.5 h-4.5" />
            <span>تصدير للطباعة / PDF</span>
          </button>

          <button
            onClick={() => setShowAddActivityModal(true)}
            className="bg-red-600 hover:bg-red-700 dark:bg-rose-700 dark:hover:bg-rose-800 text-white font-extrabold text-xs px-5 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-red-600/10 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>إضافة نشاط مخصص للرزنامة</span>
          </button>
        </div>
      </div>

      {/* SCREEN TABS */}
      <div className="flex border-b border-gray-100 dark:border-emerald-950/60 pb-px gap-6">
        <button
          onClick={() => setActiveTab('calendar')}
          className={`pb-3 text-sm font-extrabold relative transition-colors ${
            activeTab === 'calendar' 
              ? 'text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400' 
              : 'text-text-secondary dark:text-gray-400 hover:text-red-600'
          }`}
        >
          <span>التقويم الكشفي والمخطط التعليمي</span>
          {activities.length > 0 && (
            <span className="mr-2 px-2 py-0.5 text-[10px] rounded-full bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-300 font-bold">
              {activities.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('reminders')}
          className={`pb-3 text-sm font-extrabold relative transition-colors ${
            activeTab === 'reminders' 
              ? 'text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400' 
              : 'text-text-secondary dark:text-gray-400 hover:text-red-600'
          }`}
        >
          <span>التنبيهات وتذكيرات الفوج النشطة</span>
          {reminders.filter(r => r.isActive).length > 0 && (
            <span className="mr-2 px-2 py-0.5 text-[10px] rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300 font-bold animate-pulse">
              {reminders.filter(r => r.isActive).length}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'calendar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT PANEL: INTERACTIVE MONTHLY CALENDAR GRID */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-[#1a201b] border border-gray-100 dark:border-emerald-950/60 rounded-3xl p-5 shadow-xs">
              
              {/* Calendar Controls */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-50 dark:border-emerald-950/40">
                <button
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-emerald-950/30 text-text-secondary dark:text-gray-400 transition-colors"
                  title="الشهر السابق"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                <div className="text-center">
                  <h3 className="font-extrabold text-sm text-text-primary dark:text-white">
                    {MONTH_NAMES[month]}
                  </h3>
                  <span className="text-[10px] font-mono text-gray-400 font-bold tracking-widest">{year}</span>
                </div>

                <button
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-emerald-950/30 text-text-secondary dark:text-gray-400 transition-colors"
                  title="الشهر التالي"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Month Days Weekdays Headers */}
              <div className="grid grid-cols-7 gap-1 text-center py-3 text-[11px] font-black text-text-secondary dark:text-gray-400">
                {WEEKDAY_NAMES.map((w, idx) => (
                  <div key={idx} className={w.class}>
                    {w.short}
                  </div>
                ))}
              </div>

              {/* Calendar Days Matrix */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((dayObj, index) => {
                  const dayActList = getActivitiesForDate(dayObj.dateString);
                  const hasActivities = dayActList.length > 0;
                  const isSelected = selectedDate === dayObj.dateString;
                  
                  // Check if today relative to metadata (2026-06-16)
                  const isToday = dayObj.dateString === '2026-06-16';

                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(isSelected ? null : dayObj.dateString)}
                      disabled={!dayObj.isCurrentMonth}
                      className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center p-1 transition-all text-xs font-extrabold ${
                        !dayObj.isCurrentMonth 
                          ? 'text-gray-200 dark:text-emerald-950/20 cursor-default pointer-events-none' 
                          : isSelected
                            ? 'bg-red-600 text-white shadow-md shadow-red-600/20 scale-[1.04]'
                            : isToday
                              ? 'bg-red-50 text-red-600 border border-red-200 dark:bg-rose-950/20 dark:border-rose-900/60 dark:text-rose-300'
                              : 'bg-gray-50/50 hover:bg-gray-100/80 dark:bg-[#121612]/40 dark:hover:bg-[#202921]/60 text-text-primary dark:text-gray-300'
                      }`}
                    >
                      <span>{dayObj.day}</span>
                      
                      {/* Section Dot Indicator */}
                      {hasActivities && dayObj.isCurrentMonth && (
                        <div className="flex gap-0.5 justify-center mt-0.5 absolute bottom-1.5">
                          {dayActList.map((act, actIdx) => {
                            let dotColor = 'bg-emerald-600';
                            if (act.section.includes('الأشبال')) dotColor = 'bg-yellow-500';
                            else if (act.section.includes('الجوالة')) dotColor = 'bg-orange-500';
                            else if (act.section.includes('الرواد')) dotColor = 'bg-blue-500';
                            else if (act.section.includes('متقدم')) dotColor = 'bg-red-500';
                            
                            return (
                              <span 
                                key={actIdx} 
                                className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : dotColor}`} 
                              />
                            );
                          })}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Day Filter Indicator Info */}
              {selectedDate && (
                <div className="mt-4 bg-red-50/50 dark:bg-rose-950/10 p-3 rounded-2xl border border-red-100/40 dark:border-rose-950/40 text-xs text-right flex justify-between items-center">
                  <span className="text-red-700 dark:text-rose-300 font-extrabold flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-red-600" />
                    <span>تم تصفية العرض ليوم {selectedDate.split('-')[2]} جوان 2026</span>
                  </span>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="text-[10px] text-gray-400 hover:text-red-600 dark:hover:text-red-400 font-extrabold italic underline"
                  >
                    عرض جميع أنشطة الشهر
                  </button>
                </div>
              )}
            </div>

            {/* Quick stats on sections */}
            <div className="bg-white dark:bg-[#1a201b] border border-gray-100 dark:border-emerald-950/60 rounded-3xl p-5 shadow-xs text-xs space-y-3">
              <h4 className="font-extrabold text-xs text-text-primary dark:text-white">دليل ألوان الفروع والمراحل التربوية:</h4>
              <div className="grid grid-cols-2 gap-2.5 font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shrink-0" />
                  <span className="text-text-secondary dark:text-gray-400">الأشبال (اللون الأصفر)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                  <span className="text-text-secondary dark:text-gray-400">الفتيان / الكشاف (الأخضر)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                  <span className="text-text-secondary dark:text-gray-400">الكشاف المتقدم (الأحمر)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" />
                  <span className="text-text-secondary dark:text-gray-400">الجوالة (البرتقالي)</span>
                </div>
                <div className="flex items-center col-span-2 gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                  <span className="text-text-secondary dark:text-gray-400">الرواد والمناصب التدريبية القيادية</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: LIST OF ACTIVITIES */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Quick Filer bar */}
            <div className="bg-white dark:bg-[#1a201b] border border-gray-100 dark:border-emerald-950/60 p-4 rounded-3xl flex flex-col md:flex-row gap-3 items-center justify-between shadow-xs">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-xs font-bold text-text-secondary dark:text-gray-400 shrink-0"> تصفية المرحلة:</span>
                <select
                  value={sectionFilter}
                  onChange={(e) => setSectionFilter(e.target.value)}
                  className="bg-gray-50 dark:bg-[#131914] border border-gray-100 dark:border-emerald-950/60 rounded-xl px-2.5 py-1.5 text-xs font-bold text-text-primary dark:text-white"
                >
                  {SECTIONS.map(sec => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>

              <div className="relative bg-gray-50 dark:bg-[#131914] border border-gray-100 dark:border-emerald-950/60 rounded-xl flex items-center px-2 w-full md:w-64">
                <Search className="w-4 h-4 text-gray-400 mr-1.5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث بالاسم والمستلزمات..."
                  className="w-full bg-transparent px-2 py-2 text-xs focus:outline-none text-right font-bold"
                />
              </div>
            </div>

            {/* List */}
            <div className="space-y-4">
              {filteredActivities.map((act) => {
                // Find matching active reminder
                const actReminders = reminders.filter(rem => rem.activityId === act.id && rem.isActive);
                const hasActiveReminder = actReminders.length > 0;

                return (
                  <motion.div
                    key={act.id}
                    layoutId={act.id}
                    className="bg-white dark:bg-[#1a201b] border border-gray-100 dark:border-emerald-900/40 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4 text-right hover:border-red-200 dark:hover:border-red-950/70 transition-all text-sm font-bold relative overflow-hidden"
                  >
                    <div className="space-y-3">
                      
                      {/* Card meta row */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-50 dark:border-emerald-950/40 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold text-white bg-primary rounded-md px-2.5 py-1">
                            {act.section}
                          </span>
                          <span className="text-[10px] font-bold text-red-600 bg-red-50 dark:bg-rose-950/30 dark:text-rose-300 rounded-md px-2.5 py-1">
                            ⏱️ {act.duration}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-text-secondary dark:text-gray-400 font-mono">
                            📅 {formatArabicFriendlyDate(act.date)}
                          </span>

                          {act.isCustom && (
                            <button
                              onClick={(e) => handleDeleteCustomActivity(act.id, e)}
                              className="text-red-500 hover:text-red-600 transition-colors p-1 rounded-md bg-red-50 dark:bg-red-950/20"
                              title="حذف النشاط الكشفي المخصص للفوج"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Title block */}
                      <div className="space-y-1">
                        <h4 className="font-black text-base text-text-primary dark:text-white leading-snug">
                          {act.title}
                        </h4>
                        <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-black flex items-center gap-1">
                          <span>الهدف العام:</span>
                          <span className="font-semibold">{act.goal}</span>
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-text-secondary dark:text-gray-300 leading-relaxed font-semibold">
                        {act.description}
                      </p>

                      {/* Materials */}
                      <div className="bg-gray-50 dark:bg-[#131914] p-3.5 rounded-2xl text-[11px] text-text-secondary dark:text-gray-400 leading-relaxed border border-gray-100 dark:border-emerald-950/40 space-y-1 font-bold">
                        <span className="text-text-primary dark:text-white font-black block">المستلزمات والأدوات المطلوبة:</span>
                        <p className="text-[10px] font-semibold">{act.materials}</p>
                      </div>

                      {/* Reminder status / action */}
                      <div className="pt-3 border-t border-gray-50 dark:border-emerald-950/40 flex items-center justify-between">
                        {hasActiveReminder ? (
                          <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
                            </span>
                            <span className="text-xs font-black">
                              تنبيه نشط الساعة {actReminders[0].reminderTime}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 font-medium">لا توجد منبهات مفعّلة الآن</span>
                        )}

                        <button
                          onClick={(e) => openReminderModal(act, e)}
                          className="text-xs text-red-600 dark:text-red-400 hover:scale-[1.01] active:scale-[0.99] font-black border border-red-200/50 dark:border-red-950/60 bg-red-50/50 dark:bg-rose-950/20 rounded-xl px-4 py-2 flex items-center gap-1.5 transition-all"
                        >
                          <Bell className={`w-4 h-4 ${hasActiveReminder ? 'fill-yellow-500 stroke-yellow-500 text-yellow-500' : ''}`} />
                          <span>إعداد تذكير كشفي</span>
                        </button>
                      </div>

                    </div>
                  </motion.div>
                );
              })}

              {filteredActivities.length === 0 && (
                <div className="py-16 text-center text-text-secondary dark:text-gray-400 border border-gray-100 dark:border-emerald-950 rounded-3xl bg-white dark:bg-[#1a201b] space-y-2">
                  <Calendar className="w-12 h-12 mx-auto text-gray-200 dark:text-gray-700" strokeWidth="1.5" />
                  <p className="text-sm font-bold">لم تدرج أي أنشطة كشفية مطابقة لهذا اليوم/الفرز</p>
                  <p className="text-xs text-text-secondary dark:text-gray-500 font-semibold">استعمل زر "إضافة نشاط مخصص جديد" لبرمجة يوم كشفي بالكامل.</p>
                </div>
              )}
            </div>

          </div>

        </div>
      ) : (
        
        /* ACTIVE REMINDERS LIST TAB PANEL */
        <div className="bg-white dark:bg-[#1a201b] border border-gray-100 dark:border-emerald-950/60 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-50 dark:border-emerald-950 pb-4">
            <div>
              <h3 className="font-extrabold text-base text-text-primary dark:text-white">منصة إدارة التنبيهات الموقوتة</h3>
              <p className="text-xs text-text-secondary dark:text-gray-400 mt-1">تتبع التنبيهات الكشفية التي تم برمجتها بمتصفح الفوج والمستمدة من localStorage.</p>
            </div>
            
            <span className="text-xs bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300 font-bold px-3 py-1.5 rounded-full border border-red-100/50">
              إجمالي المنبهات: {reminders.length}
            </span>
          </div>

          <div className="space-y-4">
            {reminders.map((rem) => (
              <div
                key={rem.id}
                className={`p-5 rounded-2xl border transition-all text-xs font-bold leading-relaxed flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
                  rem.isActive 
                    ? 'bg-amber-50/20 border-amber-200 dark:bg-emerald-950/20 dark:border-emerald-900/60 text-text-primary dark:text-white' 
                    : 'bg-gray-50/50 border-gray-100 dark:bg-[#121612]/30 dark:border-emerald-950/30 text-gray-400'
                }`}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${rem.isActive ? 'bg-yellow-500 animate-pulse' : 'bg-gray-300'}`} />
                    <h4 className="font-black text-sm">{rem.activityTitle}</h4>
                  </div>

                  <p className="text-text-secondary dark:text-gray-300 font-semibold leading-relaxed">
                    📅 التاريخ المخطط: <span className="font-mono text-xs">{formatArabicFriendlyDate(rem.reminderDate)}</span> <br />
                    ⏱️ توقيت التنبيه: <span className="font-mono font-black border border-black/15 dark:border-white/10 p-0.5 px-1 bg-black/10 text-xs rounded inline-block mt-1">{rem.reminderTime}</span>
                  </p>

                  {rem.note && (
                    <p className="text-[11px] font-medium p-2 bg-black/5 dark:bg-black/25 rounded-md italic border-r-2 border-primary/50 text-text-secondary dark:text-gray-300">{rem.note}</p>
                  )}
                </div>

                {/* Switch Actions */}
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {/* Emulator simulation button */}
                  {rem.isActive && (
                    <button
                      onClick={() => handleTriggerTestReminder(rem)}
                      className="bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200/50 dark:border-yellow-900/60 px-3 py-1.5 rounded-xl font-black text-[10px] transition-all"
                      title="تجربة تفجير التنبيه فوراً لأغراض العرض والمحاكاة"
                    >
                      🗣️ تجربة تنبيه فوري
                    </button>
                  )}

                  <button
                    onClick={() => handleToggleReminder(rem.id)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black ${
                      rem.isActive 
                        ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200/50' 
                        : 'bg-primary/5 text-primary hover:bg-primary/10 border border-primary/10'
                    }`}
                  >
                    {rem.isActive ? 'إيقاف مؤقت' : 'تفعيل المنبه'}
                  </button>

                  <button
                    onClick={() => handleDeleteReminder(rem.id)}
                    className="p-1.5 text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-950/20 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {reminders.length === 0 && (
              <div className="py-16 text-center text-text-secondary dark:text-gray-400 space-y-3">
                <Bell className="w-12 h-12 mx-auto text-gray-200 dark:text-gray-700" strokeWidth="1.5" />
                <p className="text-sm font-bold">كل شيء هادئ! لا توجد تذكيرات مسجلة</p>
                <p className="text-xs text-text-secondary dark:text-gray-500 font-semibold">تأكد من تنشيط التنبيهات من داخل بطاقة أي نشاط بالتقويم الكشفي تزامناً مع الفترات التدريبية للفوج.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: ADD CUSTOM ACTIVITY */}
      <AnimatePresence>
        {showAddActivityModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#161a16] border border-gray-100 dark:border-emerald-900/30 rounded-3xl p-6 md:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-5 text-right shadow-2xl relative"
            >
              <div className="flex justify-between items-center border-b border-gray-50 dark:border-emerald-950 pb-3">
                <h3 className="font-extrabold text-base text-text-primary dark:text-white">إضافة نشاط مخصص في الرزنامة الكشفية</h3>
                <button
                  onClick={() => setShowAddActivityModal(false)}
                  className="bg-gray-100 dark:bg-[#202921] text-text-secondary dark:text-gray-300 font-bold px-3 py-1 rounded-full text-xs"
                >
                  إغلاق
                </button>
              </div>

              <form onSubmit={handleAddActivity} className="space-y-4 text-xs font-bold text-text-secondary dark:text-gray-400">
                <div className="space-y-1">
                  <label className="block text-text-primary dark:text-white font-extrabold text-xs">عنوان النشاط الكشفي:</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="مثال: مخيم تخطيط رؤية 2035 بدار الفياضة"
                    className="w-full bg-gray-50 dark:bg-[#131914] border border-gray-100 dark:border-emerald-950/60 rounded-xl px-3 py-2.5 text-xs text-text-primary dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-text-primary dark:text-white font-extrabold text-xs">القسم / الفرع المستهدف:</label>
                    <select
                      value={newSection}
                      onChange={(e) => setNewSection(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-[#131914] border border-gray-100 dark:border-emerald-950/60 rounded-xl px-3 py-2.5 text-xs text-text-primary dark:text-white font-bold"
                    >
                      {ADD_SECTIONS.map(sec => (
                        <option key={sec} value={sec}>{sec}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-text-primary dark:text-white font-extrabold text-xs">التاريخ المجدول بالكامل:</label>
                    <input
                      type="date"
                      required
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-[#131914] border border-gray-100 dark:border-emerald-950/60 rounded-xl px-3 py-2.5 text-xs text-text-primary dark:text-white font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-text-primary dark:text-white font-extrabold text-xs">الفترة الزمنية المتوقعة للخدمة:</label>
                    <input
                      type="text"
                      required
                      value={newDuration}
                      onChange={(e) => setNewDuration(e.target.value)}
                      placeholder="مثال: 5 ساعات / يوم كامل"
                      className="w-full bg-gray-50 dark:bg-[#131914] border border-gray-100 dark:border-emerald-950/60 rounded-xl px-3 py-2.5 text-xs text-text-primary dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-text-primary dark:text-white font-extrabold text-xs">الهدف التربوي والمنهجي:</label>
                    <select
                      value={newGoal}
                      onChange={(e) => setNewGoal(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-[#131914] border border-gray-100 dark:border-emerald-950/60 rounded-xl px-3 py-2.5 text-xs text-text-primary dark:text-white font-bold"
                    >
                      {ADD_GOALS.map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-text-primary dark:text-white font-extrabold text-xs">الوصف التفصيلي لمجريات وتدريبات النشاط:</label>
                  <textarea
                    required
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="اكتب بالتفصيل إرشادات العمل ومخطط السير الميداني..."
                    rows={3.5}
                    className="w-full bg-gray-50 dark:bg-[#131914] border border-gray-100 dark:border-emerald-950/60 rounded-xl px-3 py-2.5 text-xs text-text-primary dark:text-white whitespace-pre-line"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-text-primary dark:text-white font-extrabold text-xs">الأدوات والمستلزمات المطلوبة للفوج:</label>
                  <input
                    type="text"
                    value={newMaterials}
                    onChange={(e) => setNewMaterials(e.target.value)}
                    placeholder="مثال: أقمشة، حبال سيزال، خرائط طبوغرافية، خيم استكشاف"
                    className="w-full bg-gray-50 dark:bg-[#131914] border border-gray-100 dark:border-emerald-950/60 rounded-xl px-3 py-2.5 text-xs text-text-primary dark:text-white"
                  />
                </div>

                <div className="pt-4 border-t border-gray-50 dark:border-emerald-950 flex justify-end gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setShowAddActivityModal(false)}
                    className="bg-gray-100 dark:bg-[#202921] px-4 py-2.5 rounded-xl font-bold"
                  >
                    تراجع وإلغاء
                  </button>
                  <button
                    type="submit"
                    className="bg-red-600 text-white hover:bg-red-700 px-5 py-2.5 rounded-xl font-bold shadow-md shadow-red-600/10"
                  >
                    حفظ وإدراج بالرزنامة
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: SCHEDULE REMINDER FOR HIGHLIGHTED ACTIVITY */}
      <AnimatePresence>
        {reminderModalActivity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#161a16] border border-gray-100 dark:border-emerald-900/30 rounded-3xl p-6 md:p-8 max-w-md w-full text-right shadow-2xl relative space-y-4"
            >
              <div className="flex justify-between items-center border-b border-gray-50 dark:border-emerald-950 pb-3">
                <div className="flex items-center gap-1.5 text-red-600">
                  <Bell className="w-5 h-5" />
                  <h3 className="font-extrabold text-sm text-text-primary dark:text-white">جدولة تذكير محلي بالمنصة</h3>
                </div>
                <button
                  onClick={() => setReminderModalActivity(null)}
                  className="bg-gray-100 dark:bg-[#202921] text-text-secondary dark:text-gray-300 font-bold px-3 py-1 rounded-full text-[10px]"
                >
                  إغلاق
                </button>
              </div>

              <div className="space-y-1.5 bg-gray-50 dark:bg-[#131914] p-3 rounded-2xl border border-gray-100 dark:border-emerald-950 text-xs">
                <span className="text-xs text-text-secondary dark:text-gray-400 font-bold">النشاط المستهدف بالمنبه:</span>
                <p className="font-black text-xs text-text-primary dark:text-white mt-0.5 leading-snug">{reminderModalActivity.title}</p>
              </div>

              <form onSubmit={handleSaveReminder} className="space-y-3.5 text-xs font-bold text-text-secondary dark:text-gray-400">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-text-primary dark:text-white font-extrabold text-xs">تاريخ التنبيه:</label>
                    <input
                      type="date"
                      required
                      value={reminderDate}
                      onChange={(e) => setReminderDate(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-[#131914] border border-gray-100 dark:border-emerald-950/60 rounded-xl px-3 py-2.5 text-xs text-text-primary dark:text-white font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-text-primary dark:text-white font-extrabold text-xs">توقيت التنبيه:</label>
                    <input
                      type="time"
                      required
                      value={reminderTime}
                      onChange={(e) => setReminderTime(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-[#131914] border border-gray-100 dark:border-emerald-950/60 rounded-xl px-3 py-2.5 text-xs text-text-primary dark:text-white font-bold font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-text-primary dark:text-white font-extrabold text-xs">كيف تود استلام التنبيه؟:</label>
                  <select
                    value={reminderAlertType}
                    onChange={(e: any) => setReminderAlertType(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-[#131914] border border-gray-100 dark:border-emerald-950/60 rounded-xl px-3 py-2.5 text-xs text-text-primary dark:text-white font-bold"
                  >
                    <option value="in_app">إشعار تفاعلي مخصص بداخل التطبيق (موصى به)</option>
                    <option value="browser">إشعار المتصفح والنظام المباشر (PWA/Push)</option>
                    <option value="both">كلاهما معاً لتأمين الحضور الكشفي</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-text-primary dark:text-white font-extrabold text-xs">ملاحظة كشفية خاصة بالتحضير (مثال: مستندات القيادة):</label>
                  <textarea
                    value={reminderNote}
                    onChange={(e) => setReminderNote(e.target.value)}
                    placeholder="مثال: لا تنسى جلب طبوع الفوج ومعجم العقد الكشفية اليدوية..."
                    rows={2.5}
                    className="w-full bg-gray-50 dark:bg-[#131914] border border-gray-100 dark:border-emerald-950/60 rounded-xl px-3 py-2 text-xs text-text-primary dark:text-white"
                  />
                </div>

                <div className="pt-4 border-t border-gray-50 dark:border-emerald-950 flex justify-end gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setReminderModalActivity(null)}
                    className="bg-gray-100 dark:bg-[#202921] px-4 py-2.5 rounded-xl font-bold"
                  >
                    إلغاء التراجع
                  </button>
                  <button
                    type="submit"
                    className="bg-red-600 text-white hover:bg-red-700 px-5 py-2.5 rounded-xl font-bold shadow-md shadow-red-600/10"
                  >
                    تثبيت المنبه الموقوت
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: EXPORT TO PRINT / PDF WITH ADVANCED SCOUT CUSTOMIZATION */}
      <AnimatePresence>
        {showPrintModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-100 dark:bg-[#121612] w-full h-full md:h-[90vh] md:max-w-6xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-right"
            >
              {/* STYLE TAG FOR CUSTOM PRINT MEDIA QUERY RULES */}
              <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                  /* Hide app shell and modal configurations entirely */
                  body, html {
                    background: white !important;
                    color: black !important;
                    margin: 0 !important;
                    padding: 0 !important;
                  }
                  #root, header, footer, nav, aside, button, .no-print {
                    display: none !important;
                    height: 0 !important;
                    overflow: hidden !important;
                    visibility: hidden !important;
                  }
                  /* Make the print preview occupy the entire paper */
                  #scout-printable-area {
                    display: block !important;
                    visibility: visible !important;
                    position: absolute !important;
                    left: 0 !important;
                    top: 0 !important;
                    width: 100% !important;
                    padding: 20mm !important;
                    background: white !important;
                    color: black !important;
                    box-shadow: none !important;
                    border: none !important;
                    direction: rtl !important;
                  }
                  .print-page-break {
                    page-break-after: always !important;
                    break-after: always !important;
                  }
                  .print-card {
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                  }
                }
              ` }} />

              {/* MODAL HEADER */}
              <div className="bg-white dark:bg-[#161a16] border-b border-gray-200 dark:border-emerald-950 px-6 py-4 flex items-center justify-between no-print shrink-0">
                <div className="flex items-center gap-2.5 text-emerald-600">
                  <Printer className="w-6 h-6 animate-pulse" />
                  <div>
                    <h3 className="font-extrabold text-base text-text-primary dark:text-white">مركز طباعة وتصدير التقارير الكشفية المعتمدة</h3>
                    <p className="text-xs text-text-secondary dark:text-gray-400 mt-0.5 font-bold">جهز، نسق، وأضف لمسات القيادة قبل استخراج مستند الـ PDF لفرقتك الكشفية.</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="bg-gray-100 hover:bg-gray-200 dark:bg-[#202921] dark:hover:bg-emerald-950 text-text-secondary dark:text-gray-300 font-extrabold px-4 py-2 rounded-xl text-xs transition-colors"
                >
                  إغلاق المركز
                </button>
              </div>

              {/* TWO PANEL CONTENT */}
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                
                {/* LEFT PANEL: CONFIGURATION (no-print) */}
                <div className="w-full md:w-[35%] bg-white dark:bg-[#141814] border-l border-gray-200 dark:border-emerald-950 p-6 overflow-y-auto no-print space-y-5 text-xs font-bold text-text-secondary dark:text-gray-300">
                  <div className="bg-red-50/50 dark:bg-red-950/20 p-3 rounded-2xl border border-red-100 dark:border-red-950/40">
                    <span className="text-xs text-red-700 dark:text-red-400 font-black block mb-1">💡 معيار الهوية المعتمد:</span>
                    <p className="text-[11px] leading-relaxed font-semibold text-red-600 dark:text-red-300/90">
                      يتم توليد المستند متوافقاً مع الدليل البصري القياسي للكشافة التونسية (الهلال الأحمر، زهرة الزنبق الخضراء، وتفاصيل القيادة الرسمية).
                    </p>
                  </div>

                  {/* Document Title */}
                  <div className="space-y-1.5">
                    <label className="text-text-primary dark:text-white font-extrabold">عنوان التقرير والمخطط:</label>
                    <input
                      type="text"
                      value={printTitle}
                      onChange={(e) => setPrintTitle(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-[#101410] border border-gray-200 dark:border-emerald-950 rounded-xl px-3 py-2.5 text-xs text-text-primary dark:text-white font-semibold"
                      placeholder="عنوان التقرير..."
                    />
                  </div>

                  {/* Scout details group */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-text-primary dark:text-white font-extrabold">الفوج الكشفي:</label>
                      <input
                        type="text"
                        value={scoutGroup}
                        onChange={(e) => setScoutGroup(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-[#101410] border border-gray-200 dark:border-emerald-950 rounded-xl px-3 py-2.5 text-xs text-text-primary dark:text-white font-semibold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-text-primary dark:text-white font-extrabold">جهة الكشافة:</label>
                      <input
                        type="text"
                        value={scoutRegion}
                        onChange={(e) => setScoutRegion(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-[#101410] border border-gray-200 dark:border-emerald-950 rounded-xl px-3 py-2.5 text-xs text-text-primary dark:text-white font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-text-primary dark:text-white font-extrabold">المسؤول القيادي:</label>
                      <input
                        type="text"
                        value={scoutLeader}
                        onChange={(e) => setScoutLeader(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-[#101410] border border-gray-200 dark:border-emerald-950 rounded-xl px-3 py-2.5 text-xs text-text-primary dark:text-white font-semibold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-text-primary dark:text-white font-extrabold">الموسم الكشفي:</label>
                      <input
                        type="text"
                        value={scoutSeason}
                        onChange={(e) => setScoutSeason(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-[#101410] border border-gray-200 dark:border-emerald-950 rounded-xl px-3 py-2.5 text-xs text-text-primary dark:text-white font-semibold"
                      />
                    </div>
                  </div>

                  {/* Filtering by Section inside print */}
                  <div className="space-y-1.5">
                    <label className="text-text-primary dark:text-white font-extrabold">تصفية الفرع الكشفي بالتقرير:</label>
                    <select
                      value={printSectionFilter}
                      onChange={(e) => setPrintSectionFilter(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-[#101410] border border-gray-200 dark:border-emerald-950 rounded-xl px-3 py-2.5 text-xs text-text-primary dark:text-white font-bold"
                    >
                      {SECTIONS.map(sec => (
                        <option key={sec} value={sec}>{sec === 'الكل' ? 'عرض كافة الفروع والأقسام كلياً' : sec}</option>
                      ))}
                    </select>
                  </div>

                  {/* Checkboxes layout styling */}
                  <div className="space-y-3 bg-gray-50 dark:bg-[#101410] p-4 rounded-2xl border border-gray-100 dark:border-emerald-950/60">
                    <span className="text-text-primary dark:text-white font-extrabold block mb-1">خيارات عرض المكونات بالورقة:</span>
                    
                    <label className="flex items-center gap-2 cursor-pointer text-text-primary dark:text-white font-bold">
                      <input
                        type="checkbox"
                        checked={includeMaterials}
                        onChange={(e) => setIncludeMaterials(e.target.checked)}
                        className="rounded border-gray-300 dark:border-emerald-950 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                      />
                      <span>تضمين الأدوات والمستلزمات بكل نشاط</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-text-primary dark:text-white font-bold">
                      <input
                        type="checkbox"
                        checked={includeReminders}
                        onChange={(e) => setIncludeReminders(e.target.checked)}
                        className="rounded border-gray-300 dark:border-emerald-950 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                      />
                      <span>تضمين التذكيرات الموقوتة بالتقرير</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-text-primary dark:text-white font-bold">
                      <input
                        type="checkbox"
                        checked={includeSignatures}
                        onChange={(e) => setIncludeSignatures(e.target.checked)}
                        className="rounded border-gray-300 dark:border-emerald-950 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                      />
                      <span>تضمين تواقيع الاعتمادات (قائد الوحدة / الفوج)</span>
                    </label>
                  </div>

                  {/* Dynamic Custom Note per Activity inside PDF creator */}
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary dark:text-white font-extrabold">توجيهات القيادة الخاصة بالأنشطة (تظهر بالطباعة):</span>
                      <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full text-[9px] font-black">ديناميكي</span>
                    </div>

                    {activities.filter(act => printSectionFilter === 'الكل' || act.section === printSectionFilter).length === 0 ? (
                      <p className="text-[11px] text-gray-400 italic">لا توجد أنشطة بالقسم الحالي لكتابة ملاحظات عليها.</p>
                    ) : (
                      <div className="max-h-56 overflow-y-auto space-y-3 pr-1 border-r border-dashed border-gray-100 dark:border-emerald-950">
                        {activities
                          .filter(act => printSectionFilter === 'الكل' || act.section === printSectionFilter)
                          .sort((a, b) => a.date.localeCompare(b.date))
                          .map(act => (
                            <div key={act.id} className="space-y-1 bg-gray-50/50 dark:bg-[#101410] p-2.5 rounded-xl border border-gray-100 dark:border-emerald-950/40">
                              <span className="font-extrabold text-text-primary dark:text-white text-[11px] block truncate">{act.title}</span>
                              <textarea
                                value={printNotes[act.id] || ''}
                                onChange={(e) => handleSavePrintNote(act.id, e.target.value)}
                                placeholder="أضف ملاحظات التنفيذ، الحضور، أو شروط الأمان لهذا النشاط..."
                                rows={2}
                                className="w-full bg-white dark:bg-[#161a16] border border-gray-200 dark:border-emerald-950/80 rounded-lg p-1.5 text-[10px] text-text-primary dark:text-white font-semibold focus:outline-none"
                              />
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Print trigger button inside Configuration panel */}
                  <div className="pt-4 border-t border-gray-100 dark:border-emerald-950 flex flex-col gap-2">
                    <button
                      onClick={() => window.print()}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-3 px-5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10 transition-colors"
                    >
                      <Printer className="w-4.5 h-4.5" />
                      <span>إرسال لملف PDF / طابعة النظام</span>
                    </button>
                    <p className="text-[10px] text-center text-text-secondary dark:text-gray-400 font-medium">
                      سيقوم المتصفح بفتح شاشة الطباعة الافتراضية. اختر <span className="font-bold text-emerald-600 dark:text-emerald-400">"حفظ كـ PDF" (Save as PDF)</span> لحفظه كملف رقمي.
                    </p>
                  </div>
                </div>

                {/* RIGHT PANEL: LIVE DOCUMENT PREVIEW (Styled as actual A4 sheet) */}
                <div className="flex-1 bg-gray-200/50 dark:bg-[#0c0f0c] p-4 md:p-8 overflow-y-auto flex justify-center">
                  
                  {/* PRINTABLE CONTAINER (This will be the ONLY visible thing during print) */}
                  <div
                    id="scout-printable-area"
                    className="w-full max-w-[210mm] bg-white text-black p-8 md:p-12 shadow-xl rounded-lg border border-gray-300 relative font-sans text-right flex flex-col gap-6"
                    style={{ minHeight: '297mm', color: '#111827', direction: 'rtl' }}
                  >
                    {/* SCOUT OFFICIAL WATERMARK BACKGROUND EFFECT FOR DIGITAL PREVIEW */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center">
                      <svg className="w-96 h-96" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                        <path d="M 50,15 C 30,15 15,30 15,50 C 15,70 30,85 50,85 C 65,85 78,74 82,60 C 72,68 60,68 52,60 C 44,52 44,40 52,32 C 60,24 72,24 82,32 C 78,18 65,15 50,15 Z" fill="currentColor" />
                      </svg>
                    </div>

                    {/* OFFICIAL TOP HEADER */}
                    <div className="grid grid-cols-3 items-center border-b-4 border-double border-red-600 pb-5 relative z-10">
                      {/* Right Header Details */}
                      <div className="space-y-1 text-xs text-gray-800 font-bold leading-normal">
                        <p className="text-sm font-black text-red-600">الكـشـافـة التـونـسـيـة</p>
                        <p>الجهة الكشفية: <span className="underline">{scoutRegion || 'جهة تونس'}</span></p>
                        <p>الفوج الكشفي: <span className="underline">{scoutGroup || 'فوج قرطاج'}</span></p>
                        <p className="text-[10px] text-gray-500 font-semibold">تأسست الحركة الكشفية بتونس عام 1933</p>
                      </div>

                      {/* Center Emblem Symbol */}
                      <div className="flex justify-center">
                        <div className="flex flex-col items-center">
                          <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
                            {/* Beautiful Tunisian Scout emblem Representation */}
                            <path d="M 50,12 C 28,12 12,28 12,50 C 12,72 28,88 50,88 C 66,88 80,76 84,60 C 72,68 58,68 49,59 C 40,50 40,36 49,27 C 58,18 72,18 84,27 C 80,15 66,12 50,12 Z" fill="#DC2626" />
                            <path d="M 50,25 C 53,35 58,40 64,46 C 58,52 53,57 50,72 C 47,57 42,52 36,46 C 42,40 47,35 50,25 Z" fill="#15803D" />
                            <rect x="44" y="47" width="12" height="4" rx="1" fill="#EAB308" />
                          </svg>
                          <span className="text-[9px] text-red-600 font-extrabold tracking-widest mt-1">كن مستعداً</span>
                        </div>
                      </div>

                      {/* Left Header Details */}
                      <div className="space-y-1 text-xs text-left text-gray-800 font-bold leading-normal">
                        <p>تاريخ التصدير: <span className="underline">{new Date().toLocaleDateString('ar-TN', { year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
                        <p>المسؤول: <span className="underline">{scoutLeader || 'القائد العام'}</span></p>
                        <p>الموسم: <span className="underline">{scoutSeason || '2025 - 2026'}</span></p>
                        <p className="text-[10px] text-emerald-700 font-extrabold font-sans">المنظمة العالمية للحركة الكشفية (WOSM)</p>
                      </div>
                    </div>

                    {/* MAIN DOCUMENT TITLE */}
                    <div className="text-center py-4 bg-red-50 rounded-2xl border border-red-100 relative z-10 print-card">
                      <h2 className="text-lg md:text-xl font-extrabold text-red-800 tracking-tight leading-snug">{printTitle}</h2>
                      <p className="text-xs text-emerald-800 font-black mt-1">
                        القسم والمستهدف البصري للطباعة: {printSectionFilter === 'الكل' ? 'كافة الفروع والوحدات الكشفية المندمجة' : `قسم ${printSectionFilter}`}
                      </p>
                    </div>

                    {/* SUMMARY OF THE REPORT */}
                    <div className="grid grid-cols-4 gap-4 text-center text-xs border border-gray-200 p-4 rounded-xl bg-gray-50/50 print-card relative z-10">
                      <div>
                        <span className="text-gray-500 font-bold block mb-0.5">مجموع الأنشطة</span>
                        <span className="text-lg font-black text-red-600">{
                          activities.filter(act => printSectionFilter === 'الكل' || act.section === printSectionFilter).length
                        }</span>
                      </div>
                      <div className="border-r border-gray-200">
                        <span className="text-gray-500 font-bold block mb-0.5">جهة القيادة</span>
                        <span className="text-xs font-black text-gray-800 truncate block px-1">{scoutRegion}</span>
                      </div>
                      <div className="border-r border-gray-200">
                        <span className="text-gray-500 font-bold block mb-0.5">الفوج الكشفي</span>
                        <span className="text-xs font-black text-gray-800 truncate block px-1">{scoutGroup}</span>
                      </div>
                      <div className="border-r border-gray-200">
                        <span className="text-gray-500 font-bold block mb-0.5">الرتبة والاعتماد</span>
                        <span className="text-xs font-black text-emerald-700">مخطط تربوي رسمي</span>
                      </div>
                    </div>

                    {/* ACTIVITIES DETAILS LIST */}
                    <div className="space-y-6 relative z-10 flex-1">
                      <h3 className="text-sm font-black text-gray-800 border-b border-gray-200 pb-1.5 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 bg-red-600 rounded-full"></span>
                        <span>البرنامج والجدول الزمني المفصل للأنشطة التربوية والميدانية</span>
                      </h3>

                      {activities.filter(act => printSectionFilter === 'الكل' || act.section === printSectionFilter).length === 0 ? (
                        <div className="text-center py-12 text-gray-400 italic text-xs font-semibold">
                          لا توجد أي أنشطة كشفية مطابقة لخيارات التصفية المختارة حالياً في هذا التقرير.
                        </div>
                      ) : (
                        <div className="space-y-5">
                          {activities
                            .filter(act => printSectionFilter === 'الكل' || act.section === printSectionFilter)
                            .sort((a, b) => a.date.localeCompare(b.date))
                            .map((act, index) => {
                              const customNote = printNotes[act.id];
                              return (
                                <div
                                  key={act.id}
                                  className="border border-gray-200 rounded-2xl p-5 bg-white space-y-3.5 print-card shadow-sm"
                                >
                                  {/* Activity top banner */}
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-gray-100">
                                    <div className="flex items-center gap-2">
                                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                                        {index + 1}
                                      </span>
                                      <h4 className="font-extrabold text-sm text-gray-950">{act.title}</h4>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto text-[10px] font-black">
                                      <span className="bg-red-50 text-red-700 px-2.5 py-1 rounded-md border border-red-100/50">
                                        👤 فرع {act.section}
                                      </span>
                                      <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md">
                                        ⏱️ {act.duration}
                                      </span>
                                      <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-100/30">
                                        📅 {formatArabicFriendlyDate(act.date)}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Content Details */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700 leading-relaxed font-semibold">
                                    <div className="space-y-1.5">
                                      <p className="text-[11px] text-gray-500 font-bold">🎯 الهدف التربوي والمنهجي المبرمج للفرع:</p>
                                      <p className="text-gray-900 font-extrabold bg-gray-50 p-2.5 rounded-xl border border-gray-100">{act.goal}</p>
                                    </div>

                                    <div className="space-y-1.5">
                                      <p className="text-[11px] text-gray-500 font-bold">📖 مجريات وسير التنفيذ العملي والميداني للنشاط:</p>
                                      <p className="text-gray-800 font-medium whitespace-pre-line text-[11px] bg-gray-50 p-2.5 rounded-xl border border-gray-100">{act.description}</p>
                                    </div>
                                  </div>

                                  {/* Conditional Materials */}
                                  {includeMaterials && act.materials && (
                                    <div className="bg-amber-50/40 p-3 rounded-xl border border-amber-100/60 text-xs text-amber-900 font-semibold leading-relaxed">
                                      <span className="font-extrabold text-[#7D5A2E] text-[11px] block mb-1 font-sans">🛠️ الأدوات واللوجستيات والمستلزمات المطلوبة للفوج:</span>
                                      <p className="text-[11px] font-medium text-amber-800">{act.materials}</p>
                                    </div>
                                  )}

                                  {/* Conditional Leadership Custom Print Note */}
                                  {customNote && (
                                    <div className="bg-emerald-50/40 p-3 rounded-xl border border-emerald-100 text-xs text-emerald-900 font-semibold leading-relaxed">
                                      <span className="font-extrabold text-emerald-800 text-[11px] block mb-1 font-sans">✍️ توجيهات وتقديرات القيادة المباشرة للفوج:</span>
                                      <p className="text-[11px] font-medium text-emerald-800 whitespace-pre-line">{customNote}</p>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>

                    {/* OPTIONAL REMINDERS SECTION */}
                    {includeReminders && reminders.length > 0 && (
                      <div className="space-y-3.5 relative z-10 print-card border-t border-gray-200 pt-5 mt-4">
                        <h3 className="text-sm font-black text-gray-800 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></span>
                          <span>جدول التذكيرات والتنبيهات الموقوتة المصاحبة للمنصة</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700 font-semibold">
                          {reminders.map(rem => (
                            <div key={rem.id} className="border border-gray-100 rounded-xl p-3 bg-gray-50/50 space-y-1">
                              <p className="font-extrabold text-gray-900">{rem.activityTitle}</p>
                              <p className="text-[11px] text-gray-500">
                                📅 {formatArabicFriendlyDate(rem.reminderDate)} | ⏱️ {rem.reminderTime} | 🔔 {rem.alertType === 'in_app' ? 'إشعار بالمنصة' : rem.alertType === 'browser' ? 'إشعار النظام' : 'كلاهما'}
                              </p>
                              {rem.note && <p className="text-[10px] text-emerald-800 italic font-medium">ملاحظة التنبيه: {rem.note}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* OFFICIAL FOOTER & SIGNATURES SECTION */}
                    {includeSignatures && (
                      <div className="border-t-2 border-dashed border-gray-200 pt-6 mt-auto relative z-10 print-card">
                        <div className="grid grid-cols-2 gap-8 text-center text-xs text-gray-800 font-extrabold">
                          <div className="space-y-12">
                            <p>قـائد الـوحـدة والـفرقـة:</p>
                            <div className="w-40 mx-auto border-b border-gray-400 border-dashed pb-2 text-[10px] text-gray-400 font-semibold">توقيع المسؤول وختم الفرقة</div>
                          </div>
                          <div className="space-y-12">
                            <p>قـائد الفـوج ومجلـس الشـرف:</p>
                            <div className="w-40 mx-auto border-b border-gray-400 border-dashed pb-2 text-[10px] text-gray-400 font-semibold">اعتماد قائد الفوج الكشفي</div>
                          </div>
                        </div>

                        {/* Calligraphic Closing Quote */}
                        <div className="text-center mt-10 text-xs font-black text-red-600 tracking-wide select-none">
                          عـاش الكـشّـاف التـونـسـي حـرّاً نـبـيـلاً ⚜️ كـن مـسـتـعـدّاً لخدمـة الوطـن والمـجتـمع
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* MODAL BOTTOM BAR */}
              <div className="bg-white dark:bg-[#161a16] border-t border-gray-200 dark:border-emerald-950 px-6 py-4 flex items-center justify-end gap-3 no-print shrink-0">
                <button
                  type="button"
                  onClick={() => setShowPrintModal(false)}
                  className="bg-gray-100 hover:bg-gray-200 dark:bg-[#202921] dark:hover:bg-emerald-950 text-text-secondary dark:text-gray-300 font-extrabold px-5 py-2.5 rounded-xl text-xs transition-colors"
                >
                  إلغاء وتراجع
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/10 transition-colors"
                >
                  <Printer className="w-4.5 h-4.5" />
                  <span>بدء الطباعة وتصدير التقرير</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

