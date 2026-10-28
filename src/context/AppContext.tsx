import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  onAuthStateChanged, 
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  runTransaction,
  increment,
  arrayUnion,
  arrayRemove,
  serverTimestamp 
} from 'firebase/firestore';
import { db, auth, signInWithGoogle, logoutUser, handleFirestoreError, OperationType } from '../firebase';
import { Candidate, CandidatePost, FacultyCategory, CampusIssue } from '../types';
import { CAMPUS_ISSUES } from '../data/constants';

export interface UserVotes {
  presidentId?: string | null;
  vicePresidentId?: string | null;
  secretaryId?: string | null;
  courtMemberId?: string | null;
  cabinetMemberIds?: string[];
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string | null;
  enrolmentNo?: string;
  faculty?: string;
  course?: string;
  hall?: string;
}

interface AppContextType {
  candidates: Candidate[];
  issues: CampusIssue[];
  supportedCandidateIds: string[];
  userVotes: UserVotes;
  currentUser: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  isAdmin: boolean;
  isSupportModalOpen: boolean;
  isUserProfileModalOpen: boolean;
  isAdminPanelOpen: boolean;
  toastMessage: string | null;
  
  // Auth & Admin Actions
  signInWithGoogleAuth: () => Promise<void>;
  signOutUser: () => Promise<void>;
  toggleSupport: (candidateId: string) => Promise<void>;
  removeSupport: (candidateId: string) => Promise<void>;
  upvoteIssue: (issueId: string) => void;
  addIssue: (issue: { title: string; category: string; description: string }) => void;
  setSupportModalOpen: (open: boolean) => void;
  setUserProfileModalOpen: (open: boolean) => void;
  setAdminPanelOpen: (open: boolean) => void;
  showToast: (msg: string) => void;
  
  // Admin Operations
  addBlankCandidate: (post: CandidatePost, facultyCategory: FacultyCategory, customName?: string) => Promise<string>;
  deleteCandidateById: (candidateId: string) => Promise<void>;
  deleteAllCandidates: () => Promise<void>;
  importFromCsv: (csvContent: string) => Promise<void>;
  assignCandidateEmail: (candidateId: string, email: string) => Promise<void>;
  updateCandidateVotesCount: (candidateId: string, newCount: number) => Promise<void>;
  updateCandidateFields: (candidateId: string, fields: Partial<Candidate>) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const ADMIN_EMAIL = 'ansaarsaif7@gmail.com';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [issues, setIssues] = useState<CampusIssue[]>(CAMPUS_ISSUES);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [userVotes, setUserVotes] = useState<UserVotes>({
    cabinetMemberIds: []
  });

