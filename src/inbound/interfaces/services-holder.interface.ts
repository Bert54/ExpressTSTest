import { HelloWorldService } from '../../core/hello-world/services';
import { ConfigService } from '../../common/config';

export interface ServicesHolder {
  configService: ConfigService;
  helloService: HelloWorldService;
}
