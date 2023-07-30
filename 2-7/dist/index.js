"use strict";
const createStudent = (name, age, korean, math, english, society, science) => {
  return {
    name,
    age,
    scores: {
      korean,
      math,
      english,
      society,
      science,
    },
  };
};

const calculateAverage = (student) => {
  const sum =
    student.scores.korean +
    student.scores.math +
    student.scores.english +
    student.scores.society +
    student.scores.science;
  const average = sum / Object.keys(student.scores).length;
  return average;
};

const assignGrade = (average) => {
  if (average >= 90) {
    return "A";
  } else if (average >= 80) {
    return "B";
  } else if (average >= 70) {
    return "C";
  } else if (average >= 60) {
    return "D";
  } else {
    return "F";
  }
};

const printResult = (student) => {
  const average = calculateAverage(student);
  const grade = assignGrade(average);
  console.log(
    `${student.name}(${student.age}세)의 전체 평균: ${average.toFixed(
      2
    )}, 학점: ${grade}`
  );
};

const main = () => {
  const rtan = createStudent("Rtan", 25, 82, 98, 82, 79, 100);
  printResult(rtan);
};

main();
