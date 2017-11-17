import jsc from 'jsverify'
import { fizzbuzz } from './fizzbuzz'

test('should return the same number if it is not divisible by three or five', () => {
  expect(fizzbuzz(1))
    .toBe('1')
})

test('should return "Fizz" if the number is divisible by three', () => {
  expect(fizzbuzz(3))
    .toBe('Fizz')
})

test('should return "Buzz" if the number is divisible by five', () => {
  expect(fizzbuzz(5))
    .toBe('Buzz')
})

test('should return "FizzBuzz" if the number is divisible by three and five', () => {
  expect(fizzbuzz(15))
    .toBe('FizzBuzz')
})

const arbitraryNotMultipleOf = (...values) => {
  return jsc.suchthat(
    jsc.integer.smap(x => Math.abs(x)),
    value => values.every(x => value % x !== 0)
  )
}
const arbitraryMultipleOfThree = jsc.suchthat(
  multipleOf(3),
  value => value % 5 !== 0
)
const arbitraryMultipleOfFive = jsc.suchthat(
  multipleOf(5),
  value => value % 3 !== 0
)
const arbitraryMultipleOfThreeAndFive = multipleOf(15)

function multipleOf(x) {
  return jsc.integer.smap(value => Math.abs(value) * x)
}

jsc.property(
  'values not multiple of 3 or 5 should be returned as string',
  arbitraryNotMultipleOf(3, 5),
  value => {
    return fizzbuzz(value) === value.toString()
  }
)

jsc.property(
  'values multiple of 3 shoukd return "Fizz"',
  arbitraryMultipleOfThree,
  value => {
    return fizzbuzz(value) === 'Fizz'
  }
)

jsc.property(
  'values multiple of 5 shoukd return "Buzz"',
  arbitraryMultipleOfFive,
  value => {
    return fizzbuzz(value) === 'Buzz'
  }
)

jsc.property(
  'values multiple of 3 and 5 should return "FizzBuzz"',
  arbitraryMultipleOfThreeAndFive,
  value => {
    return fizzbuzz(value) === 'FizzBuzz'
  }
)
