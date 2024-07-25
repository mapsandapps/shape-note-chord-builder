import { getChordDisplayName } from '../chord-data';
import { Chord as ChordType, Mode, Settings, ShapeSystem } from '../helpers';
import Shape from './Shape';

interface ChordProps {
  chord: ChordType;
  keyName: string | null;
  mode: Mode;
  settings: Settings;
  shapeSystem: ShapeSystem
}

export default function Chord(props: ChordProps) {
  const { chord, keyName, mode, settings, shapeSystem } = props;
  const { chordNotation } = settings;

  console.log(JSON.stringify(settings))
  console.log(chordNotation)

  return (
    <div className="chord">
      <div className="chord-name">{getChordDisplayName(props.chord.fullName, chordNotation, mode, keyName)}</div>
      {chord.notes.toReversed().map((note, i) => (<Shape note={note} mode={mode} keyName={keyName} shapeSystem={shapeSystem} isFaded={i % 2 === 1} key={note?.pitch} />))}
    </div>
  );
}
