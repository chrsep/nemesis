const formatCurrency = (price: number) => {
  return Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
  }).format(price)
}

export default formatCurrency
