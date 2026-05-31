import { useState } from 'react';
import SchoolIdentity from './components/SchoolIdentity';
import MonitorInfo from './components/MonitorInfo';
import SectionA from './components/SectionA';
import SectionB from './components/SectionB';
import SectionC from './components/SectionC';
import SectionD from './components/SectionD';
import SectionE from './components/SectionE';
import SectionF from './components/SectionF';
import SectionG from './components/SectionG';
import ClosingSection from './components/ClosingSection';
import Summary from './components/Summary';
import { initialFormData, type AppFormData } from './types';

const SECTIONS = [
  'School Identity',
  'Monitor Info',
  'A: Lesson Observation',
  'B: DL Implementation',
  'C: Training',
  'D: Materials',
  'E: Assessment',
  'F: Teacher Perception',
  'G: DL+ Dashboard',
  'Closing',
];

function App() {
  const [step, setStep] = useState(0);
  const [AppFormData, setFormData] = useState<AppFormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const update = (patch: Partial<AppFormData>) =>
    setFormData(prev => ({ ...prev, ...patch }));

  const next = () => setStep(s => Math.min(s + 1, SECTIONS.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));
  const submit = () => setSubmitted(true);

  const progress = Math.round(((step + 1) / SECTIONS.length) * 100);

  if (submitted) return <Summary AppFormData={AppFormData} onReset={() => { setFormData(initialFormData); setStep(0); setSubmitted(false); }} />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-sky-500 text-white px-4 py-3 sticky top-0 z-10 shadow">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium uppercase tracking-wide opacity-80">GES – DL Monitoring</span>
            <span className="text-xs opacity-80">{step + 1} / {SECTIONS.length}</span>
          </div>
          <p className="font-bold text-sm">{SECTIONS[step]}</p>
          <div className="mt-2 h-1.5 bg-sky-700 rounded-full">
            <div className="h-1.5 bg-yellow-400 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-lg mx-auto px-4 py-6 pb-28">
        {step === 0 && <SchoolIdentity data={AppFormData} update={update} />}
        {step === 1 && <MonitorInfo data={AppFormData} update={update} />}
        {step === 2 && <SectionA data={AppFormData} update={update} />}
        {step === 3 && <SectionB data={AppFormData} update={update} />}
        {step === 4 && <SectionC data={AppFormData} update={update} />}
        {step === 5 && <SectionD data={AppFormData} update={update} />}
        {step === 6 && <SectionE data={AppFormData} update={update} />}
        {step === 7 && <SectionF data={AppFormData} update={update} />}
        {step === 8 && <SectionG data={AppFormData} update={update} />}
        {step === 9 && <ClosingSection data={AppFormData} update={update} />}
      </div>

      {/* Footer nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-10">
        <div className="max-w-lg mx-auto flex gap-3">
          {step > 0 && (
            <button onClick={back} className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm">← Back</button>
          )}
          {step < SECTIONS.length - 1 ? (
            <button onClick={next} className="flex-1 py-3 rounded-xl bg-sky-500 text-white font-semibold text-sm">Next →</button>
          ) : (
            <button onClick={submit} className="flex-1 py-3 rounded-xl bg-yellow-500 text-white font-bold text-sm">Submit Form ✓</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
