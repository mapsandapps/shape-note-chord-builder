import { Mode } from './helpers';
import Note from './Note';

interface PitchPickerProps {
  mode: Mode;
  selectedPitch: number | null;
  onChange: () => {};
}

export default function PitchPicker(props: PitchPickerProps) {
  const pitches = [1, 2, 3, 4, 5, 6, 7];

  console.log(props.selectedPitch)
  return (
    <select onChange={props.onChange} value={props.selectedPitch?.toString()}>
      <option value="null">--None--</option>
      {pitches.map((item) => {
        const note = { pitch: item }

        return (
          <option value={item.toString()} key={item}>
            <Note mode={props.mode} note={note} />
          </option>
        )
      })}
    </select>
  );
}
