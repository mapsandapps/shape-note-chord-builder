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
}

export enum ChordNotation {
  auto = 'Auto',
  guitar = 'Guitar',
  inversion = 'Inversion',
  figuredBass = 'Figured bass'
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

const setBassOnNote = (note: Note, bass: number | null): boolean => {
  if (note?.pitch === bass) {
    note.isSelected = true // NOTE: where was this happening before?
    note.isSelectedBass = true
  }
  // i think this was only supposed to return true if the selected bass note is the bass note of the chord
  return (note?.isBass && note?.pitch === bass) || false
}

const setMelodyOnNote = (note: Note, melody: number | null): boolean => {
  if (note?.pitch === melody) {
    note.isSelected = true
    note.isSelectedMelody = true
  }
  return note?.pitch === melody
}

const setSelectedOnNote = (note: Note, any: number | null): boolean => {
  if (note?.pitch === any) {
    note.isSelected = true
  }
  return note?.pitch === any
}

const resetNotes = (chords: Array<Chord>) => {
  chords.forEach(chord => {
    chord.notes.forEach((note: Note) => {
      note!.isSelected = false;
      note!.isSelectedBass = false;
      note!.isSelectedMelody = false;
    })
  })
}

const getInversionsWithBassNoteInWrongPlace = (chords: PopularChords, bass: number | null): Chord[] => {
  return [
    ...chords.mostCommon.filter((chord) => chord.notes.find((note) => note?.pitch === bass)),
    ...chords.lessCommon.filter((chord) => chord.notes.find((note) => note?.pitch === bass)),
    ...chords.other.filter((chord) => chord.notes.find((note) => note?.pitch === bass))
  ]
}

export const filterChords = (mode: Mode, melody: number | null, bass: number | null, others: Array<number | null>): PopularChords => {
  const hasOthers = Boolean(others.some(() => {}))
  let chords = getPopularChords(mode, melody, Boolean(melody || bass || hasOthers))

  resetNotes(chords.mostCommon)
  resetNotes(chords.lessCommon)
  resetNotes(chords.other)

  if (bass) {
    const extraBassChords = getInversionsWithBassNoteInWrongPlace(chords, bass)
    chords.mostCommon = chords.mostCommon.filter((chord) => chord.notes.find((note) => setBassOnNote(note, bass)))
    chords.lessCommon = chords.lessCommon.filter((chord) => chord.notes.find((note) => setBassOnNote(note, bass)))
    chords.other = chords.other.filter((chord) => chord.notes.find((note) => { return setBassOnNote(note, bass) }))
    // if there are no chords displayed, display chords where the bass isn't in the right spot
    if (chords.mostCommon.length + chords.lessCommon.length + chords.other.length === 0) {
      chords.other = extraBassChords
    }
  }

  if (melody) {
    chords.mostCommon = chords.mostCommon.filter((chord) => chord.notes.find((note) =>  setMelodyOnNote(note, melody)))
    chords.lessCommon = chords.lessCommon.filter((chord) => chord.notes.find((note) =>  setMelodyOnNote(note, melody)))
    chords.other = chords.other.filter((chord) => chord.notes.find((note) =>  setMelodyOnNote(note, melody)))
  }

  others.forEach(any => {
    if (any) {
      chords.mostCommon = chords.mostCommon.filter((chord) => chord.notes.find((note) =>  setSelectedOnNote(note, any)))
      chords.lessCommon = chords.lessCommon.filter((chord) => chord.notes.find((note) =>  setSelectedOnNote(note, any)))
      chords.other = chords.other.filter((chord) => chord.notes.find((note) =>  setSelectedOnNote(note, any)))
    }
  });

  return chords
}
