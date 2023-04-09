import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default defineConfig({
    entities: ['./dist/entities/*.entity.js'],
    entitiesTs: ['./src/entities/*.entity.ts'],
    metadataProvider: TsMorphMetadataProvider,
    metadataCache: {
        pretty: true,
    },
});
