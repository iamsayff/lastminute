import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { CandidatesSection } from '../components/CandidatesSection';
import { TimelineSection } from '../components/TimelineSection';
import { IssuesSection } from '../components/IssuesSection';
import { CivicMissionSection } from '../components/CivicMissionSection';
import { useApp } from '../context/AppContext';
import { TIMELINE_PHASES } from '../data/constants';

export const HomePage: React.FC = () => {
  const { candidates, issues, supportedCandidateIds, toggleSupport, upvoteIssue } = useApp();

  return (
    <div className="space-y-8 sm:space-y-10 animate-in fade-in">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Meet the Candidates Section */}
      <CandidatesSection
        candidates={candidates}
        onSupportToggle={toggleSupport}
        supportedCandidateIds={supportedCandidateIds}
      />

      {/* 3. Key Election Dates & Timeline */}
      <TimelineSection
        phases={TIMELINE_PHASES}
      />

      {/* 4. Campus Issues & Student Voices */}
      <IssuesSection
        issues={issues}
        onUpvoteIssue={upvoteIssue}
      />

      {/* 5. Civic Mission & Footer */}
      <CivicMissionSection />
    </div>
  );
};
