const calculateDeliveryFee = (
  cartValue: number,
  itemCount: number,
  distance: number,
  time: Date,
) => {
  let fee = 0

  if (cartValue < 10) {
    fee += 10 - cartValue
  }

  fee += 2

  if (distance > 1000) {
    fee += Math.ceil((distance - 1000) / 500)
  }

  if (itemCount >= 5) {
    fee += (itemCount - 4) * 0.5

    if (itemCount > 12) {
      fee += 1.2
    }
  }

  if (
    time.getUTCHours() >= 15 &&
    time.getUTCHours() <= 19 &&
    time.getUTCDay() === 5
  ) {
    console.log('time.getUTCHours() ', time.getUTCHours())
    fee *= 1.2
    console.log('Friday 15-19: ')
  }
  if (fee > 15) {
    fee = 15
  }
  if (cartValue >= 100) {
    fee = 0
  }
  return fee
}

export default calculateDeliveryFee
