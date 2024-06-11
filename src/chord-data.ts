import { Chord } from './helpers';

export const getMajorKeyChordsByPopularity = (pitch: number): Array<Chord> => {
  // TODO: add isBass & isMelody here
  return []
}

// both major & minor
const chordPitches = {
  'I': [1, 3, 5],
  'ii': [2, 4, 6],
  'iii': [3, 5, 7],
  'IV': [4, 6, 1],
  'V': [5, 7, 2],
  'vi': [6, 1, 3]
}

const getInversion = (chordComposition: string): number => {
  if (chordComposition === '53' || chordComposition === '5' || chordComposition === '3') return 0
  else if (chordComposition === '63' || chordComposition === '6') return 1
  else if (chordComposition === '64' || chordComposition === '4') return 2
  else console.log('inversion string error')
  return 0
}

export const getChordFromChordName = (chordName: string): Chord => {
  console.log(chordName)

  const chord: string = chordName.match(/[iIvV°]+/)![0]; // e.g. 'I', 'iii'
  const chordComposition = chordName.match(/[3456]+/)![0]; // e.g. '53', '64'
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

const allMajorChordNames = ['I5', 'I53', 'I63', 'I64', 'ii3', 'ii53', 'ii63', 'iii3', 'iii53', 'IV64', 'IV53', 'V5', 'V53', 'vi53', 'vi63'];

const majorKeyChordsByPopularity = {
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
// [
//   {
//     name: 'I5',
//     rootPitch: 1,
//     notes: [
//       {
//         pitch: 5,
//       },
//       null,
//       {
//         pitch: 1,
//         isMelody: true,
//         isBass: true,
//       },
//     ],
//   },
//   {
//     name: 'I53',
//     rootPitch: 1,
//     notes: [
//       {
//         pitch: 5,
//       },
//       {
//         pitch: 3,
//       },
//       {
//         pitch: 1,
//         isMelody: true,
//         isBass: true,
//       },
//     ],
//   },
// ];
