import { Nullable } from "./nullable.type";

export interface Repository<T> {
  create(product: { name: string }): Promise<T>
  getById(id: string): Promise<Nullable<T>>
}
