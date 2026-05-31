import type { AppFormData } from '../types';
import { FieldBlock, Label, TextInput, SelectInput, SectionTitle } from './FormField';

const REGIONS = ['AHAFO','ASHANTI','BONO','BONO EAST','CENTRAL','EASTERN','GREATER ACCRA','NORTH EAST','OTI','SAVANNAH','VOLTA','WESTERN','WESTERN NORTH'];

export default function SchoolIdentity({ data, update }: { data: AppFormData; update: (p: Partial<AppFormData>) => void }) {
  return (
    <div>
      <SectionTitle>School Identity Information</SectionTitle>
      <FieldBlock>
        <Label>Region Name</Label>
        <SelectInput value={data.region} onChange={v => update({ region: v })} options={REGIONS} placeholder="Select region" />
      </FieldBlock>
      <FieldBlock>
        <Label>District Name</Label>
        <TextInput value={data.district} onChange={v => update({ district: v })} placeholder="Enter district name" />
      </FieldBlock>
      <FieldBlock>
        <Label>School Name</Label>
        <TextInput value={data.schoolName} onChange={v => update({ schoolName: v })} placeholder="Enter school name" />
      </FieldBlock>
      <FieldBlock>
        <Label note="Please use the new EMIS code">School Code</Label>
        <TextInput value={data.schoolCode} onChange={v => update({ schoolCode: v })} placeholder="EMIS code" />
      </FieldBlock>
      <FieldBlock>
        <Label>Date of Visit</Label>
        <input type="date" value={data.dateOfVisit} onChange={e => update({ dateOfVisit: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
      </FieldBlock>
      <FieldBlock>
        <Label>Time of Visit</Label>
        <input type="time" value={data.timeOfVisit} onChange={e => update({ timeOfVisit: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
      </FieldBlock>
    </div>
  );
}
