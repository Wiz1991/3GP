import 'reflect-metadata';
import { useContainer } from 'routing-controllers';
import { TsyringeAdapter } from '@/adapters/tsyringe.adapter';
import { Server } from '@/server';
import '@/middlewares/em-context.middleware';
import '@/middlewares/repositories.middleware';

useContainer(new TsyringeAdapter());

const main = async () => {
    const server = new Server();

    await server.bootstrap();
    await server.generateSwaggerDocs();

    server.app.on('close', async () => {
        server.cleanUp();
    });

    console.info('[API] Listening on http://localhost:5000/api');
};

main();
