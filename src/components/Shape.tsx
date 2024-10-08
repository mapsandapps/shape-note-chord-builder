import { getShape, getSyllable } from '../helpers';
import { Mode, Note, ShapeSystem } from '../types';
import { getNoteName } from '../keys';

interface ShapeProps {
  note: Note;
  mode: Mode;
  keyName: string | null;
  shapeSystem: ShapeSystem
  isFaded?: boolean;
}

export default function Shape(props: ShapeProps) {
  const { note, mode, keyName, shapeSystem, isFaded } = props;

  if (!note || !note.pitch) {
    return <svg height="64" width="64" xmlns="http://www.w3.org/2000/svg"></svg>
  }

  const syllable = getSyllable(note.pitch, mode, shapeSystem);
  const shape = getShape(syllable);

  const shapeStyle = { 
    fill: isFaded ? 'cornflowerblue' : 'darkblue', 
    strokeWidth: note.isSelected ? '3px' : '0px',
    stroke: 'lime' 
  };

  // @ts-ignore
  const noteName = getNoteName(mode, keyName, note.pitch);

  const leftMargin = 32
  const rightTextLeftMargin = 58

  return (
    <div className="shape">
      <svg height="64" width="128" xmlns="http://www.w3.org/2000/svg">
        {shape === '◺' && (
          <>
            <text x="0" y="42">{ noteName }</text>
            <polygon points={`${1 + leftMargin},16 ${1 + leftMargin},48 ${49 + leftMargin},48`} style={shapeStyle} /> 
            <text x={8 + leftMargin} y="42" style={{ fill: 'white' }}>{ note.pitch }</text>
          </>
        )}
        {shape === '○︎' && (
          <>
            <text x="0" y="38">{ noteName }</text>
            <path d={`M${16.7377 + leftMargin} 50C${43.623 + leftMargin} 50 ${49 + leftMargin} 30.6861 ${49 + leftMargin} 25.9562C${49 + leftMargin} 18.5985 ${42.3115 + leftMargin} 14 ${32.8689 + leftMargin} 14C${8.6066 + leftMargin} 14 ${1 + leftMargin} 30.5547 ${1 + leftMargin} 38.0438C${1 + leftMargin} 45.6642 ${7.8197 + leftMargin} 50 ${16.7377 + leftMargin} 50Z`} style={shapeStyle} /> 
            <text x={20 + leftMargin} y="38" style={{ fill: 'white' }}>{ note.pitch }</text>
          </>
        )}
        {shape === '▭' && (
          <>
            <text x="0" y="38">{ noteName }</text>
            <polygon points={`${1 + leftMargin},16 ${1 + leftMargin},48 ${49 + leftMargin},48 ${49 + leftMargin},16`} style={shapeStyle} /> 
            <text x={20 + leftMargin} y="38" style={{ fill: 'white' }}>{ note.pitch }</text>
          </>
        )}
        {shape === '◇' && (
          <>
            <text x="0" y="38">{ noteName }</text>
            <polygon points={`${24 + leftMargin},14 ${48 + leftMargin},32 ${24 + leftMargin},50 ${leftMargin},32`} style={shapeStyle} /> 
            <text x={20 + leftMargin} y="38" style={{ fill: 'white' }}>{ note.pitch }</text>
          </>
        )}
        {shape === '△' && (
          <>
            <text x="0" y="42">{ noteName }</text>
            <polygon points={`${leftMargin},48 ${24 + leftMargin},16 ${48 + leftMargin},48`} style={shapeStyle} /> 
            <text x={20 + leftMargin} y="42" style={{ fill: 'white' }}>{ note.pitch }</text>
          </>
        )}
        {shape === 'semi-circle' && (
          <>
            <text x="0" y="38">{ noteName }</text>
            <path d={`M${23.9335 + leftMargin} 48C${44.41 + leftMargin} 48 ${48 + leftMargin} 35.328 ${48 + leftMargin} 29.824V16H${leftMargin}V29.824C${leftMargin} 35.712 ${3.59 + leftMargin} 48 ${23.9335 + leftMargin} 48Z`} style={shapeStyle} />
            <text x={20 + leftMargin} y="38" style={{ fill: 'white'}}>{ note.pitch }</text>
          </>
        )}
        {shape === 'baseball-diamond' && (
          <>
            <text x="0" y="38">{ noteName }</text>
            <path d={`M${leftMargin} 26.496L${24 + leftMargin} 48L${48 + leftMargin} 26.496C${42.2022 + leftMargin} 19.968 ${33.7079 + leftMargin} 16 ${24 + leftMargin} 16C${14.427 + leftMargin} 16 ${5.7978 + leftMargin} 19.968 ${leftMargin} 26.496Z`} style={shapeStyle} />
            <text x={20 + leftMargin} y="38" style={{ fill: 'white'}}>{ note.pitch }</text>
          </>
        )}
        {/* {(note.isSelected && !note.isSelectedMelody && !note.isBass) && (<text x={`${leftMargin + rightTextLeftMargin}`} y="36" style={{ fontSize: '14px' }}>&nbsp;✓</text>)} */}
        {note.isSelectedMelody && (<text x={`${leftMargin + rightTextLeftMargin}`} y="30" style={{ fontSize: '10px' }}>melody</text>) }
        {(note.isBass || note.isSelectedBass) && (<text x={`${leftMargin + rightTextLeftMargin}`} y="46" style={{ fontSize: '10px', fill: note.isSelectedBass ? 'green' : 'black' }}>bass{!note.isSelectedBass && '*'}</text>) }
        {(note.isSelectedBass) && (<text x={`${leftMargin + rightTextLeftMargin + 20}`} y="46" style={{ fontSize: '14px', fill: 'green' }}>&nbsp;✓</text>)}
      </svg>
    </div>
  );
}
