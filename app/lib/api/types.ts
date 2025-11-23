export interface ApiError {
  message: string;
  statusCode: number;
  statusCodeName: string;
  errors?: Record<string, any>;
}