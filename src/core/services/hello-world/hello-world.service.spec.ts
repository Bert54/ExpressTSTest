import { HelloWorldService } from './hello-world.service';

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
      const result: string = helloWorldService.getHello();

      expect(result).toStrictEqual('Hello World!');
    });
  });
});
