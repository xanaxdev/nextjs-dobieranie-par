export type Question = {
  id: number;
  question: string;
  type: "single" | "multiple" | "text";
  options?: string[];
};

export const questions: Question[] = [
  {
    id: 1,
    question: "Jaki jest Twój ulubiony kolor?",
    type: "single",
    options: ["Czerwony", "Niebieski", "Zielony", "Żółty", "różowy"],
  },
  {
    id: 2,
    question: "Jakie jest twój ulubiony zwierzak",
    type: "single",
    options: ["Kot", "Pies", "Chomik", "Papuga", "Królik"],
  },
  {
    id: 3,
    question: "Jak lubisz spędzać wolny czas?",
    type: "single",
    options: [
      "Na graniu",
      "Na uprawianiu sportu",
      "Na czytaniu książek",
      "Na spotykaniu się ze znajomymi",
      "Na rysowaniu",
    ],
  },
  {
    id: 4,
    question: "Jaki jest twój typ osobowości?",
    type: "single",
    options: ["Ekstrawertyk", "Introwertyk", "Ambiwertyk"],
  },
  {
    id: 5,
    question: "Gdzie byś chciał/a pojechać na wakacje?",
    type: "single",
    options: ["Nad morze", "W góry", "Pod namioty", "Za granice"],
  },
  {
    id: 6,
    question: "Jak byś miał jeść jedno danie do końca życia co by to było?",
    type: "single",
    options: ["Pizza", "Burger", "Kebab", "Spaghetti", "Zmieniaki z kotletem"],
  },
  {
    id: 7,
    question: "Do którego domy w Hogwarcie chciałbyś dołączyć",
    type: "single",
    options: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"],
  },
  {
    id: 8,
    question: "Jaka pora dnia jest dla ciebie najlepsza?",
    type: "single",
    options: ["Poranek", "Popołudnie", "Wieczór", "Noc"],
  },
  {
    id: 9,
    question: "Jaki sport jest twoim ulubionym?",
    type: "single",
    options: [
      "Bieganie",
      "Jazda na rowerze",
      "Jazda na rolkach",
      "Pływanie",
      "Wspinaczka",
      "Jazda na desce",
      "Jazda na hulajnodze",
    ],
  },
  {
    id: 10,
    question: "Która pora roku podoba ci sie najbardziej",
    type: "single",
    options: ["Wiosna", "Lato", "Jesień", "Zima"],
  },
];
