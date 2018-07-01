export class Address {
  id: number;
  name: string;
  address: {
    street?: string,
    suite?: string,
    city?: string,
    zipcode?: string
  };
}
