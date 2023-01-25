class MaximumFee {
  fee: number

  constructor(fee: number) {
    this.fee = fee
  }
  apply() {
    if (this.fee > 15) {
      this.fee = 15
    }
    console.log('this.fee: ', this.fee)
    return this.fee
  }
}

export default MaximumFee
