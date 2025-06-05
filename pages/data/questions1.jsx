import React from "react";

export const questions1 = [
  {
    formula: "(!A | (!B & !C & !D & !E) | F)",
    assignment: {
      B: false,
      C: true,
      D: false,
      E: true,
      F: true,
    },
    isOriginal: false,
    result: true,
    category: "REDUCE_OPERATOR_NESTING",
  },
  {
    formula: "((!A & !B & !C) -> (D <-> E))",
    assignment: {
      B: true,
      C: false,
      E: true,
    },
    isOriginal: true,
    result: true,
    category: "ELIMINATE_NEGATION",
  },
  {
    formula: "!((A & B) | (C & D))",
    assignment: {
      A: false,
      C: false,
    },
    isOriginal: false,
    result: true,
    category: "REDUCE_NEGATION_COUNT_INCREASE_NEGATION_LEVEL_TRADEOFF",
  },
  // {
  //   formula: "(A <-> ((B & C & D & !E) | (E & !F)))",
  //   assignment: {
  //     A: true,
  //     C: true,
  //     D: false,
  //     E: true,
  //   },
  //   isOriginal: true,
  //   category: "REDUCE_OPERATOR_NESTING_INCREASE_OPERATOR_COUNT_TRADEOFF_DNF",
  // },
  // {
  //   formula: "((A & B) -> !(C | D))",
  //   assignment: {
  //     B: true,
  //     D: true,
  //   },
  //   isOriginal: true,
  //   category: "REDUCE_NEGATION_LEVEL",
  // },
  // {
  //   formula: "((A & B) | (C & B) | (D & B))",
  //   assignment: {
  //     B: true,
  //     C: false,
  //   },
  //   isOriginal: true,
  //   category: "REDUCE_OPERATOR_COUNT",
  // },
  // {
  //   formula: "(A | B | C | (D <-> E))",
  //   assignment: {
  //     B: true,
  //     C: false,
  //     E: true,
  //   },
  //   isOriginal: false,
  //   result: true,
  //   category: "ELIMINATE_NEGATION",
  // },
  // {
  //   formula: "(!A | (B & E) | (C & E) | (D & E) | (B & F) | (C & F) | (D & F))",
  //   assignment: {
  //     A: true,
  //     C: true,
  //     E: true,
  //     F: true,
  //   },
  //   isOriginal: false,
  //   result: true,
  //   category: "REDUCE_OPERATOR_NESTING_INCREASE_OPERATOR_COUNT_TRADEOFF_CNF",
  // },
  // {
  //   formula:
  //     "((A | !B | !C | !D | E) & (A | !E | F) & (!A | B | E) & (!A | C | E) & (!A | D | E) & (!A | !E | !F))",
  //   assignment: {
  //     A: true,
  //     C: true,
  //     D: false,
  //     E: true,
  //   },
  //   isOriginal: false,
  //   category: "REDUCE_OPERATOR_NESTING_INCREASE_OPERATOR_COUNT_TRADEOFF_DNF",
  // },
  // {
  //   formula: "((A -> !B) & (C -> !D))",
  //   assignment: {
  //     A: false,
  //     C: false,
  //   },
  //   isOriginal: true,
  //   result: true,
  //   category: "REDUCE_NEGATION_COUNT_INCREASE_NEGATION_LEVEL_TRADEOFF",
  // },
  // {
  //   formula: "(A | ((B & !C) <-> D))",
  //   assignment: {
  //     A: true,
  //     B: false,
  //     C: false,
  //   },
  //   isOriginal: false,
  //   result: true,
  //   category: "REDUCE_NEGATION_COUNT",
  // },
  // {
  //   formula: "(B & (A | C | D))",
  //   assignment: {
  //     B: true,
  //     C: false,
  //   },
  //   isOriginal: false,
  //   category: "REDUCE_OPERATOR_COUNT",
  // },
  // {
  //   formula: "(!A -> ((B & !C) <-> D))",
  //   assignment: {
  //     A: true,
  //     B: false,
  //     C: false,
  //   },
  //   isOriginal: true,
  //   result: true,
  //   category: "REDUCE_NEGATION_COUNT",
  // },
  // {
  //   formula: "((A & (B | C | D | E)) -> F)",
  //   assignment: {
  //     B: false,
  //     C: true,
  //     D: false,
  //     E: true,
  //     F: true,
  //   },
  //   isOriginal: true,
  //   result: true,
  //   category: "REDUCE_OPERATOR_NESTING",
  // },
  // {
  //   formula: "(A -> ((B | C | D) & (E | F)))",
  //   assignment: {
  //     A: true,
  //     C: true,
  //     E: true,
  //     F: true,
  //   },
  //   isOriginal: true,
  //   result: true,
  //   category: "REDUCE_OPERATOR_NESTING_INCREASE_OPERATOR_COUNT_TRADEOFF_CNF",
  // },
  // {
  //   formula: "((A & B) -> (!C & !D))",
  //   assignment: {
  //     B: true,
  //     D: true,
  //   },
  //   isOriginal: false,
  //   category: "REDUCE_NEGATION_LEVEL",
  // },
];

const transformQuestions1 = () => {
  return <></>;
};
export default transformQuestions1;
