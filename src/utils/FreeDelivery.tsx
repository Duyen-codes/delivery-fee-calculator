class FreeDelivery {
  cartValue: number
  fee: number
  constructor(cartValue: number, fee: number) {
    this.cartValue = cartValue
    this.fee = fee
  }
  apply() {
    if (this.cartValue >= 100) {
      this.fee = 0
    }
    return this.fee
  }
}

export default FreeDelivery
