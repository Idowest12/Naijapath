import { FullAssessmentSubmission, RecommendationResult, AptitudeScores } from '../types';

export interface StoredAssessmentRecord {
  id: string;
  timestamp: string;
  biodata: {
    fullName?: string;
    ageBand: string;
    gender: string;
    status: string;
    location: string;
  };
  constraints: {
    device: string;
    timeWeekly: string;
    powerData: string;
    codingAppetite: string;
    earningUrgency: string;
  };
  aptitudeScores: AptitudeScores;
  qualitative: {
    proudAchievement: string;
    targetIndustry: string;
    preferredDailyActivity?: string;
  };
  recommendation: {
    primaryNicheId: string;
    primaryNicheTitle: string;
    matchScore: number;
    scoreBreakdown?: {
      aptitudeFit: number;
      resourceFeasibility: number;
      marketDemand: number;
      honestCaveat: string;
    };
    secondaryNicheId?: string;
    secondaryNicheTitle?: string;
  };
}

const STORAGE_KEY = 'naija_tech_guide_assessment_records_v1';

/**
 * Persists an assessment record to local storage for analytics and future AI training datasets.
 */
export function saveAssessmentRecord(
  submission: FullAssessmentSubmission,
  result: RecommendationResult
): StoredAssessmentRecord {
  const newRecord: StoredAssessmentRecord = {
    id: `assess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    biodata: {
      fullName: submission.biodata.fullName?.trim() || 'Anonymous',
      ageBand: submission.biodata.ageBand || 'unspecified',
      gender: submission.biodata.gender || 'unspecified',
      status: submission.biodata.status || 'unspecified',
      location: submission.biodata.location || 'unspecified',
    },
    constraints: {
      device: submission.constraints.device || 'unspecified',
      timeWeekly: submission.constraints.timeWeekly || 'unspecified',
      powerData: submission.constraints.powerData || 'unspecified',
      codingAppetite: submission.constraints.codingAppetite || 'unspecified',
      earningUrgency: submission.constraints.earningUrgency || 'unspecified',
    },
    aptitudeScores: submission.aptitude,
    qualitative: {
      proudAchievement: submission.qualitative.proudAchievement.trim(),
      targetIndustry: submission.qualitative.targetIndustry || 'unspecified',
      preferredDailyActivity: submission.qualitative.preferredDailyActivity || undefined,
    },
    recommendation: {
      primaryNicheId: result.primaryNiche.id,
      primaryNicheTitle: result.primaryNiche.title,
      matchScore: result.matchScore,
      scoreBreakdown: result.scoreBreakdown ? {
        aptitudeFit: result.scoreBreakdown.aptitudeFit,
        resourceFeasibility: result.scoreBreakdown.resourceFeasibility,
        marketDemand: result.scoreBreakdown.marketDemand,
        honestCaveat: result.scoreBreakdown.honestCaveat,
      } : undefined,
      secondaryNicheId: result.secondaryNiche?.id,
      secondaryNicheTitle: result.secondaryNiche?.title,
    },
  };

  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const records: StoredAssessmentRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
    records.push(newRecord);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (err) {
    console.error('Failed to save assessment record to local storage:', err);
  }

  return newRecord;
}

/**
 * Retrieves all stored assessment submissions.
 */
export function getAllAssessmentRecords(): StoredAssessmentRecord[] {
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    return existingRaw ? JSON.parse(existingRaw) : [];
  } catch {
    return [];
  }
}

/**
 * Exports all collected assessment records as a formatted JSON file suitable for AI model fine-tuning or analysis.
 */
export function exportRecordsAsJSON(): void {
  const records = getAllAssessmentRecords();
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(records, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `tech_pathway_dataset_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Exports all collected assessment records as CSV format.
 */
export function exportRecordsAsCSV(): void {
  const records = getAllAssessmentRecords();
  if (records.length === 0) return;

  const headers = [
    'id',
    'timestamp',
    'ageBand',
    'gender',
    'status',
    'location',
    'device',
    'timeWeekly',
    'powerData',
    'codingAppetite',
    'earningUrgency',
    'proudAchievement',
    'targetIndustry',
    'primaryNiche',
    'matchScore'
  ];

  const rows = records.map((r) => [
    r.id,
    r.timestamp,
    r.biodata.ageBand,
    r.biodata.gender,
    r.biodata.status,
    r.biodata.location,
    r.constraints.device,
    r.constraints.timeWeekly,
    r.constraints.powerData,
    r.constraints.codingAppetite,
    r.constraints.earningUrgency,
    `"${(r.qualitative.proudAchievement || '').replace(/"/g, '""')}"`,
    `"${(r.qualitative.targetIndustry || '').replace(/"/g, '""')}"`,
    `"${r.recommendation.primaryNicheTitle}"`,
    r.recommendation.matchScore
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `tech_pathway_dataset_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
