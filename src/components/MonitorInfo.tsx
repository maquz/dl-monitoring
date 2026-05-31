import type { AppFormData } from '../types';
import { FieldBlock, Label, TextInput, Radio, YesNo, SectionTitle } from './FormField';

const AGENCIES = ['GES - HQ','GES - Metro/Municipal/District','UNICEF','NaCCA','NTC','NaSIA','Ghana Library Authority','IPA','Other'];

export default function MonitorInfo({ data, update }: { data: AppFormData; update: (p: Partial<AppFormData>) => void }) {
  return (
    <div>
      <SectionTitle>Monitor Information</SectionTitle>
      <FieldBlock>
        <Label>Agency of Monitor</Label>
        {AGENCIES.map(a => (
          <Radio key={a} label={a} name="agency" value={a} checked={data.agency === a} onChange={() => update({ agency: a })} />
        ))}
        {data.agency === 'Other' && (
          <TextInput value={data.agencyOther} onChange={v => update({ agencyOther: v })} placeholder="Specify agency" />
        )}
      </FieldBlock>
      <FieldBlock>
        <Label>Monitor's Schedule</Label>
        <TextInput value={data.monitorSchedule} onChange={v => update({ monitorSchedule: v })} placeholder="Enter schedule" />
      </FieldBlock>
      <FieldBlock>
        <Label>Are you the DL Focal person for the District/Municipality?</Label>
        <YesNo value={data.isDLFocalPerson} onChange={v => update({ isDLFocalPerson: v })} />
      </FieldBlock>
      <FieldBlock>
        <Label note="Your name should be in BLOCK LETTERS">Monitor's Name</Label>
        <TextInput value={data.monitorName} onChange={v => update({ monitorName: v.toUpperCase() })} placeholder="FULL NAME" />
      </FieldBlock>
      <FieldBlock>
        <Label note="Format: 000-000-7711">Monitor's Contact</Label>
        <TextInput value={data.monitorContact} onChange={v => update({ monitorContact: v })} placeholder="000-000-7711" />
      </FieldBlock>
    </div>
  );
}
