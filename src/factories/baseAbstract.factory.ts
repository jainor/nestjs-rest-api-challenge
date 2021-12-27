export abstract class AbstractFactory<T> {
  abstract make(input?: any): Promise<T>;
  abstract makeMany(factorial: number, input: any): Promise<T[]>;
}
