import { MikroORM } from '@mikro-orm/postgresql';
import path from 'path';
import { Application } from 'express';
import {
    createExpressServer,
    getMetadataArgsStorage,
} from 'routing-controllers';
import { container } from 'tsyringe';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { serve, setup } from 'swagger-ui-express';
import { EntityManagerContext } from '@/middlewares/em-context.middleware';

export class Server {
    public app: Application;

    public async openDbConn() {
        const orm = await MikroORM.init();

        const generator = orm.getSchemaGenerator();
        await generator.dropSchema();
        await generator.createSchema();
        await generator.updateSchema();

        container.register(MikroORM, {
            useValue: orm,
        });
    }

    public async cleanUp() {
        const orm = container.resolve(MikroORM);

        await orm.close();
    }

    public async generateSwaggerDocs() {
        const storage = getMetadataArgsStorage();
        const spec = routingControllersToSpec(
            storage,
            {},
            {
                info: {
                    title: '3GP - API',
                    version: '0.0.1',
                },
            }
        );

        this.app.use('/docs', serve, setup(spec));
    }

    public async bootstrap() {
        await this.openDbConn();

        this.app = createExpressServer({
            routePrefix: 'api',
            controllers: [
                path.join(__dirname, './controllers/*.controller.ts'),
            ],
            middlewares: [path.join(__dirname, './middlewares/*')],
            cors: true,
            classTransformer: true,
            validation: true,
        });

        this.app.listen(5000);
    }
}
