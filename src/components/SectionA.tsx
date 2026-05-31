import type { AppFormData } from '../types';
import { FieldBlock, Label, TextInput, Radio, SectionTitle } from './FormField';

const GRADES = ['P1','P2','P3','P4','P5','P6'];

export default function SectionA({ data, update }: { data: AppFormData; update: (p: Partial<AppFormData>) => void }) {
  const updateAssigned = (g: string, v: string) => update({ learnersAssigned: { ...data.learnersAssigned, [g]: v } });
  const updatePresent = (g: string, v: string) => update({ learnersPresent: { ...data.learnersPresent, [g]: v } });

  return (
    <div>
      <SectionTitle>Section A: DL Lesson Observation</SectionTitle>
      <p className="text-xs text-gray-500 italic mb-4">Before observing a lesson, ensure to go through the Teacher's Guide to review the lesson for the day. Also check information on the number of learners assigned to the DL class from the learning progress sheet.</p>

      <FieldBlock>
        <Label>A1. Name of teacher observed</Label>
        <TextInput value={data.teacherObserved} onChange={v => update({ teacherObserved: v })} placeholder="Teacher name" />
      </FieldBlock>

      <FieldBlock>
        <Label>A2. Indicate stream observed</Label>
        {['Single Stream','Stream A','Stream B'].map(s => (
          <Radio key={s} label={s} name="stream" value={s} checked={data.streamObserved === s} onChange={() => update({ streamObserved: s })} />
        ))}
      </FieldBlock>

      <FieldBlock>
        <Label note="To guarantee effective monitoring, each monitor may focus on one phase on each visit.">A3. Indicate the phase monitored</Label>
        {['Lower Primary','Upper Primary'].map(s => (
          <Radio key={s} label={s} name="phase" value={s} checked={data.phaseMonitored === s} onChange={() => update({ phaseMonitored: s })} />
        ))}
      </FieldBlock>

      <FieldBlock>
        <Label>A4. Level observed</Label>
        {['Level 1','Level 2','Level 3'].map(s => (
          <Radio key={s} label={s} name="level" value={s} checked={data.levelObserved === s} onChange={() => update({ levelObserved: s })} />
        ))}
      </FieldBlock>

      <FieldBlock>
        <Label>A5. Subject observed</Label>
        {['English','Math'].map(s => (
          <Radio key={s} label={s} name="subject" value={s} checked={data.subjectObserved === s} onChange={() => update({ subjectObserved: s })} />
        ))}
      </FieldBlock>

      <FieldBlock>
        <Label>A6. Total number of learners assigned to this DL class</Label>
        <div className="grid grid-cols-3 gap-2">
          {GRADES.map(g => (
            <div key={g}>
              <p className="text-xs text-gray-500 mb-1">{g}{g === 'P1' ? ' (not assessed)' : ''}</p>
              <TextInput value={data.learnersAssigned[g] || ''} onChange={v => updateAssigned(g, v)} placeholder="0" />
            </div>
          ))}
        </div>
      </FieldBlock>

      <FieldBlock>
        <Label note="Please take a head count">A7. Number of learners present in the DL class</Label>
        <div className="grid grid-cols-3 gap-2">
          {GRADES.map(g => (
            <div key={g}>
              <p className="text-xs text-gray-500 mb-1">{g}</p>
              <TextInput value={data.learnersPresent[g] || ''} onChange={v => updatePresent(g, v)} placeholder="0" />
            </div>
          ))}
        </div>
      </FieldBlock>
    </div>
  );
}
