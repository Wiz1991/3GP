import { EntityManagerContext } from '@/middlewares/em-context.middleware';
import { ContextRepositoriesMiddleware } from '@/middlewares/repositories.middleware';
import { AssetService } from '@/services/asset.service';
import { Controller, Get, UseBefore } from 'routing-controllers';
import { injectable } from 'tsyringe';

@Controller()
// @UseBefore(EntityManagerContext, ContextRepositoriesMiddleware)
@injectable()
export class AssetController {
    constructor(private readonly assetService: AssetService) {
        console.log(assetService.hello());
    }

    @Get()
    public async hello() {
        return await this.assetService.hello();
    }
}
