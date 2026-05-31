import type { AppFormData } from '../types';
import { FieldBlock, Label, TextInput, SectionTitle } from './FormField';

export default function ClosingSection({ data, update }: { data: AppFormData; update: (p: Partial<AppFormData>) => void }) {
  const getLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(pos => {
      update({
        gpsLat: pos.coords.latitude.toFixed(6),
        gpsLng: pos.coords.longitude.toFixed(6),
        gpsAlt: pos.coords.altitude ? pos.coords.altitude.toFixed(1) : '',
        gpsAccuracy: pos.coords.accuracy.toFixed(1),
      });
    });
  };

  return (
    <div>
      <SectionTitle>Closing Information</SectionTitle>

      <FieldBlock>
        <Label>Time of Departure</Label>
        <input type="time" value={data.timeOfDeparture} onChange={e => update({ timeOfDeparture: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
      </FieldBlock>

      <FieldBlock>
        <Label note="Get location of school before leaving the premises">GPS Location of the school visited</Label>
        <button onClick={getLocation} className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm mb-3">
          📍 Get Current GPS Location
        </button>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-gray-500 mb-1">Latitude (x.y °)</p>
            <TextInput value={data.gpsLat} onChange={v => update({ gpsLat: v })} placeholder="0.000000" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Longitude (x.y °)</p>
            <TextInput value={data.gpsLng} onChange={v => update({ gpsLng: v })} placeholder="0.000000" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Altitude (m)</p>
            <TextInput value={data.gpsAlt} onChange={v => update({ gpsAlt: v })} placeholder="0" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Accuracy (m)</p>
            <TextInput value={data.gpsAccuracy} onChange={v => update({ gpsAccuracy: v })} placeholder="0" />
          </div>
        </div>
      </FieldBlock>
    </div>
  );
}
