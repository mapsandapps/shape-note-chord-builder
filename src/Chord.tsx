import { Chord as ChordType, Mode, ShapeSystem } from './helpers';
import Shape from './Shape';

interface ChordProps {
  chord: ChordType;
  keyName: string | null;
  mode: Mode;
  shapeSystem: ShapeSystem
}

export default function Chord(props: ChordProps) {
  const { chord, keyName, mode, shapeSystem } = props;

  return (
    <div className="chord">
      <div className="chord-name">{props.chord.name}</div>
      {chord.notes.toReversed().map((note, i) => (<Shape note={note} mode={mode} keyName={keyName} shapeSystem={shapeSystem} isFaded={i % 2 === 1} key={note?.pitch} />))}
    </div>
  );
}
