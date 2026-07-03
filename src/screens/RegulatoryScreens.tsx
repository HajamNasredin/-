import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  HelpCircle, 
  AlertTriangle, 
  Download, 
  Printer, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  CheckCircle, 
  Coins, 
  BookOpen, 
  ScrollText, 
  Stamp, 
  Signature, 
  Award,
  Sparkles,
  CheckCircle2,
  BookmarkCheck
} from 'lucide-react';
import { APPLICATION_FORMS, FAQS, PENALTIES, REGULATORY_DOCUMENTS } from '../data/appData';
import { FAQItem, DocumentItem, Commandment, ApplicationForm } from '../types';

// ==========================================
// 1. FORMS SCREEN (with stamp-illustrated live print templates)
// ==========================================
export function FormsScreen() {
  const [selectedForm, setSelectedForm] = useState<ApplicationForm | null>(APPLICATION_FORMS[0]);
  const [formInputs, setFormInputs] = useState<Record<string, string>>({});
  const [validatedInputs, setValidatedInputs] = useState<Record<string, string> | null>(null);
  const [allErrors, setAllErrors] = useState<Record<string, string>>({});

  const handleInputChange = (fid: string, val: string) => {
    setFormInputs(prev => ({ ...prev, [fid]: val }));
    if (allErrors[fid]) {
      setAllErrors(prev => ({ ...prev, [fid]: '' }));
    }
  };

  const handleFormSelect = (form: ApplicationForm) => {
    setSelectedForm(form);
    setFormInputs({});
    setValidatedInputs(null);
    setAllErrors({});
  };

  const validate = () => {
    if (!selectedForm) return false;
    const errors: Record<string, string> = {};
    selectedForm.fields.forEach(f => {
      const val = formInputs[f.id] || '';
      if (f.required && !val.trim()) {
        errors[f.id] = `هذا الحقل مطلوب لتأكيد الترشح`;
      }
    });
    setAllErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && selectedForm) {
      setValidatedInputs(formInputs);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary dark:text-white">نماذج وتعبئة طلبات الترشح الرقمية</h1>
        <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">تعبئة وطباعة 5 نماذج كشفية جاهزة لاعتمادها بالتوقيع والختم المعتمد لعام 2026</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form selection and Inputs columns */}
        <div className="lg:col-span-6 space-y-6 print:hidden">
          <div className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 p-5 rounded-3xl shadow-sm space-y-3">
            <span className="text-xs font-bold text-text-secondary dark:text-gray-400 block pb-1">اختر الاستمارة لتغذية البيانات:</span>
            <div className="space-y-2">
              {APPLICATION_FORMS.map((form) => (
                <button
                  key={form.id}
                  onClick={() => handleFormSelect(form)}
                  className={`w-full p-4 rounded-xl text-right transition-all flex items-center gap-3 border ${
                    selectedForm?.id === form.id
                      ? 'bg-primary/5 dark:bg-primary/20 border-primary text-primary dark:text-primary-light font-bold'
                      : 'bg-gray-50 dark:bg-[#150e0f] border-gray-100 dark:border-red-950/20 text-text-secondary dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-[#201012]/85'
                  }`}
                >
                  <FileText className="w-5 h-5 shrink-0 text-primary dark:text-primary-light" />
                  <span className="text-xs leading-normal">{form.title}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedForm && !validatedInputs && (
            <form onSubmit={handleSubmitForm} className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 p-6 md:p-8 rounded-3xl shadow-sm space-y-5 text-right">
              <div>
                <h3 className="font-extrabold text-base text-text-primary dark:text-white">{selectedForm.title}</h3>
                <p className="text-xs text-text-secondary dark:text-gray-400 mt-1">يرجى قراءة التوجيهات المرفقة وتعبئة البيانات لإنشاء نسخة printable الموقعة.</p>
              </div>

              {/* Instructions list */}
              <div className="bg-primary/5 dark:bg-primary/20 p-4 rounded-xl space-y-1.5 border-r-2 border-primary">
                <span className="text-xs font-black text-primary dark:text-primary-light block">توجيهات التعبئة:</span>
                <ul className="space-y-1 text-[11px] text-text-secondary dark:text-gray-300 leading-normal font-semibold">
                  {selectedForm.instructions.map((ins, idx) => (
                    <li key={idx} className="flex gap-1 items-start">
                      <span>•</span>
                      <span>{ins}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Form Input fields */}
              <div className="space-y-4 pt-2">
                {selectedForm.fields.map((field) => (
                  <div key={field.id} className="space-y-1">
                    <label className="text-xs font-bold text-text-primary dark:text-gray-300 block">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        rows={3}
                        value={formInputs[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={`تفاصيل ${field.label}...`}
                        className={`w-full bg-gray-50 dark:bg-[#150e0f] border ${allErrors[field.id] ? 'border-red-500' : 'border-gray-200 dark:border-red-950/20'} rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-right`}
                      />
                    ) : field.type === 'select' ? (
                      <select
                        value={formInputs[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className={`w-full bg-gray-50 dark:bg-[#150e0f] border ${allErrors[field.id] ? 'border-red-500' : 'border-gray-200 dark:border-red-950/20'} rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-right font-semibold text-text-primary dark:text-white`}
                      >
                        <option value="">-- اختر خياراً --</option>
                        {field.options?.map((opt, oIdx) => (
                          <option key={oIdx} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type === 'number' ? 'number' : 'text'}
                        value={formInputs[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={`${field.label}...`}
                        className={`w-full bg-gray-50 dark:bg-[#150e0f] border ${allErrors[field.id] ? 'border-red-500' : 'border-gray-200 dark:border-red-950/20'} rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-right`}
                      />
                    )}
                    {allErrors[field.id] && (
                      <span className="text-[10px] text-red-500 font-bold mt-1 block">{allErrors[field.id]}</span>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 px-5 rounded-xl font-bold hover:bg-primary-light transition-all shadow-md shadow-primary/10 flex items-center justify-center"
              >
                توليد ومعاينة الوثيقة الكشفية
              </button>
            </form>
          )}

          {validatedInputs && (
            <div className="bg-red-50 dark:bg-red-950/20 p-5 rounded-3xl border border-red-100 flex flex-col items-center justify-center text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-primary dark:text-primary-light" />
              <h4 className="font-extrabold text-sm text-text-primary dark:text-white">تم توليد الوثيقة الرسمية للتوقيع بنجاح!</h4>
              <p className="text-xs text-text-secondary dark:text-gray-300">
                يمكنك مراجعة المستند المكتمل في العمود الأيسر (أو الأسفل في الشاشات الصغيرة). بإمكانك الضغط على زر "طباعة الوثيقة" أو "تنزيل" لحفظها كملف PDF كشفي معتمد.
              </p>
              <button
                onClick={() => setValidatedInputs(null)}
                className="text-xs text-primary font-bold hover:underline"
              >
                تعديل المدخلات والبيانات
              </button>
            </div>
          )}
        </div>

        {/* Live Printable Scout Document Frame rendering */}
        <div className="lg:col-span-6 print:col-span-12">
          {selectedForm && (
            <div className="bg-white dark:bg-[#110708] border-2 border-primary/25 dark:border-primary/45 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-md">
              {/* Background watermark seal */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <Stamp className="w-96 h-96" />
              </div>

              {/* Document Header (National Scout Banner Style) */}
              <div className="flex justify-between items-center border-b-2 border-primary pb-5">
                <div className="text-right space-y-1">
                  <span className="text-xs font-black text-primary dark:text-primary-light block">جمعيّة الكشّافة التّونسيّة</span>
                  <span className="text-[9px] text-text-secondary dark:text-gray-400 font-bold block">مؤسسة معترف بها ذات نفع عام</span>
                  <span className="text-[9px] text-text-secondary dark:text-gray-400 font-bold block">قسم شؤون القيادات والتنمية</span>
                </div>
                
                {/* Simulated circular Tunisian Scout shield icon */}
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary shrink-0 relative">
                  <svg className="w-9 h-9 text-primary" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15 8L21 8L16.5 12L18 18L12 14L6 18L7.5 12L3 8L9 8Z" />
                  </svg>
                </div>
              </div>

              {/* Document Title */}
              <div className="text-center space-y-1.5 py-1">
                <h4 className="text-base font-extrabold text-text-primary dark:text-white underline decoration-secondary decoration-2 underline-offset-4">
                  {selectedForm.title}
                </h4>
                <span className="text-[9px] font-mono text-text-secondary dark:text-gray-400 block tracking-wider">المرجع: ك.ت / ت.ق / 26</span>
              </div>

              {/* Live values or placeholder prompts */}
              <div className="space-y-4 min-h-[220px] text-right text-sm leading-relaxed text-text-primary dark:text-gray-100 font-semibold border-b border-gray-100 dark:border-red-950/20 pb-5">
                <p>إلى السيد: المفوض الوطني لقسم القيادات والراشدين في تونس</p>
                <p className="leading-relaxed">
                  أنا الموقع أدناه وقائد الوحدة بالولاية الحالية، يسعدني أن أتقدم لسيادتكم بملفي ومقترحات ترشيحي هذه، متعهداً بالالتزام بروح الشارة الكشفية الخشبية والنظام الأخلاقي الوطني المعمول به لعام 2026. وفيما يلي البيانات المفصلة:
                </p>

                <div className="bg-gray-50 dark:bg-[#150e0f]/85 p-4 rounded-2xl border border-gray-100 dark:border-red-950/20 space-y-3.5 pt-4 text-xs">
                  {selectedForm.fields.map((f) => {
                    const value = validatedInputs ? validatedInputs[f.id] : formInputs[f.id];
                    return (
                      <div key={f.id} className="flex justify-between items-baseline gap-2 border-b border-gray-100/60 dark:border-red-950/20 pb-2">
                        <span className="text-text-secondary dark:text-gray-400 shrink-0 font-bold">{f.label}:</span>
                        <span className={`text-text-primary dark:text-white font-extrabold text-left ${value ? '' : 'text-gray-300 dark:text-gray-600 italic'}`}>
                          {value || '......................................................'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stamps and sign off block */}
              <div className="grid grid-cols-2 gap-6 pt-2 text-center text-xs">
                <div className="space-y-6">
                  <span className="font-bold text-text-secondary dark:text-gray-400 block">إمضاء وتعهد صاحب المترشح</span>
                  <div className="h-14 font-serif flex items-center justify-center text-gray-400 italic">
                    {validatedInputs ? <span className="text-primary font-bold flex items-center gap-1"><Signature className="w-5 h-5 text-secondary" /> {validatedInputs['fullName']}</span> : 'توقيع الكتروني بالبوابة'}
                  </div>
                </div>

                <div className="space-y-6 relative">
                  <span className="font-bold text-text-secondary dark:text-gray-400 block">تزكية ومصادقة القيادة العامة</span>
                  {/* Decorative Scout Stamp illustration */}
                  <div className="absolute right-4 bottom-[-15px] w-14 h-14 border-2 border-dashed border-red-500/80 rounded-full flex items-center justify-center text-red-500/80 rotate-12 text-[9px] font-black uppercase pointer-events-none">
                    <span>كشافة تونس</span>
                  </div>
                  <div className="h-14 flex items-center justify-center text-gray-300 font-bold text-[10px] italic">
                    [ الختم الرسمي للكشافة التونسية ]
                  </div>
                </div>
              </div>

              {/* Action buttons (Shown on screen, hidden when printing document) */}
              <div className="pt-6 border-t border-gray-100 dark:border-red-950/20 flex justify-end gap-3 print:hidden">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 bg-gray-50 text-text-secondary hover:text-text-primary dark:bg-[#201012] dark:text-gray-300 px-4 py-2 rounded-full text-xs font-bold transition-all border border-gray-100 dark:border-red-950/20"
                >
                  <Printer className="w-4 h-4 text-primary" />
                  <span>طباعة الوثيقة</span>
                </button>

                <button
                  onClick={handlePrint} // Map to printing layout which allows PDF extraction natively
                  className="flex items-center gap-1.5 bg-primary text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-primary-light shadow-md shadow-primary/10 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>تنزيل (PDF)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// 2. FAQ SCREEN (Accordion search files)
// ==========================================
export function FAQScreen() {
  const [activeTab, setActiveTab] = useState<'all' | 'admin' | 'finance' | 'organization' | 'penalties'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'كل الأسئلة' },
    { id: 'admin', name: 'الشؤون الإدارية' },
    { id: 'finance', name: 'الشؤون المالية' },
    { id: 'organization', name: 'التنظيمية والهياكل' },
    { id: 'penalties', name: 'ميثاق الضوابط والجزاءات' }
  ];

  const filteredFaqs = FAQS.filter(faq => {
    const matchesCategory = activeTab === 'all' ? true : faq.category === activeTab;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary dark:text-white">الأسئلة الشائعة والاستفسارات</h1>
        <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">تصفّح إجابات المندوب الدستوري القانوني للكشافة التونسية لعام 2026</p>
      </div>

      {/* Accordion Tabs Filter and Local Search */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as any)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === cat.id 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-white dark:bg-[#110708] text-text-secondary dark:text-gray-300 border border-gray-100 dark:border-red-950/20 hover:bg-gray-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="relative max-w-sm bg-white dark:bg-[#110708] rounded-xl border border-gray-100 dark:border-red-950/20 p-1 flex items-center shadow-xs">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="البحث في الأسئلة..."
            className="w-full bg-transparent px-2 py-1.5 text-xs focus:outline-none text-right"
          />
        </div>
      </div>

      {/* Accordion List Layout */}
      <div className="space-y-4 max-w-4xl pt-2">
        {filteredFaqs.map((faq) => {
          const isOpen = expandedId === faq.id;
          return (
            <div 
              key={faq.id}
              className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 rounded-2xl p-4 md:p-5 shadow-xs text-right cursor-pointer"
              onClick={() => toggleExpand(faq.id)}
            >
              <div className="flex items-center justify-between gap-4">
                <h4 className="font-extrabold text-sm text-text-primary dark:text-white leading-snug">
                  {faq.question}
                </h4>
                <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-primary' : ''}`} />
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-text-secondary dark:text-gray-300 leading-relaxed mt-4 pt-4 border-t border-gray-50 dark:border-red-950/10 font-semibold">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="p-8 text-center text-text-secondary dark:text-gray-400">
            <HelpCircle className="w-10 h-10 mx-auto text-gray-200 dark:text-gray-700" />
            <p className="text-sm font-bold mt-2">لا توجد نتائج مطابقة لبحثك</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ==========================================
// 3. PENALTIES SCREEN
// ==========================================
export function PenaltiesScreen() {
  const [selectedPenalty, setSelectedPenalty] = useState<Commandment | null>(PENALTIES[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary dark:text-white">العقوبات، الجزاءات وميثاق النزاهية</h1>
        <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">توضيح أقصى درجات الجزاء الإداري، حقوق المترشح المتهم، وخطوات الاستئناف لعام 2026</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right side nodes list */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 p-5 rounded-3xl shadow-sm space-y-3">
            <span className="text-xs font-bold text-text-secondary dark:text-gray-400 block pb-1.5 border-b border-gray-50">تدرج العقوبات الدستورية الكشفية:</span>
            
            <div className="space-y-2">
              {PENALTIES.map((pen) => (
                <button
                  key={pen.id}
                  onClick={() => setSelectedPenalty(pen)}
                  className={`w-full p-4 rounded-xl text-right transition-all flex items-center justify-between border ${
                    selectedPenalty?.id === pen.id
                      ? 'bg-red-50/50 dark:bg-red-950/20 border-red-200 text-red-700 dark:text-red-400 font-bold'
                      : 'bg-gray-50 dark:bg-[#150e0f] border-gray-100 dark:border-red-950/20 text-text-secondary dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-[#251214]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                    <span className="text-xs leading-normal">{pen.type}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Details and Rights Panel */}
        <div className="lg:col-span-7">
          {selectedPenalty ? (
            <motion.div
              key={selectedPenalty.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 p-6 md:p-8 rounded-3xl shadow-sm space-y-6 text-right"
            >
              <div>
                <h3 className="font-extrabold text-lg text-text-primary dark:text-white">{selectedPenalty.type}</h3>
                <span className="text-xs text-secondary font-bold mt-1 block">سلطة الإقرار والدرجة: {selectedPenalty.period}</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-sm text-text-primary dark:text-white">طبيعة المخالفات المفضية للعقوبة:</h4>
                  <p className="text-sm text-text-secondary dark:text-gray-300 leading-relaxed bg-red-50/20 dark:bg-red-950/10 p-4 rounded-xl border-r-4 border-red-500 font-medium">
                    {selectedPenalty.details}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-3">
                    <h5 className="font-bold text-sm text-text-primary dark:text-white border-b border-gray-100 pb-1.5 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>حقوق المتهم الدستورية المضمونة:</span>
                    </h5>
                    <ul className="space-y-2 text-xs text-text-secondary dark:text-gray-400 leading-relaxed font-semibold">
                      {selectedPenalty.rights.map((rig, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-primary">•</span>
                          <span>{rig}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-sm text-text-primary dark:text-white border-b border-gray-100 pb-1.5 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span>خطوات وإجراءات التحقيق الإداري:</span>
                    </h5>
                    <ul className="space-y-2 text-xs text-text-secondary dark:text-gray-400 leading-relaxed font-semibold">
                      {selectedPenalty.procedures.map((proc, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-orange-500">•</span>
                          <span>{proc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 h-full rounded-2xl flex items-center justify-center p-8 text-center text-text-secondary dark:text-gray-400">
              اختر أحد العقوبات لاستعراض تفاصيل الحقائب والإثباتات القانونية.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// 4. DOCUMENTS SCREEN
// ==========================================
export function DocumentsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  const filteredDocs = REGULATORY_DOCUMENTS.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary dark:text-white">الأرشيف والمستندات الكشفية التاريخية</h1>
        <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">تنزيل ومراجعة القوانين المنظمة للكشافة التونسية المحدثة لجميع القادة بالأفواج</p>
      </div>

      {/* Filter and Docs List */}
      <div className="relative max-w-md bg-white dark:bg-[#110708] rounded-xl border border-gray-100 dark:border-red-950/20 p-1 flex items-center shadow-xs">
        <Search className="w-4 h-4 text-gray-400 mr-2" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن وثيقة (مثال: اللائحة الداخلية)..."
          className="w-full bg-transparent px-2 py-2 text-xs focus:outline-none text-right"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {filteredDocs.map((doc) => (
          <div 
            key={doc.id}
            className="bg-white dark:bg-[#110708] border border-gray-100 dark:border-red-950/20 p-6 rounded-3xl shadow-sm flex flex-col justify-between group text-right space-y-4"
          >
            <div className="space-y-3">
              <span className="text-[10px] text-primary dark:text-primary-light font-bold bg-primary/5 dark:bg-primary/25 rounded-md px-2.5 py-1 inline-block">
                تاريخ النشر: {doc.date}
              </span>
              <h3 className="font-extrabold text-sm text-text-primary dark:text-white leading-snug">
                {doc.title}
              </h3>
              <p className="text-xs text-text-secondary dark:text-gray-400 leading-relaxed font-semibold">
                {doc.content}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-50 dark:border-red-950/10 flex justify-between items-center text-xs">
              <span className="text-[10px] font-bold text-text-secondary dark:text-gray-400">نوع الملف: مستند تسييري دستوري</span>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedDoc(doc)}
                  className="bg-gray-50 text-text-secondary hover:text-text-primary dark:bg-[#151c17] dark:text-gray-300 px-3.5 py-1.5 rounded-full font-bold transition-all text-[11px]"
                >
                  تصفح المكتمل
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-primary text-white hover:bg-primary-light px-3.5 py-1.5 rounded-full font-bold transition-all text-[11px]"
                >
                  طباعة الوثيقة
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#150e0f] border border-gray-100 dark:border-red-950/20 rounded-3xl p-6 md:p-8 max-w-xl w-full max-h-[80vh] overflow-y-auto space-y-6 text-right shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-red-950/20 pb-4">
              <h3 className="font-extrabold text-base text-text-primary dark:text-white">{selectedDoc.title}</h3>
              <button
                onClick={() => setSelectedDoc(null)}
                className="bg-gray-100 dark:bg-[#202921] text-text-secondary dark:text-gray-300 font-bold px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors text-xs"
              >
                إغلاق
              </button>
            </div>

            <div className="space-y-4">
              <span className="text-xs text-secondary font-bold">صيغة المستند: وثيقة تشريعية أصلية</span>
              <div className="text-sm text-text-secondary dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-red-950/25 p-4 rounded-xl font-bold">
                {selectedDoc.content}
              </div>
              <p className="text-xs text-text-secondary dark:text-gray-400 leading-relaxed font-semibold">
                تم اعتماد هذا المرفق بشكل رسمي في مؤتمرات الكشافة التونسية الوطنية العليا بتونس العاصمة ومثبت في لوائح المندوبين لعام 2026. يلتزم جميع أعضاء الهيئة الجهوية وقادة الأفواج المحلية بتعلم حقول هذا الفصل وتأهيل منتسبي النشاط طبقاً لمقرراته بدقة.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-red-950/20 flex justify-end gap-2.5">
              <button
                onClick={() => window.print()}
                className="bg-gray-100 text-text-secondary dark:bg-[#201012] dark:text-gray-300 px-4 py-2 rounded-full text-xs font-bold font-semibold"
              >
                تحميل نسخة ورقية
              </button>

              <button
                onClick={() => setSelectedDoc(null)}
                className="bg-primary text-white font-bold text-xs px-5 py-2.5 rounded-full hover:bg-primary-light shadow-md shadow-primary/10"
              >
                حسناً، تصفحت الوثيقة
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
