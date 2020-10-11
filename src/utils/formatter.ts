const formatCurrency = (price: number) => {
  return Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
  })
    .format(price)
    .replace(",00", "")
}

export default formatCurrency
