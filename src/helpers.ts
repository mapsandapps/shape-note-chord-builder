export enum Mode {
  major = 'major',
  minor = 'minor',
}

export enum Syllable {
  fa = 'fa',
  sol = 'sol',
  la = 'la',
  mi = 'mi',
}

export enum Shape {
  triangle = '◺',
  circle = '○︎',
  rectangle = '▭',
  diamond = '◇',
}

export type Chord = {
  name: string;
  nameWithInversion: string;
  rootPitch: number;
  inversion?: number;
  notes: Array<Note>;
};

export type Note = {
  pitch: number;
  isMelody?: boolean;
  isBass?: boolean;
} | null;

export const getSyllable = (pitch: number, mode: Mode = Mode.major): Syllable => {
  if (mode === Mode.major) {
    if (pitch === 1 || pitch === 4) return Syllable.fa;
    else if (pitch === 2 || pitch === 5) return Syllable.sol;
    else if (pitch === 3 || pitch === 6) return Syllable.la;
    else return Syllable.mi;
  } else {
    if (pitch === 1 || pitch === 5) return Syllable.la;
    else if (pitch === 2) return Syllable.mi;
    else if (pitch === 3 || pitch === 6) return Syllable.fa;
    else return Syllable.sol;
  }
};

export const getShape = (syllable: Syllable): Shape => {
  if (syllable === Syllable.fa) return Shape.triangle;
  else if (syllable === Syllable.sol) return Shape.circle;
  else if (syllable === Syllable.la) return Shape.rectangle;
  else return Shape.diamond;
};

const getSortedChords = (mode: Mode, melody: Note, bass: Note, others: Array<Note>) => {
  if (melody) {
    // use Rob Kelley's guide

  } else {
    // use Aldo's guide

  }
}

export const filterChords = (mode: Mode, melody: Note, bass: Note, others: Array<Note>) => {

}
