import { Mode, Note, getShape, getSyllable } from './helpers';

interface ShapeProps {
  note: Note;
  mode: Mode;
}

export default function Shape(props: ShapeProps) {
  if (!props.note || !props.note.pitch) {
    return <div>-</div>
  }

  const syllable = getSyllable(props.note.pitch, props.mode);
  const shape = getShape(syllable);

  return (
    <svg height="64" width="64" xmlns="http://www.w3.org/2000/svg">
      {shape === '◺' && (
        <>
          <polygon points="9,16 9,48 57,48" style={{ fill: 'darkblue' }} /> 
          {/* <path d='M 8,8 L 8,56 L 56,56 Z
            M 16,16 L 48,48 L 16,48 Z' /> */}
          <text x="16" y="42" style={{ fill: 'white' }}>{props.note.pitch}</text>
        </>
      )}
      {shape === '○︎' && (
        <>
          <path d="M24.7377 50C51.623 50 57 30.6861 57 25.9562C57 18.5985 50.3115 14 40.8689 14C16.6066 14 9 30.5547 9 38.0438C9 45.6642 15.8197 50 24.7377 50Z" style={{ fill: 'darkblue' }} /> 
          <text x="28" y="38" style={{ fill: 'white' }}>{props.note.pitch}</text>
        </>
      )}
      {shape === '▭' && (
        <>
          <polygon points="9,16 9,48 57,48 57,16" style={{ fill: 'darkblue' }} /> 
          <text x="28" y="38" style={{ fill: 'white' }}>{props.note.pitch}</text>
        </>
      )}
      {shape === '◇' && (
        <>
          <polygon points="32,14 56,32 32,50 8,32" style={{ fill: 'darkblue' }} /> 
          <text x="28" y="38" style={{ fill: 'white' }}>{props.note.pitch}</text>
        </>
      )}
    </svg>
  );
}
