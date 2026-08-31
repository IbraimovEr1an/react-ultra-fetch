class UltraFetchError extends Error {
  constructor(text: string, status?: number) {
    super(text);
    this.name = "UltraFetchError";
    Object.setPrototypeOf(this, UltraFetchError.prototype);
  }
}

export default UltraFetchError;
