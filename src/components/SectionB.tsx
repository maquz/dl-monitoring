import type { AppFormData } from '../types';
import { FieldBlock, Label, TextInput, Radio, Checkbox, YesNo, YesNoGrid, SelectInput, SectionTitle, SubTitle, TextArea } from './FormField';

const SUBSTITUTES = ['Headteacher','Another class teacher','Teacher mentee','NABCO','National Service','Volunteer','Other'];
const UDL1_ITEMS = ['Class control','Fair distribution of questions','Learners demonstrate lessons','All learners participate in lessons','Intra engagement','Inter engagement','Use of performance/score cards','Use of group labels','Each child gets the opportunity to read, say/sign, write, do, and listen.','The teacher supervises each learner\'s work','Teacher marks work'];
const UDL2_ITEMS = ['Multiple means of engagement','Multiple means of representation','Use of Actions and Expressions'];
const UDL3_ITEMS = ['Use of short songs','Use of slogan','Interesting clap styles, sitting positions, etc.'];
const TLMS = ['Alphabet chart','Phonic chart','Number chart','Place value chart','Number wheel chart','Straws','Sound letter ball','Addition frame','Other'];
const PERFORMANCE_AREAS = ['What and how to teach','Linkage of lesson objectives strategies activities and delivery','Organisation of physical environment','Use of appropriate TLMs','Class management/discipline','Pupils\' engagement or interaction','Class assessment/exercises','Other'];
const CONFIDENCE = ['Extremely confident','Very confident','Somewhat confident','Not confident'];

