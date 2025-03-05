import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, HttpException, Logger } from "@nestjs/common";

@Catch()
export class AllExceptionFilter implements ExceptionFilter{

    private readonly logger = new Logger(AllExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const nessage = exception instanceof HttpException ? exception.getResponse() : ''

        this.logger.error(`Http status: ${status} Error message: ${JSON.stringify(nessage)}`);

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url, 
            error: nessage
        });
    }
}