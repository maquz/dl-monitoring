import type { AppFormData } from '../types';

export default function Summary({ AppFormData, onReset }: { AppFormData: AppFormData; onReset: () => void }) {
  return (
    <div className="max-w-lg mx-auto px-4 py-6 text-center mt-20">
      <h2 className="text-2xl font-bold text-sky-800 mb-4">Submission Complete</h2>
      <p className="text-gray-600 mb-8">Thank you for submitting the DL Monitoring form. The data has been recorded successfully.</p>
      <button onClick={onReset} className="py-3 px-6 rounded-xl bg-sky-500 text-white font-bold w-full max-w-xs shadow-md">Start New Form</button>
    </div>
  );
}
