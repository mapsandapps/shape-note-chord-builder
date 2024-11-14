import * as Tone from "tone";

import { getPopularChords } from './chord-data';
import { getNoteName } from './keys';
import { Chord, Mode, Note, PopularChords, Shape, ShapeSystem, Syllable } from './types';

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

// NOTE: if there's no key, default to F major or minor
const getPlaybackNotes = (notesToPlay: Note[], keyName: string = 'F', mode: Mode): string[] => {
  // on a piano, playing with two hands, the most standard way to do an inversion is to play the bass note with the left hand and then play the full chord on the right hand, not inverted

  // if there's no bass note, put the notes in the existing chord order

  // if there is a bass note, put it in a lower octave and then put all notes (including the bass note) in their existing order an octave up

  const notes = notesToPlay.filter(note => {
    // a missing note (e.g. in a chord with no 3) can be included here. remove it for playback.
    return note?.pitch
  })

  if (notes.length === 0) return []

  const playbackNotes: string[] = []
  let lastNotePitch = 0
  let lastNoteOctave = 4

  // add the left-hand (bass) note, if there is one
  const bassNoteIndex = notes.findIndex(note => { return note?.isBass })

  if (bassNoteIndex > -1) {
    const note = notes[bassNoteIndex]!
    // put the bass note in the octave below middle C
    playbackNotes.push(`${getNoteName(mode, keyName, note.pitch, true)}3`)
    // don't remove the base note from notes: we want it repeated in the next octave
  }

  // add the right-hand notes
  while (notes.length > 0) {
    // put any non-bass notes in octaves 4+
    const nextNotePitch = notes[0]!.pitch

    if (nextNotePitch >= lastNotePitch) {
      playbackNotes.push(`${getNoteName(mode, keyName, nextNotePitch, true)}${lastNoteOctave}`)
    } else {
      // if the next note pitch is less than the last note pitch (e.g. last note 7 and next note 1)
      // put it in the next octave
      playbackNotes.push(`${getNoteName(mode, keyName, nextNotePitch, true)}${lastNoteOctave + 1}`)
      lastNoteOctave ++
    }
    lastNotePitch = nextNotePitch

    notes.shift()
  }

  return playbackNotes
}

var synth: Tone.PolySynth<Tone.Synth<Tone.SynthOptions>> | undefined

const createSynthIfNeeded = () => {
  if (!synth) {
    // don't create the synth until the user has interacted with the page
    synth = new Tone.PolySynth().toDestination()
  }
}

export const playChord = (notes: Note[], keyName: string | null, mode: Mode) => {
  createSynthIfNeeded()

  if (notes.length < 1) {
    console.warn('No notes selected to play')
    return
  }

  const playbackNotes = getPlaybackNotes(notes, keyName || undefined, mode)
  
  synth.triggerAttackRelease(playbackNotes, 1, Tone.now(), 1)
}

export const setVolume = (volume: number = -10, shouldPlayAudio: boolean) => {
  createSynthIfNeeded()

  // @ts-ignore
  synth.volume.value = volume

  if (shouldPlayAudio) {
    synth.releaseAll()
    synth.triggerAttackRelease("C4", 0.2)
  }
}
