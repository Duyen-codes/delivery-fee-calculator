class ItemCountSurcharge {
  itemCount: number
  fee: number
  constructor(itemCount: number, fee: number) {
    this.itemCount = itemCount
    this.fee = fee
  }

  calculate() {
    if (this.itemCount >= 5) {
      this.fee += (this.itemCount - 4) * 0.5
      if (this.itemCount > 12) {
        this.fee += 1.2
      }
    }
    return this.fee
  }
}

export default ItemCountSurcharge
