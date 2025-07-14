export default class CustomException extends Error {
  /**
   * @param {string} title - The title of the error.
   * @param {string} message - The error message.
   * @param {string} [stack] - The stack trace of the error (optional).
   */
  constructor({ title, message, stack, status }) {
    super(message);
    this.title = title;
    this.message = message;
    this.stack = stack; // If no stack is provided, use the default stack trace
    this.status = status; // Default status code for server errors
  }
  toJSON() {
    return {
      title: this.title,
      message: this.message,
      stack: this.stack,
      status: this.status,
    };
  }
  toJsonString() {
    return JSON.stringify({
      title: this.title,
      message: this.message,
      stack: this.stack,
      status: this.status,
    });
  }
}
