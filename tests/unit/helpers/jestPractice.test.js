const methods = require('../../../helpers/jestPractice')

// number testing
describe('absolute', () => {
  it('should return a positive number if input is positive', () => {
    const result = methods.absolute(1)
    expect(result).toBe(1)
  })

  it('should return a positive number if input is negative', () => {
    const result = methods.absolute(-1)
    expect(result).toBe(1)
  })

  it('should return 0 number if input is 0', () => {
    const result = methods.absolute(0)
    expect(result).toBe(0)
  })
})

// string testing
describe('greet', () => {
  it('should return the greeting message', () => {
    const result = methods.greet('Mohammad')
    expect(result).toContain('Mohammad')
  })
})

// array testing
describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = methods.getCurrencies()
    expect(result).toEqual(expect.arrayContaining(['AUD', 'USD', 'EUR']))
  })
})

// object testing
describe('getProducts', () => {
  it('should have desired properties', () => {
    const result = methods.getProducts(1)

    expect(result).toMatchObject({
      id: 1,
      price: expect.any(Number),
      category: expect.any(String),
    })
  })
})

// exception testing
describe('registerUser', () => {
  it('should throw if username is falsy', () => {
    const args = [null, undefined, NaN, '', 0, false]
    args.forEach((e) => {
      expect(() => {
        methods.registerUser(e)
      }).toThrow()
    })
  })

  it('should return a user object properly', () => {
    const result = methods.registerUser('Mohammad')

    expect(result).toMatchObject({
      username: 'Mohammad',
      id: expect.any(Number),
    })
    expect(result.id).toBeGreaterThanOrEqual(0)
  })
})

// exercise 1 : test FizzBuzz
describe('fizzBuzz', () => {
  it('should throw if input is anything but a number', () => {
    const invalidArgs = ['string', null, undefined, '', NaN, true, {}]

    invalidArgs.forEach((e) => {
      expect(() => {
        methods.fizzBuzz(e)
      }).toThrow()
    })
  })

  it('should return FizzBuzz if input is divisible by both 3 and 5', () => {
    expect(methods.fizzBuzz(15)).toBe('FizzBuzz')
  })

  it('should return Fizz if input is just divisible by 3', () => {
    expect(methods.fizzBuzz(9)).toBe('Fizz')
  })

  it('should return Buzz if input is just divisible by 5', () => {
    expect(methods.fizzBuzz(10)).toBe('Buzz')
  })

  it('should return input if input is not divisible by 3 or 5', () => {
    expect(methods.fizzBuzz(7)).toBe(7)
  })
})
