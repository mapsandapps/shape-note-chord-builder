import { useState } from 'react';
import Main from './components/Main';
import Tutorial from './components/Tutorial';
import './App.css';

function App() {
  const [isShowingTutorial, showTutorial] = useState(false)

  const toggleTutorial = () => {
    showTutorial(!isShowingTutorial)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <h1>Shape Note Chord Builder</h1>
      <p>This is just a little tool to help you know what chords are possible based on a melody or other note. It only includes the most common chords (e.g. there's no discords). The commonality of various chords is based on research & writing from Aldo Thomas Ceresa and <a href="https://robertkelleyphd.com/home/ShapeNoteMusic/ACorpusBasedModelOfHarmonicFunctionInShapeNoteHymnodyPaper.pdf" target="_blank">Robert Kelley</a>. <button onClick={() => showTutorial(!isShowingTutorial)}>{isShowingTutorial ? 'Return to app' : 'Read more'}</button></p>
      {isShowingTutorial && (
        <>
          <Tutorial />
          <button onClick={toggleTutorial}>{isShowingTutorial ? 'Return to app' : 'Read more'}</button>
        </>
      )}
      <div style={{ display: isShowingTutorial ? 'none' : 'block' }}>
        {/* we want this here but invisible, so it won't lose its state when showing the tutorial */}
        <Main />
      </div>
    </>
  );
}

export default App;
