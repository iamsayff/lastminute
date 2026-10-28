import { Candidate, CandidatePost, FacultyCategory } from '../types';

export const parseCsvAndPopulateCandidates = (csvText: string): Candidate[] => {
  try {
    const lines = csvText.split('\n');
    const candidates: Candidate[] = [];

    const mapPost = (rawPost: string): CandidatePost => {
      const p = rawPost.trim();
      if (p.toLowerCase().includes('president')) return 'President';
      if (p.toLowerCase().includes('vice')) return 'Vice President';
      if (p.toLowerCase().includes('honorary') || p.toLowerCase().includes('secretory') || p.toLowerCase().includes('secretary')) return 'Honorary Secretary';
      if (p.toLowerCase().includes('court')) return 'Court Member';
      return 'Cabinet Member';
    };

    const mapFaculty = (rawFac: string): FacultyCategory => {
      const f = rawFac.trim();
      if (f.includes('Agricultural')) return 'Agricultural Sciences & Theology';
      if (f.includes('Arts')) return 'Arts';
      if (f.includes('Commerce')) return 'Commerce';
      if (f.includes('Engineering')) return 'Engineering & Technology';
      if (f.includes('Law')) return 'Law';
      if (f.includes('Life')) return 'Life Sciences';
      if (f.includes('Management')) return 'Management Studies and International Studies';
      if (f.includes('Medicine')) return 'Medicine';
      if (f.includes('Science')) return 'Science';
      if (f.includes('Social')) return 'Social Sciences';
      if (f.includes('Unani')) return 'Unani Medicine';
      return 'Other';
    };

    const parseRow = (line: string): string[] => {
      const row = [];
      let current = '';
      let inQuotes = false;
      for (let char of line) {
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) { row.push(current.trim()); current = ''; }
        else current += char;
      }
      row.push(current.trim());
      // Log rows with unexpected column counts
      if (row.length < 2 && line.trim().length > 0) {
        console.warn('Malformed CSV row (too few columns):', line);
      }
      return row;
    };

    let idx = 0;
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const row = parseRow(line);

      // Columns: Name(0), Post(1), Avatar URL(2), Quote(3), Faculty(4), Course(5), Supports(6)
      const name = row[0];
      const postRaw = row[1];
      const avatarUrl = row[2];
      const quote = row[3];
      const faculty = row[4];
      const course = row[5];
      const supportsStr = row[6];

      if (!name || !postRaw) continue;

      idx++;
      const post = mapPost(postRaw);
      const facultyCategory = faculty ? mapFaculty(faculty) : 'Other';
      const supportsCount = supportsStr && !isNaN(Number(supportsStr)) ? Number(supportsStr) : 0;
      const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();

      const getPostTheme = (p: CandidatePost): 'red' | 'emerald' | 'blue' | 'purple' | 'amber' => {
        if (p === 'President') return 'red';
        if (p === 'Vice President') return 'emerald';
        if (p === 'Honorary Secretary') return 'blue';
        if (p === 'Cabinet Member') return 'purple';
        if (p === 'Court Member') return 'amber';
        return 'emerald';
      };

      candidates.push({
        id: `csv-cand-${idx}-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        name,
        post,
        facultyCategory,
        tagQuote: quote ? `“${quote}”` : '',
        facultyOrDept: faculty ? `Faculty of ${faculty}` : 'Faculty of AMU',
        program: course || 'Regular Student Scholar',
        supportsCount,
        colorTheme: getPostTheme(post),
        initials: initials || 'AM',
        avatarUrl: avatarUrl && avatarUrl.startsWith('http') ? avatarUrl : undefined,
        isVerified: false,
        assignedEmail: '',
        bio: '',
        manifestoSummary: [],
        visionAndGoals: [],
        achievements: [],
        campaignGallery: [],
        contact: { email: '', hall: '', roomOrDesk: '', whatsappDesk: '', instagram: '', whatsappGroupLink: '' }
      });
    }

    return candidates;
  } catch (e) {
    console.error('Error parsing candidate CSV:', e);
    return [];
  }
};
