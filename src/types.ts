export enum Mode {
  major = 'major',
  minor = 'minor',
}

export enum Syllable {
  do = 'do',
  re = 're',
  fa = 'fa',
  sol = 'sol',
  la = 'la',
  mi = 'mi',
  ti = 'ti'
}

export enum Shape {
  triangle = '◺',
  circle = '○︎',
  rectangle = '▭',
  diamond = '◇',
  do = '△',
  semiCircle = 'semi-circle',
  baseballDiamond = 'baseball-diamond'
}

export enum ShapeSystem {
  four = '4-shapes',
  seven = '7-shapes (Aikin)' 
}

export type Chord = {
  fullName: string;
  name: string;
  rootPitch: number;
  inversion: number;
  notes: Array<Note>;
};

export type Note = {
  pitch: number;
  isBass?: boolean;
  isSelected?: boolean;
  isSelectedBass?: boolean;
  isSelectedMelody?: boolean;
} | null;

export type PopularChords = {
  mostCommon: Array<Chord>;
  lessCommon: Array<Chord>;
  other: Array<Chord>;
}

export type Settings = {
  chordNotation: ChordNotation;
  keyName: string | null;
  mode: Mode;
  shapeSystem: ShapeSystem;
  volume: number;
  shouldPlayKey: boolean;
}

export enum ChordNotation {
  auto = 'Auto',
  guitar = 'Guitar',
  inversion = 'Inversion',
  figuredBass = 'Figured bass'
}
