import { Dispatch, SetStateAction } from 'react';
import { Mode, Settings as SettingsType, ShapeSystem } from '../helpers';
import { getKeyOptions } from '../keys';
import './Settings.css';

interface SettingsProps {
  settings: SettingsType;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
}

export default function Settings(props: SettingsProps) {
  const { settings, setSettings } = props;
  const { keyName, mode, shapeSystem } = settings;

  return (
    <>
      <fieldset>
        <legend>Mode:</legend>

        <label>
          <select onChange={(e) => setSettings({ ...settings, keyName: e.target.value })} value={keyName || undefined}>
          <option value="null">--Key (optional)--</option>
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
              <input type="radio" checked={mode === Mode[k]} onChange={() => setSettings({ ...settings, mode: Mode[k]})} />
              { Mode[k] }
            </label>
          )
        })}
        </fieldset>

        <fieldset>
        <legend>Shapes:</legend>

        {(Object.keys(ShapeSystem) as Array<keyof typeof ShapeSystem>).map(k => {
          return (
            <label key={k}>
              <input type="radio" checked={shapeSystem === ShapeSystem[k]} onChange={() => setSettings({ ...settings, shapeSystem: ShapeSystem[k] })} />{ ShapeSystem[k] }
            </label>
          )
        })}

      </fieldset>
    </>
  );
}
