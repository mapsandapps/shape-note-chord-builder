import { useEffect, useState } from 'react';
import { Mode, PopularChords, filterChords } from './helpers';
import Chord from './Chord';
import PitchPicker from './PitchPicker';
import './App.css';

function App() {
  const [mode, setMode] = useState<Mode>(Mode.major);
  const [melody, setMelody] = useState<number | null>(null);
  const [bass, setBass] = useState<number | null>(null);
  const [anyNotes, setAnyNotes] = useState<Array<number | null>>([null, null, null]);

  const [chords, setChords] = useState<PopularChords>(filterChords(mode, melody, bass, anyNotes));

  useEffect(() => {
    setChords(filterChords(mode, melody, bass, anyNotes))
  }, [anyNotes, bass, melody, mode])

  const onSelectNote = (e: React.ChangeEventHandler<HTMLSelectElement> | undefined, index: number) => {
    const notes = [ ...anyNotes ]
    notes[index] = Number(e.target.value) || null;
    setAnyNotes(notes);
    console.log(notes);
  };

  // TODO: useEffect hook to find notes in chord

  return (
    <>
      <h1>Shape Note Chord Builder</h1>
      <fieldset>
        <legend>Mode:</legend>

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
              <PitchPicker mode={mode} selectedNote={melody} onChange={(e) => setMelody(Number(e.target.value))} />
            </td>
          </tr>
          <tr>
            <td>Any:</td>
            <td>
              <PitchPicker mode={mode} selectedNote={anyNotes[0]} onChange={(e) => onSelectNote(e, 0)} />
            </td>
          </tr>
          <tr>
            <td>Any:</td>
            <td>
              <PitchPicker mode={mode} selectedNote={anyNotes[1]} onChange={(e) => onSelectNote(e, 1)} />
            </td>
          </tr>
          <tr>
            <td>Any:</td>
            <td>
              <PitchPicker mode={mode} selectedNote={anyNotes[2]} onChange={(e) => onSelectNote(e, 2)} />
            </td>
          </tr>
          <tr>
            <td>Bass:</td>
            <td>
              <PitchPicker mode={mode} selectedNote={bass} onChange={(e) => setBass(Number(e.target.value))} />
            </td>
          </tr>
        </tbody>
      </table>

      <div>Note: if you pick a melody note, the chords will (eventually) be sorted by commonality based on the melody note.</div>

      {chords.mostCommon.length > 0 && (
        <h2>Most common:</h2>
      )}

      {/* TODO: set display name to chord.nameWithInversion or chord.name depending on current filter */}
      {/* might not be needed now? */}
      {chords.mostCommon.map((chord) => (
        <Chord 
          chord={chord} 
          displayName={bass ? chord.nameWithInversion : chord.name}
          mode={mode} 
          key={chord.nameWithInversion} 
        />
      ))}

      {chords.lessCommon.length > 0 && (
        <h2>Less common:</h2>
      )}

      {/* TODO: set display name to chord.nameWithInversion or chord.name depending on current filter */}
      {/* might not be needed now? */}
      {chords.lessCommon.map((chord) => (
        <Chord 
          chord={chord} 
          displayName={bass ? chord.nameWithInversion : chord.name}
          mode={mode} 
          key={chord.nameWithInversion} 
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
