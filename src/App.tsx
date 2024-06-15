import { useEffect, useState } from 'react';
import { Mode, PopularChords, filterChords } from './helpers';
import { getKeyOptions } from './keys';
import Chord from './Chord';
import PitchPicker from './PitchPicker';
import './App.css';

function App() {
  const [keyName, setKeyName] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>(Mode.major);
  const [melody, setMelody] = useState<number | null>(null);
  const [bass, setBass] = useState<number | null>(null);
  const [anyNotes, setAnyNotes] = useState<Array<number | null>>([null, null, null]);

  const [chords, setChords] = useState<PopularChords>(filterChords(mode, melody, bass, anyNotes));

  useEffect(() => {
    setChords(filterChords(mode, melody, bass, anyNotes))
    // TODO: may need key here?
  }, [anyNotes, bass, melody, mode])

  const onSelectNote = (e: React.ChangeEventHandler<HTMLSelectElement> | undefined, index: number) => {
    const notes = [ ...anyNotes ]
    // @ts-ignore
    notes[index] = Number(e.target.value) || null;
    setAnyNotes(notes);
  };

  const reset = () => {
    setMelody(null)
    setBass(null)
    setAnyNotes([null, null, null])
  }

  return (
    <>
      <h1>Shape Note Chord Builder</h1>
      <fieldset>
        <legend>Mode:</legend>

        <label>
          <select onChange={(e) => setKeyName(e.target.value)} value={keyName || undefined}>
            <option value="null">--Key (optional)--</option>
            {getKeyOptions(mode).map((key) => (
              <option value={key} key={key}>
                { key }
              </option>
            ))}
          </select>
        </label>

        <label>
          <input type="radio" checked={mode === 'major'} onChange={() => setMode(Mode.major)} />
          Major
        </label>

        <label>
          <input type="radio" checked={mode === 'minor'} onChange={() => setMode(Mode.minor)} />
          Minor
        </label>
      </fieldset>
      <table>
        <tbody>
          <tr>
            <td>Melody:</td>
            <td>
              {/* @ts-ignore */}
              <PitchPicker key={`melody${melody}`} mode={mode} keyName={keyName} selectedPitch={melody} onChange={(e) => setMelody(Number(e.target.value))} />
            </td>
          </tr>
          <tr>
            <td>Any:</td>
            <td>
              {/* @ts-ignore */}
              <PitchPicker key={`anyNotes0${anyNotes[0]}`} mode={mode} keyName={keyName} selectedPitch={anyNotes[0]} onChange={(e) => onSelectNote(e, 0)} />
            </td>
          </tr>
          <tr>
            <td>Any:</td>
            <td>
              {/* @ts-ignore */}
              <PitchPicker key={`anyNotes1${anyNotes[1]}`} mode={mode} keyName={keyName} selectedPitch={anyNotes[1]} onChange={(e) => onSelectNote(e, 1)} />
            </td>
          </tr>
          <tr>
            <td>Any:</td>
            <td>
              {/* @ts-ignore */}
              <PitchPicker key={`anyNotes2${anyNotes[2]}`} mode={mode} keyName={keyName} selectedPitch={anyNotes[2]} onChange={(e) => onSelectNote(e, 2)} />
            </td>
          </tr>
          <tr>
            <td>Bass:</td>
            <td>
              {/* @ts-ignore */}
              <PitchPicker key={`bass${bass}`} mode={mode} keyName={keyName} selectedPitch={bass} onChange={(e) => setBass(Number(e.target.value))} />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button onClick={reset}>Reset</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div>Note: once you select a note, some chord inversions will be shown.</div>

      {chords.mostCommon.length > 0 && (
        <h2>Most common:</h2>
      )}

      {chords.mostCommon.map((chord) => (
        <Chord 
          chord={chord}
          mode={mode} 
          key={chord.name} 
          keyName={keyName}
        />
      ))}

      {chords.lessCommon.length > 0 && (
        <h2>Less common:</h2>
      )}

      {chords.lessCommon.map((chord) => (
        <Chord 
          chord={chord}
          mode={mode} 
          key={chord.name} 
          keyName={keyName}
        />
      ))}

      {/* <fieldset disabled>
        <legend>Shapes:</legend>

        <label>
          <input type="radio" checked />4
        </label>

        <label>
          <input type="radio" />7 (coming eventually?)
        </label>
      </fieldset> */}
    </>
  );
}

export default App;
