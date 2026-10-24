import { 
  UserBiodata, 
  UserConstraints, 
  QualitativeAnswers, 
  RecommendationResult 
} from '../types';

export interface AssessmentDraft {
  currentStep: number;
  step1SubIndex?: number;
  constraintSubIndex?: number;
  scenarioSubIndex?: number;
  activeSectionIntro?: number | null;
  biodata: UserBiodata;
  constraints: UserConstraints;
  scenarioAnswers: Record<string, number>;
  qualitative: QualitativeAnswers;
  diagnosisResult?: RecommendationResult | null;
  savedAt: number; // timestamp in ms
}

const DRAFT_STORAGE_KEY = 'tizzi_assessment_draft_v1';
// Keep draft valid for 24 hours so users can return after 10-15 mins, a phone call, or battery charge
const DRAFT_MAX_AGE_MS = 24 * 60 * 60 * 1000;

export function saveAssessmentDraft(data: Omit<AssessmentDraft, 'savedAt'>): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;

    // Only save if the user has actually started filling something
    const hasStarted =
      data.currentStep > 1 ||
      Boolean(data.biodata.ageBand || data.biodata.gender || data.biodata.status || data.biodata.location) ||
      Boolean(data.constraints.device || data.constraints.timeWeekly) ||
      Object.keys(data.scenarioAnswers).length > 0;

    if (!hasStarted) return;

    const draft: AssessmentDraft = {
      ...data,
      savedAt: Date.now(),
    };

    window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch (err) {
    console.warn('Could not save assessment draft to localStorage', err);
  }
}

export function getAssessmentDraft(): AssessmentDraft | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;

    const draft: AssessmentDraft = JSON.parse(raw);
    if (!draft || !draft.savedAt) return null;

    // Check if expired
    const age = Date.now() - draft.savedAt;
    if (age > DRAFT_MAX_AGE_MS) {
      clearAssessmentDraft();
      return null;
    }

    return draft;
  } catch (err) {
    console.warn('Could not load assessment draft from localStorage', err);
    return null;
  }
}

export function clearAssessmentDraft(): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(DRAFT_STORAGE_KEY);
    }
  } catch (err) {
    console.warn('Could not clear assessment draft', err);
  }
}
