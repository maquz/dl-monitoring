import type { AppFormData } from '../types';
import { FieldBlock, Label, TextInput, Checkbox, YesNo, YesNoGrid, SectionTitle, TextArea } from './FormField';

const OBSERVERS = ['DD/AD supervision','Basic Schools coordinator','District Director','Special Education Officer','District Training Officer','DTST','SISO','Headteacher','DL Focal Person','National level officer GES-HQ','Officers from other agencies UNICEF/IPA/NaCCA/NTC/NaSIA','Member of SMC','Other'];
const DL_EFFECTS = ['Classroom management','Teacher Attrition','Insufficient Materials','Time management','Too much workload','Lack of training','Other'];
const COMMUNITY_ITEMS = ['Awareness Creation','Academic Assistance','Support (Financial, Material)'];

export default function SectionF({ data, update }: { data: AppFormData; update: (p: Partial<AppFormData>) => void }) {
  const toggleObserver = (v: string) => {
    const arr = data.lessonObservers;
    update({ lessonObservers: arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v] });
  };
  const toggleEffect = (v: string) => {
    const arr = data.dlEffects;
    update({ dlEffects: arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v] });
  };
  const communityValues: Record<string, string> = {
    'Awareness Creation': data.communityAwareness,
    'Academic Assistance': data.communityAcademic,
    'Support (Financial, Material)': data.communitySupport,
  };
  const updateCommunity = (key: string, val: string) => {
    if (key === 'Awareness Creation') update({ communityAwareness: val });
    if (key === 'Academic Assistance') update({ communityAcademic: val });
    if (key === 'Support (Financial, Material)') update({ communitySupport: val });
  };

  return (
    <div>
      <SectionTitle>Section F: Teacher Perception of DL</SectionTitle>

      <FieldBlock>
        <Label>F1. Has the School and the Community collaborated in the implementation of DL+?</Label>
        <YesNoGrid items={COMMUNITY_ITEMS} values={communityValues} onChange={updateCommunity} />
      </FieldBlock>

      <FieldBlock>
        <Label>F2. Which of the following persons ever observed a DL lesson in your school?</Label>
        {OBSERVERS.map(o => (
          <Checkbox key={o} label={o} checked={data.lessonObservers.includes(o)} onChange={() => toggleObserver(o)} />
        ))}
        {data.lessonObservers.includes('Other') && (
          <TextInput value={data.lessonObserversOther} onChange={v => update({ lessonObserversOther: v })} placeholder="Specify" />
        )}
      </FieldBlock>

      <FieldBlock>
        <Label>F3. From your perspective, has the DL program affected regular school activities in any way?</Label>
        <YesNo value={data.dlAffectsSchool} onChange={v => update({ dlAffectsSchool: v })} />
      </FieldBlock>

      {data.dlAffectsSchool === 'Yes' && (
        <FieldBlock>
          <Label>F4. How has the DL program affected school activities?</Label>
          {DL_EFFECTS.map(e => (
            <Checkbox key={e} label={e} checked={data.dlEffects.includes(e)} onChange={() => toggleEffect(e)} />
          ))}
          {data.dlEffects.includes('Other') && (
            <TextInput value={data.dlEffectsOther} onChange={v => update({ dlEffectsOther: v })} placeholder="Specify" />
          )}
        </FieldBlock>
      )}

      <FieldBlock>
        <Label>F5. Do you find the DL program useful?</Label>
        <YesNo value={data.dlUseful} onChange={v => update({ dlUseful: v })} />
      </FieldBlock>

      <FieldBlock>
        <Label>F6. In what way do you find the DL program useful?</Label>
        <TextArea value={data.dlUsefulWay} onChange={v => update({ dlUsefulWay: v })} placeholder="Describe how the DL program is useful..." />
      </FieldBlock>
    </div>
  );
}
