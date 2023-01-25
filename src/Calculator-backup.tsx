class Calculator {
  fee: number
  cartValue: number
  distance: number
  itemCount: number
  time: Date
  constructor(
    cartValue: number,
    distance: number,
    itemCount: number,
    time: Date,
  ) {
    this.fee = 0
    this.cartValue = cartValue
    this.distance = distance
    this.itemCount = itemCount
    this.time = time
  }

  // Small order surcharge
  calculateOrderSurcharge() {
    console.log('calculateOrderSurcharge...')
    console.log('this.fee: ', this.fee)
    console.log('this.cartValue', this.cartValue)

    if (this.cartValue < 10) {
      console.log('cartValue < 10')
      this.fee += 10 - this.cartValue
    }
    console.log('this.fee: ', this.fee)
  }

  // Distance fee
  calculateDeliverDistanceFee() {
    console.log('calculateDeliverDistanceFee...')
    console.log('this.fee: ', this.fee)
    if (this.distance <= 1000) {
      this.fee += 2
    } else if (this.distance > 1000) {
      console.log('this.distance > 1000')
      this.fee += 2 + Math.ceil((this.distance - 1000) / 500)
    }
    console.log('fee after calculateDeliverDistanceFee ', this.fee)
  }

  // Item count surcharge
  calculateItemCountSurcharge() {
    console.log('calculateItemCountSurcharge...')
    if (this.itemCount >= 5) {
      const countSurcharge = (this.itemCount - 4) * 0.5
      console.log('countSurcharge', countSurcharge)
      this.fee += (this.itemCount - 4) * 0.5
      if (this.itemCount > 12) {
        this.fee += 1.2
      }
    }
    console.log('fee after calculateItemCountSurcharge: ', this.fee)
  }

  // Friday rush surcharge
  applyFridayRushSurcharge() {
    console.log('applyFridayRushSurcharge...')
    console.log('this.time: ', this.time)
    if (
      this.time.getUTCHours() >= 13 &&
      this.time.getUTCHours() <= 17 &&
      this.time.getUTCDay() === 5
    ) {
      this.fee *= 1.2
    }
    console.log('this.fee: ', this.fee)
  }

  // Maximum Fee
  maximumFee() {
    console.log('maximumFee...')
    if (this.fee > 15) {
      this.fee = 15
    }
    console.log('this.fee: ', this.fee)
  }

  // Free Delivery
  checkFreeDelivery() {
    console.log('checkFreeDelivery...')
    if (this.cartValue >= 100) {
      this.fee = 0
    }
    console.log('this.fee: ', this.fee)
  }

  getDeliverFee() {
    this.calculateOrderSurcharge()
    this.calculateDeliverDistanceFee()
    this.calculateItemCountSurcharge()
    this.applyFridayRushSurcharge()
    this.maximumFee()
    this.checkFreeDelivery()
    console.log('this.fee in getDeliverFee(): ', this.fee)
    return this.fee
  }
}

export default Calculator
