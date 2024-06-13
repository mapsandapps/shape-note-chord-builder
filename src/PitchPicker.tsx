import { Mode } from './helpers';
import Note from './Note';

interface NoteProps {
  mode: Mode;
  selectedPitch: number | null;
  onChange: () => {};
}

export default function PitchPicker(props: NoteProps) {
  const pitches = [1, 2, 3, 4, 5, 6, 7];
  return (
    <select onChange={props.onChange} value={props.selectedPitch?.toString()}>
      <option value="">--None--</option>
      {pitches.map((item) => {
        const note = { pitch: item }

        return (
          <option value={item} key={item}>
            <Note mode={props.mode} note={note} />
          </option>
        )
      })}
    </select>
  );
}
