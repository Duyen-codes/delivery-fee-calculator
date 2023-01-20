'use strict'

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

  checkCartValue() {
    if (this.cartValue < 10) {
      this.fee += 10 - this.cartValue
      this.fee += 2
      console.log('fee: ', this.fee)
    }
  }

  checkDistance() {
    if (this.distance > 1000) {
      this.fee += Math.ceil((this.distance - 1000) / 500)
    }
  }

  checkItemCount() {
    if (this.itemCount >= 5) {
      this.fee += (this.itemCount - 4) * 0.5

      if (this.itemCount > 12) {
        this.fee += 1.2
      }
    }
  }

  checkTime() {
    if (
      this.time.getUTCHours() >= 15 &&
      this.time.getUTCHours() <= 19 &&
      this.time.getUTCDay() === 5
    ) {
      console.log('time.getUTCHours() ', this.time.getUTCHours())
      this.fee *= 1.2
      console.log('Friday 15-19: ')
    }
  }
  checkFee() {
    if (this.fee > 15) {
      this.fee = 15
    }
  }
  isCartValueMoreThan100() {
    if (this.cartValue >= 100) {
      this.fee = 0
    }
  }

  getDeliverFee() {
    this.checkCartValue()
    this.checkDistance()
    this.checkItemCount()
    this.checkTime()
    this.checkFee()
    this.isCartValueMoreThan100()
    return this.fee
  }
}

export default Calculator
