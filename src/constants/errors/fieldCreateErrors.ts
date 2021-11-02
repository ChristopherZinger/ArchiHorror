export enum FIELD_CREATION_ERRORS {
  DEFAULT= 'FIELD_CREATION_ERROR',
}

export class FieldCreationError extends Error {
  constructor(msg: string, name: FIELD_CREATION_ERRORS=FIELD_CREATION_ERRORS.DEFAULT) {
    super(msg);
    this.name = name
  }
};