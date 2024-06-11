import { Mode } from './helpers';
import Note from './Note';

interface NoteProps {
  mode: Mode;
}

export default function PitchPicker(props: NoteProps) {
  const pitches = [1, 2, 3, 4, 5, 6, 7];
  return (
    <select>
      <option value="">--Please choose an option--</option>
      {pitches.map((item) => (
        <option value={item} key={item}>
          <Note mode={props.mode} note={{ pitch: item }} />
        </option>
      ))}
    </select>
  );
}
