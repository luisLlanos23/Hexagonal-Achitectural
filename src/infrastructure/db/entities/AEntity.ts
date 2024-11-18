export abstract class AEntity<T> {
  constructor(data: Partial<T>) {
    if (data) {
      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined) { this[key] = data[key] }
      })
    }
  }
}