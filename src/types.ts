export type AgeBand = 'under_18' | '18_22' | '23_27' | '28_34' | '35_plus';
export type Gender = 'female' | 'male' | 'prefer_not_to_say';
export type CurrentStatus = 'student_undergrad' | 'unemployed_grad' | 'working_non_tech' | 'self_employed' | 'secondary_school';
export type NigerianRegion = 'lagos' | 'abuja' | 'south_west' | 'south_south' | 'south_east' | 'north' | 'outside_nigeria';

export type DeviceType = 'phone_only' | 'shared_or_cafe' | 'laptop_basic' | 'laptop_power';
export type TimeAvailable = '3_to_5_hrs' | '6_to_10_hrs' | '11_to_20_hrs' | '20_plus_hrs';
export type PowerDataSetup = 'night_data_or_powerbank' | 'mobile_data_unsteady_power' | 'steady_light_wifi';
export type CodingAppetite = 'no_code_please' | 'willing_to_try' | 'love_logic_math';
export type EarningUrgency = 'immediate_1_3_months' | 'steady_4_6_months' | 'long_term_mastery';

export interface UserBiodata {
  fullName?: string;
  ageBand: AgeBand | '';
  gender: Gender | '';
  status: CurrentStatus | '';
  location: NigerianRegion | '';
}

export interface UserConstraints {
  device: DeviceType | '';
  timeWeekly: TimeAvailable | '';
  powerData: PowerDataSetup | '';
  codingAppetite: CodingAppetite | '';
  earningUrgency: EarningUrgency | '';
}

export interface AptitudeScores {
  visualCreative: number;     // 1 to 5
  logicalStructural: number;  // 1 to 5
  peopleCommunication: number;// 1 to 5
  analyticalDetail: number;   // 1 to 5
  organizationOps: number;    // 1 to 5
  securityCuriosity: number;  // 1 to 5
}

export interface QualitativeAnswers {
  proudAchievement: string;
  targetIndustry: string;
}

export interface FullAssessmentSubmission {
  biodata: UserBiodata;
  constraints: UserConstraints;
  aptitude: AptitudeScores;
  qualitative: QualitativeAnswers;
}

export interface MilestoneStep {
  period: string;
  goal: string;
  tasks: string[];
}

export interface CuratedResource {
  name: string;
  type: 'free_course' | 'community' | 'doc' | 'youtube';
  description: string;
  url?: string;
  lowDataFriendly: boolean;
}

export interface PathwayNiche {
  id: string;
  title: string;
  category: 'technical' | 'non-technical' | 'creative';
  deviceRequirement: 'phone_only_possible' | 'laptop_required' | 'either';
  shortTagline: string;
  description: string;
  timeCommitment: string;
  earningHorizon: string;
  dayOneAction: string;
  dayOneEstimatedMins: number;
  typicalTools: string[];
  traitProfile: {
    visualCreative: number;
    logicalStructural: number;
    peopleCommunication: number;
    analyticalDetail: number;
    organizationOps: number;
    securityCuriosity: number;
  };
  supportedOnPhone: boolean;
  imageUrl?: string;
  milestones: MilestoneStep[];
  resources: CuratedResource[];
  relevantCommunities: string[];
}

export interface RecommendationResult {
  primaryNiche: PathwayNiche;
  matchScore: number;
  rationale: string;
  constraintFeasibilityNotes: string[];
  secondaryNiche: PathwayNiche;
  secondaryMatchScore: number;
  submission: FullAssessmentSubmission;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
}
