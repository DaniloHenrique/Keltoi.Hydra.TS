export enum ResultType {
  Success=200,
  Created=201,
  Updated=202,
  Deleted=204,
  BadRequest=400,
  NotFound = 404,
  Validation = 422,
  InternalServerError = 500,
  Unauthorized = 401,
  Forbidden = 403
}