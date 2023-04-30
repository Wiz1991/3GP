import { Asset } from '@/entities/asset.entity';
import {
    EntityManager,
    EntityRepository,
    MikroORM,
} from '@mikro-orm/postgresql';
import { container, inject, injectable } from 'tsyringe';

@injectable()
export class AssetService {
    constructor(
        private readonly mikroOrm: MikroORM,
        private readonly em: EntityManager,
        private readonly repo: EntityRepository<Asset>
    ) {}

    public async hello() {
        console.log(await this.repo.findAll());
        return 'hello';
    }
}
