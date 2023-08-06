import { Type } from '@nestjs/common';

export interface SwaggerApiOptions<TModel extends Type<any>> {
  summary: string;
  modelType: TModel;
  isArray?: boolean;
  isPagination?: boolean;
}
