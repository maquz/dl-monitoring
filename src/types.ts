export interface AppFormData {
  // School Identity
  region: string;
  district: string;
  schoolName: string;
  schoolCode: string;
  dateOfVisit: string;
  timeOfVisit: string;

  // Monitor Info
  agency: string;
  agencyOther: string;
  monitorSchedule: string;
  isDLFocalPerson: string;
  monitorName: string;
  monitorContact: string;

  // Section A
  teacherObserved: string;
  streamObserved: string;
  phaseMonitored: string;
  levelObserved: string;
  subjectObserved: string;
  learnersAssigned: Record<string, string>;
  learnersPresent: Record<string, string>;

  // Section B
  dlTeacherPresent: string;
  substituteTeacher: string;
  substituteOther: string;
  learnersWrongLevel: string;
  learnersWrongLevelExplain: string;
  followedLessonPlan: string;
  udl1: Record<string, string>;
  udl2: Record<string, string>;
  udl3: Record<string, string>;
  lessonCompleted: string;
  moreThanHour: string;
  extraTime: string;
  adhereProcedures: string;
  usedTLMs: string;
  tlmsUsed: string[];
  tlmsOther: string;
  teacherDidWell: string[];
  teacherDidWellOther: string;
  teacherCouldImprove: string[];
  teacherCouldImproveOther: string;
  teacherConfidence: string;

  // Section C
  attendedDLTraining: string;
  trainingsAttended: string[];
  inSchoolTraining: string;
  trainingMethod: string[];
  trainingMethodOther: string;

  // Section D
  receivedMaterials: string;
  materialsReceived: string[];
  materialsChallenges: string;
  materialsChallengeTypes: string[];
  materialsChallengesOther: string;
  doneBaseline: string;

  // Section E
  englishGrouping: string;
  mathsGrouping: string;
  allLearnersAssessed: string;
  notAssessedReasons: string[];
  notAssessedOther: string;
  notAssessedCount: string;
  midTermAssessment: string;

  // Section F
  communityAwareness: string;
  communityAcademic: string;
  communitySupport: string;
  lessonObservers: string[];
  lessonObserversOther: string;
  dlAffectsSchool: string;
  dlEffects: string[];
  dlEffectsOther: string;
  dlUseful: string;
  dlUsefulWay: string;

  // Section G
  dashboardChallenges: string[];
  dashboardChallengesOther: string;
  implementationChallenges: string[];
  implementationChallengesOther: string;
  fidelityRating: number;
  additionalComments: string;

  // Closing
  timeOfDeparture: string;
  gpsLat: string;
  gpsLng: string;
  gpsAlt: string;
  gpsAccuracy: string;
}

export const initialFormData: AppFormData = {
  region: '', district: '', schoolName: '', schoolCode: '', dateOfVisit: '', timeOfVisit: '',
  agency: '', agencyOther: '', monitorSchedule: '', isDLFocalPerson: '', monitorName: '', monitorContact: '',
  teacherObserved: '', streamObserved: '', phaseMonitored: '', levelObserved: '', subjectObserved: '',
  learnersAssigned: {}, learnersPresent: {},
  dlTeacherPresent: '', substituteTeacher: '', substituteOther: '', learnersWrongLevel: '', learnersWrongLevelExplain: '',
  followedLessonPlan: '',
  udl1: {}, udl2: {}, udl3: {},
  lessonCompleted: '', moreThanHour: '', extraTime: '', adhereProcedures: '',
  usedTLMs: '', tlmsUsed: [], tlmsOther: '',
  teacherDidWell: [], teacherDidWellOther: '', teacherCouldImprove: [], teacherCouldImproveOther: '',
  teacherConfidence: '',
  attendedDLTraining: '', trainingsAttended: [], inSchoolTraining: '', trainingMethod: [], trainingMethodOther: '',
  receivedMaterials: '', materialsReceived: [], materialsChallenges: '', materialsChallengeTypes: [], materialsChallengesOther: '', doneBaseline: '',
  englishGrouping: '', mathsGrouping: '', allLearnersAssessed: '', notAssessedReasons: [], notAssessedOther: '', notAssessedCount: '', midTermAssessment: '',
  communityAwareness: '', communityAcademic: '', communitySupport: '',
  lessonObservers: [], lessonObserversOther: '', dlAffectsSchool: '', dlEffects: [], dlEffectsOther: '', dlUseful: '', dlUsefulWay: '',
  dashboardChallenges: [], dashboardChallengesOther: '', implementationChallenges: [], implementationChallengesOther: '',
  fidelityRating: 50, additionalComments: '',
  timeOfDeparture: '', gpsLat: '', gpsLng: '', gpsAlt: '', gpsAccuracy: '',
};
