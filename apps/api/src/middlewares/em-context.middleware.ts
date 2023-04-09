import { RequestContext } from '@mikro-orm/core';
import { MikroORM } from '@mikro-orm/postgresql';
import { NextFunction } from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { injectable } from 'tsyringe';

@injectable()
export class EntityManagerContext implements ExpressMiddlewareInterface {
    constructor(private readonly orm: MikroORM) {}

    use(_: Request, __: Response, next: NextFunction) {
        console.trace('Creating EM Context');
        RequestContext.create(this.orm.em, next);
    }
}
