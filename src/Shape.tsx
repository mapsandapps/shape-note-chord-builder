import { Mode, Note, getShape, getSyllable } from './helpers';
import { getNoteName } from './keys';

interface ShapeProps {
  note: Note;
  mode: Mode;
  keyName: string | null;
  isFaded?: boolean;
}

export default function Shape(props: ShapeProps) {
  const { note, mode, keyName, isFaded } = props;

  if (!note || !note.pitch) {
    return <svg height="64" width="64" xmlns="http://www.w3.org/2000/svg"></svg>
  }

  const syllable = getSyllable(note.pitch, mode);
  const shape = getShape(syllable);

  const shapeStyle = { fill: isFaded ? 'cornflowerblue' : 'darkblue' };

  // @ts-ignore
  const noteName = getNoteName(mode, keyName, note.pitch);

  const noteText = `${note.pitch}${noteName ? ` ${noteName}` : ''}`

  return (
    <div>
      <svg height="64" width="80" xmlns="http://www.w3.org/2000/svg">
        {shape === '◺' && (
          <>
            <polygon points="9,16 9,48 57,48" style={shapeStyle} /> 
            {/* <path d='M 8,8 L 8,56 L 56,56 Z
              M 16,16 L 48,48 L 16,48 Z' /> */}
            <text x={noteText ? 16 : 16} y="42" style={{ fill: 'white' }}>{noteText}</text>
          </>
        )}
        {shape === '○︎' && (
          <>
            <path d="M24.7377 50C51.623 50 57 30.6861 57 25.9562C57 18.5985 50.3115 14 40.8689 14C16.6066 14 9 30.5547 9 38.0438C9 45.6642 15.8197 50 24.7377 50Z" style={shapeStyle} /> 
            <text x={noteText ? 16 : 28} y="38" style={{ fill: 'white' }}>{noteText}</text>
          </>
        )}
        {shape === '▭' && (
          <>
            <polygon points="9,16 9,48 57,48 57,16" style={shapeStyle} /> 
            <text x={noteText ? 16 : 28} y="38" style={{ fill: 'white' }}>{noteText}</text>
          </>
        )}
        {shape === '◇' && (
          <>
            <polygon points="32,14 56,32 32,50 8,32" style={shapeStyle} /> 
            <text x={noteText ? 16 : 28} y="38" style={{ fill: 'white' }}>{noteText}</text>
          </>
        )}
        {note.isBass && (<text x="58" y="38" style={{ fontSize: '10px' }}>bass</text>) }
      </svg>
      {/* <span>{note.isMelody && 'melody'}</span> */}
    </div>
  );
}
