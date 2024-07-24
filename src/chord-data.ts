import { Chord, Mode, PopularChords } from './helpers';

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

const getInversion = (chordComposition: string): number | null => {
  if (chordComposition === '') return null
  if (chordComposition === '' || chordComposition === '53' || chordComposition === '5' || chordComposition === '3') return 0
  else if (chordComposition === '63' || chordComposition === '6') return 1
  else if (chordComposition === '64' || chordComposition === '4') return 2
  else console.log('inversion string error')
  return null
}

export const getChordFromChordName = (chordName: string): Chord => {
  const chord: string = chordName.match(/[iIvV°]+/)![0]; // e.g. 'I', 'iii'
  const chordComposition = chordName.match(/[3456]+/) ? chordName.match(/[3456]+/)![0] : ''; // e.g. '53', '64'
  const inversion = getInversion(chordComposition);

  const hasThird = !(chordComposition === '5' || chordComposition === '4')
  const hasFifth = !(chordComposition === '3' || chordComposition === '6')

  // @ts-ignore
  const pitches: Array<number> = chordPitches[chord]

  if (!pitches) console.log('pitch error')
  
  return {
    name: chordName,
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

const chordsByPopularityWithInversions = {
  // source: Aldo's guide
  // i can't find a link to this document
  // Sacred Harp Tunewriting Workshop.
  // Aldo Thomas Ceresa; Camp Fasola, 2019.
  major: {
    mostCommon: ['I5', 'I53', 'I63', 'I64', 'vi53', 'vi63', 'V5', 'V53'],
    lessCommon: ['ii3', 'ii53', 'ii63', 'IV53', 'IV64'],
    rarelyUsed: ['iii53', 'iii3']

  },
  minor: {
    mostCommon: ['i5', 'i53', 'i3',  'VII5', 'VII53', 'III53', 'v5', 'v53'],
    lessCommon: ['iv53', 'iv4', 'iv63'],
    rarelyUsed: ['ii°53']
  }
}

const chordsByPopularity = {
  // source: Aldo's guide
  // i can't find a link to this document
  // Sacred Harp Tunewriting Workshop.
  // Aldo Thomas Ceresa; Camp Fasola, 2019.
  // i combined "less common" and "rarely used" for simplicity
  major: {
    mostCommon: ['I','vi', 'V'],
    lessCommon: ['ii', 'IV', 'iii']
  },
  minor: {
    mostCommon: ['i', 'VII', 'III', 'v'],
    lessCommon: ['iv', 'ii']
  }
}

const chordsByPopularityBasedOnMelody = {
  // source: Rob Kelley
  // https://robertkelleyphd.com/home/ShapeNoteMusic/ACorpusBasedModelOfHarmonicFunctionInShapeNoteHymnodyPaper.pdf

  // "other" chords are chords listed from Aldo's guide that aren't included in Rob's
  major: {
    1: {
      preferred: ['I5', 'I53', 'I64'],
      alternate: ['vi53', 'vi63'],
      other: ['IV']
    },
    2: {
      preferred: ['V5'],
      alternate: ['ii3', 'ii53'],
      other: ['V']
    },
    3: {
      preferred: ['I53', 'I63', 'I64'],
      alternate: ['vi53'],
      other: ['iii']
    },
    4: {
      preferred: ['ii3', 'ii53'],
      alternate: ['IV64', 'IV53'],
      other: []
    },
    5: {
      preferred: ['I5', 'I53', 'I63', 'I64'],
      alternate: ['V5', 'iii3', 'iii53'],
      other: ['V']
    },
    6: {
      preferred: ['vi53', 'vi63'],
      alternate: ['ii53', 'ii63'],
      other: ['IV']
    },
    7: {
      preferred: ['V53'],
      alternate: ['iii63', 'iii53'],
      other: []
    }
  },
  minor: {
    1: {
      preferred: ['i5'],
      alternate: ['iv5', 'iv4'],
      other: ['i', 'iv']
    },
    2: {
      preferred: ['v5'],
      alternate: ['VII53'],
      other: ['v', 'ii']
    },
    3: {
      preferred: ['i53'],
      alternate: ['III53'],
      other: []
    },
    4: {
      preferred: ['VII3', 'VII53'],
      alternate: ['iv4'],
      other: ['iv', 'ii']
    },
    5: {
      preferred: ['i5', 'i53'],
      alternate: ['III53'],
      other: ['v']
    },
    6: {
      preferred: ['iv53'],
      alternate: ['iv63', 'ii°53'],
      other: []
    },
    7: {
      preferred: ['III53'],
      alternate: ['v53', 'VII5'],
      other: ['VII']
    }
  }
}

export const getPopularChords = (mode: Mode, melody: number | null, hasAnyNoteSelected: boolean): PopularChords => {
  if (melody && melody > 0 && melody < 8) {
    return {
      // @ts-ignore
      mostCommon: chordsByPopularityBasedOnMelody[mode][melody].preferred.map(chord => getChordFromChordName(chord)),
      // @ts-ignore
      lessCommon: chordsByPopularityBasedOnMelody[mode][melody].alternate.map(chord => getChordFromChordName(chord)),
      // @ts-ignore
      other: chordsByPopularityBasedOnMelody[mode][melody].other.map(chord => getChordFromChordName(chord))
    }
  } 
  
  if (hasAnyNoteSelected) {
    console.log('hasAnyNoteSelected')
    return {
      mostCommon: chordsByPopularityWithInversions[mode].mostCommon.map(chord => getChordFromChordName(chord)),
      lessCommon: chordsByPopularityWithInversions[mode].lessCommon.map(chord => getChordFromChordName(chord)),
      other: []
    }
  }

  return {
    mostCommon: chordsByPopularity[mode].mostCommon.map(chord => getChordFromChordName(chord)),
    lessCommon: chordsByPopularity[mode].lessCommon.map(chord => getChordFromChordName(chord)),
    other: []
  }
}
