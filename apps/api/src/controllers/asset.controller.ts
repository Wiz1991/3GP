import { AssetService } from '@/services/asset.service';
import { Controller, Get } from 'routing-controllers';
import { injectable } from 'tsyringe';

@Controller()
@injectable()
export class AssetController {
    constructor(private readonly assetService: AssetService) {
        console.log(assetService.hello());
    }

    @Get()
    public hello() {
        return this.assetService.hello();
    }
}
