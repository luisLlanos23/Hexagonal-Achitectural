export abstract class AEntity<T> {
  constructor(data?: Partial<T>) {
    if (data) {
      Object.keys(data).forEach((key) => {
        this[key] = data[key]
      })
    }
  }
}