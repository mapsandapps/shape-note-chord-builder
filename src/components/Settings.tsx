import { Dispatch, SetStateAction } from 'react';
import { setVolume } from '../helpers';
import { getKeyOptions } from '../keys';
import { ChordNotation, Mode, Settings as SettingsType, ShapeSystem } from '../types';
import './Settings.css';

interface SettingsProps {
  settings: SettingsType;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
}

export default function Settings(props: SettingsProps) {
  const { settings, setSettings } = props;
  const { chordNotation, keyName, mode, shapeSystem, shouldPlayKey, volume } = settings;

  const onVolumeSlide = (e: any) => {
    if (!e.target?.value) return

    // store volume in `settings` so it'll get stored in localstorage
    setSetting('volume', e.target.value)
    setVolume(Number(e.target.value), true)
  }

  const onTogglePlayKey = (e: any) => {
    setSetting('shouldPlayKey', e.target.checked)
  }

  const setSetting = (key: string, value: any) => {
    setSettings({
      ...settings,
      [key]: value
    })
  }

  return (
    <>
      <fieldset>
        <legend>Mode:</legend>

        <label>
          <select onChange={(e) => setSetting('keyName', e.target.value === 'none' ? null : e.target.value)} value={keyName || undefined}>
          <option value="none">--Key (optional)--</option>
          {getKeyOptions(mode).map((key) => (
              <option value={key} key={key}>
              { key }
              </option>
          ))}
          </select>
        </label>

        {(Object.keys(Mode) as Array<keyof typeof Mode>).map(k => {
          return (
            <label className="mode" key={k}>
              <input type="radio" checked={mode === Mode[k]} onChange={() => setSetting('mode', Mode[k])} />
              { Mode[k] }
            </label>
          )
        })}
      </fieldset>

      <details>
        <summary>Advanced settings</summary>

        <fieldset>
          <legend>Shapes:</legend>

          {(Object.keys(ShapeSystem) as Array<keyof typeof ShapeSystem>).map(k => {
            return (
              <label key={k}>
                <input type="radio" checked={shapeSystem === ShapeSystem[k]} onChange={() => setSetting('shapeSystem', ShapeSystem[k])} />{ ShapeSystem[k] }
              </label>
            )
          })}
        </fieldset>

      <fieldset>
        <legend>Chord notation:</legend>

        {(Object.keys(ChordNotation) as Array<keyof typeof ChordNotation>).map(k => {
          return (
            <label className="mode" key={k}>
              <input type="radio" checked={chordNotation === ChordNotation[k]} onChange={() => setSetting('chordNotation', ChordNotation[k])} />
              { ChordNotation[k] }
            </label>
          )
        })}
        </fieldset>

        <fieldset>
          <legend>Volume:</legend>

          <input type="range" min="-50" max="5" step="1" defaultValue={volume} onMouseUp={onVolumeSlide} />
        </fieldset>

        <fieldset>
          <legend>Play key first when playing chords?:</legend>

          <input type="checkbox" defaultChecked={shouldPlayKey} onClick={onTogglePlayKey} />
        </fieldset>
      </details>
    </>
  );
}
