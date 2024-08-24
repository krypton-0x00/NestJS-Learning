import { PartialType } from '@nestjs/mapped-types'; //bun i @nestjs/mapped-types
import { CreateUserDto } from './create-user.dto';
export class UpdateUserDto extends PartialType(CreateUserDto) {} //extends CreateUserDto but all fields are not req.. ie. all fields are optional/
