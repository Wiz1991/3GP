import 'reflect-metadata';
import { PostgreSqlDriver, MikroORM } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { resolve } from 'path';
import { AssetResolver } from '@/resolvers/asset.resolver';
import { Asset } from '@/entities/asset';
import { buildSchema } from 'type-graphql';
import { FastifyRegisterOptions, fastify } from 'fastify';
import mercurius, { MercuriusOptions } from 'mercurius';

async function bootstrap() {
    // connect to db
    const orm = await MikroORM.init({
        entities: [Asset],
        metadataProvider: TsMorphMetadataProvider,
        metadataCache: {
            pretty: true,
        },
        debug: ['query-params'],
        dbName: 'GPDB',
        driver: PostgreSqlDriver,
        user: 'postgres',
        password: 'qwerty',
    });

    // Run migrations
    const generator = orm.getSchemaGenerator();
    await generator.dropSchema();
    await generator.createSchema();
    await generator.updateSchema();

    // Generate gql schema
    const schema = await buildSchema({
        resolvers: [AssetResolver],
        emitSchemaFile: resolve(__dirname, 'schema.gql'),
    });

    // start web server

    const app = fastify();

    const opts: FastifyRegisterOptions<MercuriusOptions> = {
        schema,
        graphiql: true,
    };

    app.register(mercurius, opts);

    app.listen({ port: 5000 });
}

bootstrap();
