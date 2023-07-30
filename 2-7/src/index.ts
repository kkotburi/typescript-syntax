interface Student {
  name: string;
  age: number;
  scores: {
    korean: number;
    math: number;
    english: number;
    society: number;
    science: number;
  };
}

const createStudent = (
  name: string,
  age: number,
  korean: number,
  math: number,
  english: number,
  society: number,
  science: number
): Student => {
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

const calculateAverage = (student: Student): number => {
  const sum =
    student.scores.korean +
    student.scores.math +
    student.scores.english +
    student.scores.society +
    student.scores.science;
  const average = sum / Object.keys(student.scores).length;
  // Object.keys() : 특정 속성을 이루는 key 값들을 배열로 반환
  return average;
};

const assignGrade = (average: number): string => {
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

const printResult = (student: Student): void => {
  const average = calculateAverage(student);
  const grade = assignGrade(average);
  console.log(
    `${student.name}(${student.age}세)의 전체 평균: ${average.toFixed(
      2
    )}, 학점: ${grade}`
  );
};

const main = (): void => {
  const rtan = createStudent("Rtan", 25, 82, 98, 82, 79, 100);
  printResult(rtan);
};

main();
