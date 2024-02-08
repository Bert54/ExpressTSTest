import { HelloWorldService } from './hello-world.service';
import { Hello } from '../interfaces';

describe('HelloWorldService', () => {
  let helloWorldService: HelloWorldService;

  beforeEach(() => {
    helloWorldService = new HelloWorldService();
  });
  // --------------------------------
  // Test suite for getHello
  // --------------------------------
  describe('getHello', () => {
    it('should work', () => {
      const expected: string = 'Hello World!';
      const gotten: string = helloWorldService.getHello();

      expect(gotten).toStrictEqual(expected);
    });
  });

  // --------------------------------
  // Test suite for getHelloInterface
  // --------------------------------
  describe('getHelloInterface', () => {
    it('should work', () => {
      const expected: Hello = {
        hello: 'Hello World!',
      };
      const gotten: Hello = helloWorldService.getHelloInterface();

      expect(expected).toStrictEqual(gotten);
    });
  });
});
