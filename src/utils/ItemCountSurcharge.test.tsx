import ItemCountSurcharge from './ItemCountSurcharge'

describe('ItemCountSurcharge', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let surcharge: any

  beforeEach(() => {
    surcharge = new ItemCountSurcharge(5, 10) // itemCount, fee
  })
  test('calculate() should add 0.5 for each item over 4', () => {
    expect(surcharge.calculate()).toBe(10.5)
  })

  test('calculate() should add 0.5 for each item over 4 + 1.2 if itemCount is over 12', () => {
    surcharge.itemCount = 13
    expect(surcharge.calculate()).toBe(15.7)
  })

  test('should not add surcharge for itemCount less than 5', () => {
    surcharge.itemCount = 4
    expect(surcharge.calculate()).toBe(10)
  })
})
