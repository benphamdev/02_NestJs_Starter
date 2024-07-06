export class BaseResponse<Type> {
	statusCode: number;
	message: string;
	data: Type;

	constructor(statusCode: number, message: string, data: Type) {
		this.statusCode = statusCode;
		this.message = message;
		this.data = data;
	}

	static success<Type>(statusCode: number, message: string, data: Type) {
		return new BaseResponse<Type>(statusCode, message, data);
	}

	static error<Type>(statusCode: number, message: string, data: Type) {
		return new BaseResponse<Type>(statusCode, message, data);
	}
}