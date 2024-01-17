import { Nullable } from '../types/nullable.type';
import { WithNoId } from '../types/with-no-id.type';

export interface Repository<T> {
  create(product: WithNoId<T>): Promise<T>
  getById(id: string): Promise<Nullable<T>>
}
