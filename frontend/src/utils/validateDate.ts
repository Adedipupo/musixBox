type DAYS = [
  1,
  2,
  3,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31
];

export const days: DAYS = [
  1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];

type MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const months: MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const year = (): number[] => {
  const years = [];
  const currentYear = new Date().getFullYear();

  for (let i = 1970; i <= currentYear; i++) {
    years.push(i);
  }

  return years;
};

export const lastDays = [
  { month: 1, lastDay: 31 },
  { month: 2, lastDay: 28 },
  { month: 3, lastDay: 31 },
  { month: 4, lastDay: 30 },
  { month: 5, lastDay: 31 },
  { month: 6, lastDay: 30 },
  { month: 7, lastDay: 31 },
  { month: 8, lastDay: 31 },
  { month: 9, lastDay: 30 },
  { month: 10, lastDay: 31 },
  { month: 11, lastDay: 30 },
  { month: 12, lastDay: 31 },
];
