export function fizzbuzz (num) {
  const divisibleByThree = isDivisibleBy(num, 3)
  const divisibleByFive = isDivisibleBy(num, 5)

  if (divisibleByThree && divisibleByFive) return 'FizzBuzz'
  if (divisibleByThree) return 'Fizz'
  if (divisibleByFive) return 'Buzz'

  return num.toString()
}

const isDivisibleBy = (x, y) => {
  return x % y === 0
}