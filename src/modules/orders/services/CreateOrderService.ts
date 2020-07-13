import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    if (!products || products.length === 0) throw new AppError('No products');

    const productsInDB = await this.productsRepository.findAllById(products);

    if (productsInDB.length !== products.length) {
      throw new AppError('Product not found');
    }

    const customer = await this.customersRepository.findById(customer_id);

    if (!customer || !customer_id) throw new AppError('Invalid Customer ID');

    const updatedProducts = productsInDB.map(product => {
      const cProduct = products.find(prod => prod.id === product.id);

      if (!cProduct) throw new AppError('Product not found');

      if (cProduct.quantity > product.quantity)
        throw new AppError('Quantidade insuficiente em estoque');

      if (cProduct.quantity < 1 || !cProduct.quantity)
        throw new AppError('Quantidade insuficiente');

      return {
        product_id: product.id,
        price: product.price,
        quantity: cProduct.quantity,
      };
    });

    await this.productsRepository.updateQuantity(products);

    const order = await this.ordersRepository.create({
      customer,
      products: updatedProducts,
    });

    return order;
  }
}

export default CreateOrderService;
