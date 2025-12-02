import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class EmptyBodyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body' && value === undefined) {
      return {};
    }
    return value;
  }
}