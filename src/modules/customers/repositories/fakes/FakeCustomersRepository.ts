import { uuid } from 'uuidv4';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';

import ICustomersRepository from '../ICustomersRepository';

class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async create({ email, name }: ICreateCustomerDTO): Promise<Customer> {
    const customer = new Customer();

    customer.id = uuid();
    customer.email = email;
    customer.name = name;

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const findUser = this.customers.find(customer => customer.email === email);

    return findUser;
  }

  public async findById(id: string): Promise<Customer> {
    return new Customer();
  }
}

export default FakeCustomersRepository;
