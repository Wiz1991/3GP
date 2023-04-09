import { RequestContext } from '@mikro-orm/core';
import {
    EntityManager,
    EntityRepository,
    MikroORM,
    PostgreSqlDriver,
} from '@mikro-orm/postgresql';
import { NextFunction } from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { container, injectable } from 'tsyringe';

@injectable()
export class ContextRepositoriesMiddleware
    implements ExpressMiddlewareInterface
{
    constructor(private readonly orm: MikroORM) {}

    use(_: Request, __: Response, next: NextFunction) {
        const em =
            RequestContext.getEntityManager() as EntityManager<PostgreSqlDriver>;

        container.register(EntityManager, {
            useValue: em,
        });

        const entities = this.orm.getMetadata();
        Object.values(entities).map((meta) => {
            container.register(EntityRepository<typeof meta.class>, {
                useValue: em.getRepository(meta.class),
            });
        });

        console.log(`Created repositories for ${em._id}`);
        next();
    }
}
