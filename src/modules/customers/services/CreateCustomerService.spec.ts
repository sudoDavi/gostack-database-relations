import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';

describe('CreateCustomer', () => {
  it('should create a customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomer = new CreateCustomerService(fakeCustomersRepository);

    const customer = await createCustomer.execute({
      email: 'test@email.com',
      name: 'test',
    });

    expect(customer.email).toBe('test@email.com');
    expect(customer.name).toBe('test');
  });
});
