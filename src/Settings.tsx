import { Dispatch, SetStateAction } from 'react';
import { Mode, ShapeSystem } from './helpers';
import { getKeyOptions } from './keys';

interface SettingsProps {
  keyName: string | null;
  setKeyName: Dispatch<SetStateAction<string | null>>;
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
  shapeSystem: ShapeSystem;
  setShapeSystem: Dispatch<SetStateAction<ShapeSystem>>;
}

export default function Settings(props: SettingsProps) {
  const { keyName, mode, setKeyName, setMode, shapeSystem, setShapeSystem } = props;

  return (
    <>
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
            <input type="radio" checked={mode === Mode.major} onChange={() => setMode(Mode.major)} />
            Major
        </label>

        <label>
            <input type="radio" checked={mode === Mode.minor} onChange={() => setMode(Mode.minor)} />
            Minor
        </label>
        </fieldset>

        <fieldset>
        <legend>Shapes:</legend>

        <label>
            <input type="radio" checked={shapeSystem === ShapeSystem.four} onChange={() => setShapeSystem(ShapeSystem.four)} />4 shapes
        </label>

        <label>
            <input type="radio" checked={shapeSystem === ShapeSystem.seven} onChange={() => setShapeSystem(ShapeSystem.seven)} />7 shapes (Aikin)
        </label>
        </fieldset>
    </>
  );
}
