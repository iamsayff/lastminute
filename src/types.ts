export type CandidatePost = 
  | 'President'
  | 'Vice President'
  | 'Honorary Secretary'
  | 'Cabinet Member'
  | 'Court Member';

export type FacultyCategory = 
  | 'Agricultural Sciences & Theology'
  | 'Arts'
  | 'Commerce'
  | 'Engineering & Technology'
  | 'Law'
  | 'Life Sciences'
  | 'Management Studies and International Studies'
  | 'Medicine'
  | 'Science'
  | 'Social Sciences'
  | 'Unani Medicine'
  | 'Other';

export interface CampaignGalleryItem {
  id: string;
  title: string;
  caption: string;
  date: string;
  tag: string;
  location: string;
}

export interface CandidateGoal {
  title: string;
  description: string;
  category: 'Academic' | 'Welfare & Dining' | 'Digital & Infrastructure' | 'Governance' | 'Campus Life';
}

export interface CandidateContact {
  email: string;
  phone?: string;
  hall: string;
  instagram?: string;
  whatsappDesk?: string;
  whatsappGroupLink?: string;
  roomOrDesk?: string;
}

export interface Candidate {
  id: string;
  name: string;
  post: CandidatePost;
  facultyCategory: FacultyCategory;
  tagQuote: string;
  facultyOrDept: string;
  program: string;
  supportsCount: number;
  isUnallotted?: boolean;
  initials?: string;
  imagePlaceholder?: string;
  colorTheme: 'red' | 'emerald' | 'blue' | 'purple' | 'amber';
  manifestoSummary?: string[];
  bio?: string;
  visionAndGoals?: CandidateGoal[];
  achievements?: string[];
  campaignGallery?: CampaignGalleryItem[];
  contact?: CandidateContact;
  isClaimed?: boolean;
  assignedEmail?: string;
  isVerified?: boolean;
  avatarUrl?: string;
  bannerUrl?: string;
  manifestoPdfUrl?: string;
}

export interface TimelinePhase {
  id: string;
  day?: string;
  month?: string;
  date: string;
  phaseNum: string;
  status: 'Completed' | 'Ongoing' | 'Upcoming' | 'Voting Day';
  statusVariant: 'blue' | 'emerald' | 'red' | 'purple' | 'amber';
  title: string;
  description: string;
  timeInfo?: string;
}

export interface CampusIssue {
  id: string;
  category: string;
  title: string;
  description: string;
  talksCount: number;
  upvotes: number;
  hasUpvoted?: boolean;
}
