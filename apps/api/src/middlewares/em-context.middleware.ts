import { RequestContext } from '@mikro-orm/core';
import { MikroORM } from '@mikro-orm/postgresql';
import { NextFunction } from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { injectable } from 'tsyringe';

@injectable()
@Middleware({ type: 'before', priority: 999 })
export class EntityManagerContext implements ExpressMiddlewareInterface {
    constructor(private readonly orm: MikroORM) {}

    use(_: Request, __: Response, next: NextFunction) {
        console.log('Creating EM Context');
        RequestContext.create(this.orm.em, next);
    }
}
