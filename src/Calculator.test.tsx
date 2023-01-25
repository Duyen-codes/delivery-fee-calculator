import Calculator from './Calculator'

describe('Calculator', () => {
  let calculator: any
  beforeEach(() => {
    calculator = new Calculator(20, 1500, 8, new Date('2023-01-24T11:00:00Z')) //cartValue, distance, itemCount, time
  })
  test('calculates the correct delivery fee', () => {
    expect(calculator.getDeliverFee()).toEqual(5)
  })

  test('calculates the correct delivery fee when cartValue is less than 10', () => {
    calculator = new Calculator(5, 1000, 8, new Date('2023-01-24T11:00:00Z'))
    expect(calculator.getDeliverFee()).toEqual(9)
  })

  test('calculates the correct delivery fee when distance is greater than 1000', () => {
    calculator = new Calculator(20, 1499, 4, new Date('2023-01-24T11:00:00Z'))
    expect(calculator.getDeliverFee()).toEqual(3)
  })

  test('calculates the correct delivery fee when itemCount is greater than 12', () => {
    calculator = new Calculator(20, 1500, 15, new Date('2023-01-24T11:00:00Z'))
    expect(calculator.getDeliverFee()).toEqual(9.7)
  })

  test('applies FridayRushSurcharge correctly', () => {
    calculator = new Calculator(20, 1500, 8, new Date('2023-01-20T17:00:00Z'))
    expect(calculator.getDeliverFee()).toEqual(6)
  })

  test('applies MaximumFee correctly', () => {
    calculator = new Calculator(20, 2000, 20, new Date('2023-01-20T17:00:00Z'))
    expect(calculator.getDeliverFee()).toEqual(15)
  })

  test('applies FreeDelivery correctly', () => {
    calculator = new Calculator(100, 1500, 8, new Date('2023-01-24T11:00:00Z'))
    expect(calculator.getDeliverFee()).toEqual(0)
  })
})
