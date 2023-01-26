class OrderSurcharge {
  cartValue: number
  fee: number
  constructor(cartValue: number, fee: number) {
    this.cartValue = cartValue
    this.fee = fee
  }
  calculate() {
    if (this.cartValue < 10) {
      this.fee += 10 - this.cartValue
    }
    return this.fee
  }
}

export default OrderSurcharge
