import { globalStore} from 'utils';

function getDiscountedPrice(price) {
  const { event } = globalStore.get();
  if (!event) return price;
  return price - (event.discountPercent * price / 100);
}

function getDiscount() {
  const { event } = globalStore.get();
  return event ? event.discountPercent : 0 ;
}


export {
  getDiscountedPrice,
  getDiscount,
}