export default function SectionB({ data, update }: { data: AppFormData; update: (p: Partial<AppFormData>) => void }) {
  const toggleList = (key: 'tlmsUsed'|'teacherDidWell'|'teacherCouldImprove', val: string) => {
    const arr = data[key] as string[];
    update({ [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] });
  };

  return (
    <div>
      <SectionTitle>Section B: Differentiated Learning Implementation</SectionTitle>

      <FieldBlock>
        <Label note="Crosscheck the name of the DL teacher with the teacher assigned on the LPS for school">B1. Was the DL teacher assigned to this class present for the DL lesson?</Label>
        <YesNo value={data.dlTeacherPresent} onChange={v => update({ dlTeacherPresent: v })} />
      </FieldBlock>

      {data.dlTeacherPresent === 'No' && (
        <FieldBlock>
          <Label>B2. If not, who is taking the DL class?</Label>
          {SUBSTITUTES.map(s => (
            <Radio key={s} label={s} name="sub" value={s} checked={data.substituteTeacher === s} onChange={() => update({ substituteTeacher: s })} />
          ))}
          {data.substituteTeacher === 'Other' && (
            <TextInput value={data.substituteOther} onChange={v => update({ substituteOther: v })} placeholder="Specify" />
          )}
        </FieldBlock>
      )}

      <FieldBlock>
        <Label>B3. Does it appear some learners are not supposed to be at this level?</Label>
        <YesNo value={data.learnersWrongLevel} onChange={v => update({ learnersWrongLevel: v })} />
        {data.learnersWrongLevel === 'Yes' && (
          <TextArea value={data.learnersWrongLevelExplain} onChange={v => update({ learnersWrongLevelExplain: v })} placeholder="Please explain" />
        )}
      </FieldBlock>

      <FieldBlock>
        <Label>B5. Did the teacher follow the lesson plan as prescribed in the Teacher's Guide?</Label>
        <YesNo value={data.followedLessonPlan} onChange={v => update({ followedLessonPlan: v })} />
      </FieldBlock>

      <SubTitle>Use of UDL Principles 1</SubTitle>
      <FieldBlock>
        <Label>B6. Which of the following did you observe the teacher do?</Label>
        <YesNoGrid items={UDL1_ITEMS} values={data.udl1} onChange={(k, v) => update({ udl1: { ...data.udl1, [k]: v } })} />
      </FieldBlock>

      <SubTitle>Use of UDL Principles 2</SubTitle>
      <FieldBlock>
        <Label>B7. Which of the following UDL approach did you observe the teacher use?</Label>
        <YesNoGrid items={UDL2_ITEMS} values={data.udl2} onChange={(k, v) => update({ udl2: { ...data.udl2, [k]: v } })} />
      </FieldBlock>

      <SubTitle>Use of UDL Principles 3</SubTitle>
      <FieldBlock>
        <Label>B8. Is the DL lesson fun?</Label>
        <YesNoGrid items={UDL3_ITEMS} values={data.udl3} onChange={(k, v) => update({ udl3: { ...data.udl3, [k]: v } })} />
      </FieldBlock>

      <FieldBlock>
        <Label>B9. Did the teacher complete the DL lesson?</Label>
        <YesNo value={data.lessonCompleted} onChange={v => update({ lessonCompleted: v })} />
      </FieldBlock>

      <FieldBlock>
        <Label>B10. Did the lesson take more than an hour?</Label>
        <YesNo value={data.moreThanHour} onChange={v => update({ moreThanHour: v })} />
      </FieldBlock>

      {data.moreThanHour === 'Yes' && (
        <FieldBlock>
          <Label>B11. How much more time did the lesson take?</Label>
          {['Less than 15mins','Between 15 and 30mins','More than 30mins'].map(t => (
            <Radio key={t} label={t} name="extratime" value={t} checked={data.extraTime === t} onChange={() => update({ extraTime: t })} />
          ))}
        </FieldBlock>
      )}

      <FieldBlock>
        <Label note="Introduction, Main lesson, Closure">B12. Did the teacher adhere to the DL lesson procedures?</Label>
        <YesNo value={data.adhereProcedures} onChange={v => update({ adhereProcedures: v })} />
      </FieldBlock>

      <FieldBlock>
        <Label>B13. Did the teacher use TLMs in the lesson delivery?</Label>
        <SelectInput value={data.usedTLMs} onChange={v => update({ usedTLMs: v })} options={['All of the time','Most of the time','Some of the time','Not at all']} placeholder="Select frequency" />
      </FieldBlock>

      <FieldBlock>
        <Label>B14. Please select all the TLMs that you observed the teacher use</Label>
        {TLMS.map(t => (
          <Checkbox key={t} label={t} checked={data.tlmsUsed.includes(t)} onChange={() => toggleList('tlmsUsed', t)} />
        ))}
        {data.tlmsUsed.includes('Other') && (
          <TextInput value={data.tlmsOther} onChange={v => update({ tlmsOther: v })} placeholder="Specify TLM" />
        )}
      </FieldBlock>

      <FieldBlock>
        <Label>B15. What did the teacher do well?</Label>
        {PERFORMANCE_AREAS.map(a => (
          <Checkbox key={a} label={a} checked={data.teacherDidWell.includes(a)} onChange={() => toggleList('teacherDidWell', a)} />
        ))}
        {data.teacherDidWell.includes('Other') && (
          <TextInput value={data.teacherDidWellOther} onChange={v => update({ teacherDidWellOther: v })} placeholder="Specify" />
        )}
      </FieldBlock>

      <FieldBlock>
        <Label>B16. What could the teacher have done better?</Label>
        {PERFORMANCE_AREAS.map(a => (
          <Checkbox key={a} label={a} checked={data.teacherCouldImprove.includes(a)} onChange={() => toggleList('teacherCouldImprove', a)} />
        ))}
        {data.teacherCouldImprove.includes('Other') && (
          <TextInput value={data.teacherCouldImproveOther} onChange={v => update({ teacherCouldImproveOther: v })} placeholder="Specify" />
        )}
      </FieldBlock>

      <FieldBlock>
        <Label>B17. From your observation, how confident was the teacher in his/her delivery?</Label>
        {CONFIDENCE.map(c => (
          <Radio key={c} label={c} name="confidence" value={c} checked={data.teacherConfidence === c} onChange={() => update({ teacherConfidence: c })} />
        ))}
      </FieldBlock>
    </div>
  );
}
