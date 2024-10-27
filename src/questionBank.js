const questionBank = {
  reasoning: [
    {
      statement: "Lisa is taller than Jack",
      question: "Who is shorter?",
      options: ["Lisa", "Jack"],
      answer: "Jack"
    },
    {
      statement: "The car is faster than the bicycle",
      question: "Which one is slower?",
      options: ["Car", "Bicycle"],
      answer: "Bicycle"
    },
    {
      statement: "Mark scored higher than Julie",
      question: "Who scored lower?",
      options: ["Mark", "Julie"],
      answer: "Julie"
    },
    {
      statement: "Tom is younger than Harry",
      question: "Who is older?",
      options: ["Tom", "Harry"],
      answer: "Harry"
    },
    {
      statement: "The cat is smaller than the dog",
      question: "Which is bigger?",
      options: ["Cat", "Dog"],
      answer: "Dog"
    },
    {
      statement: "Sam is closer to the tree than Ella",
      question: "Who is farther from the tree?",
      options: ["Sam", "Ella"],
      answer: "Ella"
    },
    {
      statement: "The red apple is sweeter than the green apple",
      question: "Which apple is less sweet?",
      options: ["Red Apple", "Green Apple"],
      answer: "Green Apple"
    },
    {
      statement: "The mountain is taller than the hill",
      question: "Which is shorter?",
      options: ["Mountain", "Hill"],
      answer: "Hill"
    },
    {
      statement: "Jane wakes up earlier than Peter",
      question: "Who wakes up later?",
      options: ["Jane", "Peter"],
      answer: "Peter"
    },
    {
      statement: "Emma is stronger than Max",
      question: "Who is weaker?",
      options: ["Emma", "Max"],
      answer: "Max"
    }
  ],
  perceptualSpeed: [
    {
      pairs: [
        ["L", "l"],
        ["F", "f"],
        ["A", "b"],
        ["R", "r"]
      ],
      answer: 3
    },
    {
      pairs: [
        ["K", "k"],
        ["M", "n"],
        ["O", "o"],
        ["P", "p"]
      ],
      answer: 3
    },
    {
      pairs: [
        ["J", "j"],
        ["Q", "p"],
        ["R", "r"],
        ["S", "s"]
      ],
      answer: 3
    },
    {
      pairs: [
        ["D", "d"],
        ["T", "t"],
        ["G", "h"],
        ["X", "x"]
      ],
      answer: 3
    },
    {
      pairs: [
        ["H", "i"],
        ["M", "m"],
        ["N", "n"],
        ["U", "u"]
      ],
      answer: 3
    },
    {
      pairs: [
        ["P", "p"],
        ["B", "b"],
        ["F", "f"],
        ["H", "k"]
      ],
      answer: 3
    },
    {
      pairs: [
        ["S", "s"],
        ["A", "a"],
        ["R", "t"],
        ["E", "e"]
      ],
      answer: 3
    },
    {
      pairs: [
        ["O", "o"],
        ["U", "v"],
        ["W", "w"],
        ["Q", "q"]
      ],
      answer: 3
    },
    {
      pairs: [
        ["V", "v"],
        ["I", "i"],
        ["J", "k"],
        ["B", "b"]
      ],
      answer: 3
    },
    {
      pairs: [
        ["K", "k"],
        ["L", "l"],
        ["Z", "z"],
        ["X", "y"]
      ],
      answer: 3
    }
  ],
  numberSpeed: [
    {
      numbers: [15, 30, 20],
      answer: 30
    },
    {
      numbers: [50, 40, 45],
      answer: 50
    },
    {
      numbers: [10, 25, 20],
      answer: 25
    },
    {
      numbers: [70, 65, 60],
      answer: 70
    },
    {
      numbers: [12, 18, 15],
      answer: 18
    },
    {
      numbers: [22, 33, 28],
      answer: 33
    },
    {
      numbers: [5, 10, 7],
      answer: 10
    },
    {
      numbers: [45, 30, 40],
      answer: 45
    },
    {
      numbers: [18, 24, 20],
      answer: 24
    },
    {
      numbers: [32, 42, 38],
      answer: 42
    }
  ],
  wordMeaning: [
    {
      words: ["Chair", "Table", "Mountain"],
      answer: "Mountain"
    },
    {
      words: ["Rose", "Tulip", "Pen"],
      answer: "Pen"
    },
    {
      words: ["Glass", "Plate", "Tree"],
      answer: "Tree"
    },
    {
      words: ["Dog", "Fish", "Sand"],
      answer: "Sand"
    },
    {
      words: ["Water", "Air", "Laptop"],
      answer: "Laptop"
    },
    {
      words: ["Book", "Leaf", "Sky"],
      answer: "Sky"
    },
    {
      words: ["Bird", "Butterfly", "Table"],
      answer: "Table"
    },
    {
      words: ["Snow", "Rain", "Chair"],
      answer: "Chair"
    },
    {
      words: ["River", "Lake", "Carpet"],
      answer: "Carpet"
    },
    {
      words: ["Tree", "Grass", "Bottle"],
      answer: "Bottle"
    }
  ],
  spatialVisualization: [
    {
      pairs: [
        {
          shape1: { letter: "H", rotation: 0, flip: false },
          shape2: { letter: "H", rotation: 90, flip: false }
        },
        {
          shape1: { letter: "L", rotation: 0, flip: false },
          shape2: { letter: "L", rotation: 0, flip: true }
        }
      ],
      answer: 1
    },
    {
      pairs: [
        {
          shape1: { letter: "M", rotation: 0, flip: false },
          shape2: { letter: "M", rotation: 90, flip: false }
        },
        {
          shape1: { letter: "T", rotation: 0, flip: false },
          shape2: { letter: "T", rotation: 180, flip: false }
        }
      ],
      answer: 1
    },
    {
      pairs: [
        {
          shape1: { letter: "A", rotation: 0, flip: false },
          shape2: { letter: "A", rotation: 180, flip: false }
        },
        {
          shape1: { letter: "N", rotation: 0, flip: false },
          shape2: { letter: "N", rotation: 90, flip: false }
        }
      ],
      answer: 1
    },
    {
      pairs: [
        {
          shape1: { letter: "O", rotation: 0, flip: false },
          shape2: { letter: "O", rotation: 180, flip: false }
        },
        {
          shape1: { letter: "P", rotation: 0, flip: false },
          shape2: { letter: "P", rotation: 90, flip: false }
        }
      ],
      answer: 2
    },
    {
      pairs: [
        {
          shape1: { letter: "S", rotation: 0, flip: false },
          shape2: { letter: "S", rotation: 0, flip: true }
        },
        {
          shape1: { letter: "E", rotation: 0, flip: false },
          shape2: { letter: "E", rotation: 180, flip: false }
        }
      ],
      answer: 1
    },
    {
      pairs: [
        {
          shape1: { letter: "B", rotation: 0, flip: false },
          shape2: { letter: "B", rotation: 90, flip: false }
        },
        {
          shape1: { letter: "G", rotation: 0, flip: false },
          shape2: { letter: "G", rotation: 180, flip: false }
        }
      ],
      answer: 2
    },
    {
      pairs: [
        {
          shape1: { letter: "C", rotation: 0, flip: false },
          shape2: { letter: "C", rotation: 90, flip: false }
        },
        {
          shape1: { letter: "V", rotation: 0, flip: false },
          shape2: { letter: "V", rotation: 0, flip: true }
        }
      ],
      answer: 1
    },
    {
      pairs: [
        {
          shape1: { letter: "Q", rotation: 0, flip: false },
          shape2: { letter: "Q", rotation: 90, flip: false }
        },
        {
          shape1: { letter: "R", rotation: 0, flip: false },
          shape2: { letter: "R", rotation: 0, flip: true }
        }
      ],
      answer: 1
    },
    {
      pairs: [
        {
          shape1: { letter: "F", rotation: 0, flip: false },
          shape2: { letter: "F", rotation: 180, flip: false }
        },
        {
          shape1: { letter: "H", rotation: 0, flip: false },
          shape2: { letter: "H", rotation: 90, flip: false }
        }
      ],
      answer: 2
    },
    {
      pairs: [
        {
          shape1: { letter: "X", rotation: 0, flip: false },
          shape2: { letter: "X", rotation: 180, flip: false }
        },
        {
          shape1: { letter: "Z", rotation: 0, flip: false },
          shape2: { letter: "Z", rotation: 90, flip: false }
        }
      ],
      answer: 1
    }
  ]
};

 export default questionBank;