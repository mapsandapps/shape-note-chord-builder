import './Note.css';
import { Mode, Note as NoteType, getShape, getSyllable } from './helpers';

interface NoteProps {
  note: NoteType;
  mode: Mode;
}

export default function Note(props: NoteProps) {
  const syllable = getSyllable(props.note.pitch, props.mode);
  const shape = getShape(syllable);

  return (
    <div className={`${props.note.isBass && 'bass'} ${props.note.isMelody && 'melody'}`}>
      {shape}
      {syllable}-{props.note.pitch}
    </div>
  );
}
