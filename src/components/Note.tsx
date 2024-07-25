import './Note.css';
import { Mode, Note as NoteType, ShapeSystem, getShape, getSyllable } from '../helpers';
import { getNoteName } from '../keys';

interface NoteProps {
  note: NoteType;
  mode: Mode;
  keyName: string | null;
  shapeSystem: ShapeSystem
}

export default function Note(props: NoteProps) {
  const { keyName, mode, note, shapeSystem } = props;
  if (!note || !note.pitch) {
    return <div>-</div>
  }

  const syllable = getSyllable(note.pitch, mode, shapeSystem);
  const shape = shapeSystem === ShapeSystem.four ? getShape(syllable) : '';
  // @ts-ignore
  const noteName = getNoteName(mode, keyName, note.pitch);

  return (
    <div className={`${note.isBass && 'bass'} ${note.isMelody && 'melody'}`}>
      {shape && ` ${shape}`}
      {syllable}-{note.pitch} {note.isMelody && <span>(melody)</span>} {note.isBass && <span>(bass)</span>}
      {noteName && `: ${noteName}`}
    </div>
  );
}
