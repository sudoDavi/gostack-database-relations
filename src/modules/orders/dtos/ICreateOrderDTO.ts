import Customer from '@modules/customers/infra/typeorm/entities/Customer';

interface IProduct {
  // I changed the product id key from product_id to id
  id: string;
  price: number;
  quantity: number;
}

export default interface ICreateOrderDTO {
  customer: Customer;
  products: IProduct[];
}
