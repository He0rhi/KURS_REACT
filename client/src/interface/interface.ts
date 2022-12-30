export interface IProduct {
  id_product: number;
  name: string;
  price: number;
  description: string;
  img: string;
  category: string;
  color: string;
  years: number;
  sale: number;
  count: number;
  count_in_shop: number;
  unique_property: string;
  comment: any;
}

export interface IOrders {
  id_buy: number;
  id_product: number;
  id_person: number;
  name: string;
  img: string;
  price: number;
  category: string;
  color: string;
  years: number;
  description: string;
  sale: number;
  count: number;
  count_in_shop: number;
  unique_property: string;
  dateorders: Date;
  isbuy: boolean;
}
export interface IBasket {
  id_basket: number;
  id_product: number;
  id_person: number;
  name: string;
  img: string;
  price: number;
  category: string;
  color: string;
  years: number;
  description: string;
  sale: number;
  count: number;
  count_in_shop: number;
  unique_property: string;
}

export interface IProductInterface {
  product: IProduct[];
  productID: IProduct;
  message: string | null;
  loading: boolean;
  sum: number;
  basket: IBasket[];
  basket_length: number;
  orders: IOrders[];
}

export interface IAddBasket {
  id_product: number;
  id_person: number;
  count: number;
}
export interface IOrder {
  id_person: number;
  id_product: number;
  count: number;
  dateorders: any;
  mobile: string;
  gmail: string;
  place: string;
}
export interface IDeleteBasket {
  id_product: number;
  id_person: number;
  id_basket: number;
}
export interface IOrderUpdate {
  id_buy: number;
  isbuy: boolean;
  id_person: number;
}
