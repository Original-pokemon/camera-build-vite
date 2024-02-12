export const getProductPriceFormat = (priceValue: number) => priceValue.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
