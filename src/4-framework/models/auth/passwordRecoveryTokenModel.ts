import { type IPasswordRecoveryTokenEntity } from '@domain/entities/auth/passwordRecoveryTokenEntity'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { UserModel } from '@framework/models/users/userModel'

@Entity({
  name: 'password_recovery_tokens',
})
export class PasswordRecoveryTokenModel implements IPasswordRecoveryTokenEntity {
  @PrimaryColumn()
  id!: string

  @Column({ name: 'user_id' })
  userId!: string

  @Column()
  token!: string

  @Column({ name: 'expires_at' })
  expiresAt!: Date

  @Column({ default: false })
  used!: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user?: UserModel
}
