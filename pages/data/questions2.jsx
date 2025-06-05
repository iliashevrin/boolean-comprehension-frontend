import React from "react";

export const questions2 = [
  {
    formula: "((A & B) | (C & B) | (D & B))",
    assignment: {
      A: true,
      B: true,
    },
    isOriginal: true,
    result: true,
    category: "REDUCE_OPERATOR_COUNT",
  },
  {
    formula: "(A -> (B -> (C -> !(D | E))))",
    assignment: {
      A: false,
      B: true,
      C: true,
      E: false,
    },
    isOriginal: true,
    result: true,
    category: "REDUCE_OPERATOR_NESTING",
  },
  {
    formula: "(B & (A | C | D))",
    assignment: {
      A: true,
      B: true,
    },
    isOriginal: false,
    result: true,
    category: "REDUCE_OPERATOR_COUNT",
  },
  {
    formula: "((B -> (C | D)) -> !A)",
    assignment: {
      B: false,
      C: true,
    },
    isOriginal: false,
    category: "REDUCE_NEGATION_COUNT",
  },
  {
    formula: "(A -> !(B | C | D))",
    assignment: {
      B: true,
      D: true,
    },
    isOriginal: false,
    category: "REDUCE_NEGATION_COUNT_INCREASE_NEGATION_LEVEL_TRADEOFF",
  },
  {
    formula: "(A -> (!B & !C & !D))",
    assignment: {
      B: true,
      D: true,
    },
    isOriginal: true,
    category: "REDUCE_NEGATION_COUNT_INCREASE_NEGATION_LEVEL_TRADEOFF",
  },
  {
    formula: "((A | !B | C) & (!A | B | C) & (!A | !C | !D))",
    assignment: {
      B: false,
      D: false,
    },
    isOriginal: false,
    category: "REDUCE_OPERATOR_NESTING_INCREASE_OPERATOR_COUNT_TRADEOFF_DNF",
  },
  {
    formula: "(A <-> (!B & !C & !D & !E))",
    assignment: {
      A: false,
      B: false,
      E: true,
    },
    isOriginal: false,
    result: true,
    category: "REDUCE_NEGATION_LEVEL",
  },
  {
    formula: "(A -> (B | C | D))",
    assignment: {
      B: true,
      D: false,
    },
    isOriginal: false,
    result: true,
    category: "ELIMINATE_NEGATION",
  },
  {
    formula:
      "((A & B & C & D & !E) | (!A & !B) | (!A & !C) | (!A & !D) | (!A & E) | (E & !F))",
    assignment: {
      A: true,
      B: false,
      C: false,
      E: false,
      F: true,
    },
    isOriginal: false,
    result: false,
    category: "REDUCE_OPERATOR_NESTING_INCREASE_OPERATOR_COUNT_TRADEOFF_CNF",
  },
  {
    formula: "((A <-> (B & C & D & !E)) | (E & !F))",
    assignment: {
      A: true,
      B: false,
      C: false,
      E: false,
      F: true,
    },
    isOriginal: true,
    result: false,
    category: "REDUCE_OPERATOR_NESTING_INCREASE_OPERATOR_COUNT_TRADEOFF_CNF",
  },
  {
    formula: "(!A | !B | !C | (!D & !E))",
    assignment: {
      A: false,
      B: true,
      C: true,
      E: false,
    },
    isOriginal: false,
    result: true,
    category: "REDUCE_OPERATOR_NESTING",
  },
  {
    formula: "(A -> (B & !C & !D))",
    assignment: {
      B: false,
      C: true,
    },
    isOriginal: true,
    category: "REDUCE_NEGATION_COUNT",
  },
  {
    formula: "(A <-> !(B | C | D | E))",
    assignment: {
      A: false,
      B: false,
      E: true,
    },
    isOriginal: true,
    result: true,
    category: "REDUCE_NEGATION_LEVEL",
  },
  {
    formula: "((A & !B & !C) -> D)",
    assignment: {
      B: true,
      D: false,
    },
    isOriginal: true,
    result: true,
    category: "ELIMINATE_NEGATION",
  },
  {
    formula: "((A <-> (B & !C)) | (C & !D))",
    assignment: {
      B: false,
      D: false,
    },
    isOriginal: true,
    category: "REDUCE_OPERATOR_NESTING_INCREASE_OPERATOR_COUNT_TRADEOFF_DNF",
  },
];

const transformQuestions2 = () => {
  return <></>;
};
export default transformQuestions2;
