import type { AppFormData } from '../types';
import { FieldBlock, Label, TextInput, Radio, Checkbox, YesNo, SectionTitle } from './FormField';

const NOT_ASSESSED_REASONS = ['Learner absenteeism','Teacher absenteeism','Lack of teachers','Other specify'];

export default function SectionE({ data, update }: { data: AppFormData; update: (p: Partial<AppFormData>) => void }) {
  const toggleReason = (v: string) => {
    const arr = data.notAssessedReasons;
    update({ notAssessedReasons: arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v] });
  };

  return (
    <div>
      <SectionTitle>Section E: Assessment Verification</SectionTitle>
      <p className="text-xs text-gray-500 italic mb-4">Monitor should know how assessment and grouping is done under DL before soliciting for responses from the teacher.</p>

      <FieldBlock>
        <Label>E1. After conducting learner assessment, describe how you grouped learners for English</Label>
        {['Correctly grouped','Incorrectly grouped'].map(o => (
          <Radio key={o} label={o} name="engGroup" value={o} checked={data.englishGrouping === o} onChange={() => update({ englishGrouping: o })} />
        ))}
      </FieldBlock>

      <FieldBlock>
        <Label>E2. After conducting the assessment, describe how you grouped learners for Maths</Label>
        {['Correctly grouped','Incorrectly grouped'].map(o => (
          <Radio key={o} label={o} name="mathGroup" value={o} checked={data.mathsGrouping === o} onChange={() => update({ mathsGrouping: o })} />
        ))}
      </FieldBlock>

      <FieldBlock>
        <Label>E3. Have all the learners in your regular class been assessed?</Label>
        <YesNo value={data.allLearnersAssessed} onChange={v => update({ allLearnersAssessed: v })} />
      </FieldBlock>

      {data.allLearnersAssessed === 'No' && (
        <>
          <FieldBlock>
            <Label>E4. If not, why?</Label>
            {NOT_ASSESSED_REASONS.map(r => (
              <Checkbox key={r} label={r} checked={data.notAssessedReasons.includes(r)} onChange={() => toggleReason(r)} />
            ))}
            {data.notAssessedReasons.includes('Other specify') && (
              <TextInput value={data.notAssessedOther} onChange={v => update({ notAssessedOther: v })} placeholder="Specify" />
            )}
          </FieldBlock>
          <FieldBlock>
            <Label>E5. How many are yet to be assessed?</Label>
            <TextInput value={data.notAssessedCount} onChange={v => update({ notAssessedCount: v })} placeholder="Number of learners" />
          </FieldBlock>
        </>
      )}

      <FieldBlock>
        <Label>E6. Have you done a mid-term assessment?</Label>
        <YesNo value={data.midTermAssessment} onChange={v => update({ midTermAssessment: v })} />
      </FieldBlock>
    </div>
  );
}
