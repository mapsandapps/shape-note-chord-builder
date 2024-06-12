import { Chord } from './helpers';

export const getMajorKeyChordsByPopularity = (pitch: number): Array<Chord> => {
  // TODO: add isBass & isMelody here
  return []
}

// both major & minor
const chordPitches = {
  'I': [1, 3, 5],
  'i': [1, 3, 5],
  'ii': [2, 4, 6],
  'ii°': [2, 4, 6],
  'III': [3, 5, 7],
  'iii': [3, 5, 7],
  'IV': [4, 6, 1],
  'iv': [4, 6, 1],
  'V': [5, 7, 2],
  'v': [5, 7, 2],
  'vi': [6, 1, 3],
  'VII': [7, 2, 4]
}

const getInversion = (chordComposition: string): number => {
  if (chordComposition === '53' || chordComposition === '5' || chordComposition === '3') return 0
  else if (chordComposition === '63' || chordComposition === '6') return 1
  else if (chordComposition === '64' || chordComposition === '4') return 2
  else console.log('inversion string error')
  return 0
}

const getChordNameNoInversions = (chord: string, hasThird: boolean, hasFifth: boolean) => {
  if (hasThird && !hasFifth) {
    return `${chord} (no 5)`
  } else if (hasFifth && !hasThird) {
    return `${chord} (no 3)`
  }
  return chord
}

export const getChordFromChordName = (chordName: string): Chord => {
  const chord: string = chordName.match(/[iIvV°]+/)![0]; // e.g. 'I', 'iii'
  const chordComposition = chordName.match(/[3456]+/)![0]; // e.g. '53', '64'
  const inversion = getInversion(chordComposition);

  const hasThird = !(chordComposition === '5' || chordComposition === '4')
  const hasFifth = !(chordComposition === '3' || chordComposition === '6')

  const name = getChordNameNoInversions(chord, hasThird, hasFifth);

  // @ts-ignore
  const pitches: Array<number> = chordPitches[chord]

  if (!pitches) console.log('pitch error')
  
  return {
    name,
    nameWithInversion: chordName,
    rootPitch: pitches[0],
    inversion,
    notes: [
      {
        pitch: pitches[0],
        isBass: inversion === 0
      }, {
        pitch: hasThird ? pitches[1] : 0,
        isBass: inversion === 1
      }, {
        pitch: hasFifth ? pitches[2] : 0,
        isBass: inversion === 2
      }
    ]
  }

}

const allMajorChordNames = ['I5', 'I53', 'I63', 'I64', 'ii3', 'ii53', 'ii63', 'iii53', 'iii3', 'IV53', 'IV64', 'V5', 'V53', 'vi53', 'vi63'];
const allMinorChordNames = ['i5', 'i53', 'i3', 'ii°53', 'III53', 'iv5', 'iv53', 'iv4', 'iv63', 'v5', 'v53', 'VII5', 'VII53'];

const majorKeyChordsByPopularity = {
  // source: Aldo's guide
  // i can't find a link to this document
  // Sacred Harp Tunewriting Workshop.
  // Aldo Thomas Ceresa; Camp Fasola, 2019.
  'Most common': ['I5', 'I53', 'I63', 'I64', 'vi53', 'vi63', 'V5', 'V53'],
  'Less common': ['ii3', 'ii53', 'ii63', 'IV53', 'IV64'],
  'Rarely used': ['iii53', 'iii3']
}

const minorKeyChordsByPopularity = {
  // source: Aldo's guide
  // i can't find a link to this document
  // Sacred Harp Tunewriting Workshop.
  // Aldo Thomas Ceresa; Camp Fasola, 2019.
  'Most common': ['i', 'VII', 'III', 'v'],
  'Less common': ['iv'],
  'Rarely used': ['ii']
}

const minorKeyChordsByPopularityBasedOnMelody = {
  // source: Rob Kelley
  // https://robertkelleyphd.com/home/ShapeNoteMusic/ACorpusBasedModelOfHarmonicFunctionInShapeNoteHymnodyPaper.pdf
  1: {
    preferred: ['i5'],
    alternate: ['iv5', 'iv4']
  },
  2: {
    preferred: ['v5'],
    alternate: ['VII53']
  },
  3: {
    preferred: ['i53'],
    alternate: ['III53']
  },
  4: {
    preferred: ['VII3', 'VII53'],
    alternate: ['iv4']
  },
  5: {
    preferred: ['i5', 'i53'],
    alternate: ['III53']
  },
  6: {
    preferred: ['iv53'],
    alternate: ['iv63', 'ii°53']
  },
  7: {
    preferred: ['III53'],
    alternate: ['v53', 'VII5']
  },
}

const majorKeyChordsByPopularityBasedOnMelody = {
  // source: Rob Kelley
  // https://robertkelleyphd.com/home/ShapeNoteMusic/ACorpusBasedModelOfHarmonicFunctionInShapeNoteHymnodyPaper.pdf
  1: {
    preferred: ['I5', 'I53', 'I64'],
    alternate: ['vi53', 'vi63']
  },
  2: {
    preferred: ['V5'],
    alternate: ['ii3', 'ii53'],
  },
  3: {
    preferred: ['I53', 'I63', 'I64'],
    alternate: ['vi53']
  },
  4: {
    preferred: ['ii3', 'ii53'],
    alternate: ['IV64', 'IV53']
  },
  5: {
    preferred: ['I5', 'I53', 'I63', 'I64'],
    alternate: ['V5', 'iii3', 'iii53']
  },
  6: {
    preferred: ['vi53', 'vi63'],
    alternate: ['ii53', 'ii63']
  },
  7: {
    preferred: ['V53'],
    alternate: ['iii63', 'iii53']
  }
}

// TODO: maybe compute these??
// TODO: delete this?
export const majorChords: Array<Chord> = allMajorChordNames.map(chord => getChordFromChordName(chord))
export const minorChords: Array<Chord> = allMinorChordNames.map(chord => getChordFromChordName(chord))
