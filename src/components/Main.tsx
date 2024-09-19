import { useEffect, useState } from 'react';
import { Chord as ChordType, ChordNotation, Mode, PopularChords, Settings as SettingsType, ShapeSystem } from '../types';
import { filterChords } from '../helpers';
import Chord from '../components/Chord';
import PitchPicker from '../components/PitchPicker';
import Settings from '../components/Settings';

const defaultSettings: SettingsType = {
  chordNotation: ChordNotation.auto,
  keyName: null,
  mode: Mode.major,
  shapeSystem: ShapeSystem.four
}

export default function Main() {
  const getStoredSettings = () => { return localStorage.getItem('settings') }
  const storedSettings = getStoredSettings()

  const [settings, setSettings] = useState<SettingsType>(storedSettings ? JSON.parse(storedSettings) : defaultSettings);
  const [melody, setMelody] = useState<number | null>(null);
  const [bass, setBass] = useState<number | null>(null);
  const [isFootnoteShowing, setFootnoteShowing] = useState<boolean>(false);
  const [anyNotes, setAnyNotes] = useState<Array<number | null>>([null, null, null]);

  // FIXME: not sure if i need useEffect here?
  const { keyName, mode, shapeSystem } = settings;

  const [chords, setChords] = useState<PopularChords>(filterChords(mode, melody, bass, anyNotes));

  // store settings in localstorage
  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    setChords(filterChords(mode, melody, bass, anyNotes))
    // TODO: may need key, shapeSystem here?
  }, [anyNotes, bass, melody, mode])

  const getSelectedBassDiffersFromSuggested = (chord: ChordType): boolean => {
    const suggestedBassIndex = chord.notes.findIndex((note) => {
      return note?.isBass
    })
    const selectedBassIndex = chord.notes.findIndex((note) => {
      return note?.isSelectedBass
    })

    return suggestedBassIndex != selectedBassIndex
  }

  useEffect(() => {
    setFootnoteShowing(false)

    chords.mostCommon.map(chord => {
      if (getSelectedBassDiffersFromSuggested(chord)) {
        setFootnoteShowing(true)
      }
    })
    chords.lessCommon.map(chord => {
      if (getSelectedBassDiffersFromSuggested(chord)) {
        setFootnoteShowing(true)
      }
    })
    chords.other.map(chord => {
      if (getSelectedBassDiffersFromSuggested(chord)) {
        setFootnoteShowing(true)
      }
    })
  }, [chords])

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
      <Settings
        settings={settings}
        setSettings={setSettings}
      />
      <br />
      Select the notes in your chord or melody:
      <table>
        <tbody>
          <tr>
            <td>Melody:</td>
            <td>
              {/* @ts-ignore */}
              <PitchPicker key={`melody${melody}`} mode={mode} keyName={keyName} selectedPitch={melody} shapeSystem={shapeSystem} onChange={(e) => setMelody(Number(e.target.value))} />
            </td>
          </tr>
          <tr>
            <td>Any:</td>
            <td>
              {/* @ts-ignore */}
              <PitchPicker key={`anyNotes0${anyNotes[0]}`} mode={mode} keyName={keyName} selectedPitch={anyNotes[0]} shapeSystem={shapeSystem} onChange={(e) => onSelectNote(e, 0)} />
            </td>
          </tr>
          <tr>
            <td>Any:</td>
            <td>
              {/* @ts-ignore */}
              <PitchPicker key={`anyNotes1${anyNotes[1]}`} mode={mode} keyName={keyName} selectedPitch={anyNotes[1]} shapeSystem={shapeSystem} onChange={(e) => onSelectNote(e, 1)} />
            </td>
          </tr>
          <tr>
            <td>Any:</td>
            <td>
              {/* @ts-ignore */}
              <PitchPicker key={`anyNotes2${anyNotes[2]}`} mode={mode} keyName={keyName} selectedPitch={anyNotes[2]} shapeSystem={shapeSystem} onChange={(e) => onSelectNote(e, 2)} />
            </td>
          </tr>
          <tr>
            <td>Bass:</td>
            <td>
              {/* @ts-ignore */}
              <PitchPicker key={`bass${bass}`} mode={mode} keyName={keyName} selectedPitch={bass} shapeSystem={shapeSystem} onChange={(e) => setBass(Number(e.target.value))} />
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

      <div>Note: once you select a melody or bass note, some chord inversions will be shown.</div>

      {chords.mostCommon.length > 0 && (
        <h2>Most common:</h2>
      )}

      {chords.mostCommon.map((chord) => (
        // note: the 'key' prop here is the react key, not the musical key
        <Chord 
          key={chord.fullName}
          chord={chord}
          mode={mode} 
          keyName={keyName}
          settings={settings}
          shapeSystem={shapeSystem}
        />
      ))}

      {chords.lessCommon.length > 0 && (
        <h2>Less common:</h2>
      )}

      {chords.lessCommon.map((chord) => (
        // note: the 'key' prop here is the react key, not the musical key
        <Chord 
          key={chord.fullName}
          chord={chord}
          mode={mode} 
          keyName={keyName}
          settings={settings}
          shapeSystem={shapeSystem}
        />
      ))}

      {chords.mostCommon.length === 0 && chords.lessCommon.length === 0 && (
        <p className="warning">⚠️ No recommended chords found</p>
      )}

      {chords.other.length > 0 && (
        <h2>Other chords:</h2>
      )}

      {chords.other.map((chord) => (
        // note: the 'key' prop here is the react key, not the musical key
        <Chord 
          key={chord.fullName}
          chord={chord}
          mode={mode} 
          keyName={keyName}
          settings={settings}
          shapeSystem={shapeSystem}
        />
      ))}

      {isFootnoteShowing && !!bass && (
        <div className="footnote">* This is the suggested bass note for the chord inversion, which differs from your selected bass note.</div>
      )}

      {isFootnoteShowing && !bass && (
        <div className="footnote">* Suggested bass note</div>
      )}
    </>
  );
}
