import { useState, useMemo } from 'react';
import { 
  EDUCATIONAL_PLANS, 
  LEADERSHIP_ROLES, 
  CURRICULA, 
  SCOUTS_NEWS, 
  FAQS, 
  PENALTIES, 
  REGULATORY_DOCUMENTS 
} from '../data/appData';

export interface SearchResult {
  id: string;
  source: 'edu' | 'roles' | 'curriculum' | 'news' | 'faq' | 'penalties' | 'doc';
  title: string;
  subtitle: string;
  matchSnippet: string;
  screenTarget: string; // The screen ID to navigate to
}

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const results = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    const matches: SearchResult[] = [];

    // 1. Search Educational Plans
    EDUCATIONAL_PLANS.forEach(plan => {
      const text = `${plan.role} ${plan.level} ${plan.description} ${plan.requirements.join(' ')}`.toLowerCase();
      if (text.includes(query)) {
        matches.push({
          id: plan.id,
          source: 'edu',
          title: plan.role,
          subtitle: `الشروط الدراسية • المستوى المطلوب: ${plan.level}`,
          matchSnippet: plan.description,
          screenTarget: 'education'
        });
      }
    });

    // 2. Search Leadership Roles
    LEADERSHIP_ROLES.forEach(role => {
      const text = `${role.title} ${role.description} ${role.responsibilities.join(' ')} ${role.qualifications.join(' ')}`.toLowerCase();
      if (text.includes(query)) {
        const categoryLabel = role.category === 'pioneers' ? 'قسم الرواد والأحباء' : role.category === 'national' ? 'الهياكل الوطنية' : 'القيادة العامة';
        matches.push({
          id: role.id,
          source: 'roles',
          title: role.title,
          subtitle: `المناصب القيادية • ${categoryLabel}`,
          matchSnippet: role.description,
          screenTarget: 'leadership'
        });
      }
    });

    // 3. Search Curriculums
    CURRICULA.forEach(curr => {
      const subActivities = curr.activities.map(a => `${a.title} ${a.details}`).join(' ');
      const text = `${curr.title} ${curr.ageGroup} ${curr.description} ${curr.educationalGoals.join(' ')} ${subActivities}`.toLowerCase();
      if (text.includes(query)) {
        matches.push({
          id: curr.id,
          source: 'curriculum',
          title: curr.title,
          subtitle: `المناهج الكشفية • الفئة: ${curr.ageGroup}`,
          matchSnippet: curr.description,
          screenTarget: 'curriculum'
        });
      }
    });

    // 4. Search News
    SCOUTS_NEWS.forEach(news => {
      const text = `${news.title} ${news.summary} ${news.content} ${news.date}`.toLowerCase();
      if (text.includes(query)) {
        matches.push({
          id: news.id,
          source: 'news',
          title: news.title,
          subtitle: `الأخبار والمستجدات • ${news.date}`,
          matchSnippet: news.summary,
          screenTarget: 'news'
        });
      }
    });

    // 5. Search FAQs
    FAQS.forEach(faq => {
      const text = `${faq.question} ${faq.answer}`.toLowerCase();
      if (text.includes(query)) {
        const categoryLabel = faq.category === 'admin' ? 'إدارية' : faq.category === 'finance' ? 'مالية' : faq.category === 'organization' ? 'تنظيمية' : 'عقوبات وجزاءات';
        matches.push({
          id: faq.id,
          source: 'faq',
          title: faq.question,
          subtitle: `الأسئلة الشائعة • تبويب ${categoryLabel}`,
          matchSnippet: faq.answer.substring(0, 100) + '...',
          screenTarget: 'faq'
        });
      }
    });

    // 6. Search Penalties
    PENALTIES.forEach(pen => {
      const text = `${pen.type} ${pen.period} ${pen.details} ${pen.rights.join(' ')} ${pen.procedures.join(' ')}`.toLowerCase();
      if (text.includes(query)) {
        matches.push({
          id: pen.id,
          source: 'penalties',
          title: pen.type,
          subtitle: `العقوبات والجزاءات • سلطة التكييف: ${pen.period}`,
          matchSnippet: pen.details,
          screenTarget: 'penalties'
        });
      }
    });

    // 7. Search Documents
    REGULATORY_DOCUMENTS.forEach(doc => {
      const text = `${doc.title} ${doc.content} ${doc.date} ${doc.type}`.toLowerCase();
      if (text.includes(query)) {
        matches.push({
          id: doc.id,
          source: 'doc',
          title: doc.title,
          subtitle: `الوثائق الرسمية • تم النشر في: ${doc.date}`,
          matchSnippet: doc.content,
          screenTarget: 'documents'
        });
      }
    });

    return matches;
  }, [searchQuery]);

  return { searchQuery, setSearchQuery, results };
}
