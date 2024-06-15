import { getPopularChords } from './chord-data';

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
  four = '4-shape',
  seven = '7-shape (Aikin)' 
}

export type Chord = {
  name: string;
  rootPitch: number;
  inversion?: number | null;
  notes: Array<Note>;
};

export type Note = {
  pitch: number;
  isMelody?: boolean;
  isBass?: boolean;
} | null;

export type PopularChords = {
  mostCommon: Array<Chord>
  lessCommon: Array<Chord>
}

export const getSyllable = (pitch: number, mode: Mode = Mode.major, shapeSystem: ShapeSystem): Syllable => {
  if (shapeSystem === ShapeSystem.seven) {
    if (mode === Mode.major) {
      if (pitch === 1) return Syllable.do;
      if (pitch === 2) return Syllable.re;
      if (pitch === 3) return Syllable.mi;
      if (pitch === 4) return Syllable.fa;
      if (pitch === 5) return Syllable.sol;
      if (pitch === 6) return Syllable.la;
      if (pitch === 7) return Syllable.ti;
    } else {
      if (pitch === 1) return Syllable.la;
      if (pitch === 2) return Syllable.ti;
      if (pitch === 3) return Syllable.do;
      if (pitch === 4) return Syllable.re;
      if (pitch === 5) return Syllable.mi;
      if (pitch === 6) return Syllable.fa;
      if (pitch === 7) return Syllable.sol;
    }
  }
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
  else if (syllable === Syllable.do) return Shape.do;
  else if (syllable === Syllable.re) return Shape.semiCircle;
  else if (syllable === Syllable.ti) return Shape.baseballDiamond;
  else return Shape.diamond;
};

const setMelodyOnNote = (note: Note, melody: number | null): boolean => {
  if (note?.pitch === melody) {
    note.isMelody = true
  }
  return note?.pitch === melody
}

const resetMelodyOnNotes = (chords: Array<Chord>) => {
  chords.forEach(chord => {
    chord.notes.forEach((note: Note) => {
      note!.isMelody = false;
    })
  })
}

export const filterChords = (mode: Mode, melody: number | null, bass: number | null, others: Array<number | null>): PopularChords => {
  const hasOthers = Boolean(others.some(() => {}))
  let chords = getPopularChords(mode, melody, Boolean(melody || bass || hasOthers))

  resetMelodyOnNotes(chords.mostCommon)
  resetMelodyOnNotes(chords.lessCommon)

  // TODO: DRY
  if (bass) {
    chords.mostCommon = chords.mostCommon.filter((chord) => chord.notes.find((note) => note?.isBass && note.pitch === bass))
    chords.lessCommon = chords.lessCommon.filter((chord) => chord.notes.find((note) => note?.isBass && note.pitch === bass))
  }

  if (melody) {
    chords.mostCommon = chords.mostCommon.filter((chord) => chord.notes.find((note) =>  setMelodyOnNote(note, melody)))
    chords.lessCommon = chords.lessCommon.filter((chord) => chord.notes.find((note) =>  setMelodyOnNote(note, melody)))
  }

  others.forEach(otherNote => {
    if (otherNote) {
      chords.mostCommon = chords.mostCommon.filter((chord) => chord.notes.find((note) =>  note?.pitch === otherNote))
      chords.lessCommon = chords.lessCommon.filter((chord) => chord.notes.find((note) =>  note?.pitch === otherNote))
    }
  });

  return chords
}
