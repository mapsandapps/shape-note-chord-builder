import { Mode } from './helpers';

// i left out A♯, D♭, D♯, G♭, & G♯ because those are not commonly used in either major or minor
export const scales = {
    major: {
      'A': ['A', 'B', 'C♯', 'D', 'E', 'F♯', 'G♯'],
      'B♭': ['B♭', 'C', 'D', 'E♭', 'F', 'G', 'A'],
      'B': ['B', 'C♯', 'D♯', 'E', 'F♯', 'G♯', 'A♯'],
      'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
      'C♯': ['C♯', 'D♯', 'E♯', 'F♯', 'G♯', 'A♯', 'B♯'],
      'D': ['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯'],
      'E♭': ['E♭', 'F', 'G', 'A♭', 'B♭', 'C', 'D'],
      'E': ['E', 'F♯', 'G♯', 'A', 'B', 'C♯', 'D♯'],
      'F': ['F', 'G', 'A', 'B♭', 'C', 'D', 'E'],
      'F♯': ['F♯', 'G♯', 'A♯', 'B', 'C♯', 'D♯', 'E♯'],
      'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F♯'],
      'A♭': ['A♭', 'B♭', 'C', 'D♭', 'E♭', 'F', 'G']
    },
    minor: {
      'A': ['A', 'B', 'C', 'D', 'E', 'F/F♯', 'G'],
      'B♭': ['B♭', 'C', 'D♭', 'E♭', 'F', 'G♭', 'A♭'],
      'B': ['B', 'C♯', 'D', 'E', 'F♯', 'G/G♯', 'A'],
      'C': ['C', 'D', 'E♭', 'F', 'G', 'A♭/A', 'B♭'],
      'C♯': ['C♯', 'D♯', 'E', 'F♯', 'G♯', 'A/A♯', 'B'],
      'D': ['D', 'E', 'F', 'G', 'A', 'B♭/B', 'C'],
      'E♭': ['E♭', 'F', 'G♭', 'A♭', 'B♭', 'C♭', 'D♭'],
      'E': ['E', 'F♯', 'G', 'A', 'B', 'C/C♯', 'D'],
      'F': ['F', 'G', 'A♭', 'B♭', 'C', 'D♭/D', 'E♭'],
      'F♯': ['F♯', 'G♯', 'A', 'B', 'C♯', 'D/D♯', 'E'],
      'G': ['G', 'A', 'B♭', 'C', 'D', 'E♭/E', 'F'],
      'A♭': ['A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F♭', 'G♭']
    }
  }
  
  export const getKeyOptions = (mode: Mode): Array<string> => {
    return Object.keys(scales[mode]);
  }

  export const getNoteName = (mode: Mode, keyName: string | null, pitch: number): string => {
    if (!keyName || !pitch) return '';

    // @ts-ignore
    const scale = scales[mode][keyName];

    if (!scale) return '';

    return scale[pitch - 1];
  }
