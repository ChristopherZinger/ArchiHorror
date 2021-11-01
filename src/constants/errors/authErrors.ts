// create new document errors
export enum AUTH_ERRORS {
  DEFAULT = 'AUTH_ERROR',
  IS_NOT_LOGGED_IN = 'AUTH_MUST_BE_LOGGED_IN',
}

export class AuthError extends Error {
  constructor(msg: string, name: AUTH_ERRORS=AUTH_ERRORS.DEFAULT) {
    super(msg);
    this.name = name
  }
};

