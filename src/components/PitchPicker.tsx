import { Mode, ShapeSystem } from '../helpers';
import PitchPickerNote from './PitchPickerNote';

interface PitchPickerProps {
  mode: Mode;
  keyName: string | null;
  selectedPitch: number | null;
  shapeSystem: ShapeSystem;
  onChange: () => {};
}

export default function PitchPicker(props: PitchPickerProps) {
  const { mode, keyName, selectedPitch, shapeSystem, onChange } = props;
  const pitches = [1, 2, 3, 4, 5, 6, 7];

  return (
    <select onChange={onChange} value={selectedPitch?.toString()}>
      <option value="null">--None--</option>
      {pitches.map((item) => {
        const note = { pitch: item }

        return (
          <option value={item.toString()} key={shapeSystem + item}>
            <PitchPickerNote mode={mode} note={note} keyName={keyName} shapeSystem={shapeSystem} />
          </option>
        )
      })}
    </select>
  );
}
