import { Asset } from '@/entities/asset';
import { Arg, Query, Resolver } from 'type-graphql';

@Resolver(Asset)
export class AssetResolver {
    @Query(() => Asset)
    async asset() {
        return new Asset();
    }
}
g