"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const postgresql_1 = require("@mikro-orm/postgresql");
const reflection_1 = require("@mikro-orm/reflection");
const path_1 = require("path");
const asset_resolver_1 = require("@/resolvers/asset.resolver");
const asset_1 = require("@/entities/asset");
const type_graphql_1 = require("type-graphql");
const fastify_1 = require("fastify");
const mercurius_1 = __importDefault(require("mercurius"));
async function bootstrap() {
    // connect to db
    const orm = await postgresql_1.MikroORM.init({
        entities: [asset_1.Asset],
        metadataProvider: reflection_1.TsMorphMetadataProvider,
        metadataCache: {
            pretty: true,
        },
        debug: ['query-params'],
        dbName: 'GPDB',
        driver: postgresql_1.PostgreSqlDriver,
        user: 'postgres',
        password: 'qwerty',
    });
    // Run migrations
    const generator = orm.getSchemaGenerator();
    await generator.dropSchema();
    await generator.createSchema();
    await generator.updateSchema();
    // Generate gql schema
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [asset_resolver_1.AssetResolver],
        emitSchemaFile: (0, path_1.resolve)(__dirname, 'schema.gql'),
    });
    // start web server
    const app = (0, fastify_1.fastify)();
    const opts = {
        schema,
        graphiql: true,
    };
    app.register(mercurius_1.default, opts);
    app.listen({ port: 5000 });
}
bootstrap();
