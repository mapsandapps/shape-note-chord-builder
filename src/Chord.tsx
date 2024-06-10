import { Chord, Mode } from './helpers';
import Note from './Note';

interface ChordProps {
  chord: Chord;
  mode: Mode;
}

export default function PitchPicker(props: ChordProps) {
  const { chord, mode } = props;
  return (
    <div className="chord">
      <div className="chord-name">{chord.name}</div>
      {chord.notes.map((note) => (note ? <Note note={note} mode={mode} /> : <div>-</div>))}
    </div>
  );
}
