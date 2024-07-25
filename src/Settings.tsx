import { Dispatch, SetStateAction } from 'react';
import { Mode, Settings as SettingsType, ShapeSystem } from './helpers';
import { getKeyOptions } from './keys';

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

        <label>
          <input type="radio" checked={mode === Mode.major} onChange={() => setSettings({ ...settings, mode: Mode.major })} />
          Major
        </label>

        <label>
          <input type="radio" checked={mode === Mode.minor} onChange={() => setSettings({ ...settings, mode: Mode.minor })} />
          Minor
        </label>
        </fieldset>

        <fieldset>
        <legend>Shapes:</legend>

        <label>
          <input type="radio" checked={shapeSystem === ShapeSystem.four} onChange={() => setSettings({ ...settings, shapeSystem: ShapeSystem.four })} />4 shapes
        </label>

        <label>
          <input type="radio" checked={shapeSystem === ShapeSystem.seven} onChange={() => setSettings({ ...settings, shapeSystem: ShapeSystem.seven })} />7 shapes (Aikin)
        </label>
      </fieldset>
    </>
  );
}
