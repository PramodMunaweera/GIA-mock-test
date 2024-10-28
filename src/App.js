import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import questionBank from './questionBank';

const Footer = () => {
  return (
    <footer className="fixed-bottom py-3 bg-dark text-light">
      <div className="container text-center">
        <small>
          Made by{' '}
          <a 
            href="https://github.com/PramodMunaweera" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-light text-decoration-none fw-bold"
          >
            Pramod Munaweera
          </a>
        </small>
      </div>
    </footer>
  );
};

const LetterShape = ({ letter, rotation, flip, x, y }) => {
  const transform = `translate(${x}, ${y}) rotate(${rotation}, 20, 20) scale(${flip ? -1 : 1}, 1)`;
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
  //const [startTime, setStartTime] = useState(null);
  const [categoryStartTime, setCategoryStartTime] = useState(null);
  const [categoryTimes, setCategoryTimes] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [questions, setQuestions] = useState(getRandomQuestions());

  const startTest = () => {
    //setStartTime(Date.now());
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
    //setStartTime(null);
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
    <>
    <div className="min-vh-100 bg-light py-5">
      {/* Exit Button */}
      <button 
        className="btn btn-outline-danger position-absolute top-0 end-0 m-4"
        onClick={resetTest}
        style={{ display: (currentScreen === 'home' || currentScreen === 'results') ? 'none' : 'block' }}
      >
        <i className="bi bi-x-lg me-2"></i>End Test
      </button>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="card-body p-5">
                {currentScreen === 'home' && (
                  <div className="text-center">
                    <h1 className="display-4 mb-4 fw-bold text-primary">GIA Practice Test</h1>
                    <div className="bg-light p-4 rounded-3 mb-4">
                      <h5 className="mb-3">Test Overview</h5>
                      <p className="text-muted mb-0">
                        This assessment consists of 5 unique categories designed to evaluate different cognitive abilities:
                      </p>
                      <ul className="list-unstyled mt-3">
                        {Object.values(TestCategories).map((category) => (
                          <li key={category} className="mb-2">
                            <span className="badge bg-primary me-2 text-capitalize">
                              {category.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button 
                      className="btn btn-primary btn-lg px-5 py-3 shadow-sm"
                      onClick={startTest}
                    >
                      Begin Assessment
                    </button>
                  </div>
                )}

                {currentScreen === 'categoryIntro' && (
                  <div className="text-center">
                    <h2 className="mb-4 text-primary text-capitalize">
                      {currentCategory.replace(/([A-Z])/g, ' $1').trim()}
                    </h2>
                    <div className="bg-light p-4 rounded-3 mb-4">
                      <p className="mb-0">{getCategoryDescription(currentCategory)}</p>
                    </div>
                    <button 
                      className="btn btn-primary btn-lg px-4"
                      onClick={startCategory}
                    >
                      I'm Ready!
                    </button>
                  </div>
                )}

                {currentScreen === 'test' && (
                  <div className="text-center">
                    <div className="mb-4">
                      <h3 className="text-primary mb-3 text-capitalize">
                        {currentCategory.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <div className="progress" style={{ height: '8px' }}>
                        <div 
                          className="progress-bar" 
                          style={{ width: `${(currentQuestionIndex / questions[currentCategory].length) * 100}%` }}
                        ></div>
                      </div>
                      <small className="text-muted mt-2 d-block">
                        Question {currentQuestionIndex + 1} of {questions[currentCategory].length}
                      </small>
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
                  <div className="results-container">
                    <h2 className="text-center text-primary mb-5">Assessment Results</h2>
                    
                    {/* Overall Summary Card */}
                    <div className="card shadow-sm border-0 bg-light mb-5">
                      <div className="card-body p-4">
                        <div className="row align-items-center">
                          <div className="col-md-6">
                            <h4 className="mb-3">Overall Performance</h4>
                            <div className="d-flex align-items-center mb-2">
                              <div className="me-4">
                                <span className="text-muted">Total Score</span>
                                <h3 className="mb-0">
                                  {Object.values(correctAnswers).reduce((acc, correct) => acc + correct, 0)}
                                  <small className="text-muted">/{
                                    Object.values(questions).reduce((acc, questionsArr) => acc + questionsArr.length, 0)
                                  }</small>
                                </h3>
                              </div>
                              <div>
                                <span className="text-muted">Total Time</span>
                                <h3 className="mb-0">
                                  {formatTime(Object.values(categoryTimes).reduce((acc, time) => acc + time, 0))}
                                </h3>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="progress mb-2" style={{ height: '25px' }}>
                              <div 
                                className="progress-bar"
                                style={{ 
                                  width: `${(Object.values(correctAnswers).reduce((acc, correct) => acc + correct, 0) / 
                                    Object.values(questions).reduce((acc, questionsArr) => acc + questionsArr.length, 0)) * 100}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Category Results */}
                    <div className="row g-4">
                      {Object.entries(categoryTimes).map(([category, time]) => (
                        <div key={category} className="col-md-6">
                          <div className="card h-100 shadow-sm border-0">
                            <div className="card-body p-4">
                              <h5 className="card-title text-primary mb-4 text-capitalize">
                                {category.replace(/([A-Z])/g, ' $1').trim()}
                              </h5>
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                  <small className="text-muted d-block">Score</small>
                                  <h4 className="mb-0">
                                    {correctAnswers[category] || 0}/{questions[category].length}
                                  </h4>
                                </div>
                                <div className="text-end">
                                  <small className="text-muted d-block">Time</small>
                                  <h4 className="mb-0">{formatTime(time)}</h4>
                                </div>
                              </div>
                              <div className="progress" style={{ height: '8px' }}>
                                <div 
                                  className="progress-bar"
                                  style={{ 
                                    width: `${((correctAnswers[category] || 0) / questions[category].length) * 100}%` 
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-center mt-5">
                      <button 
                        className="btn btn-primary btn-lg px-5"
                        onClick={resetTest}
                      >
                        Start New Assessment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default App;