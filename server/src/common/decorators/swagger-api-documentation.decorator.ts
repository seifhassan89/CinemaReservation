import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { BaseApiResponse } from '../../common/dto/api-response/base-api-response.dto';
import { ErrorApiResponse } from '../dto/api-response/Error-api-response.dto';
import { SwaggerApiOptions } from '../interfaces/swagger-api-options.interface';
import { PaginateResultDto } from '../dto/pagination/paginate-result-dto';

export function SwaggerApiDocumentation<TModel extends Type<any>>(
  options: SwaggerApiOptions<TModel>,
) {
  const { summary, modelType, isArray = false, isPagination = false } = options;
  const dataSchema: SchemaObject = isArray
    ? {
        type: 'array',
        items: { oneOf: [{ $ref: getSchemaPath(modelType) }] },
      }
    : { oneOf: [{ $ref: getSchemaPath(modelType) }] };
  const responseType = isPagination ? PaginateResultDto : BaseApiResponse;
  return applyDecorators(
    ApiOperation({ summary: summary }),
    ApiExtraModels(
      BaseApiResponse,
      ErrorApiResponse,
      PaginateResultDto,
      modelType,
    ),
    ApiResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(responseType) },
          {
            properties: {
              data: dataSchema,
            },
          },
        ],
      },
    }),
  );
}
