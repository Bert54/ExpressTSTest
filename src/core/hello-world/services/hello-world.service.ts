import { Hello } from '../interfaces';

export class HelloWorldService {
  constructor() {}

  getHello(): string {
    return 'Hello World!';
  }

  getHelloInterface(): Hello {
    return {
      hello: 'Hello World!',
    };
  }
}
