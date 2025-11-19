export class ApiError extends Error {
    statusCode: number;
    details?: any;
  
    constructor(message: string, statusCode = 400, details?: any) {
      super(message);
      this.statusCode = statusCode;
      this.details = details;
    }
  
    static badRequest(msg: string, details?: any) {
      return new ApiError(msg, 400, details);
    }
  
    static unauthorized(msg = "Unauthorized") {
      return new ApiError(msg, 401);
    }
  
    static notFound(msg = "Resource not found") {
      return new ApiError(msg, 404);
    }
  
    static internal(msg = "Internal server error") {
      return new ApiError(msg, 500);
    }
  
    toResponse() {
      return {
        success: false,
        message: this.message,
        statusCode: this.statusCode,
        details: this.details
      };
    }
  }