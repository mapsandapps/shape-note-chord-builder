import { Chord } from './helpers';

export const majorChords: Array<Chord> = [
  {
    name: 'I5',
    rootPitch: 1,
    notes: [
      {
        pitch: 5,
      },
      null,
      {
        pitch: 1,
        isMelody: true,
        isBass: true,
      },
    ],
  },
  {
    name: 'I53',
    rootPitch: 1,
    notes: [
      {
        pitch: 5,
      },
      {
        pitch: 3,
      },
      {
        pitch: 1,
        isMelody: true,
        isBass: true,
      },
    ],
  },
];
