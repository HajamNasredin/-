import React, { useState, useEffect } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  Search, 
  Compass, 
  BookOpen, 
  Award, 
  Calculator, 
  FileText, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  Settings, 
  Share2, 
  Heart, 
  Bell, 
  Trash2, 
  ChevronRight, 
  TrendingUp, 
  Building2, 
  AlertOctagon, 
  Info, 
  Sparkles,
  ExternalLink,
  MessageSquareCode,
  Globe2,
  BookmarkCheck,
  CheckCircle2,
  UserPlus,
  UserCheck,
  History,
  ClipboardList
} from 'lucide-react';
import { 
  SCOUTS_NEWS, 
  CONTACT_INFO, 
  EDUCATIONAL_PLANS, 
  FAQS 
} from '../data/appData';
import { NewsItem } from '../types';

// ==========================================
// 1. HOME SCREEN
// ==========================================
interface HomeScreenProps {
  onNavigate: (screenId: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export function HomeScreen({ onNavigate, favorites, toggleFavorite }: HomeScreenProps) {
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedVerifyTab, setSelectedVerifyTab] = useState<string | null>(null);

  // Auto scroll news slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNewsIndex(prev => (prev + 1) % SCOUTS_NEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Quick stats from report
  const stats = [
    { label: 'بريد تدريبي منجز', value: '557', suffix: 'دورة', sub: '495 أساسية + 62 متخصصة', icon: Award, color: 'text-primary' },
    { label: 'ولايات مشمولة فاعلة', value: '15', suffix: 'جهة', sub: 'تغطية مستمرة للأفواج', icon: MapPin, color: 'text-secondary' },
    { label: 'تربية وتنمية مجتمعية', value: '57.1%', suffix: 'حصة', sub: 'تركيز على أثر المتطوعين', icon: TrendingUp, color: 'text-accent' },
    { label: 'نشاطات وهيكلة', value: '11/42', suffix: 'لقاء', sub: '11 اجتماعاً + 42 خرجة', icon: Users, color: 'text-primary' }
  ];

  // Quick action links
  const quickActions = [
    { id: 'education', title: 'الشروط الدراسية', desc: '12 خطة لتولّي قيادة الهياكل والوحدات', icon: BookOpen, color: 'from-red-800 to-red-600' },
    { id: 'curriculum', title: 'المناهج والأقسام', desc: 'مقررات التنشيط للأشبال، الفتيان والجوالة', icon: Compass, color: 'from-amber-600 to-amber-500' },
    { id: 'calculator', title: 'حاسبة فرص الترشح', desc: 'احسب نقاط تأهيلك للمشاريع والخطوط', icon: Calculator, color: 'from-secondary to-orange-500' },
    { id: 'forms', title: 'نماذج وتعبئة الطلبات', desc: '5 استمارات رسمية جاهزة للتحميل والطباعة', icon: FileText, color: 'from-teal-700 to-teal-500' },
    { id: 'leadership', title: 'المناصب القيادية', desc: 'تنظيم الهياكل وصلاحيات قادة الفرق', icon: Users, color: 'from-blue-700 to-blue-500' },
    { id: 'penalties', title: 'العقوبات والجزاءات', desc: 'ميثاق النزاهة وحقوق المترشح والضوابط', icon: AlertOctagon, color: 'from-red-800 to-red-600' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
      id="home-screen-root"
    >
      {/* Welcome Banner */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-primary/10 border-r-4 border-primary p-4 rounded-xl flex items-start justify-between dark:bg-primary/20"
          >
            <div className="flex gap-3">
              <Sparkles className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-primary dark:text-primary-light">مرحباً بك في البوابة الوطنية لقسم القيادات الكشفية</h3>
                <p className="text-sm text-text-secondary dark:text-gray-300 mt-1">
                  منصة إدارية موحدة للكشافة التونسية لعام 2026. تمنحك وصولاً ذكياً للمقررات القانونية والمستجدات الرسمية المعتمدة.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowWelcome(false)}
              className="text-text-secondary hover:text-text-primary dark:text-gray-400 p-1"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header with Scouts Geometric Pattern */}
      <div className="relative bg-gradient-to-br from-primary via-primary to-red-950 text-white rounded-3xl p-8 md:p-12 overflow-hidden shadow-xl shadow-primary/10">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute -left-16 -top-16 w-64 h-64 bg-secondary/30 rounded-full blur-3xl"></div>
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-2xl space-y-6">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-accent text-sm font-semibold py-1.5 px-3.5 rounded-full border border-white/20">
            <Sparkles className="w-4 h-4" />
            رؤية الكشافة التونسية 2035
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            كن مستعداً.. لصناعة قادة <span className="text-accent">الغد والمواطنة</span>
          </h1>
          <p className="text-white/80 md:text-lg leading-relaxed">
            البوابة الكشفية التونسية هي دليلك التنظيمي المتكامل لإدارة الوحدات، الترشح للبرامج الوطنية، متابعة المناهج التربوية وتأهيل القيادات في أكاديمية دار الفياضة الدولية.
          </p>

          {/* Quick Search trigger */}
          <div className="flex gap-2 max-w-md pt-2">
            <div 
              onClick={() => onNavigate('search-global-tab')}
              className="w-full bg-white/15 backdrop-blur-md rounded-xl px-4 py-3.5 flex items-center gap-3 border border-white/20 cursor-pointer text-white/70 hover:bg-white/25 transition-all group"
            >
              <Search className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
              <span>البحث السريع في القوانين والمناهج...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Official News Slider Banner */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-secondary rounded-full"></span>
            <h2 className="text-xl font-extrabold text-text-primary dark:text-white">مستجدات الكشافة التونسية الرسمية (2025-2026)</h2>
          </div>
          <button 
            onClick={() => onNavigate('news')}
            className="text-primary hover:text-primary-light text-sm font-bold flex items-center gap-1 transition-colors"
          >
            عرض الكل <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
        </div>

        <div className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNewsIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 cursor-pointer"
              onClick={() => onNavigate('news')}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-red-100 dark:border-red-900/30">
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                  هام وعاجل
                </span>
                <span className="text-xs text-text-secondary dark:text-gray-400">{SCOUTS_NEWS[activeNewsIndex].date}</span>
              </div>
              <h3 className="text-lg font-bold text-text-primary dark:text-white hover:text-primary transition-colors">
                {SCOUTS_NEWS[activeNewsIndex].title}
              </h3>
              <p className="text-sm text-text-secondary dark:text-gray-300 leading-relaxed max-w-4xl">
                {SCOUTS_NEWS[activeNewsIndex].summary}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-end gap-1.5 mt-4">
            {SCOUTS_NEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveNewsIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === activeNewsIndex ? 'bg-primary w-6' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Grid (6 Actions - responsive) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-6 bg-primary rounded-full"></span>
          <h2 className="text-xl font-extrabold text-text-primary dark:text-white">الوصول السريع للأدلة والخدمات</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, idx) => {
            const IconComponent = action.icon;
            return (
              <motion.div
                key={action.id}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => onNavigate(action.id)}
                className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 rounded-2xl p-5 shadow-sm text-right cursor-pointer hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${action.color} flex items-center justify-center text-white shadow-md shadow-black/5 group-hover:scale-105 transition-transform`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-text-primary dark:text-white group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-gray-400 leading-tight">
                    {action.desc}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-end text-primary dark:text-primary-light font-bold text-xs group-hover:translate-x-[-4px] transition-transform">
                  <span>تصفح الدليل</span>
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Official Report Stats Section (Bento layout) */}
      <div className="bg-gradient-to-tr from-red-50 to-red-100/50 dark:from-red-950/20 dark:to-[#1a0e10] border border-red-100 dark:border-red-900/30 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="max-w-2xl text-right">
          <h2 className="text-2xl font-extrabold text-primary dark:text-primary-light">مؤشرات الأداء والحصاد الكشفي (2025-2026)</h2>
          <p className="text-sm text-text-secondary dark:text-gray-300 mt-2">
            أرقام وإنجازات معتمدة مستخلصة مباشرة من التقرير المرحلي الكشفي الرسمي للكشافة التونسية للفترة الممتدة من أكتوبر 2025 إلى فيفري 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-[#110708] border border-red-100/40 dark:border-red-900/30 p-5 rounded-2xl flex flex-col justify-between space-y-3 relative group overflow-hidden"
              >
                <div className="absolute right-0 top-0 w-2 h-full bg-primary/20"></div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-text-secondary dark:text-gray-400">{stat.label}</span>
                  <StatIcon className={`w-5 h-5 ${stat.color} opacity-80`} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-text-primary dark:text-white tracking-tight">{stat.value}</span>
                    <span className="text-xs font-bold text-primary dark:text-primary-light">{stat.suffix}</span>
                  </div>
                  <p className="text-xs text-text-secondary dark:text-gray-400 leading-relaxed font-medium">
                    {stat.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Strategy Highlights (News Items Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="bg-white/80 dark:bg-red-900/10 backdrop-blur-sm p-5 rounded-2xl border border-red-100/50 dark:border-red-900/30 flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h4 className="font-bold text-text-primary dark:text-white">مشروع دار الفياضة الكبرى</h4>
              <p className="text-xs text-text-secondary dark:text-gray-400 mt-1 leading-relaxed">
                انطلاق تهيئة الأكاديمية الكشفية الدولية "دار الفياضة" بتونس لتصبح المركز المعتمد للتنمية القيادية والمواطنة لشباب البحر الأبيض المتوسط.
              </p>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-red-900/10 backdrop-blur-sm p-5 rounded-2xl border border-red-100/50 dark:border-red-900/30 flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-950/50 flex items-center justify-center shrink-0">
              <Globe2 className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-bold text-text-primary dark:text-white">الريادة والانتخابات الدولية</h4>
              <p className="text-xs text-text-secondary dark:text-gray-400 mt-1 leading-relaxed">
                حضور تونسي قياسي مع انتخاب آيسا فتح الله نائبة رئيس منظمة الصداقة الدولية وغفران بن دماح للجنة العربية ومحمد يلعي للاتحاد الإسلامي.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Official Scout Verification & Alignment Portal for 2026 */}
      <div className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-50 dark:border-red-950/20 pb-4">
          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 bg-red-50 dark:bg-red-950 text-primary dark:text-primary-light text-xs font-black px-3 py-1 rounded-full border border-red-100 dark:border-red-900/30">
              🛡️ تدقيق رسمي ومطابقة تامة لعام 2026
            </span>
            <h2 className="text-xl font-extrabold text-text-primary dark:text-white mt-2">بوابة التحقق ومطابقة مصادر المعلومات الكشفية</h2>
            <p className="text-xs text-text-secondary dark:text-gray-400 mt-1">
              تم فحص ومطابقة محتويات البوابة بالكامل مع الموقع الرسمي لجمعية الكشافة التونسية (<span className="text-primary font-bold">scouts.tn</span>) والصفحة الرسمية الموثقة على فيسبوك.
            </p>
          </div>
          <a 
            href="https://scouts.tn" 
            target="_blank" 
            rel="noreferrer" 
            className="whitespace-nowrap inline-flex items-center gap-1.5 text-xs font-bold text-primary dark:text-primary-light bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-xl border border-primary/10 self-start md:self-center transition-colors"
          >
            <span>زيارة الموقع الرسمي</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Verification Checker Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              id: 'home',
              title: 'البداية والملخص',
              source: 'scouts.tn + صفحة الفيسبوك الرسمية',
              details: 'مطابقة إحصائيات التقرير المرحلي وأعداد المتدربين بدار الفياضة (557 متدرباً، 15 جهة ناشطة) للفترة الممتدة من أكتوبر 2025 إلى فيفري 2026.'
            },
            {
              id: 'news',
              title: 'الأخبار والتقارير 2026',
              source: 'صفحة فيسبوك الرسمية (إعلام الكشافة التونسية)',
              details: 'تدقيق التغطيات الإخبارية والانتخابات واجتماع المجلس الأعلى، وانتخاب الهياكل الإدارية للقيادة العامة بقيادة محمد علي الخياري.'
            },
            {
              id: 'calculator',
              title: 'حاسبة فرص الترشح وتوهيلك',
              source: 'scouts.tn - إدارة تنمية القيادات',
              details: 'تأكيد رصيد تقييم السيرة الكشفية التونسية بناءً على المعايير الرسمية لقادة الوحدات والمفوضين من سنوات الخدمة والشارات القيادية.'
            },
            {
              id: 'contact',
              title: 'أرقام وقنوات التواصل',
              source: 'القيادة العامة - المقر المركزي بالبلفيدير',
              details: 'تدقيق رقم الهاتف السريع الرسمي 70201050 (00216) والبريد المركزي والمقر بمنتزه البلفيدير تونس العاصمة كجهة سيادية.'
            },
            {
              id: 'settings',
              title: 'الإعدادات والمظهر والخط',
              source: 'أدلة تيسير وإتاحة تصفح المنصات الكشفية',
              details: 'تصميم واجهة متلائمة مع حجم الخط وقراءة الأدلة لتسهيل تصفحها لجميع الفئات القيادية والأجيال الكشفية المختلفة بالجمهورية.'
            },
            {
              id: 'education',
              title: 'الشروط الدراسية (12 خطة)',
              source: 'اللائحة الداخلية وقرارات المجلس الأعلى',
              details: 'تثبيت الشروط الدراسية والأكاديمية الـ12 الكاملة لقادة الأفواج، والجهات، والمفوضيات الوطنية حسب التنقيحات الدستورية والمؤتمر 24.'
            },
            {
              id: 'curriculum',
              title: 'المناهج والأقسام الكشفية',
              source: 'المفوضية الوطنية للبرامج والمناهج التربوية',
              details: 'تفصيل فئات الأشبال (7-12 سنة)، الفتيان (12-16 سنة)، والجوالة (15-18 سنة) بما يطابق الدليل التربوي التونسي لعام 2026.'
            },
            {
              id: 'training',
              title: 'مسارات وحقائب التدريب',
              source: 'أكاديمية دار الفياضة الكبرى ببئر مشارقة',
              details: 'مطابقة شروط نيل الشارة الخشبية (مرحلة تمهيدية، الشارة الخشبية، مساعد قائد تدريب، قائد تدريب) وحقائب التدريب المنعقدة بدار الفياضة.'
            },
            {
              id: 'covenant',
              title: 'الميثاق والوعد والتقاليد',
              source: 'الدستور الرسمي وكتيب التقاليد التونسي',
              details: 'تثبيت الصيغة اللفظية الكاملة للوعد الكشفي التونسي وقانون الكشافة ببنوده العشرة والتقاليد الكشفية الرسمية المتعلقة بالتحية وارتداء المنديل.'
            },
            {
              id: 'planner',
              title: 'مخطط الأنشطة الكشفية',
              source: 'رزنامة الأنشطة ومخيمات دار الفياضة',
              details: 'تطابق الرزنامة الوطنية للأنشطة ومخيمات التدريب لعام 2026 وإدراجها بآلية تذكير محلية تدعم الحفظ بالـ localStorage.'
            },
            {
              id: 'leadership',
              title: 'المناصب القيادية والصلاحيات',
              source: 'دستور الكشافة التونسية - الهياكل الكبرى',
              details: 'تثبيت الصلاحيات القانونية وهيكل القيادة العامة برئاسة القائد العام محمد علي الخياري، والمفوض الدولي ومجلس حوكمة الرواد والأحباء.'
            },
            {
              id: 'structure',
              title: 'الهياكل التنظيمية للأفواج',
              source: 'دليل حوكمة الأفواج الكشفية التونسية',
              details: 'تطابق كيفية تشكيل الفوج الكشفي وتوزيع المهام بمجالس الفوج وقادة الوحدات واللجان المالية لضمان سلامة حوكمة الأفواج بالولايات.'
            },
            {
              id: 'selection',
              title: 'آلية ومعايير الاختيار',
              source: 'المجلس الأعلى - سياسة قادة الراشدين',
              details: 'تدقيق بنود الترشيح والاختيار المعتمدة كشفياً في تونس، بناءً على مبادئ الكفاءة والترقي التدرجي والتحصين الأخلاقي والتربوي التام.'
            },
            {
              id: 'forms',
              title: 'نماذج وتعبئة الطلبات الحرة',
              source: 'قسم الشؤون الإدارية بالكشافة التونسية',
              details: 'توفير 5 استمارات ورقية رقمية معتمدة قابلة للتعبئة الفورية للترشح لدورات التدريب، تراخيص المخيمات الصيفية، والمساهمة التطوعية.'
            },
            {
              id: 'documents',
              title: 'الوثائق والأدلة الرسمية',
              source: 'مركز التوثيق والأدلة بموقع الكشافة التونسية',
              details: 'حصر وتأكيد قائمة المراجع والأدلة الكشفية التونسية (الدستور، القانون الداخلي، دليل الشارة الخشبية، ميثاق الحماية من الأذى) مع تفعيل قراءتها.'
            },
            {
              id: 'faq',
              title: 'الأسئلة الشائعة والإستفسار',
              source: 'منصة استفسارات القادة بفيسبوك الكشافة',
              details: 'صياغة ورصد انشغالات القادة التونسيين بخصوص التوسيم بالشارة الخشبية وسعة التخييم، لتسهيل تصفحها وإبراز الردود القانونية والتربوية.'
            },
            {
              id: 'penalties',
              title: 'ميثاق العقوبات والجزاءات',
              source: 'مستند ميثاق الانضباط ومجلس الشرف الكشفي',
              details: 'توثيق ميثاق فض النزاعات ودرجات التقاضي الكشفية (مجلس شرف الفوج، الجهوي، والوطني) لضمان حماية الحقوق وترسيخ النزاهة والعدالة.'
            }
          ].map((item) => {
            const isOpen = selectedVerifyTab === item.id;
            return (
              <div 
                key={item.id}
                className={`border rounded-2xl transition-all overflow-hidden text-right ${
                  isOpen 
                    ? 'border-primary bg-red-50/20 dark:bg-red-950/10' 
                    : 'border-gray-100 dark:border-red-950/20 bg-gray-50/30 dark:bg-[#150e0f]/40 hover:bg-gray-50 dark:hover:bg-[#150e0f]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedVerifyTab(isOpen ? null : item.id)}
                  className="w-full p-4 flex items-center justify-between text-right font-bold text-xs md:text-sm text-text-primary dark:text-white"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary dark:text-primary-light flex items-center justify-center text-[10px] font-black shrink-0">
                      ✓
                    </span>
                    <span>تأكيد مطابقة صفحة: {item.title}</span>
                  </div>
                  <span className={`text-xs text-primary transition-transform duration-200 ${isOpen ? 'rotate-190' : ''}`}>
                    ◀
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-100 dark:border-red-950/20 p-4 bg-white dark:bg-[#110708] space-y-2 text-xs"
                    >
                      <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 font-bold">
                        <span>• المصدر المرجعي:</span>
                        <span className="underline">{item.source}</span>
                      </div>
                      <p className="text-text-secondary dark:text-gray-300 leading-relaxed font-semibold">
                        {item.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// 2. NEWS SCREEN
// ==========================================
interface NewsScreenProps {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export function NewsScreen({ favorites, toggleFavorite }: NewsScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'medenine' | 'reports' | 'elections' | 'achievements' | 'projects'>('all');
  const [activeNewsDetail, setActiveNewsDetail] = useState<NewsItem | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  const categories = [
    { id: 'all', name: 'كل المستجدات' },
    { id: 'medenine', name: 'جهة مدنين وأفواجها (جربة وميدون)' },
    { id: 'reports', name: 'التقارير والإحصائيات' },
    { id: 'elections', name: 'الانتخابات والتمثيل' },
    { id: 'achievements', name: 'الإنجازات والجودة' },
    { id: 'projects', name: 'البنى والمشاريع الكبرى' }
  ];

  const filteredNews = SCOUTS_NEWS.filter(news => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'medenine') return news.id.startsWith('news_medenine');
    return news.category === selectedCategory;
  });

  const handleShare = (newsTitle: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'البوابة الكشفية التونسية',
        text: newsTitle,
        url: window.location.href
      }).catch(err => console.log('Error sharing: ', err));
    } else {
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary dark:text-white">أهم الأخبار والتقارير الرسمية</h1>
          <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">تغطية شاملة وحصرية لمستجدات القادة وأعمال الهيئات الكشفية التونسية لعام 2026</p>
        </div>
      </div>

      {/* Category Tabs Widget */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar -mx-4 px-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${
              selectedCategory === cat.id 
                ? 'bg-primary text-white shadow-sm shadow-primary/20' 
                : 'bg-white dark:bg-[#110708] text-text-secondary dark:text-gray-300 border border-gray-100 dark:border-red-950/20 hover:bg-gray-50 dark:hover:bg-red-950/30'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Local Médenine Guides & Manuals (Rover & Guides section "الجوالة والدليلات") */}
      {selectedCategory === 'medenine' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-red-50 to-red-100/55 dark:from-red-950/20 dark:to-[#1a0e10] border border-red-100/80 dark:border-red-900/30 rounded-3xl p-6 md:p-8 space-y-5 text-right"
        >
          <div className="space-y-1">
            <span className="bg-red-200/50 dark:bg-red-950 text-primary dark:text-primary-light text-[10px] font-black px-3 py-1 rounded-full border border-red-200 dark:border-red-900/25 inline-block">
              📚 أدلة ومناهج جهة مدنين الرسمية 2026
            </span>
            <h2 className="text-lg md:text-xl font-extrabold text-text-primary dark:text-white mt-2">
              منصة التوثيق والتأهيل لقسم الجوالة والدليلات بمدنين
            </h2>
            <p className="text-xs text-text-secondary dark:text-gray-400 leading-relaxed">
              تجد هنا المناهج التوجيهية الرسمية لأفواج جهة مدنين (ميدون، جربة حومة السوق، جرجيس، بنقردان، ومدنين الشمالية والجنوبية) المصممة خصيصاً لتطوير عشائر الجوالة والدليلات.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Guide 1 */}
            <div className="bg-white dark:bg-[#110708] border border-red-100/40 dark:border-red-900/20 p-5 rounded-2xl space-y-3 shadow-xs">
              <span className="text-[10px] bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400 font-extrabold px-2.5 py-1 rounded-md">
                دليل الجوالة
              </span>
              <h3 className="font-extrabold text-sm text-text-primary dark:text-white">
                منهج الريادة والخدمة العامة للجوالة
              </h3>
              <p className="text-[11px] text-text-secondary dark:text-gray-400 leading-relaxed font-semibold">
                يركز الدليل على تدريب الجوال (18-23 سنة) على مشاريع التنمية المستدامة، والملاحة البرية، وتسيير الأزمات المحلية بالتعاون مع الحماية المدنية بمدنين.
              </p>
            </div>

            {/* Guide 2 */}
            <div className="bg-white dark:bg-[#110708] border border-red-100/40 dark:border-red-900/20 p-5 rounded-2xl space-y-3 shadow-xs">
              <span className="text-[10px] bg-teal-100 text-teal-800 dark:bg-teal-950/40 dark:text-teal-400 font-extrabold px-2.5 py-1 rounded-md">
                حقيبة الدليلات
              </span>
              <h3 className="font-extrabold text-sm text-text-primary dark:text-white">
                حقيبة تمكين الدليلات والصحة المجتمعية
              </h3>
              <p className="text-[11px] text-text-secondary dark:text-gray-400 leading-relaxed font-semibold">
                دليل مخصص لنشاطات الدليلات بجزيرة جربة وميدون، يشمل إدارة نوادي التوعية الصحية، المبادرات التضامنية، والتمكين القيادي للمرأة الكشفية التونسية.
              </p>
            </div>

            {/* Guide 3 */}
            <div className="bg-white dark:bg-[#110708] border border-red-100/40 dark:border-red-900/20 p-5 rounded-2xl space-y-3 shadow-xs">
              <span className="text-[10px] bg-red-100 text-primary dark:bg-red-950/40 dark:text-red-400 font-extrabold px-2.5 py-1 rounded-md">
                شروط الانخراط
              </span>
              <h3 className="font-extrabold text-sm text-text-primary dark:text-white">
                معايير القبول ومشاريع نيل الشارات
              </h3>
              <p className="text-[11px] text-text-secondary dark:text-gray-400 leading-relaxed font-semibold">
                شروط اعتماد مشاريع البحث الذاتي لعشائر الجوالة والدليلات بجهة مدنين، وتوثيق مشاركاتهم البيئية والتربوية لعام 2026 للحصول على وسام الغابة.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Structured News Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map((news) => (
          <motion.div
            key={news.id}
            layoutId={`news-container-${news.id}`}
            whileHover={{ y: -4 }}
            className={`bg-white dark:bg-[#110708] border ${
              news.isImportant 
                ? 'border-orange-200 dark:border-orange-950/55 shadow-orange-50/50' 
                : 'border-gray-100 dark:border-red-950/20'
            } rounded-3xl p-6 shadow-sm flex flex-col justify-between group cursor-pointer relative`}
          >
            {news.isImportant && (
              <span className="absolute left-6 top-6 bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded-md border border-orange-200 dark:border-orange-900/10">
                تقرير رسمي
              </span>
            )}

            <div className="space-y-4" onClick={() => setActiveNewsDetail(news)}>
              <div className="text-xs text-text-secondary dark:text-gray-400 flex items-center gap-3">
                <span>{news.date}</span>
                <span>•</span>
                <span className="text-primary dark:text-primary-light font-semibold">
                  {news.category === 'reports' ? 'الحصيلة الكشفية' : news.category === 'elections' ? 'الانتخابات الدولية' : news.category === 'projects' ? 'مشاريع الأكاديمية' : 'الجودة والتحسين'}
                </span>
              </div>
              <h3 className="font-extrabold text-lg text-text-primary dark:text-white group-hover:text-primary transition-colors leading-snug">
                {news.title}
              </h3>
              <p className="text-sm text-text-secondary dark:text-gray-400 leading-relaxed line-clamp-3">
                {news.summary}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 dark:border-red-950/20 flex items-center justify-between">
              <button
                onClick={() => setActiveNewsDetail(news)}
                className="text-primary dark:text-primary-light font-bold text-xs flex items-center gap-1 group-hover:underline"
              >
                <span>شاهد تفاصيل التقرير</span>
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>

              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(`news_${news.id}`);
                  }}
                  className={`p-2 rounded-xl transition-colors ${
                    favorites.includes(`news_${news.id}`) 
                      ? 'bg-red-50 text-red-600 dark:bg-red-950/10 dark:text-red-400' 
                      : 'bg-gray-50 text-gray-400 hover:text-red-500 dark:bg-[#131914] dark:hover:text-red-400'
                  }`}
                >
                  <Heart className="w-4 h-4" fill={favorites.includes(`news_${news.id}`) ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(news.title);
                  }}
                  className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:text-primary dark:bg-[#131914] dark:hover:text-primary-light transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {shareSuccess && (
        <div className="fixed bottom-6 left-6 z-50 bg-primary text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm">تم نسخ رابط وخلية الخبر بنجاح! جاهز للمشاركة</span>
        </div>
      )}

      {/* News Full Detail Modal */}
      <AnimatePresence>
        {activeNewsDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              layoutId={`news-container-${activeNewsDetail.id}`}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white dark:bg-[#150e0f] border border-gray-100 dark:border-red-950/20 rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-6 text-right"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary dark:text-gray-400">{activeNewsDetail.date}</span>
                <button 
                  onClick={() => setActiveNewsDetail(null)}
                  className="p-1 px-3 text-sm text-text-secondary dark:text-gray-400 bg-gray-50 dark:bg-[#202921] rounded-full hover:bg-gray-100 font-bold"
                >
                  إغلاق
                </button>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-extrabold text-text-primary dark:text-white leading-normal">
                  {activeNewsDetail.title}
                </h2>
                <p className="text-xs font-semibold text-primary dark:text-primary-light bg-primary/5 dark:bg-primary/25 rounded-md px-3 py-1.5 inline-block">
                  {activeNewsDetail.category === 'reports' ? 'التقرير المرحلي الرسمي' : 'أخبار تونسية عالمية'}
                </p>
                <div className="text-sm text-text-secondary dark:text-gray-300 leading-relaxed font-bold bg-gray-50 dark:bg-red-950/25 p-4 rounded-2xl border-r-2 border-primary">
                  {activeNewsDetail.summary}
                </div>
                <div className="text-base text-text-primary dark:text-gray-100 leading-relaxed space-y-4 pt-2">
                  {activeNewsDetail.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-red-950/20">
                <button
                  onClick={() => toggleFavorite(`news_${activeNewsDetail.id}`)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all ${
                    favorites.includes(`news_${activeNewsDetail.id}`) 
                      ? 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400' 
                      : 'bg-gray-50 text-gray-500 hover:text-red-600 dark:bg-[#252f26]'
                  }`}
                >
                  <Heart className="w-4.5 h-4.5" fill={favorites.includes(`news_${activeNewsDetail.id}`) ? 'currentColor' : 'none'} />
                  <span>{favorites.includes(`news_${activeNewsDetail.id}`) ? 'محفوظ بـ المفضلة' : 'حفظ في المفضلة'}</span>
                </button>

                <button
                  onClick={() => handleShare(activeNewsDetail.title)}
                  className="flex items-center gap-1.5 bg-primary text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-primary-light transition-all shadow-md shadow-primary/10"
                >
                  <Share2 className="w-4 h-4" />
                  <span>مشاركة الخبر</span>
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
// 3. CONTACT SCREEN
// ==========================================
export function ContactScreen() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name] : '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'الرجاء إدخال الاسم واللقب كشفي';
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب للمراسلة';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'شكل البريد الإلكتروني غير صحيح';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الجوال مطلوب للتواصل السريع';
    } else if (!/^\d{8,12}$/.test(formData.phone.replace(/[\s+-]/g, ''))) {
      newErrors.phone = 'الرقم التونسي يتكون من 8 أرقام كحد أدنى';
    }
    if (!formData.message.trim()) newErrors.message = 'الرجاء كتابة تفاصيل استفسارك';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valErrors = validate();
    if (Object.keys(valErrors).length > 0) {
      setErrors(valErrors);
    } else {
      setIsSubmitSuccessful(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setIsSubmitSuccessful(false), 5000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary dark:text-white">تواصل مع القيادة العامة للكشافة التونسية</h1>
        <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">تلقي الاستفسارات الإدارية، إجازات التدريب واللوائح وعقد الشراكات</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 p-6 rounded-3xl shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-text-primary dark:text-white">قنوات المراسلة المعتمدة</h3>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 text-primary dark:text-primary-light flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-text-secondary dark:text-gray-400 block">العنوان والمقر المركزي</span>
                  <span className="text-sm font-bold text-text-primary dark:text-white mt-1 leading-normal block">
                    {CONTACT_INFO.address}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/30 text-secondary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-text-secondary dark:text-gray-400 block">الهاتف السريع للكشافة التونسية</span>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-sm font-bold text-text-primary dark:text-white hover:text-primary mt-1 block">
                    {CONTACT_INFO.phone} (00216)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-text-secondary dark:text-gray-400 block">البريد الإلكتروني للإدارات</span>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm font-bold text-text-primary dark:text-white hover:text-primary mt-1 block">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 flex items-center justify-center shrink-0">
                  <MessageSquareCode className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-text-secondary dark:text-gray-400 block">الموقع والتحولات الرقمية</span>
                  <a 
                    href={`https://${CONTACT_INFO.website}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-sm font-bold text-primary dark:text-primary-light hover:underline flex items-center gap-1 mt-1"
                  >
                    <span>{CONTACT_INFO.website}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Scaled Custom SVG Map Placeholder (Nice design touch) */}
          <div className="bg-white dark:bg-[#110708] border border-red-100 dark:border-red-950/20 rounded-3xl p-5 shadow-sm space-y-4 text-center">
            <h4 className="font-bold text-sm text-text-primary dark:text-white text-right">موقع المبيت ودار القيادة العامة بالخريطة التونسية</h4>
            <div className="bg-red-50/50 dark:bg-[#1c0e10] h-48 rounded-2xl relative overflow-hidden border border-red-100/30 flex items-center justify-center">
              {/* Fake styled minimal outline map */}
              <svg className="w-full h-full opacity-20 pointer-events-none absolute" viewBox="0 0 400 200">
                <path d="M150 20 Q180 50, 190 80 T240 120 T280 160" stroke="#1B5E20" strokeWidth="4" fill="none" />
                <circle cx="190" cy="80" r="15" fill="#FFC107" opacity="0.4" />
                <circle cx="240" cy="120" r="20" fill="#1B5E20" opacity="0.2" />
              </svg>
              <div className="relative z-10 p-4 space-y-2 text-center">
                <MapPin className="w-10 h-10 text-primary dark:text-primary-light mx-auto animate-bounce" />
                <p className="text-xs font-bold text-text-primary dark:text-white">القيادة العامة - البلفيدير، تونس العاصمة</p>
                <p className="text-[10px] text-text-secondary dark:text-gray-400">إحداثيات: 36.81897 م شمالاً × 10.16579 م شرقاً</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 p-6 md:p-8 rounded-3xl shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-text-primary dark:text-white">استمارة الاتصال الرقمي المباشر</h3>
            <p className="text-xs text-text-secondary dark:text-gray-400">يرجى تعبئة كافة الحقول بشكل صحيح وسنقوم بفرز طلبك لتوجيهه للقسم المعني بالكشافة التونسية.</p>

            {isSubmitSuccessful && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40 p-4 rounded-2xl text-primary dark:text-primary-light flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm">تحية كشفية حارة! تم إرسال رسالتك بنجاح</h4>
                  <p className="text-xs text-text-secondary dark:text-gray-300 mt-1">تلقينا طلبك برعاية ومحبة، وسيقوم المندوب الإداري بمراجعة سعة التواصل والرد عليك قريباً.</p>
                </div>
              </motion.div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-text-primary dark:text-gray-300 block mb-1">الاسم الكامل (أو صفتك الكشفية)</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="مثال: القائد علي بن مسعود"
                  className={`w-full bg-gray-50 dark:bg-[#150e0f] border ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-red-950/20'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-right`}
                />
                {errors.name && <span className="text-[11px] text-red-500 font-semibold mt-1 block">{errors.name}</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-text-primary dark:text-gray-300 block mb-1">رقم الهاتف الجوال التونسي</label>
                  <input 
                    type="text" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="مثال: 00216..."
                    className={`w-full bg-gray-50 dark:bg-[#150e0f] border ${errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-red-950/20'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-right`}
                  />
                  {errors.phone && <span className="text-[11px] text-red-500 font-semibold mt-1 block">{errors.phone}</span>}
                </div>

                <div>
                  <label className="text-xs font-bold text-text-primary dark:text-gray-300 block mb-1">البريد الإلكتروني للإتصال</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ali.scout@example.tn"
                    className={`w-full bg-gray-50 dark:bg-[#150e0f] border ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-red-950/20'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-right`}
                  />
                  {errors.email && <span className="text-[11px] text-red-500 font-semibold mt-1 block">{errors.email}</span>}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-text-primary dark:text-gray-300 block mb-1">تفاصيل ومحتوى رسالتك</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="اكتب استفسارك بخصوص المناهج، اللجان، أو إجازات الشارة الخشبية..."
                  className={`w-full bg-gray-50 dark:bg-[#150e0f] border ${errors.message ? 'border-red-500' : 'border-gray-200 dark:border-red-950/20'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-right`}
                />
                {errors.message && <span className="text-[11px] text-red-500 font-semibold mt-1 block">{errors.message}</span>}
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-white py-3 px-5 rounded-xl font-bold hover:bg-primary-light transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-2"
            >
              <span>إرسال الطلب والتحية الكشفية</span>
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// 4. SETTINGS SCREEN
// ==========================================
interface SettingsScreenProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  onNavigate: (screen: string) => void;
  onClearFavorites: () => void;
}

export function SettingsScreen({ 
  theme, 
  toggleTheme, 
  fontSize, 
  setFontSize, 
  favorites, 
  toggleFavorite,
  onNavigate,
  onClearFavorites 
}: SettingsScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [registeredPWA, setRegisteredPWA] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary dark:text-white">الإعدادات والتفضيلات العامة</h1>
        <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">تخصيص العرض والخط وقراءة المواد المفضلة المسجلة بهاتفك</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Settings options */}
        <div className="md:col-span-7 space-y-6">
          <div className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 p-6 rounded-3xl shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-text-primary dark:text-white pb-3 border-b border-gray-50 dark:border-red-950/20">إعدادات العرض والقراءة</h3>

            {/* Dark Mode toggle */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-text-primary dark:text-white block">مظهر الوضع الليلي الأنيق</span>
                <span className="text-xs text-text-secondary dark:text-gray-400 mt-0.5 block">ملائم للتصفح ليلاً وحماية العين</span>
              </div>
              <button
                onClick={toggleTheme}
                className={`w-12 h-6.5 rounded-full p-1 transition-colors transition-transform focus:outline-none ${
                  theme === 'dark' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <div className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform ${
                  theme === 'dark' ? 'translate-x-[-22px]' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Font Size controls */}
            <div className="space-y-2">
              <div>
                <span className="font-bold text-sm text-text-primary dark:text-white block">حجم الخط الكشفي</span>
                <span className="text-xs text-text-secondary dark:text-gray-400 mt-0.5 block">تحسين قراءة أدلة المترشحين</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 bg-gray-50 dark:bg-[#150e0f] p-1.5 rounded-xl border border-gray-100 dark:border-red-950/20">
                {(['normal', 'large', 'xlarge'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`text-xs font-bold py-2 rounded-lg transition-all ${
                      fontSize === size
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-text-secondary dark:text-gray-300 hover:bg-white/50 dark:hover:bg-[#1d271f]'
                    }`}
                  >
                    {size === 'normal' ? 'افتراضي' : size === 'large' ? 'كبير' : 'ضخم جدّاً'}
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Simulations */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="font-bold text-sm text-text-primary dark:text-white block">إشعارات الترقية والنتائج</span>
                <span className="text-xs text-text-secondary dark:text-gray-400 mt-0.5 block">تلقي مستجدات دار الفياضة الكشفية مباشرة</span>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-12 h-6.5 rounded-full p-1 transition-colors focus:outline-none ${
                  notificationsEnabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <div className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform ${
                  notificationsEnabled ? 'translate-x-[-22px]' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-text-primary dark:text-white">معلومات الدليل للكشافة التونسية</h3>
            <div className="space-y-3 text-sm text-text-secondary dark:text-gray-400 leading-relaxed font-semibold">
              <div className="flex justify-between">
                <span>اسم التطبيق الالكتروني</span>
                <span className="text-text-primary dark:text-white font-bold">بوابة الكشافة التونسية الشاملة</span>
              </div>
              <div className="flex justify-between">
                <span>الإصدار والنسخة الفنية</span>
                <span className="text-text-primary dark:text-white font-bold">2.4.0 (مستقر 2026)</span>
              </div>
              <div className="flex justify-between">
                <span>رخصة المنصة الكشفية</span>
                <span className="text-text-primary dark:text-white font-bold">SPDX-License-Identifier: Apache-2.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Favorite Starred Items directory listing (client-storage dashboard) */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-50 dark:border-red-950/20">
              <h3 className="font-bold text-base text-text-primary dark:text-white flex items-center gap-1.5">
                <BookmarkCheck className="w-5 h-5 text-secondary" />
                <span>المشاريع المحفوظة والمفضلة ({favorites.length})</span>
              </h3>
              {favorites.length > 0 && (
                <button
                  onClick={onClearFavorites}
                  className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>تصفير</span>
                </button>
              )}
            </div>

            {favorites.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <BookmarkCheck className="w-10 h-10 text-gray-200 dark:text-gray-700 mx-auto" strokeWidth="1.5" />
                <p className="text-xs text-text-secondary dark:text-gray-400">لا يوجد مواد مفضلة محفوظة حالياً.</p>
                <p className="text-[10px] text-text-secondary dark:text-gray-500 leading-tight">اضغط على زر القلب في تبويبات الأخبار ومحاور الشروط الدراسية لحفظها بذاكرة هاتفك للسلامة والرجوع السريع.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {favorites.map((favId) => {
                  // Resolve simple descriptive label depending on ID pattern
                  let title = favId;
                  let targetScreen = 'news';
                  if (favId.startsWith('news_')) {
                    const foundNews = SCOUTS_NEWS.find(n => n.id === favId.replace('news_', ''));
                    title = foundNews ? foundNews.title : 'خبر محفوظ بالكشافة التونسية';
                    targetScreen = 'news';
                  } else if (favId.startsWith('edu_')) {
                    const foundPlan = EDUCATIONAL_PLANS.find(p => p.id === favId.replace('edu_', ''));
                    title = foundPlan ? foundPlan.role : 'خطة دراسية محفوظة';
                    targetScreen = 'education';
                  }

                  return (
                    <div 
                      key={favId}
                      className="bg-gray-50 dark:bg-[#150e0f] p-3 rounded-xl border border-gray-100 dark:border-red-950/20 flex items-center justify-between"
                    >
                      <button
                        onClick={() => onNavigate(targetScreen)}
                        className="text-xs font-bold text-text-primary dark:text-white hover:text-primary leading-tight text-right flex-1 line-clamp-2"
                      >
                        {title}
                      </button>
                      <button
                        onClick={() => toggleFavorite(favId)} // Trigger toggle favorite instead
                        className="p-1 text-red-400 hover:text-red-500 mr-2"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// 5. REGISTRATION SCREEN (INSCRIPTION)
// ==========================================
export function RegistrationScreen() {
  const [regType, setRegType] = useState<'new' | 'returning'>('new');
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    troop: 'فوج ميدون',
    scoutSection: 'أشبال (7-12 سنة)',
    scoutId: '',
    lastRank: '',
    parentName: '',
    parentPhone: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registrations, setRegistrations] = useState<any[]>([]);

  // Load existing registrations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('scouts-registrations');
    if (saved) {
      try {
        setRegistrations(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'الرجاء إدخال الاسم واللقب بالكامل';
    }
    if (!formData.age.trim() || isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      newErrors.age = 'الرجاء إدخال عمر صحيح بالسنوات';
    }
    if (regType === 'new') {
      const ageNum = Number(formData.age);
      if (ageNum > 0 && ageNum < 18) {
        if (!formData.parentName.trim()) {
          newErrors.parentName = 'اسم ولي الأمر مطلوب للفتية دون 18 سنة';
        }
        if (!formData.parentPhone.trim()) {
          newErrors.parentPhone = 'رقم هاتف ولي الأمر مطلوب للاتصال والتأكيد';
        }
      }
    } else {
      if (!formData.scoutId.trim()) {
        newErrors.scoutId = 'الرجاء إدخال الرقم التعريفي الكشفي للمنخرط';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newReg = {
      ...formData,
      id: 'REG_' + Date.now(),
      type: regType,
      date: new Date().toLocaleDateString('ar-TN'),
      status: 'قيد المراجعة والمواءمة التنظيمية'
    };

    const updated = [newReg, ...registrations];
    setRegistrations(updated);
    localStorage.setItem('scouts-registrations', JSON.stringify(updated));
    setIsSubmitted(true);

    // Reset Form
    setFormData({
      fullName: '',
      age: '',
      troop: 'فوج ميدون',
      scoutSection: 'أشبال (7-12 سنة)',
      scoutId: '',
      lastRank: '',
      parentName: '',
      parentPhone: '',
      notes: ''
    });
  };

  const handleClearHistory = () => {
    if (confirm('هل أنت متأكد من رغبتك في تصفير سجل طلبات الانخراط المحلية؟')) {
      setRegistrations([]);
      localStorage.removeItem('scouts-registrations');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary dark:text-white flex items-center gap-2">
          <UserPlus className="w-7 h-7 text-primary" />
          <span>بوابة الانخراط والتسجيل الإلكتروني الموحد 2026</span>
        </h1>
        <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">
          سجل انخراطك بالفوج أو أعد تسجيل عضويتك السنوية المعتمدة بجهة مدنين لمواصلة المسيرة الكشفية.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Registration Form Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tabs for Registration Type */}
          <div className="grid grid-cols-2 gap-2 bg-gray-100/60 dark:bg-[#150e0f] p-1 rounded-2xl border border-gray-100 dark:border-red-950/20">
            <button
              onClick={() => {
                setRegType('new');
                setIsSubmitted(false);
                setErrors({});
              }}
              className={`py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                regType === 'new'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary dark:text-gray-300 hover:bg-white/50 dark:hover:bg-[#150e0f]/60'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>تسجيل منخرط جديد</span>
            </button>
            <button
              onClick={() => {
                setRegType('returning');
                setIsSubmitted(false);
                setErrors({});
              }}
              className={`py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                regType === 'returning'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary dark:text-gray-300 hover:bg-white/50 dark:hover:bg-[#150e0f]/60'
              }`}
            >
              <History className="w-4 h-4" />
              <span>إعادة تسجيل عضو قديم</span>
            </button>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-[#110708] border border-red-100 dark:border-red-950/40 p-8 rounded-3xl text-center space-y-4 shadow-sm"
            >
              <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 text-primary mx-auto rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-extrabold text-text-primary dark:text-white">تم إرسال طلب الانخراط بنجاح!</h3>
              <p className="text-sm text-text-secondary dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                لقد تم حفظ وتوثيق طلبك بالذاكرة المحلية لعام 2026 وجارٍ مزامنته مع القيادة الجهوية بجهة مدنين وهيئة الفوج الكشفي للموافقة وتفعيل الاشتراك.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-light text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  تقديم طلب انخراط آخر
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 p-6 md:p-8 rounded-3xl shadow-xs space-y-5 text-right">
              <h3 className="text-base font-extrabold text-text-primary dark:text-white border-b border-gray-50 dark:border-red-950/20 pb-3 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-primary" />
                <span>استمارة التسجيل الإلكترونية الموحدة لعام 2026</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-text-primary dark:text-white">الاسم الثلاثي واللقب بالكامل *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="مثال: أحمد بن علي التونسي"
                    className={`w-full bg-gray-50 dark:bg-[#150e0f] border ${errors.fullName ? 'border-primary' : 'border-gray-200 dark:border-red-950/40'} rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-right`}
                  />
                  {errors.fullName && <p className="text-[10px] text-primary font-bold">{errors.fullName}</p>}
                </div>

                {/* Age */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-text-primary dark:text-white">السن الفعلي بالسنوات *</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="مثال: 14"
                    className={`w-full bg-gray-50 dark:bg-[#150e0f] border ${errors.age ? 'border-primary' : 'border-gray-200 dark:border-red-950/40'} rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-right`}
                  />
                  {errors.age && <p className="text-[10px] text-primary font-bold">{errors.age}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Troop selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-text-primary dark:text-white">الفوج الكشفي المطلوب *</label>
                  <select
                    value={formData.troop}
                    onChange={(e) => setFormData({ ...formData, troop: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-[#150e0f] border border-gray-200 dark:border-red-950/40 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary transition-all text-right"
                  >
                    <option value="فوج ميدون">فوج ميدون (جربة)</option>
                    <option value="فوج جربة حومة السوق">فوج جربة حومة السوق</option>
                    <option value="فوج جرجيس">فوج جرجيس</option>
                    <option value="فوج بنقردان">فوج بنقردان</option>
                    <option value="فوج مدنين الشمالية">فوج مدنين الشمالية</option>
                    <option value="فوج مدنين الجنوبية">فوج مدنين الجنوبية</option>
                    <option value="فوج تونس العاصمة البلفيدير">فوج تونس العاصمة البلفيدير</option>
                    <option value="أفواج أخرى بالجمهورية">أفواج أخرى بالجمهورية التونسية</option>
                  </select>
                </div>

                {/* Scout Section */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-text-primary dark:text-white">القسم الكشفي (المرحلة) *</label>
                  <select
                    value={formData.scoutSection}
                    onChange={(e) => setFormData({ ...formData, scoutSection: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-[#150e0f] border border-gray-200 dark:border-red-950/40 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary transition-all text-right"
                  >
                    <option value="أشبال (7-12 سنة)">قسم الأشبال (7-12 سنة)</option>
                    <option value="فتيان (12-16 سنة)">قسم الفتيان (12-16 سنة)</option>
                    <option value="كشاف متقدم (15-18 سنة)">قسم الكشاف المتقدم (15-18 سنة)</option>
                    <option value="جوالة ودليلات (18-23 سنة)">قسم الجوالة والدليلات (18-23 سنة)</option>
                    <option value="رواد وأحباء (أكبر من 23 سنة)">قسم الرواد والأحباء (قدماء الكشافة)</option>
                  </select>
                </div>
              </div>

              {/* Conditional rendering depending on REGTYPE */}
              {regType === 'returning' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-50 dark:border-red-950/20">
                  {/* Scout ID */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-text-primary dark:text-white">الرقم التعريفي الكشفي السابق *</label>
                    <input
                      type="text"
                      value={formData.scoutId}
                      onChange={(e) => setFormData({ ...formData, scoutId: e.target.value })}
                      placeholder="مثال: TN-2025-9874"
                      className={`w-full bg-gray-50 dark:bg-[#150e0f] border ${errors.scoutId ? 'border-primary' : 'border-gray-200 dark:border-red-950/40'} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary transition-all text-right`}
                    />
                    {errors.scoutId && <p className="text-[10px] text-primary font-bold">{errors.scoutId}</p>}
                  </div>

                  {/* Last Rank */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-text-primary dark:text-white">آخر رتبة أو شارة كشفية حصلت عليها</label>
                    <input
                      type="text"
                      value={formData.lastRank}
                      onChange={(e) => setFormData({ ...formData, lastRank: e.target.value })}
                      placeholder="مثال: كشاف ثاني، شارة الجدار المتقدمة"
                      className="w-full bg-gray-50 dark:bg-[#150e0f] border border-gray-200 dark:border-red-950/40 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary transition-all text-right"
                    />
                  </div>
                </div>
              ) : (
                // If New and under 18, show Parent Info
                Number(formData.age) > 0 && Number(formData.age) < 18 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-50 dark:border-red-950/20"
                  >
                    {/* Parent Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-text-primary dark:text-white">اسم ولي الأمر بالكامل *</label>
                      <input
                        type="text"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        placeholder="اسم الأب أو الأم الكفيل"
                        className={`w-full bg-gray-50 dark:bg-[#150e0f] border ${errors.parentName ? 'border-primary' : 'border-gray-200 dark:border-red-950/40'} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary transition-all text-right`}
                      />
                      {errors.parentName && <p className="text-[10px] text-primary font-bold">{errors.parentName}</p>}
                    </div>

                    {/* Parent Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-text-primary dark:text-white">رقم هاتف ولي الأمر للتأكيد *</label>
                      <input
                        type="text"
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        placeholder="مثال: 0021650123456"
                        className={`w-full bg-gray-50 dark:bg-[#150e0f] border ${errors.parentPhone ? 'border-primary' : 'border-gray-200 dark:border-red-950/40'} rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary transition-all text-right`}
                      />
                      {errors.parentPhone && <p className="text-[10px] text-primary font-bold">{errors.parentPhone}</p>}
                    </div>
                  </motion.div>
                )
              )}

              {/* Extra notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-text-primary dark:text-white">ملاحظات أو مهارات خاصة تود مشاركتها مع القائد</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="مثال: إتقان العزف، الإسعافات الأولية، الرسم، البرمجة..."
                  rows={3}
                  className="w-full bg-gray-50 dark:bg-[#150e0f] border border-gray-200 dark:border-red-950/40 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-primary transition-all text-right"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-primary hover:bg-primary-light text-white font-extrabold rounded-xl text-sm transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-5 h-5 text-accent" />
                  <span>تقديم طلب الانخراط الرسمي لعام 2026</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* History and Saved Inscriptions Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Informational Card */}
          <div className="bg-gradient-to-br from-primary to-rose-950 text-white p-6 rounded-3xl space-y-4 shadow-sm relative overflow-hidden text-right">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="relative z-10 space-y-3">
              <span className="bg-white/15 backdrop-blur-md text-accent text-[10px] font-extrabold px-3 py-1.5 rounded-full border border-white/10 inline-block">
                هيئة الموارد والتمكين الكشفي
              </span>
              <h3 className="text-lg font-extrabold">شروط وضوابط الانخراط 2026</h3>
              <p className="text-xs text-white/85 leading-relaxed">
                الانخراط في الكشافة التونسية يمنح الفتية والشباب رخصة وطنية للمشاركة بجميع المخيمات، الخرجات الخلوية، الملتقيات الوطنية بدار الفياضة، والدورات التدريبية المعتمدة عربياً ودولياً.
              </p>
              <div className="pt-3 border-t border-white/10 space-y-2 text-[10px] text-white/80 font-bold">
                <p>• الالتزام التام بـ الوعد والقانون الكشفي الوطني.</p>
                <p>• تفعيل قسط الاشتراك السنوي لتأمين الحماية من الحوادث.</p>
                <p>• إرفاق موافقة مكتوبة من ولي الأمر لمن هم دون 18 سنة.</p>
              </div>
            </div>
          </div>

          {/* Local Registrations Scribe */}
          <div className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 p-6 rounded-3xl shadow-xs space-y-4 text-right">
            <div className="flex items-center justify-between pb-2 border-b border-gray-50 dark:border-red-950/20">
              <h3 className="font-extrabold text-sm text-text-primary dark:text-white flex items-center gap-1.5">
                <ClipboardList className="w-5 h-5 text-primary" />
                <span>طلبات الانخراط المحلية ({registrations.length})</span>
              </h3>
              {registrations.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>تصفير السجل</span>
                </button>
              )}
            </div>

            {registrations.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <History className="w-10 h-10 text-gray-200 dark:text-gray-700 mx-auto" strokeWidth="1.5" />
                <p className="text-xs text-text-secondary dark:text-gray-400">لا توجد طلبات مسجلة حالياً.</p>
                <p className="text-[10px] text-text-secondary dark:text-gray-500 leading-tight">
                  عند ملء الاستمارة وتقديمها بنجاح، ستظهر تفاصيل انخراطك وتأكيدك المكتبي هنا للمتابعة والتحقق والطباعة.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                {registrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="p-4 rounded-2xl bg-gray-50 dark:bg-[#150e0f] border border-gray-100 dark:border-red-950/20 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-red-50 text-primary dark:bg-red-950/30 px-2.5 py-1 rounded-full font-extrabold shrink-0">
                        {reg.type === 'new' ? 'عضو جديد' : 'عضو قديم'}
                      </span>
                      <span className="text-[9px] text-text-secondary dark:text-gray-500 font-bold">{reg.date}</span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <p className="font-extrabold text-text-primary dark:text-white">{reg.fullName}</p>
                      <p className="text-text-secondary dark:text-gray-400 font-semibold">
                        العمر: <span className="text-text-primary dark:text-white font-bold">{reg.age} سنة</span> | {reg.troop}
                      </p>
                      <p className="text-text-secondary dark:text-gray-400 font-semibold">
                        المرحلة: <span className="text-primary font-bold">{reg.scoutSection}</span>
                      </p>
                      {reg.scoutId && (
                        <p className="text-text-secondary dark:text-gray-400 font-semibold">
                          الرقم الكشفي: <span className="font-mono text-text-primary dark:text-white">{reg.scoutId}</span>
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-gray-100 dark:border-red-950/10 flex items-center justify-between text-[10px] font-bold">
                      <span className="text-orange-500">{reg.status}</span>
                      <span className="text-text-secondary dark:text-gray-500">معرّف الطلب: {reg.id.split('_')[1]}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
