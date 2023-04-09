import { Asset } from '@/entities/asset.entity';
import {
    EntityManager,
    EntityRepository,
    MikroORM,
} from '@mikro-orm/postgresql';
import { container, inject, injectable } from 'tsyringe';

@injectable()
export class AssetService {
    constructor(private readonly mikroOrm: MikroORM) {}

    public hello() {
        return 'hello';
    }
}
