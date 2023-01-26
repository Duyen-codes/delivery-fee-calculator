import OrderSurcharge from './OrderSucharge'
import DistanceFee from './DistanceFee'
import ItemCountSurcharge from './ItemCountSurcharge'
import FridayRushSurcharge from './FridayRushSurcharge'
import MaximumFee from './MaximumFee'
import FreeDelivery from './FreeDelivery'

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

  calculateDeliverFee(): number {
    const orderSurcharge = new OrderSurcharge(this.cartValue, this.fee)
    this.fee = orderSurcharge.calculate()
    const distanceFee = new DistanceFee(this.distance, this.fee)
    this.fee = distanceFee.calculate()
    const itemCountSurcharge = new ItemCountSurcharge(this.itemCount, this.fee)
    this.fee = itemCountSurcharge.calculate()
    const fridayRushSurcharge = new FridayRushSurcharge(this.time, this.fee)
    this.fee = fridayRushSurcharge.apply()
    const maximumFee = new MaximumFee(this.fee)
    this.fee = maximumFee.apply()
    const freeDelivery = new FreeDelivery(this.cartValue, this.fee)
    this.fee = freeDelivery.apply()
    return this.fee
  }
}

export default Calculator