  const [isSupportModalOpen, setSupportModalOpen] = useState(false);
  const [isUserProfileModalOpen, setUserProfileModalOpen] = useState(false);
  const [isAdminPanelOpen, setAdminPanelOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const isAdmin = firebaseUser?.email === ADMIN_EMAIL;

  // 1. Auth Listener
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });

    return () => unsubscribeAuth();
  }, []);

  // 2. Realtime Candidate Sync
  useEffect(() => {
    // Domain authorization check for hosted environments
    const currentDomain = window.location.hostname;
    if (currentDomain !== 'localhost' && !currentDomain.includes('run.app')) {
      console.info(`[Portal] running on ${currentDomain}. If data fails to load, ensure this domain is added to "Authorized domains" in Firebase Console.`);
    }

    const candidatesRef = collection(db, 'candidates');

    const unsubscribeCandidates = onSnapshot(candidatesRef, (snapshot) => {
      const docs = snapshot.docs.map(docSnap => ({
        ...docSnap.data() as Candidate,
        id: docSnap.id
      }));

      // SORT GLOBALLY BY supportsCount DESCENDING
      const sorted = docs.sort((a, b) => (b.supportsCount || 0) - (a.supportsCount || 0));
      setCandidates(sorted);
    }, (error) => {
      console.error('Candidates snapshot listener error:', error);
      if (error.message.includes('permission-denied')) {
        console.error('Firestore Read Denied: Please check if your domain (e.g., amusuelections.in) is authorized in Firebase Console and security rules allow public reads.');
      } else if (error.message.includes('not-found')) {
        console.error('Firestore Database Not Found: Ensure the specific database ID in your config matches your project setup.');
      }
      showToast('Offline Mode: Failed to sync live candidate data.');
    });

    return () => unsubscribeCandidates();
  }, []);

  // 3. Realtime User Vote Sync
  useEffect(() => {
    if (!firebaseUser) {
      setUserVotes({ cabinetMemberIds: [] });
      return;
    }

    const voteDocRef = doc(db, 'votes', firebaseUser.uid);
    const unsubscribeVotes = onSnapshot(voteDocRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setUserVotes({
          presidentId: data.presidentId || null,
          vicePresidentId: data.vicePresidentId || null,
          secretaryId: data.secretaryId || null,
          courtMemberId: data.courtMemberId || null,
          cabinetMemberIds: data.cabinetMemberIds || [],
        });
      } else {
        setUserVotes({ cabinetMemberIds: [] });
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `votes/${firebaseUser.uid}`);
    });

    return () => unsubscribeVotes();
  }, [firebaseUser]);

  // Derived array of supported candidate IDs
  const supportedCandidateIds = useMemo(() => {
    return [
      ...(userVotes.presidentId ? [userVotes.presidentId] : []),
      ...(userVotes.vicePresidentId ? [userVotes.vicePresidentId] : []),
      ...(userVotes.secretaryId ? [userVotes.secretaryId] : []),
      ...(userVotes.courtMemberId ? [userVotes.courtMemberId] : []),
      ...(userVotes.cabinetMemberIds || [])
    ];
  }, [userVotes]);

  const currentUser: UserProfile | null = firebaseUser ? {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || 'AMU Student Voter',
    email: firebaseUser.email || '',
    photoURL: firebaseUser.photoURL,
    enrolmentNo: '21ENG0492',
    faculty: 'Engineering & Technology',
    course: 'B.Tech Program',
    hall: 'Sir Syed Hall (South)',
  } : null;

  const signInWithGoogleAuth = async () => {
    try {
      const u = await signInWithGoogle();
      if (u) {
        showToast(`Welcome ${u.displayName || u.email}!`);
      }
    } catch (e) {
      showToast('Google Sign-In failed or cancelled.');
    }
  };

  const signOutUser = async () => {
    try {
      await logoutUser();
      showToast('Signed out from student portal.');
    } catch (e) {
      showToast('Error signing out.');
    }
  };

  // Toggle Support / Vote Function
  const toggleSupport = async (candidateId: string) => {
    if (!firebaseUser) {
      showToast('Please Sign In with Google to support or vote!');
      await signInWithGoogleAuth();
      return;
    }

    const cand = candidates.find((c) => c.id === candidateId);
    if (!cand) return;

    const voteDocRef = doc(db, 'votes', firebaseUser.uid);
    
    try {
      await runTransaction(db, async (transaction) => {
        // READS
        const voteSnap = await transaction.get(voteDocRef);
        const currentVotes = voteSnap.exists() ? voteSnap.data() : {
          presidentId: null,
          vicePresidentId: null,
          secretaryId: null,
          courtMemberId: null,
          cabinetMemberIds: []
        };

        const candRef = doc(db, 'candidates', candidateId);
        const candSnap = await transaction.get(candRef);
        if (!candSnap.exists()) throw new Error('Candidate not found in database.');

        let newVotes = { ...currentVotes };
        let prevIdToDecrement: string | null = null;
        let isAdding = false;

        if (cand.post === 'President') {
          if (currentVotes.presidentId === candidateId) {
            newVotes.presidentId = null;
          } else {
            prevIdToDecrement = currentVotes.presidentId;
            newVotes.presidentId = candidateId;
            isAdding = true;
          }
        } else if (cand.post === 'Vice President') {
          if (currentVotes.vicePresidentId === candidateId) {
            newVotes.vicePresidentId = null;
          } else {
            prevIdToDecrement = currentVotes.vicePresidentId;
            newVotes.vicePresidentId = candidateId;
            isAdding = true;
          }
        } else if (cand.post === 'Honorary Secretary') {
          if (currentVotes.secretaryId === candidateId) {
            newVotes.secretaryId = null;
          } else {
            prevIdToDecrement = currentVotes.secretaryId;
            newVotes.secretaryId = candidateId;
            isAdding = true;
          }
        } else if (cand.post === 'Court Member') {
          if (currentVotes.courtMemberId === candidateId) {
            newVotes.courtMemberId = null;
          } else {
            prevIdToDecrement = currentVotes.courtMemberId;
            newVotes.courtMemberId = candidateId;
            isAdding = true;
          }
        } else if (cand.post === 'Cabinet Member') {
          const cabs: string[] = currentVotes.cabinetMemberIds || [];
          if (cabs.includes(candidateId)) {
            newVotes.cabinetMemberIds = cabs.filter(id => id !== candidateId);
          } else {
            if (cabs.length >= 10) throw new Error('Maximum 10 Cabinet Member votes allowed!');
            newVotes.cabinetMemberIds = [...cabs, candidateId];
            isAdding = true;
          }
        }

        // WRITES
        transaction.set(voteDocRef, {
          ...newVotes,
          userId: firebaseUser.uid,
          email: firebaseUser.email,
          updatedAt: new Date().toISOString()
        }, { merge: true });

        // Update target candidate
        transaction.update(candRef, {
          supportsCount: increment(isAdding ? 1 : -1),
          updatedAt: new Date().toISOString()
        });

        // Decrement previous if changed
        if (prevIdToDecrement) {
          const prevRef = doc(db, 'candidates', prevIdToDecrement);
          transaction.update(prevRef, {
            supportsCount: increment(-1),
            updatedAt: new Date().toISOString()
          });
        }
      });

      showToast(`Vote updated for ${cand.name}`);
    } catch (err: any) {
      console.error('Support Error:', err);
      showToast(err.message || 'Error updating support.');
    }
  };

  const removeSupport = async (candidateId: string) => {
    await toggleSupport(candidateId);
  };

  const upvoteIssue = (issueId: string) => {
    setIssues((prev) =>
      prev.map((issue) => {
        if (issue.id === issueId) {
          const nextUpvoted = !issue.hasUpvoted;
          return {
            ...issue,
            hasUpvoted: nextUpvoted,
            upvotes: nextUpvoted ? issue.upvotes + 1 : issue.upvotes - 1,
          };
        }
        return issue;
      })
    );
  };

  const addIssue = (newIssueData: { title: string; category: string; description: string }) => {
    const newIssue: CampusIssue = {
      id: `issue-${Date.now()}`,
      title: newIssueData.title,
      category: newIssueData.category,
      description: newIssueData.description,
      talksCount: 1,
      upvotes: 1,
      hasUpvoted: true,
    };
    setIssues((prev) => [newIssue, ...prev]);
    showToast('Student issue published!');
  };

  // ADMIN OPERATIONS
  const addBlankCandidate = async (post: CandidatePost, facultyCategory: FacultyCategory, customName?: string) => {
    const newId = `cand-${Date.now()}`;
    const getPostTheme = (p: CandidatePost): 'red' | 'emerald' | 'blue' | 'purple' | 'amber' => {
      if (p === 'President') return 'red';
      if (p === 'Vice President') return 'emerald';
      if (p === 'Honorary Secretary') return 'blue';
      if (p === 'Cabinet Member') return 'purple';
      if (p === 'Court Member') return 'amber';
      return 'emerald';
    };

    const newCandidateDoc: Candidate = {
      id: newId,
      name: customName || 'Unassigned Candidate',
      post,
      facultyCategory,
      tagQuote: '',
      facultyOrDept: `Faculty of ${facultyCategory}`,
      program: '',
      supportsCount: 0,
      isUnallotted: true,
      initials: customName ? customName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'UC',
      colorTheme: getPostTheme(post),
      isVerified: false,
      assignedEmail: '',
      bio: '',
      manifestoSummary: [],
      visionAndGoals: [],
      achievements: [],
      campaignGallery: [],
      contact: {
        email: '',
        hall: '',
        roomOrDesk: '',
        whatsappDesk: '',
        instagram: '',
        whatsappGroupLink: '',
      }
    };

    try {
      await setDoc(doc(db, 'candidates', newId), newCandidateDoc);
      return newId;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `candidates/${newId}`);
      throw error;
    }
  };

  const deleteCandidateById = async (candidateId: string) => {
    try {
      await deleteDoc(doc(db, 'candidates', candidateId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `candidates/${candidateId}`);
      throw error;
    }
  };

  const deleteAllCandidates = async () => {
    try {
      const snap = await getDocs(collection(db, 'candidates'));
      for (const d of snap.docs) {
        await deleteDoc(d.ref);
      }
      showToast('All candidates deleted.');
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'candidates');
    }
  };

  const importFromCsv = async (csvContent: string) => {
    try {
      const { parseCsvAndPopulateCandidates } = await import('../utils/csvImporter');
      const csvCandidates = parseCsvAndPopulateCandidates(csvContent);
      
      for (const cand of csvCandidates) {
        await setDoc(doc(db, 'candidates', cand.id), {
          ...cand,
          isVerified: false,
          assignedEmail: '',
          updatedAt: new Date().toISOString()
        });
      }
      showToast(`Imported ${csvCandidates.length} candidates.`);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'candidates');
    }
  };

  const assignCandidateEmail = async (candidateId: string, email: string) => {
    try {
      const candidateRef = doc(db, 'candidates', candidateId);
      await updateDoc(candidateRef, {
        assignedEmail: email,
        isVerified: !!email,
        isUnallotted: !email,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `candidates/${candidateId}`);
    }
  };

  const updateCandidateVotesCount = async (candidateId: string, newCount: number) => {
    try {
      await updateDoc(doc(db, 'candidates', candidateId), {
        supportsCount: Math.max(0, newCount),
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `candidates/${candidateId}`);
    }
  };

  const updateCandidateFields = async (candidateId: string, fields: Partial<Candidate>) => {
    try {
      const candidateRef = doc(db, 'candidates', candidateId);
      await updateDoc(candidateRef, {
        ...fields,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `candidates/${candidateId}`);
    }
  };

  return (
    <AppContext.Provider
      value={{
        candidates,
        issues,
        supportedCandidateIds,
        userVotes,
        currentUser,
        firebaseUser,
        isAdmin,
        isSupportModalOpen,
        isUserProfileModalOpen,
        isAdminPanelOpen,
        toastMessage,
        signInWithGoogleAuth,
        signOutUser,
        toggleSupport,
        removeSupport,
        upvoteIssue,
        addIssue,
        setSupportModalOpen,
        setUserProfileModalOpen,
        setAdminPanelOpen,
        showToast,
        addBlankCandidate,
        deleteCandidateById,
        deleteAllCandidates,
        importFromCsv,
        assignCandidateEmail,
        updateCandidateVotesCount,
        updateCandidateFields,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
