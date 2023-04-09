import { ObjectProperty, Property as PropertySchema } from '@/types/property';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Asset {
    @PrimaryKey()
    id: string;

    @Property({ type: 'jsonb', nullable: false })
    schema: Record<string, PropertySchema>;
}
