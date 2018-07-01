export class Address {
  constructor(id, name, address) {
    this.id = id;
    this.name = name;
    this.address = address;
  }
  id: number;
  name: string;
  address: {
    street?: string,
    suite?: string,
    city?: string,
    zipcode?: string
  };
}
