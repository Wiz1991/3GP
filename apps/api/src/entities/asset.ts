import { Entity, PrimaryKey } from '@mikro-orm/core';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class Asset {
    @PrimaryKey()
    @Field(() => ID)
    id: string;
}
