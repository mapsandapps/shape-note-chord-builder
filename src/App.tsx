import { useState } from 'react';
import { Mode } from './helpers';
import { majorChords } from './chord-data';
import Chord from './Chord';
import PitchPicker from './PitchPicker';
import './App.css';

function App() {
  const [mode, setMode] = useState<Mode>(Mode.major);

  const onSelectMelody = (pitch: number) => {
    console.log(`melody: ${pitch}`);
  };

  // TODO: useEffect hook to find notes in chord

  return (
    <>
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
              <PitchPicker mode={mode} />
            </td>
          </tr>
          <tr>
            <td>Any:</td>
            <td>
              <PitchPicker mode={mode} />
            </td>
          </tr>
          <tr>
            <td>Any:</td>
            <td>
              <PitchPicker mode={mode} />
            </td>
          </tr>
          <tr>
            <td>Bass:</td>
            <td>
              <PitchPicker mode={mode} />
            </td>
          </tr>
        </tbody>
      </table>

      {majorChords.map((chord) => (
        <Chord chord={chord} mode={mode} key={chord.name} />
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
