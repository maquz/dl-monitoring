import type { AppFormData } from '../types';
import { FieldBlock, Label, TextInput, Checkbox, YesNo, SectionTitle } from './FormField';

const MATERIALS = ['Assessment tools','Teachers Guide and Activity Books','Readers for lower primary','Readers for upper primary','Monitoring tools','DL Workbooks (English)','DL Workbooks (Maths)'];
const CHALLENGES = ['Errors in content','Printing errors','Inadequate','Other'];

export default function SectionD({ data, update }: { data: AppFormData; update: (p: Partial<AppFormData>) => void }) {
  const toggleMaterial = (v: string) => {
    const arr = data.materialsReceived;
    update({ materialsReceived: arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v] });
  };
  const toggleChallenge = (v: string) => {
    const arr = data.materialsChallengeTypes;
    update({ materialsChallengeTypes: arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v] });
  };

  return (
    <div>
      <SectionTitle>Section D: Materials and Implementation</SectionTitle>

      <FieldBlock>
        <Label>D1. Have you received any DL materials?</Label>
        <YesNo value={data.receivedMaterials} onChange={v => update({ receivedMaterials: v })} />
      </FieldBlock>

      {data.receivedMaterials === 'Yes' && (
        <FieldBlock>
          <Label>D2. What materials did you receive?</Label>
          {MATERIALS.map(m => (
            <Checkbox key={m} label={m} checked={data.materialsReceived.includes(m)} onChange={() => toggleMaterial(m)} />
          ))}
        </FieldBlock>
      )}

      <FieldBlock>
        <Label>D3. Do you have any challenges with these materials received?</Label>
        <YesNo value={data.materialsChallenges} onChange={v => update({ materialsChallenges: v })} />
      </FieldBlock>

      {data.materialsChallenges === 'Yes' && (
        <FieldBlock>
          <Label>D4. If yes, what challenges do you have?</Label>
          {CHALLENGES.map(c => (
            <Checkbox key={c} label={c} checked={data.materialsChallengeTypes.includes(c)} onChange={() => toggleChallenge(c)} />
          ))}
          {data.materialsChallengeTypes.includes('Other') && (
            <TextInput value={data.materialsChallengesOther} onChange={v => update({ materialsChallengesOther: v })} placeholder="Specify" />
          )}
        </FieldBlock>
      )}

      <FieldBlock>
        <Label>D5. Have you done the baseline assessment for the term?</Label>
        <YesNo value={data.doneBaseline} onChange={v => update({ doneBaseline: v })} />
      </FieldBlock>
    </div>
  );
}
