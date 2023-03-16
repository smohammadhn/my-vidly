module.exports = {
  absolute: (num) => {
    return num >= 0 ? num : -num
  },

  greet: (name) => {
    return 'Welcome ' + name
  },

  getCurrencies: () => {
    return ['USD', 'AUD', 'EUR']
  },

  getProducts: (productId) => {
    return { id: productId, price: 10, category: 'test' }
  },

  registerUser: (username) => {
    if (!username) throw new Error('Username must be defined.')

    return { id: new Date().getTime(), username }
  },

  fizzBuzz: (input) => {
    if (!input || typeof input !== 'number')
      throw new Error('Input must be a number')

    if (input % 3 === 0 && input % 5 === 0) return 'FizzBuzz'

    if (input % 3 === 0) return 'Fizz'

    if (input % 5 === 0) return 'Buzz'

    return input
  },
}
