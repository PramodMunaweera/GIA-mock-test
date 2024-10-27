import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import questionBank from './questionBank';

const LetterShape = ({ letter, rotation, flip, x, y }) => {
  const transform = `translate(${x}, ${y}) 
                    rotate(${rotation}, 20, 20) 
                    scale(${flip ? -1 : 1}, 1)`;
  
  return (
    <text
      x="20"
      y="20"
      fontSize="24"
      fontFamily="Arial"
      textAnchor="middle"
      dominantBaseline="middle"
      transform={transform}
    >
      {letter}
    </text>
  );
};

const TestCategories = {
  REASONING: 'reasoning',
  PERCEPTUAL_SPEED: 'perceptualSpeed',
  NUMBER_SPEED: 'numberSpeed',
  WORD_MEANING: 'wordMeaning',
  SPATIAL_VISUALIZATION: 'spatialVisualization'
};

const getRandomQuestions = () => {
  const selectedQuestions = {};
  Object.keys(TestCategories).forEach(category => {
    const categoryQuestions = questionBank[TestCategories[category]];
    selectedQuestions[TestCategories[category]] = 
      [...categoryQuestions]
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(categoryQuestions.length, 10));
  });
  return selectedQuestions;
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showStatement, setShowStatement] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [categoryStartTime, setCategoryStartTime] = useState(null);
  const [categoryTimes, setCategoryTimes] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [questions, setQuestions] = useState(getRandomQuestions());

  const startTest = () => {
    setStartTime(Date.now());
    setCurrentScreen('categoryIntro');
    setCurrentCategory(TestCategories.REASONING);
  };

  const startCategory = () => {
    setCategoryStartTime(Date.now());
    setCurrentScreen('test');
    setShowStatement(true);
  };

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentCategory][currentQuestionIndex];
    const isCorrect = answer === currentQuestion.answer;
    
    setCorrectAnswers(prev => ({
      ...prev,
      [currentCategory]: (prev[currentCategory] || 0) + (isCorrect ? 1 : 0)
    }));

    if (currentQuestionIndex === questions[currentCategory].length - 1) {
      // Category completed
      const categoryTime = Date.now() - categoryStartTime;
      setCategoryTimes(prev => ({
        ...prev,
        [currentCategory]: categoryTime
      }));

      const categories = Object.values(TestCategories);
      const currentCategoryIndex = categories.indexOf(currentCategory);
      
      if (currentCategoryIndex === categories.length - 1) {
        // Test completed
        setCurrentScreen('results');
      } else {
        // Move to next category
        setCurrentCategory(categories[currentCategoryIndex + 1]);
        setCurrentQuestionIndex(0);
        setCurrentScreen('categoryIntro');
      }
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      if (currentCategory === TestCategories.REASONING) {
        setShowStatement(true);
      }
    }
  };

  const getCategoryDescription = (category) => {
    const descriptions = {
      [TestCategories.REASONING]: "You will be given a statement describing a relationship. Then, you'll answer a question based on that statement.",
      [TestCategories.PERCEPTUAL_SPEED]: "Count the number of matching letter pairs.",
      [TestCategories.NUMBER_SPEED]: "Find the number that's furthest from the median value.",
      [TestCategories.WORD_MEANING]: "Find the word that doesn't belong with the others.",
      [TestCategories.SPATIAL_VISUALIZATION]: "Count how many pairs show the same shape."
    };
    return descriptions[category];
  };

  const resetTest = () => {
    setCurrentScreen('home');
    setCurrentCategory(null);
    setCurrentQuestionIndex(0);
    setShowStatement(true);
    setStartTime(null);
    setCategoryStartTime(null);
    setCategoryTimes({});
    setCorrectAnswers({});
    setQuestions(getRandomQuestions());
  };

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="container py-4 min-vh-100 d-flex align-items-center justify-content-center">
      <button 
        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
        onClick={resetTest}
        style={{ display: (currentScreen === 'home' || currentScreen === 'results') ? 'none' : 'block' }}
      >
        End Test
      </button>

      <div className="card shadow-sm" style={{ maxWidth: '800px', width: '100%' }}>
        <div className="card-body p-4">
          {currentScreen === 'home' && (
            <div className="text-center">
              <h1 className="mb-4">Welcome to GIA Mock Test</h1>
              <p className="mb-4">This test consists of 5 categories with multiple questions each.</p>
              <button className="btn btn-primary" onClick={startTest}>
                Start Test
              </button>
            </div>
          )}

          {currentScreen === 'categoryIntro' && (
            <div className="text-center">
              <h2 className="mb-4 text-capitalize">{currentCategory.replace(/([A-Z])/g, ' $1').trim()}</h2>
              <p className="mb-4">{getCategoryDescription(currentCategory)}</p>
              <button className="btn btn-primary" onClick={startCategory}>
                Start Section
              </button>
            </div>
          )}

          {currentScreen === 'test' && (
            <div className="text-center">
              <h3 className="mb-4 text-capitalize">{currentCategory.replace(/([A-Z])/g, ' $1').trim()}</h3>
              <div className="mb-4">
                Question {currentQuestionIndex + 1} of {questions[currentCategory].length}
              </div>

              {currentCategory === TestCategories.REASONING && showStatement && (
                <div>
                  <p className="mb-4">{questions[currentCategory][currentQuestionIndex].statement}</p>
                  <button className="btn btn-secondary" onClick={() => setShowStatement(false)}>
                    Click when ready
                  </button>
                </div>
              )}

              {(!showStatement || currentCategory !== TestCategories.REASONING) && (
                <div>
                  {currentCategory === TestCategories.REASONING && (
                    <p className="mb-5">{questions[currentCategory][currentQuestionIndex].question}</p>
                  )}

                  {currentCategory === TestCategories.PERCEPTUAL_SPEED && (
                    <div className="mb-5 d-flex flex-column align-items-center">
                      <div className="mb-2" style={{ fontFamily: 'monospace', fontSize: '1.2em' }}>
                        {questions[currentCategory][currentQuestionIndex].pairs.map((pair, index) => (
                          <span key={index} className="mx-2">{pair[0]}</span>
                        ))}
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: '1.2em' }}>
                        {questions[currentCategory][currentQuestionIndex].pairs.map((pair, index) => (
                          <span key={index} className="mx-2">{pair[1]}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentCategory === TestCategories.NUMBER_SPEED && (
                    <div className="mb-5 fs-4">
                      {questions[currentCategory][currentQuestionIndex].numbers.join(' ')}
                    </div>
                  )}

                  {currentCategory === TestCategories.WORD_MEANING && (
                    <div className="mb-5 fs-4">
                      {questions[currentCategory][currentQuestionIndex].words.join(' ')}
                    </div>
                  )}

                  {currentCategory === TestCategories.SPATIAL_VISUALIZATION && (
                    <div className="mb-5 d-flex justify-content-center gap-5">
                      {questions[currentCategory][currentQuestionIndex].pairs.map((pair, pairIndex) => (
                        <div key={pairIndex} className="d-flex flex-column align-items-center">
                          <svg width="40" height="80" viewBox="0 0 40 80">
                            <LetterShape
                              letter={pair.shape1.letter}
                              rotation={pair.shape1.rotation}
                              flip={pair.shape1.flip}
                              x={20}
                              y={20}
                            />
                            <LetterShape
                              letter={pair.shape2.letter}
                              rotation={pair.shape2.rotation}
                              flip={pair.shape2.flip}
                              x={20}
                              y={60}
                            />
                          </svg>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="d-flex justify-content-center gap-3">
                    {currentCategory === TestCategories.PERCEPTUAL_SPEED && (
                      [0, 1, 2, 3, 4].map(num => (
                        <button
                          key={num}
                          className="btn btn-primary btn-lg px-4"
                          onClick={() => handleAnswer(num)}
                        >
                          {num}
                        </button>
                      ))
                    )}

                    {currentCategory === TestCategories.REASONING && (
                      questions[currentCategory][currentQuestionIndex].options.map((option, index) => (
                        <button
                          key={index}
                          className="btn btn-primary btn-lg px-4"
                          onClick={() => handleAnswer(option)}
                        >
                          {option}
                        </button>
                      ))
                    )}

                    {currentCategory === TestCategories.NUMBER_SPEED && (
                      questions[currentCategory][currentQuestionIndex].numbers.map((num, index) => (
                        <button
                          key={index}
                          className="btn btn-primary btn-lg px-4"
                          onClick={() => handleAnswer(num)}
                        >
                          {num}
                        </button>
                      ))
                    )}

                    {currentCategory === TestCategories.WORD_MEANING && (
                      questions[currentCategory][currentQuestionIndex].words.map((word, index) => (
                        <button
                          key={index}
                          className="btn btn-primary btn-lg px-4"
                          onClick={() => handleAnswer(word)}
                        >
                          {word}
                        </button>
                      ))
                    )}

                    {currentCategory === TestCategories.SPATIAL_VISUALIZATION && (
                      [0, 1, 2, 3].map(num => (
                        <button
                          key={num}
                          className="btn btn-primary btn-lg px-4"
                          onClick={() => handleAnswer(num)}
                        >
                          {num}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

        {currentScreen === 'results' && (
          <div className="results-container container d-flex flex-column justify-content-center align-items-center">
            <h2 className="text-center mb-4">Test Results</h2>

            <div className="row">
              <div className="col-md-12 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-uppercase fw-bold">Total</h5>
                    <ul className="list-unstyled">
                      <li>
                        <span>Time:</span> {formatTime(Object.values(categoryTimes).reduce((acc, time) => acc + time, 0))}
                      </li>
                      <li>
                        <span>Score:</span> {
                          Object.values(correctAnswers).reduce((acc, correct) => acc + correct, 0)
                        } / {
                          Object.values(questions).reduce((acc, questionsArr) => acc + questionsArr.length, 0)
                        }
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
            {Object.entries(categoryTimes).map(([category, time]) => (
              <div key={category} className="col-md-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-uppercase fw-bold" style={{ fontSize: '14px' }}>
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </h5>
                    <ul className="list-unstyled" style={{ fontSize: '12px' }}>
                      <li>
                        <span>Time:</span> {formatTime(time)}
                      </li>
                      <li>
                        <span>Score:</span> {correctAnswers[category] || 0}/{questions[category].length}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary btn-lg" onClick={resetTest}>
                      Start New Test
                    </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default App;