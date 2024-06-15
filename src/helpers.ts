import { getPopularChords } from './chord-data';

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

// export enum Key {
//   a = 'A',
//   bFlat = 'B♭',
//   b = 'B',
//   c = 'C',
//   cSharp = 'C♯',
//   dFlat = 'D♭',
//   d = 'D',
//   eFlat = 'E♭',
//   e = 'E',
//   f = 'F',
//   fSharp = 'F♯',
//   g = 'G',
//   aFlat = 'A♭'
// }

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
