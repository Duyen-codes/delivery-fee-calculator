import DistanceFee from './DistanceFee'

describe('DistanceFee', () => {
  let distanceFee: any

  beforeEach(() => {
    distanceFee = new DistanceFee(500, 5) // distance = 500, fee = 5
  })

  test('should set distance and fee properties', () => {
    expect(distanceFee.distance).toBe(500)
    expect(distanceFee.fee).toBe(5)
  })

  test('calculate() should add 2 to fee if distance <= 1000', () => {
    distanceFee.distance = 900
    expect(distanceFee.calculate()).toBe(7)
  })

  test('calculate() should add 2 + 1 for every additional 500m to fee if distance > 1000', () => {
    distanceFee.distance = 1500
    expect(distanceFee.calculate()).toBe(8)
  })
})
