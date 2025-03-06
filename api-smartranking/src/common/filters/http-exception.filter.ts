import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, HttpException, Logger } from "@nestjs/common";
import { Request, Response } from 'express';


@Catch()
export class AllExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(AllExceptionFilter.name);
    catch(exception: unknown, host: ArgumentsHost) {        
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();   

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
        exception instanceof HttpException
        ? exception.getResponse()
        : exception instanceof Error
        ? exception.message
        : 'Internal server error';

        this.logger.error(`Http status: ${status} Error message: ${JSON.stringify(message)}`);

        response.status(status).json({  
            statusCode: status,
            timestamp: new Date().toISOString(),    
            path: request.url,
            error: message
        });
    }

    /*private readonly logger = new Logger(AllExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const nessage = exception instanceof HttpException ? exception.getResponse() : exception;             
        
        this.logger.error(`Http status: ${status} Error message: ${JSON.stringify(nessage)}`);
        
        response.status(status).json({        
            timestamp: new Date().toISOString(),
            path: request.url, 
            error: nessage
        });
    }*/
}