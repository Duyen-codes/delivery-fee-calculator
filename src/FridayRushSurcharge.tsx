class FridayRushSurcharge {
  time: Date
  fee: number
  constructor(time: Date, fee: number) {
    this.time = time
    this.fee = fee
  }
  apply() {
    if (
      this.time.getUTCHours() >= 13 &&
      this.time.getUTCHours() <= 17 &&
      this.time.getUTCDay() === 5
    ) {
      this.fee *= 1.2
    }
    return this.fee
  }
}

export default FridayRushSurcharge
