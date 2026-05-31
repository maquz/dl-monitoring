import { ReactNode } from 'react';

export function Label({ children, note }: { children: ReactNode; note?: string }) {
  return (
    <div className="mb-1">
      <p className="font-semibold text-gray-800 text-sm">{children}</p>
      {note && <p className="text-xs text-gray-500 italic mt-0.5">{note}</p>}
    </div>
  );
}

export function FieldBlock({ children }: { children: ReactNode }) {
  return <div className="mb-5">{children}</div>;
}

export function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
    />
  );
}

export function TextArea({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
    />
  );
}

export function Radio({ label, name, value, checked, onChange }: { label: string; name: string; value: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 py-2 cursor-pointer">
      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
        checked ? 'border-sky-600 bg-sky-600' : 'border-gray-400'
      }`}>
        {checked && <span className="w-2 h-2 rounded-full bg-white" />}
      </span>
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

export function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 py-1.5 cursor-pointer">
      <span className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
        checked ? 'border-sky-600 bg-sky-600' : 'border-gray-400'
      }`}>
        {checked && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
      </span>
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

export function YesNo({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-4">
      {['Yes', 'No'].map(opt => (
        <Radio key={opt} label={opt} name="yn" value={opt} checked={value === opt} onChange={() => onChange(opt)} />
      ))}
    </div>
  );
}

export function YesNoGrid({ items, values, onChange }: { items: string[]; values: Record<string, string>; onChange: (key: string, v: string) => void }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="grid grid-cols-3 bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-600">
        <span className="col-span-1">Item</span>
        <span className="text-center">Yes</span>
        <span className="text-center">No</span>
      </div>
      {items.map((item, i) => (
        <div key={item} className={`grid grid-cols-3 px-3 py-2 items-center ${ i % 2 === 0 ? 'bg-white' : 'bg-gray-50' }`}>
          <span className="text-xs text-gray-700 col-span-1 pr-2">{item}</span>
          <div className="flex justify-center">
            <button onClick={() => onChange(item, 'Yes')} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${ values[item] === 'Yes' ? 'border-sky-600 bg-sky-600' : 'border-gray-300' }`}>
              {values[item] === 'Yes' && <span className="w-2 h-2 rounded-full bg-white" />}
            </button>
          </div>
          <div className="flex justify-center">
            <button onClick={() => onChange(item, 'No')} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${ values[item] === 'No' ? 'border-red-500 bg-red-500' : 'border-gray-300' }`}>
              {values[item] === 'No' && <span className="w-2 h-2 rounded-full bg-white" />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SelectInput({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-base font-bold text-sky-800 mb-4 pb-2 border-b-2 border-sky-200">{children}</h2>;
}

export function SubTitle({ children }: { children: ReactNode }) {
  return <p className="text-xs font-bold text-sky-700 uppercase tracking-wide mt-4 mb-2">{children}</p>;
}
