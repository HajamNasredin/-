/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  BookOpen, 
  Award, 
  Calculator, 
  FileText, 
  Users, 
  Phone, 
  Mail, 
  Settings, 
  Search, 
  Heart, 
  Bell, 
  Menu, 
  X, 
  AlertTriangle, 
  HelpCircle, 
  ScrollText, 
  Layers, 
  Building2, 
  Scale, 
  Newspaper,
  Terminal,
  ChevronLeft,
  Info,
  Sparkles,
  AwardIcon,
  Tent,
  Calendar,
  UserPlus
} from 'lucide-react';

// Hooks
import { useTheme } from './hooks/useTheme';
import { useFavorites } from './hooks/useFavorites';
import { useSearch, SearchResult } from './hooks/useSearch';
import { useOffline } from './hooks/useOffline';

// Screens
import { 
  HomeScreen, 
  NewsScreen, 
  ContactScreen, 
  SettingsScreen,
  RegistrationScreen
} from './screens/CoreScreens';
import { 
  EducationScreen, 
  CurriculumScreen, 
  TrainingScreen,
  ActivityPlannerScreen
} from './screens/EducationalScreens';
import { 
  LeadershipScreen, 
  StructureScreen, 
  SelectionScreen, 
  CalculatorScreen 
} from './screens/AdministrativeScreens';
import { 
  FormsScreen, 
  FAQScreen, 
  PenaltiesScreen, 
  DocumentsScreen 
} from './screens/RegulatoryScreens';
import { CovenantScreen } from './screens/CovenantScreen';
import { LeaderVerificationGate } from './components/LeaderVerificationGate';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLeaderVerified, setIsLeaderVerified] = useState<boolean>(() => {
    return localStorage.getItem('scouts-leader-verified') === 'true';
  });

  // Initialize modular hooks
  const { theme, toggleTheme, fontSize, setFontSize } = useTheme();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { searchQuery, setSearchQuery, results } = useSearch();
  const { isOffline } = useOffline();

  // Clear favorites handle
  const handleClearFavorites = () => {
    localStorage.removeItem('scouts-favorites');
    window.location.reload();
  };

  // 15 screens list definition
  const allScreens = [
    { id: 'home', title: 'البداية والملخص', icon: Compass, category: 'عام' },
    { id: 'news', title: 'الأخبار والتقارير 2026', icon: Newspaper, category: 'عام' },
    { id: 'registration', title: 'التسجيل والانخراط الإلكتروني', icon: UserPlus, category: 'عام' },
    
    { id: 'education', title: 'الشروط الدراسية (12 خطة)', icon: BookOpen, category: 'التعليم والتدريب' },
    { id: 'curriculum', title: 'المناهج والأقسام الكشفية', icon: Tent, category: 'التعليم والتدريب' },
    { id: 'training', title: 'مسارات وحقائب التدريب', icon: Award, category: 'التعليم والتدريب' },
    { id: 'covenant', title: 'الميثاق والوعد والتقاليد', icon: ScrollText, category: 'التعليم والتدريب' },
    { id: 'planner', title: 'مخطط الأنشطة الكشفية', icon: Calendar, category: 'التعليم والتدريب' },
    
    { id: 'leadership', title: 'المناصب القيادية والصلاحيات', icon: Users, category: 'البناء الإداري' },
    { id: 'structure', title: 'الهياكل التنظيمية للأفواج', icon: Layers, category: 'البناء الإداري' },
    { id: 'selection', title: 'آلية ومعايير الاختيار', icon: Scale, category: 'البناء الإداري' },
    { id: 'calculator', title: 'حاسبة فرص الترشح وتوهيلك', icon: Calculator, category: 'عام' },
    
    { id: 'forms', title: 'نماذج وتعبئة الطلبات الحرة', icon: FileText, category: 'التشريع والقوانين' },
    { id: 'documents', title: 'الوثائق والأدلة الرسمية', icon: ScrollText, category: 'التشريع والقوانين' },
    { id: 'faq', title: 'الأسئلة الشائعة والإستفسار', icon: HelpCircle, category: 'التشريع والقوانين' },
    { id: 'penalties', title: 'ميثاق العقوبات والجزاءات', icon: AlertTriangle, category: 'التشريع والقوانين' },
    
    { id: 'contact', title: 'أرقام وقنوات التواصل', icon: Phone, category: 'عام' },
    { id: 'settings', title: 'الإعدادات والمظهر والخط', icon: Settings, category: 'عام' }
  ];

  // Screen routing picker rendering
  const renderScreenContent = () => {
    const isRestricted = [
      'education', 'curriculum', 'training', 'covenant', 'planner',
      'leadership', 'structure', 'selection',
      'forms', 'documents', 'faq', 'penalties'
    ].includes(currentScreen);

    if (isRestricted && !isLeaderVerified) {
      return (
        <LeaderVerificationGate 
          onVerify={() => {
            setIsLeaderVerified(true);
            localStorage.setItem('scouts-leader-verified', 'true');
          }} 
        />
      );
    }

    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} favorites={favorites} toggleFavorite={toggleFavorite} />;
      case 'news':
        return <NewsScreen favorites={favorites} toggleFavorite={toggleFavorite} />;
      case 'registration':
        return <RegistrationScreen />;
      case 'education':
        return <EducationScreen favorites={favorites} toggleFavorite={toggleFavorite} />;
      case 'curriculum':
        return <CurriculumScreen />;
      case 'training':
        return <TrainingScreen />;
      case 'covenant':
        return <CovenantScreen />;
      case 'planner':
        return <ActivityPlannerScreen />;
      case 'leadership':
        return <LeadershipScreen />;
      case 'structure':
        return <StructureScreen />;
      case 'selection':
        return <SelectionScreen />;
      case 'calculator':
        return <CalculatorScreen />;
      case 'forms':
        return <FormsScreen />;
      case 'documents':
        return <DocumentsScreen />;
      case 'faq':
        return <FAQScreen />;
      case 'penalties':
        return <PenaltiesScreen />;
      case 'contact':
        return <ContactScreen />;
      case 'settings':
        return (
          <SettingsScreen 
            theme={theme} 
            toggleTheme={toggleTheme} 
            fontSize={fontSize} 
            setFontSize={setFontSize} 
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onNavigate={setCurrentScreen}
            onClearFavorites={handleClearFavorites}
          />
        );
      case 'search-global-tab':
        return renderGlobalSearchResults();
      default:
        return <HomeScreen onNavigate={setCurrentScreen} favorites={favorites} toggleFavorite={toggleFavorite} />;
    }
  };

  // Render Global search matches view
  const renderGlobalSearchResults = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-text-primary dark:text-white">نتائج البحث الذكي الشامل</h2>
        <p className="text-xs text-text-secondary dark:text-gray-400 mt-1">تفتيش متزامن في القوانين، الأخبار، المناهج، وثائق فض النزاعات وشروط قيادة الهياكل لعام 2026</p>
      </div>

      <div className="relative max-w-lg bg-white dark:bg-[#110708] rounded-2xl border border-gray-100 dark:border-red-950/20 p-1 flex items-center shadow-lg">
        <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن الشارة، العقوبة، الأشبال، المستجدات..."
          className="w-full bg-transparent px-2 py-3 text-sm focus:outline-none text-right placeholder-gray-400"
          autoFocus
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="text-xs text-text-secondary dark:text-gray-400 font-bold px-3 pl-1 hover:text-text-primary"
          >
            مسح تلقائي
          </button>
        )}
      </div>

      {searchQuery.trim() ? (
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-bold text-text-secondary dark:text-gray-400 block">تم العثور على ({results.length}) نتيجة بحث مطابقة:</span>
          {results.map((res: SearchResult, idx) => (
            <div 
              key={`${res.source}_${res.id}_${idx}`}
              onClick={() => {
                setCurrentScreen(res.screenTarget);
                setSearchQuery('');
              }}
              className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 p-5 rounded-2xl shadow-xs hover:border-red-300 dark:hover:border-red-900 cursor-pointer transition-all text-right space-y-2"
            >
              <div className="flex justify-between items-start gap-4">
                <h4 className="font-extrabold text-sm text-text-primary dark:text-white hover:text-primary transition-colors leading-tight">
                  {res.title}
                </h4>
                <span className="text-[10px] bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 px-2.5 py-1 rounded-full font-bold shrink-0">
                  {res.subtitle}
                </span>
              </div>
              <p className="text-xs text-text-secondary dark:text-gray-400 leading-relaxed font-semibold">
                {res.matchSnippet}
              </p>
            </div>
          ))}

          {results.length === 0 && (
            <div className="py-12 text-center text-text-secondary dark:text-gray-400">
              <HelpCircle className="w-10 h-10 mx-auto text-gray-200" />
              <p className="text-sm font-bold mt-2">عذراً، لم نعثر على أي تطابق لـ "{searchQuery}"</p>
              <p className="text-xs text-text-secondary mt-1">جرب كلمات أخرى مثل: "الشارة"، "جهة"، "الرواد"، "إنذار"</p>
            </div>
          )}
        </div>
      ) : (
        <div className="py-12 text-center space-y-3 bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 rounded-3xl p-6">
          <Sparkles className="w-10 h-10 text-primary dark:text-primary-light mx-auto animate-pulse-slow" />
          <p className="text-sm font-bold text-text-primary dark:text-white">جاهز للتفتيش الكشفي الدستوري</p>
          <p className="text-xs text-text-secondary dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            اكتب أي كلمة تهمك بخصوص نظام النزاعات لعام 2025، سياسة القيادات والراشدين، شروط التخييم، إحصائيات التقرير السنوي، أو استمارات قيادة الولايات الكشفية.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen bg-scout-bg text-text-primary dark:bg-[#0b110c] dark:text-[#f3f4f6] font-sans transition-colors duration-200 flex flex-col md:flex-row rtl`}>
      
      {/* Network Offline Toast banner alerting */}
      {isOffline && (
        <div className="bg-orange-600 text-white py-2 px-4 text-xs font-bold text-center flex items-center justify-center gap-2 fixed top-0 left-0 right-0 z-50 animate-bounce print:hidden">
          <AlertTriangle className="w-4 h-4" />
          <span>أنت تتصفح البوابة في الوضع غير المتصل حالياً (تعتمد المنصة على الذاكرة التخزينية PWA)</span>
        </div>
      )}

      {/* Sider Navigator Layout (Shown on Desktop) */}
      <aside className="hidden lg:flex w-72 bg-white dark:bg-[#110708] border-l border-gray-100 dark:border-red-950/30 flex-col justify-between py-6 px-4 shrink-0 shadow-xs h-screen sticky top-0 print:hidden overflow-y-auto">
        <div className="space-y-6">
          {/* Logo Brand Header */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md shadow-primary/25 relative overflow-hidden">
              <Tent className="w-6 h-6 text-accent" />
            </div>
            <div className="text-right">
              <span className="text-[10px] text-primary dark:text-primary-light font-black tracking-widest block">الكشافة التونسية</span>
              <h1 className="text-sm font-extrabold text-[#1A1A1A] dark:text-white">البوابة الكشفية الوطنية</h1>
            </div>
          </div>

          {/* Core Categories navigation */}
          <div className="space-y-4">
            {['عام', 'التعليم والتدريب', 'البناء الإداري', 'التشريع والقوانين'].map((categoryLabel) => {
              const categoryScreens = allScreens.filter(s => s.category === categoryLabel);
              return (
                <div key={categoryLabel} className="space-y-1">
                  <span className="text-[10px] text-text-secondary dark:text-gray-400 font-extrabold px-3 uppercase tracking-wider block mb-1">
                    {categoryLabel}
                  </span>
                  <div className="space-y-0.5">
                    {categoryScreens.map((screen) => {
                      const ScreenIcon = screen.icon;
                      const isActive = currentScreen === screen.id;
                      return (
                        <button
                          key={screen.id}
                          onClick={() => {
                            setCurrentScreen(screen.id);
                            setIsSidebarOpen(false);
                          }}
                          className={`w-full text-right px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2.5 ${
                            isActive
                              ? 'bg-primary text-white shadow-sm shadow-primary/10'
                              : 'text-text-secondary dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-red-950/15'
                          }`}
                        >
                          <ScreenIcon className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-primary dark:text-primary-light'}`} />
                          <span className="truncate">{screen.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leader Status Panel in Sidebar */}
        <div className="mt-auto pt-4 border-t border-gray-50 dark:border-red-950/20 px-2 space-y-3">
          {isLeaderVerified ? (
            <div className="bg-red-50/50 dark:bg-red-950/25 border border-red-100 dark:border-red-900/40 p-3 rounded-2xl text-right space-y-1.5">
              <div className="flex items-center gap-1.5 text-primary">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping shrink-0" />
                <span className="text-[11px] font-black">قائد كشفي معتمد</span>
              </div>
              <p className="text-[10px] text-text-secondary dark:text-gray-400 font-semibold leading-relaxed">
                مرحباً بك، تصفح كامل المستندات، الخطط والمناهج السرية نشط بالكامل.
              </p>
              <button
                onClick={() => {
                  setIsLeaderVerified(false);
                  localStorage.removeItem('scouts-leader-verified');
                  setCurrentScreen('home');
                }}
                className="w-full text-center py-1.5 bg-white dark:bg-[#150e0f] text-[10px] font-bold border border-red-100 dark:border-red-950/40 text-primary hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all"
              >
                قفل التصفح القيادي 🔒
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-[#150e0f] border border-gray-100 dark:border-red-950/20 p-3 rounded-2xl text-right space-y-1">
              <span className="text-[10px] text-text-secondary dark:text-gray-400 font-bold block">حالة الحساب: زائر (محدود)</span>
              <p className="text-[9px] text-gray-400 leading-normal">
                الخطط التربوية والتشريعات تتطلب هوية قيادية.
              </p>
              <button
                onClick={() => setCurrentScreen('education')}
                className="w-full text-center py-1.5 bg-primary text-white text-[10px] font-bold rounded-lg transition-all hover:bg-primary-light"
              >
                تفعيل دخول القادة ⚡
              </button>
            </div>
          )}
        </div>

        {/* Brand Bottom License footer */}
        <div className="pt-4 border-t border-gray-50 dark:border-red-950/20 px-2 text-[9px] text-text-secondary dark:text-gray-400 font-medium">
          <p>© 2026 الكشافة التونسية.</p>
          <p className="mt-1">صُمم بحرفية عالية للتنمية القيادية.</p>
        </div>
      </aside>

      {/* Screen Mobile AppBar structure (FlexibleAppBar) */}
      <header className="lg:hidden bg-white/95 dark:bg-[#110708]/95 backdrop-blur-md border-b border-gray-100 dark:border-red-950/30 py-3.5 px-4 sticky top-0 z-40 flex items-center justify-between shadow-xs print:hidden">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-1.5 rounded-xl bg-gray-50 dark:bg-[#1b231c] text-[#1A1A1A] dark:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm shadow-primary/10">
            <Tent className="w-4.5 h-4.5 text-accent" />
          </div>
          <span className="text-xs font-extrabold text-[#1A1A1A] dark:text-white">الكشافة التونسية</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentScreen('search-global-tab')}
            className={`p-1.5 rounded-lg ${currentScreen === 'search-global-tab' ? 'bg-primary text-white' : 'text-gray-400 hover:text-primary'}`}
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentScreen('settings')}
            className={`p-1.5 rounded-lg ${currentScreen === 'settings' ? 'bg-primary text-white' : 'text-gray-400 hover:text-primary'}`}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar overlay Drawer with custom animations */}
      <AnimatePresence>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            {/* Dark veil overlay click target */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-80 bg-white dark:bg-[#110708] h-full flex flex-col justify-between py-6 px-4 shadow-2xl z-10 text-right overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  {/* Brand logo inside mobile drawer */}
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                      <Tent className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-xs font-extrabold text-text-primary dark:text-white">قائمة الأبواب الكشفية</span>
                  </div>
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1 rounded-lg bg-gray-50 dark:bg-[#202921]"
                  >
                    <X className="w-5 h-5 text-text-secondary dark:text-gray-400" />
                  </button>
                </div>

                {/* Vertical routes in drawer slider */}
                <div className="space-y-4">
                  {['عام', 'التعليم والتدريب', 'البناء الإداري', 'التشريع والقوانين'].map((categoryLabel) => {
                    const categoryScreens = allScreens.filter(s => s.category === categoryLabel);
                    return (
                      <div key={categoryLabel} className="space-y-1">
                        <span className="text-[10px] text-text-secondary dark:text-gray-400 font-extrabold px-3 uppercase tracking-wider block mb-1">
                          {categoryLabel}
                        </span>
                        <div className="space-y-0.5">
                          {categoryScreens.map((screen) => {
                            const ScreenIcon = screen.icon;
                            const isActive = currentScreen === screen.id;
                            return (
                              <button
                                key={screen.id}
                                onClick={() => {
                                  setCurrentScreen(screen.id);
                                  setIsSidebarOpen(false);
                                }}
                                className={`w-full text-right px-3 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2.5 ${
                                  isActive
                                    ? 'bg-primary text-white'
                                    : 'text-text-secondary dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#202921]'
                                }`}
                              >
                                <ScreenIcon className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-primary'}`} />
                                <span className="truncate">{screen.title}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Leader Status Panel in Mobile Drawer */}
              <div className="mt-auto pt-4 border-t border-gray-50 dark:border-red-950/20 px-2 space-y-3">
                {isLeaderVerified ? (
                  <div className="bg-red-50/50 dark:bg-red-950/25 border border-red-100 dark:border-red-900/40 p-3 rounded-2xl text-right space-y-1.5">
                    <div className="flex items-center gap-1.5 text-primary">
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-ping shrink-0" />
                      <span className="text-[11px] font-black">قائد كشفي معتمد</span>
                    </div>
                    <p className="text-[10px] text-text-secondary dark:text-gray-400 font-semibold leading-relaxed">
                      مرحباً بك، تصفح كامل المستندات والخطط نشط بالكامل.
                    </p>
                    <button
                      onClick={() => {
                        setIsLeaderVerified(false);
                        localStorage.removeItem('scouts-leader-verified');
                        setCurrentScreen('home');
                        setIsSidebarOpen(false);
                      }}
                      className="w-full text-center py-1.5 bg-white dark:bg-[#150e0f] text-[10px] font-bold border border-red-100 dark:border-red-950/40 text-primary hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all"
                    >
                      قفل التصفح القيادي 🔒
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-50 dark:bg-[#150e0f] border border-gray-100 dark:border-red-950/20 p-3 rounded-2xl text-right space-y-1">
                    <span className="text-[10px] text-text-secondary dark:text-gray-400 font-bold block">حالة الحساب: زائر (محدود)</span>
                    <button
                      onClick={() => {
                        setCurrentScreen('education');
                        setIsSidebarOpen(false);
                      }}
                      className="w-full text-center py-1.5 bg-primary text-white text-[10px] font-bold rounded-lg transition-all hover:bg-primary-light"
                    >
                      تفعيل دخول القادة ⚡
                    </button>
                  </div>
                )}
              </div>

              <div className="text-[10px] text-text-secondary dark:text-gray-400 pt-4 border-t border-gray-50">
                <span>تطبيق الكشافة التونسية الذكي المستقر المحدث لعام 2026.</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Body content stream container */}
      <main className="flex-1 px-4 md:px-8 py-6 max-w-7xl mx-auto w-full overflow-x-hidden min-h-[calc(100vh-64px)] md:min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.15 }}
          >
            {renderScreenContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Screen Mobile Bottom Tab bar navigation (Shortcuts for rapid access) */}
      <nav className="lg:hidden bg-white/95 dark:bg-[#110708]/95 backdrop-blur-md border-t border-gray-100 dark:border-red-950/30 py-2.5 px-4 fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around shadow-md print:hidden">
        {[
          { id: 'home', title: 'الرئيسية', icon: Compass },
          { id: 'education', title: 'الشروط', icon: BookOpen },
          { id: 'calculator', title: 'الحاسبة', icon: Calculator },
          { id: 'news', title: 'الأخبار', icon: Newspaper },
          { id: 'settings', title: 'الإعدادات', icon: Settings }
        ].map((tab) => {
          const TabIcon = tab.icon;
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentScreen(tab.id)}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive ? 'text-primary dark:text-primary-light scale-105' : 'text-text-secondary dark:text-gray-400 hover:text-primary'
              }`}
            >
              <TabIcon className="w-5 h-5 stroke-2" />
              <span className="text-[10px] font-extrabold">{tab.title}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}
