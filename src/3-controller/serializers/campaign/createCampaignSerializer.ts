import { Validatable } from '@domain/common/serializers/abstractValidatable'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class InputCreateCampaign extends Validatable<InputCreateCampaign> {
  @IsString()
  @IsNotEmpty()
  dungeonMasterId!: string

  @IsString()
  @IsNotEmpty()
  name!: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  setting?: string
}
