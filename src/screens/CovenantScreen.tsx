import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ScrollText, 
  Award, 
  BookOpen, 
  Compass, 
  Sparkles, 
  CheckCircle, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ChevronDown, 
  Flame, 
  Leaf,  
  Heart,
  Smile,
  Coins,
  Bird,
  RotateCcw
} from 'lucide-react';

export function CovenantScreen() {
  const [activeTab, setActiveTab] = useState<'promise' | 'law' | 'history' | 'medals'>('promise');
  const [expandedLaw, setExpandedLaw] = useState<number | null>(null);

  // 10 Scout Laws with explanations
  const scoutLaws = [
    {
      num: 1,
      title: 'شرف الكشّاف موثوق به وعليه يعتمد',
      details: 'الصدق والأمانة هما عماد شخصية القائد والفتى الكشفي التونسي. كلمته عهد صادق يلتزم به في شتى الظروف والبيئات ولا يحيد عنه.',
      icon: ShieldCheck,
      color: 'border-emerald-500 bg-emerald-50/20 text-emerald-700 dark:text-emerald-400'
    },
    {
      num: 2,
      title: 'الكشّاف مخلص لله ولوطنه ولأولياء أمره ورؤسائه ومرؤوسيه',
      details: 'الإخلاص والوفاء ركن متين تجاه المعتقدات الدينية لله عز وجل، ثم الولاء الصادق للوطن والجمهورية التونسية، واحترام الوالدين وهياكل القيادة.',
      icon: BookmarkCheck,
      color: 'border-blue-500 bg-blue-50/20 text-blue-700 dark:text-blue-400'
    },
    {
      num: 3,
      title: 'الكشّاف نافع وحريص على مساعدة الآخرين',
      details: 'جوهر التطوع والمواطنة الصالحة يتمثل في مساندة الضعيف ونفع المجتمع التونسي بالتدخل الإغاثي، التضامن، والأعمال الاجتماعية الميدانية.',
      icon: Sparkles,
      color: 'border-amber-500 bg-amber-50/20 text-amber-700 dark:text-amber-400'
    },
    {
      num: 4,
      title: 'الكشّاف صديق للجميع وأخ لكل كشّاف آخر',
      details: 'الحركة الكشفية عائلة عالمية كبرى متآخية. الكشاف يتجاوز الخلافات وينشر الإخاء والصغاء الإيجابي والتعاضد المشترك بالأفواج والجهات.',
      icon: Heart,
      color: 'border-rose-500 bg-rose-50/20 text-rose-700 dark:text-rose-400'
    },
    {
      num: 5,
      title: 'الكشّاف مهذّب ودود',
      details: 'دماثة الأخلاق والرقي في التعامل هما سمة الكشاف التونسي. يحترم الصغير ويوقر القائد الكبير في السن والخبرة ويعامل الناس باللطف الدائم.',
      icon: Smile,
      color: 'border-purple-500 bg-purple-50/20 text-purple-700 dark:text-purple-400'
    },
    {
      num: 6,
      title: 'الكشّاف رفيق بالحيوان ومحب للطبيعة',
      details: 'يرشد كشافنا لحماية البيئة واستدامة الغابات التونسية، الرفق بكافة الحيوانات، وغرس الأشجار ضمن مبادرات حماية البيئة وتدويم الطبيعة.',
      icon: Leaf,
      color: 'border-teal-500 bg-teal-50/20 text-teal-700 dark:text-teal-400'
    },
    {
      num: 7,
      title: 'الكشّاف يطيع رؤساءه بدون تردد في غير معصية',
      details: 'عقيدة الانضباط الكشفي المبني على الثقة المتبادلة. يطيع القادة والمسؤولين بروح رياضية كشفية عالية في كل نشاط إداري أو تربوي رسمي.',
      icon: Compass,
      color: 'border-indigo-500 bg-indigo-50/20 text-indigo-700 dark:text-indigo-400'
    },
    {
      num: 8,
      title: 'الكشّاف باش يبتسم في وجوه الصعاب',
      details: 'مواجهة التحديات والأمطار والصعاب بابتسامة وصبر. يتميز الكشاف بالمرونة والروح الإيجابية، باحثاً دائماً عن حلول للمشكلات بالأفواج والرحلات.',
      icon: Smile,
      color: 'border-orange-500 bg-orange-50/20 text-orange-700 dark:text-orange-400'
    },
    {
      num: 9,
      title: 'الكشّاف مقتصد حريص على المال والممتلكات',
      details: 'ترشيد النفقات المالية بالفوج، وصيانة ممتلكات المجموعة. الكشاف لا يسرف في حياته اليومية ويحسن تدبير وقته، طاقته، وأدواته الكشفية لعام 2026.',
      icon: Coins,
      color: 'border-cyan-500 bg-cyan-50/20 text-cyan-700 dark:text-cyan-400'
    },
    {
      num: 10,
      title: 'الكشّاف طاهر في الفكر والقول والعمل',
      details: 'النقاء والنزاهة هما تاج الكشاف. يبتعد عن اللغو، يحرر فكره من السلبية، ويلتزم بالسلوك الأخلاقي القويم ليضرب أبهى صور الشرف.',
      icon: CheckCircle,
      color: 'border-emerald-600 bg-emerald-50/10 text-emerald-800 dark:text-emerald-300'
    }
  ];

  // Scout Medals & Awards History
  const scoutMedals = [
    {
      id: 'medal_merit_gold',
      title: 'وسام الاستحقاق الكشفي التونسي (الدرجة الذهبية)',
      desc: 'أرفع وسام تكريمي تمنحه القيادة العامة للكشافة التونسية صمن المؤتمرات الوطنية العليا.',
      criteria: 'يُمنح للقادة الراشدين ورواد الحركة البالغين الذين قدموا خدمات تربوية جليلة ومستمرة ساهمت في دعم وبناء البنية التحتية وأكاديمية دار الفياضة أو تمثيل تونس تمثيلاً تاريخياً مشرفاً بالخارج لأكثر من 15 سنة.',
      benefits: 'تثبيت الاسم في لوائح الشرف الذهبية للكشافة التونسية، الأولوية القصوى للمشاركة بـ الوفود الدولية والمؤتمرات الكشفية العالمية.',
      badgeColor: 'text-amber-500 bg-amber-50 dark:bg-[#252015]'
    },
    {
      id: 'medal_falcon',
      title: 'وسام الصقر البرونزي الكشفي التونسي',
      desc: 'وسام تاريخي يحاكي الشجاعة، والتفاني، وعزيمة التفوق بميادين القيادة والمواطنة.',
      criteria: 'يُمنح لقادة الوحدات والمفوضين الذين نجحوا في إنقاذ حياة أو الحفاظ على الأرواح في المخيمات، أو أبدوا مهارات ريادية مبدعة أدت لاستقطاب وتثبيت أكثر من 300 فتية وفتاة في غضون عامين بالفوج المحلي.',
      benefits: 'صياغة اسم القائد في لوائح المبادرات العظمى لمجموعتنا الكشفية، وشهادة تزكية وميدالية برونزية ممتازة تُحمل بالبذلة الكشفية الرسمية.',
      badgeColor: 'text-orange-600 bg-orange-50 dark:bg-[#251b14]'
    },
    {
      id: 'medal_friendship',
      title: 'وسام الصداقة الكشفية الدولية التونسية',
      desc: 'وسام دبلوماسي مخصص لدور تبادل الثقافات والحوار الحضاري ونشر السلام.',
      criteria: 'يُمنح للقادة التونسيين والأجانب والمنظمات الصديقة التي أسهمت في بناء شراكات دولية وتمويل مشاريع خيرية أو بيئية بالبلاد التونسية بالتنسيق مع القيادة العامة للكشافة التونسية.',
      benefits: 'نيل دروع التقدير الدولية وبطاقة معتمد وظيفي دبلوماسي بالروابط الخارجية للكشافة التونسية ولجان العلاقات العامة.',
      badgeColor: 'text-primary bg-emerald-50 dark:bg-[#162218]'
    },
    {
      id: 'medal_merit_silver',
      title: 'وسام الاستحقاق الكشفي (الدرجة الفضية)',
      desc: 'تكريم قيادي للاعتراف بالجهد التراكمي وتفعيل جودة المؤسسات الكشفية بالأفواج.',
      criteria: 'يُسند لقادة الأفواج والوحدات المحليين عن جدارة وأداء متميز لفترة لا تقل عن 8 سنوات من العطاء التربوي والميداني بدون أي عقوبات تنظيمية أو جزائية وبمعدل تقييمي ممتاز من لجان التفتيش الجهوي للولاية.',
      benefits: 'ترقية السجل والترشيح مع الحصول على نقاط تكميلية قدرها 10 نقاط تضاف في مصفوفة الترشيح التنافسية بمؤشر السيرة.',
      badgeColor: 'text-slate-400 bg-slate-50 dark:bg-[#202521]'
    }
  ];

  // Historical Timeline Milestones for Tunisian Scouts
  const historicalMilestones = [
    {
      year: '1933',
      title: 'بواكر التأسيس والبداية الوطنية',
      desc: 'ظهور وتأسيس أولى طلائع الفوج للحركة الكشفية الإسلامية التونسية بصفة نظامية ومستقلة على يد القائد الوطني الرائد البشير الفاني ومجموعة قادة دستوريين غيورين للدفاع عن مقومات الشعب التونسي ضد الهيمنة الاستعمارية الفرنسية.'
    },
    {
      year: '1934',
      title: 'الاعتراف القانوني الرائد بـ الكشافة الإسلامية تونس',
      desc: 'صدور التراخيص الفنية والاعتراف الإداري الصريح بـ الكشافة الإسلامية التونسية كأول منظمة شابة وطنية عربية خالصة بالبلاد لمواجهة الاحتلال ونشر وعي شرف الفتى وعروبته وقيمه الوطنية ببلادنا التونسية.'
    },
    {
      year: '1947',
      title: 'تأسيس "جامعة الكشافة التونسية"',
      desc: 'قامت التنظيمات الكشفية التونسية المختلفة (الكشافة الإسلامية، الكشافة الدستورية، الهلال الكشفي، كشافة الشمال الكبرى) بالاندماج في جامعة فيدرالية موحدة لتعزيز اللحمة وتنسيق الرحلات وخطط الدراسات القيادية والمطالبة بالسيادة التامة.'
    },
    {
      year: '1956',
      title: 'توحيد الحركة بمسماها التاريخي "الكشافة التونسية"',
      desc: 'مباشرة بعد استقلال الجمهورية التونسية، أصدرت الدولة الفتية مرسوماً تشريعياً بإدماج كافة التنظيمات الكشفية بلا استثناء في منظمة وطنية واحدة كبرى تحت مسمى "الكشافة التونسية" تتبع الأهداف التربوية العليا لرجالات تونس الأحرار.'
    },
    {
      year: '1957',
      title: 'الاعتراف الدولي والانضمام للمنظمة العالمية (WOSM)',
      desc: 'حصول الكشافة التونسية على مرسوم الاعتراف الدولي رقم 57 كعضو كامل ومؤسس في المنظمة العالمية للحركة الكشفية بالشرق والبحر الأبيض المتوسط مما مهد للتمثيل الدبلوماسي والبرامج التبادلية الرائعة لقادتنا الأشاوس.'
    },
    {
      year: '2035',
      title: 'الاستراتيجية المستقبلية "رؤية 2035" ورقمنة الحركة',
      desc: 'إطلاق الخطة الرقمية التطويرية الأضخم للكشافة التونسية بهدف رقمنة كافة البوابات والوثائق، إرساء الجودة وحماية الأطفال، وتحويل "مشروع دار الفياضة" لأول أكاديمية دولية كشعب قيادية وتأهيل بيئي لحوار شباب البحر الأبيض المتوسط لعام 2026 وما بعده.'
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
        <h1 className="text-2xl font-extrabold text-text-primary dark:text-white">ركن الميثاق والهوية والتقاليد الكشفية</h1>
        <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">
          بوابة شاملة تجمع الوثيقة الروحية للكشافة التونسية عهد الوعد، تفسير القوانين العشرة، والأوسمة الوطنية والTimeline التاريخي العريق
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100/60 dark:bg-[#131914] p-1 rounded-2xl border border-gray-100 dark:border-emerald-950/40 max-w-xl overflow-x-auto scrollbar-none">
        {(['promise', 'law', 'history', 'medals'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[100px] py-3 px-4 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-secondary dark:text-gray-300 hover:bg-white/40 dark:hover:bg-[#1e271f]'
            }`}
          >
            {tab === 'promise' ? 'الوعد الكشفي' 
             : tab === 'law' ? 'القانون الكشفي (10)' 
             : tab === 'history' ? 'محطات الTimeline' 
             : 'الأوسمة والقلادات الوطنية'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ==========================================
            TAB 1: PROMISE (الوعد الكشفي)
            ========================================== */}
        {activeTab === 'promise' && (
          <motion.div
            key="promise"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Immersive Promise Card Frame */}
            <div className="lg:col-span-7 bg-gradient-to-tr from-emerald-950 via-primary to-emerald-900 text-white rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="absolute left-[-20px] bottom-[-20px] w-48 h-48 bg-secondary/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 space-y-6 text-right">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Flame className="w-5.5 h-5.5 text-secondary animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs text-accent font-extrabold block">اليمين الدستوري المعتمد للكشافة</span>
                    <h3 className="text-xl font-black">نص الوعد الكشفي التونسي الرسمي</h3>
                  </div>
                </div>

                <div className="p-6 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl relative">
                  <span className="absolute top-2 right-3 text-7xl font-serif text-white/5 select-none pointer-events-none">"</span>
                  <p className="text-base font-extrabold leading-loose text-white text-center tracking-wide block py-4 px-2">
                    أَعِدُ بِشَرَفِي أَنْ أَبْذُلَ غَايَةَ جُهْدِي:<br/>
                    1. فِي الْقِيَامِ بِوَاجِبِي نَحْوَ اللَّهِ ثُمَّ الْوَطَن.<br/>
                    2. فِي مُسَاعَدَةِ النَّاسِ فِي جَمِيعِ الظُّرُوف.<br/>
                    3. فِي الْعَمَلِ بِقَانُونِ الْكَشَّافَة.
                  </p>
                </div>

                <div className="flex gap-4 pt-2 text-xs font-semibold leading-relaxed text-emerald-100/90">
                  <p>
                    أداء هذا الوعد هو المدخل الإجباري والروحي للانخراط الرسمي وتلقي رتبة قائد أو كشاف. يُلقى الوعد في وقفة العهد الرسمية للفوج يميناً تحت الراية الوطنية للجمهورية التونسية وبثلاثة من أصابع اليد اليمنى مرفوعة (التي ترمز للواجبات الثلاثة).
                  </p>
                </div>
              </div>
            </div>

            {/* Core Values Sidebar */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white dark:bg-[#1a201b] border border-gray-100 dark:border-emerald-950 p-6 rounded-3xl shadow-sm text-right space-y-4">
                <h4 className="font-extrabold text-sm text-text-primary dark:text-white flex items-center gap-2 border-b border-gray-50 dark:border-emerald-950 pb-2.5">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>دلالات شارات رموز أصابع الوعد الكشفي الثلاثة:</span>
                </h4>

                <div className="space-y-3.5 pt-1">
                  <div className="flex gap-3 leading-snug">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary dark:bg-primary/25 dark:text-primary-light flex items-center justify-center text-xs font-black shrink-0">1</span>
                    <div>
                      <span className="text-xs font-black text-text-primary dark:text-white block">الواجب نحو الله ثم الوطن</span>
                      <span className="text-[11px] text-text-secondary dark:text-gray-400 mt-1 block">يرمز لتعميق الروح وإرساء الولاء للوطن تونس والإخلاص في بنائه والدفاع عنه بصدق وأمانة.</span>
                    </div>
                  </div>

                  <div className="flex gap-3 leading-snug pt-1 border-t border-gray-50 dark:border-emerald-950/20">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400 flex items-center justify-center text-xs font-black shrink-0">2</span>
                    <div>
                      <span className="text-xs font-black text-text-primary dark:text-white block">الواجب نحو الآخرين ومساعدة الناس</span>
                      <span className="text-[11px] text-text-secondary dark:text-gray-400 mt-1 block">يرمز لرداء الخدمة الوطنية والتضامنية ومساندة المحتاج وإغاثة من تضرر في أوقات الشدة.</span>
                    </div>
                  </div>

                  <div className="flex gap-3 leading-snug pt-1 border-t border-gray-50 dark:border-emerald-950/20">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 flex items-center justify-center text-xs font-black shrink-0">3</span>
                    <div>
                      <span className="text-xs font-black text-text-primary dark:text-white block">رداء قانون الكشافة وتطبيقه</span>
                      <span className="text-[11px] text-text-secondary dark:text-gray-400 mt-1 block">يدل على الالتزام بالقواعد السلوكية العشر اليومية للكشاف في منزله ومدرسته وفوج عمله بضمير حي.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==========================================
            TAB 2: SCOUT LAW (القانون الكشفي العشرة)
            ========================================== */}
        {activeTab === 'law' && (
          <motion.div
            key="law"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="bg-primary/5 border-r-4 border-primary p-4 rounded-2xl max-w-2xl text-right">
              <span className="text-xs font-bold text-primary dark:text-primary-light block">دليل البناء السلوكي للكشاف</span>
              <p className="text-[11px] text-text-secondary dark:text-gray-300 mt-1 leading-relaxed">
                قانون الكشافة التونسية يحدد ملامح المواطن القيادي المثالي لعام 2026. اضغط على أي بند لقراءة التفسير والدليل الكشفي والتربوي المرتبط به.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl pt-2">
              {scoutLaws.map((law) => {
                const isExpanded = expandedLaw === law.num;
                const LawIcon = law.icon;
                return (
                  <div
                    key={law.num}
                    onClick={() => setExpandedLaw(isExpanded ? null : law.num)}
                    className={`border rounded-2xl p-4.5 cursor-pointer text-right transition-all group ${
                      isExpanded 
                        ? 'bg-white dark:bg-[#1a201b] border-primary ring-2 ring-primary/10 shadow-md' 
                        : 'bg-white dark:bg-[#1a201b] border-gray-100 dark:border-emerald-950 hover:bg-gray-50/50 dark:hover:bg-[#1f2720]/55 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-black text-xs border ${
                          isExpanded ? 'bg-primary text-white border-primary' : 'bg-gray-50 dark:bg-[#141b15] text-text-secondary dark:text-gray-300 border-gray-200/50 dark:border-emerald-950'
                        }`}>
                          {law.num}
                        </span>
                        <h4 className="font-extrabold text-xs md:text-sm text-text-primary dark:text-white leading-normal">
                          {law.title}
                        </h4>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180 text-primary' : ''}`} />
                    </div>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-[11px] md:text-xs text-text-secondary dark:text-gray-300 leading-relaxed mt-3 pt-3 border-t border-gray-50 dark:border-emerald-950/40 font-semibold bg-gray-50/50 dark:bg-[#111612]/30 p-2 rounded-xl">
                            {law.details}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ==========================================
            TAB 3: TIMELINE (محطات الTimeline التاريخي)
            ========================================== */}
        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 max-w-4xl"
          >
            <div className="text-right">
              <h3 className="font-black text-lg text-text-primary dark:text-white">جدول التاريخ العريق للكشافة التونسية</h3>
              <p className="text-xs text-text-secondary dark:text-gray-400 mt-1">تصفّح المحطات الكبرى من الدفاع الوطني ضد الاستعمار إلى التحول الرقمي بدار الفياضة الكبرى والتمثيل الكوني وبناء رؤية 2035</p>
            </div>

            {/* Immersive interactive Vertical/Horizontal Timeline Grid */}
            <div className="relative border-r-2 border-primary/20 mr-4 pl-4 space-y-8 py-2 text-right">
              {historicalMilestones.map((milestone, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline bullet dot */}
                  <div className="absolute right-[-21px] top-1 w-3.5 h-3.5 rounded-full bg-white dark:bg-[#161a16] border-2 border-primary group-hover:bg-secondary group-hover:scale-125 transition-all"></div>
                  
                  <div className="bg-white dark:bg-[#1a201b] border border-gray-100 dark:border-emerald-950 p-5 rounded-3xl shadow-xs transition-all hover:bg-gray-50/50 dark:hover:bg-[#1e271f]/60 max-w-3xl">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-secondary bg-orange-50 dark:bg-orange-950/30 px-3 py-1 rounded-lg">
                        {milestone.year}
                      </span>
                      <h4 className="font-extrabold text-sm text-text-primary dark:text-white leading-snug">
                        {milestone.title}
                      </h4>
                    </div>
                    <p className="text-xs text-text-secondary dark:text-gray-400 mt-2.5 leading-relaxed font-semibold">
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ==========================================
            TAB 4: MEDALS (الأوسمة والقلادات الوطنية)
            ========================================== */}
        {activeTab === 'medals' && (
          <motion.div
            key="medals"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl"
          >
            {scoutMedals.map((medal) => (
              <div 
                key={medal.id}
                className="bg-white dark:bg-[#1a201b] border border-gray-100 dark:border-emerald-950 p-6 rounded-3xl shadow-sm text-right flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${medal.badgeColor}`}>
                      <Award className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs md:text-sm text-text-primary dark:text-white leading-snug">
                        {medal.title}
                      </h4>
                      <span className="text-[10px] text-text-secondary dark:text-gray-400 font-bold block mt-0.5">قسم الأوسمة بالكشافة التونسية</span>
                    </div>
                  </div>

                  <p className="text-xs text-primary dark:text-primary-light bg-primary/5 dark:bg-primary/25 p-3 rounded-xl border-r-2 border-primary font-medium">
                    {medal.desc}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-black text-text-primary dark:text-white block">شروط الاستحقاق المحددة باللائحة:</span>
                    <p className="text-[11px] text-text-secondary dark:text-gray-400 leading-normal font-semibold">
                      {medal.criteria}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-50 dark:border-emerald-950/40 flex justify-between items-baseline text-[10px] font-bold">
                  <span className="text-text-secondary dark:text-gray-400">سلطة الإقرار: مفوضية التدريب والقيادة العامة</span>
                  <span className="text-secondary">{medal.id === 'medal_merit_gold' ? 'قلادة من الدرجة الأولى 🥇' : medal.id === 'medal_falcon' ? 'وسام تفوق شرفي 🦅' : 'وسام رسمي 🎖️'}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Custom mock for BookmarkCheck since we use BookmarkCheck in the interface
const BookmarkCheck = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    <path d="m9 10 2 2 4-4" />
  </svg>
);
