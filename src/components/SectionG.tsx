import type { AppFormData } from '../types';
import { FieldBlock, Label, TextInput, Checkbox, SectionTitle, TextArea } from './FormField';

const DASHBOARD_CHALLENGES = ['Internet Connectivity','Difficulty in uploading learners results','Unavailability of laptops/desktop computers','Lack of technical knowledge in the use of ICT tools','Other'];
const IMPLEMENTATION_CHALLENGES = ['Large Class Size','Inadequate TLRs','Teacher absenteeism','Learner absenteeism','Understaffing','Other'];

export default function SectionG({ data, update }: { data: AppFormData; update: (p: Partial<AppFormData>) => void }) {
  const toggleDash = (v: string) => {
    const arr = data.dashboardChallenges;
    update({ dashboardChallenges: arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v] });
  };
  const toggleImpl = (v: string) => {
    const arr = data.implementationChallenges;
    update({ implementationChallenges: arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v] });
  };

  return (
    <div>
      <SectionTitle>Section G: DL+ Dashboard</SectionTitle>

      <FieldBlock>
        <Label>G1. What are some of the challenges encountered on the use of the DL+ dashboard?</Label>
        {DASHBOARD_CHALLENGES.map(c => (
          <Checkbox key={c} label={c} checked={data.dashboardChallenges.includes(c)} onChange={() => toggleDash(c)} />
        ))}
        {data.dashboardChallenges.includes('Other') && (
          <TextInput value={data.dashboardChallengesOther} onChange={v => update({ dashboardChallengesOther: v })} placeholder="Specify" />
        )}
      </FieldBlock>

      <FieldBlock>
        <Label>What challenges do you face in the implementation of the DL+ intervention?</Label>
        {IMPLEMENTATION_CHALLENGES.map(c => (
          <Checkbox key={c} label={c} checked={data.implementationChallenges.includes(c)} onChange={() => toggleImpl(c)} />
        ))}
        {data.implementationChallenges.includes('Other') && (
          <TextInput value={data.implementationChallengesOther} onChange={v => update({ implementationChallengesOther: v })} placeholder="Specify" />
        )}
      </FieldBlock>

      <FieldBlock>
        <Label>On a scale of 1 to 100, how will you rate fidelity of implementation of DL+ in the school?</Label>
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>0</span>
            <span className="font-bold text-sky-700 text-base">{data.fidelityRating}</span>
            <span>100</span>
          </div>
          <input
            type="range" min={0} max={100} value={data.fidelityRating}
            onChange={e => update({ fidelityRating: parseInt(e.target.value) })}
            className="w-full accent-sky-600"
          />
        </div>
      </FieldBlock>

      <FieldBlock>
        <Label>Any additional comments/suggestions/observations by monitor:</Label>
        <TextArea value={data.additionalComments} onChange={v => update({ additionalComments: v })} placeholder="Enter any additional comments..." />
      </FieldBlock>
    </div>
  );
}
