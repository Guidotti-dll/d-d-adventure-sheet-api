import { type IUserEntity, UserStatus, UserTypes } from '@domain/entities/users/userEntity'
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'users',
})
export class UserModel implements IUserEntity {
  @PrimaryColumn()
  id!: string

  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column({
    type: 'enum',
    enum: Object.values(UserStatus),
  })
  status!: UserStatus

  @Column({
    type: 'enum',
    enum: Object.values(UserTypes),
  })
  type!: UserTypes

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
