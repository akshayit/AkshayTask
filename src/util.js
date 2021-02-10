import {
  getTotal
} from "./actions/cartTotal";

export const formatCurrency = (num) => {
  return "Rs " + Number(num.toFixed(1)).toLocaleString() + " ";
}

export const calculateTotal = (items) => {
  let total = getTotal(items).then(async (data) => {
    let t = await data
    return t
  })
  console.log(total)
  return "Rs " + total + " ";
}
