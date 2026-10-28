import { FacultyCategory, CampusIssue, TimelinePhase } from '../types';

export const FACULTY_CATEGORIES: FacultyCategory[] = [
  'Agricultural Sciences & Theology',
  'Arts',
  'Commerce',
  'Engineering & Technology',
  'Law',
  'Life Sciences',
  'Management Studies and International Studies',
  'Medicine',
  'Science',
  'Social Sciences',
  'Unani Medicine',
  'Other'
];

export const CAMPUS_ISSUES: CampusIssue[] = [
  {
    id: 'issue-1',
    category: 'Academic & Library',
    title: '24x7 Reading Room Access during exam preparation',
    description: 'Extend Maulana Azad Library reading hall opening hours through the night during semester examinations.',
    talksCount: 342,
    upvotes: 1250,
  },
  {
    id: 'issue-2',
    category: 'Dining & Mess',
    title: 'Nutritional and hygiene quality audits in residential halls',
    description: 'Establish a student-led inspection committee for hall mess menus and drinking water purity testing.',
    talksCount: 215,
    upvotes: 980,
  },
  {
    id: 'issue-3',
    category: 'Digital Infrastructure',
    title: 'High-speed Wi-Fi coverage across all faculty quadrangles',
    description: 'Upgrade campus routers and bandwidth capacity for seamless online research and lecture access.',
    talksCount: 189,
    upvotes: 845,
  }
];

export const TIMELINE_PHASES: TimelinePhase[] = [
  {
    id: 'phase-1',
    date: 'October 15 - October 22, 2026',
    phaseNum: 'Phase I',
    status: 'Completed',
    statusVariant: 'emerald',
    title: 'Nomination Filing & Verification',
    description: 'Candidates file nomination papers at Kennedy House with documentary verification by election commissioners.'
  },
  {
    id: 'phase-2',
    date: 'October 23 - October 30, 2026',
    phaseNum: 'Phase II',
    status: 'Ongoing',
    statusVariant: 'blue',
    title: 'Campaign Outreach & Manifesto Releases',
    description: 'Interactive residential hall meetings, open-air debates, and release of official candidate manifestos.'
  },
  {
    id: 'phase-3',
    date: 'November 2, 2026',
    phaseNum: 'Phase III',
    status: 'Voting Day',
    statusVariant: 'red',
    title: 'AMUSU General Elections 2026',
    description: 'Polling booths open across all university faculties and residential halls for registered student voters.'
  }
];
