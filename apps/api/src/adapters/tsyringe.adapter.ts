import { Action, ClassConstructor, IocAdapter } from 'routing-controllers';
import { container } from 'tsyringe';

export class TsyringeAdapter implements IocAdapter {
    get<T>(someClass: ClassConstructor<T>, _?: Action): T {
        return container.resolve<T>(someClass);
    }
}
