class DistanceFee {
  distance: number
  fee: number
  constructor(distance: number, fee: number) {
    this.distance = distance
    this.fee = fee
  }

  calculate() {
    console.log('calculateDeliverDistanceFee...')
    if (this.distance <= 1000) {
      this.fee += 2
    } else if (this.distance > 1000) {
      console.log('this.distance > 1000')
      this.fee += 2 + Math.ceil((this.distance - 1000) / 500)
    }
    return this.fee
  }
}

export default DistanceFee
