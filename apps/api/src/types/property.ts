import { Field, InterfaceType, ObjectType } from 'type-graphql';

export enum PropertyType {
    Text,
    Ref,
    Number,
    Object,
}

@InterfaceType()
export abstract class Property {
    @Field()
    type: PropertyType;

    @Field()
    key: string;
}

export class TextProperty extends Property {
    type: PropertyType.Text;
}

export class RefProperty extends Property {
    type: PropertyType.Ref;
    ref: string;
}

export class ObjectProperty extends Property {
    type: PropertyType.Object;

    properties: Property[];
}
