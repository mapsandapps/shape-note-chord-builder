import { Chord, Mode } from './helpers';
import Shape from './Shape';

interface ChordProps {
  chord: Chord;
  keyName: string | null;
  mode: Mode;
}

export default function PitchPicker(props: ChordProps) {
  const { chord, mode } = props;

  return (
    <div className="chord">
      <div className="chord-name">{props.chord.name}</div>
      {chord.notes.toReversed().map((note, i) => (<Shape note={note} mode={mode} keyName={props.keyName} isFaded={i % 2 === 1} key={note?.pitch} />))}
    </div>
  );
}
