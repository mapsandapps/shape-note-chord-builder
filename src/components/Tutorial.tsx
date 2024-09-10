// import './Note.css';
import basicImage from '/basic.svg'
import bassImage from '/bass.svg'
import melodyImage from '/melody.svg'
import noThirdImage from '/no-third.svg'
import withKeyImage from '/with-key.svg'

export default function Tutorial() {
  return (
    <>
      <h2>Basic chord</h2>
      <img src={basicImage} />
      <p>Here you can see a V chord, i.e. a chord with a sol-5, mi-7, and sol-2. The root note of the chord is shown at the bottom.</p>
      <h2>Selecting the melody note</h2>
      <img src={melodyImage} />
      <p>If you use the dropdowns to add a sol-4 as the melody note, the chords will reflect that. Any notes that have been used (i.e. selected in the dropdowns) are highlighted with a green border around the shape. If one is selected as the melody, that will also be indicated.</p>
      <p>When you select a melody note, the chord likelihood (i.e. "most common", "less common", "other") reflects the melody note.</p>
      <h2>Inversions</h2>
      <img src={bassImage} />
      <p>A note marked as "bass" that you have not selected as your bass note is indicating the recommended inversion based on the melody note.</p>
      <h2>With a key selected</h2>
      <img src={withKeyImage} />
      <p>If you input the key in the settings at the top, the chord and notes will reflect the letters of the notes.</p>
      <h2>Chords with two notes</h2>
      <img src={noThirdImage} />
      <p>Some recommended chords only have two notes. When this happens, the complete chord will be shown in the "other" chords section.</p>
    </>
  );
}
