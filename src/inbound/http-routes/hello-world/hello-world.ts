import { HelloWorldService } from '../../../core/services/hello-world';

export function getHello(helloWorldService: HelloWorldService) {
  return (_: any, res: any) => {
    const hello: string = helloWorldService.getHello();
    res.send(hello);
  };
}
