import type { AppFormData } from '../types';
import { FieldBlock, Label, Checkbox, YesNo, SectionTitle } from './FormField';

const TRAININGS = ['In-person Training, 2021','Webinar, 2022','In-person Training, 2023','DL Digital Training NTC Teacher Portal, 2023'];
const METHODS = ['Peer-to-peer','Headteacher/Curriculum Lead/DL Focal Person','PLC','Other'];

export default function SectionC({ data, update }: { data: AppFormData; update: (p: Partial<AppFormData>) => void }) {
  const toggleTraining = (v: string) => {
    const arr = data.trainingsAttended;
    update({ trainingsAttended: arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v] });
  };
  const toggleMethod = (v: string) => {
    const arr = data.trainingMethod;
    update({ trainingMethod: arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v] });
  };

  return (
    <div>
      <SectionTitle>Section C: Training (Interview with Teacher)</SectionTitle>
      <p className="text-xs text-gray-500 italic mb-4">Interview with Teacher after DL lesson delivery</p>

      <FieldBlock>
        <Label>C1. Have you ever attended a DL training?</Label>
        <YesNo value={data.attendedDLTraining} onChange={v => update({ attendedDLTraining: v })} />
      </FieldBlock>

      {data.attendedDLTraining === 'Yes' && (
        <FieldBlock>
          <Label>C2. Which of the training did you participate in?</Label>
          {TRAININGS.map(t => (
            <Checkbox key={t} label={t} checked={data.trainingsAttended.includes(t)} onChange={() => toggleTraining(t)} />
          ))}
        </FieldBlock>
      )}

      <FieldBlock>
        <Label>C3. Did you receive any in-school or other training on DL this term?</Label>
        <YesNo value={data.inSchoolTraining} onChange={v => update({ inSchoolTraining: v })} />
      </FieldBlock>

      {data.inSchoolTraining === 'Yes' && (
        <FieldBlock>
          <Label>C4. How did you receive this training?</Label>
          {METHODS.map(m => (
            <Checkbox key={m} label={m} checked={data.trainingMethod.includes(m)} onChange={() => toggleMethod(m)} />
          ))}
        </FieldBlock>
      )}
    </div>
  );
}
