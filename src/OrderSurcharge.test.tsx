import OrderSurcharge from './OrderSucharge'

describe('OrderSurcharge', () => {
  describe('calculate', () => {
    it('should add a surcharge of 10 - cartValue when the cartValue is less than 10', () => {
      const surcharge = new OrderSurcharge(5, 0)
      expect(surcharge.calculate()).toEqual(5)
    })

    it('should not add a fee when the cartValue is equal to to greater than 10 ', () => {
      const surcharge = new OrderSurcharge(10, 0)
      expect(surcharge.calculate()).toEqual(0)
    })
    it('should not decrease the fee when cartValue is greater than 10', () => {
      const surcharge = new OrderSurcharge(15, 5)
      expect(surcharge.calculate()).toEqual(5)
    })
  })
})
