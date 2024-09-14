import { getShape, getSyllable } from '../helpers';
import { Mode, Note as NoteType, ShapeSystem } from '../types';
import { getNoteName } from '../keys';

interface PitchPickerNoteProps {
  note: NoteType;
  mode: Mode;
  keyName: string | null;
  shapeSystem: ShapeSystem
}

export default function PitchPickerNote(props: PitchPickerNoteProps) {
  const { keyName, mode, note, shapeSystem } = props;
  if (!note || !note.pitch) {
    return <div>-</div>
  }

  const syllable = getSyllable(note.pitch, mode, shapeSystem);
  const shape = shapeSystem === ShapeSystem.four ? getShape(syllable) : '';
  // @ts-ignore
  const noteName = getNoteName(mode, keyName, note.pitch);

  const text = `${shape || ''} ${syllable}-${note.pitch}${noteName ? ': ' + noteName : ''}`

  return (
    <div>
      {text}
    </div>
  );
}
