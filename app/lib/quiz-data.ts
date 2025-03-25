export const quizData: Record<string, Question[]> = {
  science: [
    {
      question: "What is the chemical symbol for gold?",
      options: [
        { value: "au", label: "Au" },
        { value: "ag", label: "Ag" },
        { value: "fe", label: "Fe" },
        { value: "cu", label: "Cu" },
      ],
      correctAnswer: "au",
      feedback: "The chemical symbol for gold is Au, which comes from the Latin word 'aurum'.",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: [
        { value: "venus", label: "Venus" },
        { value: "mars", label: "Mars" },
        { value: "jupiter", label: "Jupiter" },
        { value: "saturn", label: "Saturn" },
      ],
      correctAnswer: "mars",
      feedback:
        "Mars is known as the Red Planet due to the reddish appearance given by iron oxide (rust) on its surface.",
    },
    {
      question: "What is the hardest natural substance on Earth?",
      options: [
        { value: "gold", label: "Gold" },
        { value: "platinum", label: "Platinum" },
        { value: "diamond", label: "Diamond" },
        { value: "titanium", label: "Titanium" },
      ],
      correctAnswer: "diamond",
      feedback: "Diamond is the hardest known natural material, scoring 10 on the Mohs scale of mineral hardness.",
    },
    {
      question: "Which of these is NOT a state of matter?",
      options: [
        { value: "plasma", label: "Plasma" },
        { value: "gas", label: "Gas" },
        { value: "liquid", label: "Liquid" },
        { value: "energy", label: "Energy" },
      ],
      correctAnswer: "energy",
      feedback: "Energy is not a state of matter. The four common states of matter are solid, liquid, gas, and plasma.",
    },
    {
      question: "What is the main gas found in the Earth's atmosphere?",
      options: [
        { value: "oxygen", label: "Oxygen" },
        { value: "carbon-dioxide", label: "Carbon Dioxide" },
        { value: "nitrogen", label: "Nitrogen" },
        { value: "hydrogen", label: "Hydrogen" },
      ],
      correctAnswer: "nitrogen",
      feedback: "Nitrogen makes up about 78% of Earth's atmosphere, while oxygen makes up about 21%.",
    },
  ],
  history: [
    {
      question: "In which year did World War II end?",
      options: [
        { value: "1943", label: "1943" },
        { value: "1945", label: "1945" },
        { value: "1947", label: "1947" },
        { value: "1950", label: "1950" },
      ],
      correctAnswer: "1945",
      feedback: "World War II ended in 1945 with the surrender of Germany in May and Japan in September.",
    },
    {
      question: "Who was the first President of the United States?",
      options: [
        { value: "thomas-jefferson", label: "Thomas Jefferson" },
        { value: "john-adams", label: "John Adams" },
        { value: "george-washington", label: "George Washington" },
        { value: "benjamin-franklin", label: "Benjamin Franklin" },
      ],
      correctAnswer: "george-washington",
      feedback: "George Washington was the first President of the United States, serving from 1789 to 1797.",
    },
    {
      question: "Which ancient civilization built the pyramids at Giza?",
      options: [
        { value: "romans", label: "Romans" },
        { value: "greeks", label: "Greeks" },
        { value: "egyptians", label: "Egyptians" },
        { value: "mayans", label: "Mayans" },
      ],
      correctAnswer: "egyptians",
      feedback: "The pyramids at Giza were built by the ancient Egyptians as tombs for their pharaohs.",
    },
    {
      question: "The Renaissance period began in which country?",
      options: [
        { value: "france", label: "France" },
        { value: "england", label: "England" },
        { value: "italy", label: "Italy" },
        { value: "spain", label: "Spain" },
      ],
      correctAnswer: "italy",
      feedback: "The Renaissance began in Italy in the 14th century before spreading to the rest of Europe.",
    },
    {
      question: "Who wrote the 'I Have a Dream' speech?",
      options: [
        { value: "malcolm-x", label: "Malcolm X" },
        { value: "martin-luther-king", label: "Martin Luther King Jr." },
        { value: "rosa-parks", label: "Rosa Parks" },
        { value: "barack-obama", label: "Barack Obama" },
      ],
      correctAnswer: "martin-luther-king",
      feedback:
        "Martin Luther King Jr. delivered his famous 'I Have a Dream' speech during the March on Washington in 1963.",
    },
  ],
  programming: [
    {
      question: "Which language is primarily used for styling web pages?",
      options: [
        { value: "html", label: "HTML" },
        { value: "css", label: "CSS" },
        { value: "javascript", label: "JavaScript" },
        { value: "python", label: "Python" },
      ],
      correctAnswer: "css",
      feedback: "CSS (Cascading Style Sheets) is used to style and layout web pages.",
    },
    {
      question: "What does API stand for?",
      options: [
        { value: "application-programming-interface", label: "Application Programming Interface" },
        { value: "automated-program-instruction", label: "Automated Program Instruction" },
        { value: "application-process-integration", label: "Application Process Integration" },
        { value: "advanced-programming-implementation", label: "Advanced Programming Implementation" },
      ],
      correctAnswer: "application-programming-interface",
      feedback:
        "API stands for Application Programming Interface, which allows different software applications to communicate with each other.",
    },
    {
      question: "Which of these is NOT a JavaScript framework or library?",
      options: [
        { value: "react", label: "React" },
        { value: "angular", label: "Angular" },
        { value: "django", label: "Django" },
        { value: "vue", label: "Vue" },
      ],
      correctAnswer: "django",
      feedback: "Django is a Python web framework, not a JavaScript framework or library.",
    },
    {
      question: "What does the acronym SQL stand for?",
      options: [
        { value: "structured-query-language", label: "Structured Query Language" },
        { value: "simple-question-language", label: "Simple Question Language" },
        { value: "standard-query-logic", label: "Standard Query Logic" },
        { value: "system-quality-level", label: "System Quality Level" },
      ],
      correctAnswer: "structured-query-language",
      feedback: "SQL stands for Structured Query Language, which is used to communicate with and manipulate databases.",
    },
    {
      question: "Which data structure operates on a Last-In-First-Out (LIFO) principle?",
      options: [
        { value: "queue", label: "Queue" },
        { value: "stack", label: "Stack" },
        { value: "tree", label: "Tree" },
        { value: "graph", label: "Graph" },
      ],
      correctAnswer: "stack",
      feedback:
        "A stack follows the Last-In-First-Out (LIFO) principle, where the last element added is the first one to be removed.",
    },
  ],
  general: [
    {
      question: "Which country is home to the kangaroo?",
      options: [
        { value: "new-zealand", label: "New Zealand" },
        { value: "australia", label: "Australia" },
        { value: "south-africa", label: "South Africa" },
        { value: "brazil", label: "Brazil" },
      ],
      correctAnswer: "australia",
      feedback: "Kangaroos are native to Australia and are one of the country's most recognizable symbols.",
    },
    {
      question: "How many sides does a hexagon have?",
      options: [
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
      ],
      correctAnswer: "6",
      feedback: "A hexagon has 6 sides. The prefix 'hex' comes from the Greek word for six.",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: [
        { value: "vincent-van-gogh", label: "Vincent van Gogh" },
        { value: "pablo-picasso", label: "Pablo Picasso" },
        { value: "leonardo-da-vinci", label: "Leonardo da Vinci" },
        { value: "michelangelo", label: "Michelangelo" },
      ],
      correctAnswer: "leonardo-da-vinci",
      feedback: "The Mona Lisa was painted by Leonardo da Vinci in the early 16th century.",
    },
    {
      question: "Which planet is closest to the sun?",
      options: [
        { value: "venus", label: "Venus" },
        { value: "earth", label: "Earth" },
        { value: "mars", label: "Mars" },
        { value: "mercury", label: "Mercury" },
      ],
      correctAnswer: "mercury",
      feedback: "Mercury is the closest planet to the sun in our solar system.",
    },
    {
      question: "What is the capital city of Japan?",
      options: [
        { value: "beijing", label: "Beijing" },
        { value: "seoul", label: "Seoul" },
        { value: "tokyo", label: "Tokyo" },
        { value: "bangkok", label: "Bangkok" },
      ],
      correctAnswer: "tokyo",
      feedback: "Tokyo is the capital and largest city of Japan.",
    },
  ],
}

export interface Question {
  question: string
  options: {
    value: string
    label: string
  }[]
  correctAnswer: string
  feedback: string
}

