import { Entity, PrimaryColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { AEntity } from 'src/infrastructure/db/entities/AEntity'
import { IEntityUser } from 'src/infrastructure/db/entities/postgresql/user/types'
import { Environments } from 'src/constants/Environment'

@Entity({
  schema: Environments.postgreSQLConnectionParams.schema,
  name: 'users',
  synchronize: Environments.postgreSQLConnectionParams.synchronize
})
export class EntityUserPostgreSQL extends AEntity<IEntityUser> implements IEntityUser {

  @PrimaryColumn({ generated: 'identity', type: 'int' })
  public id!: IEntityUser['id']
  @Column({ type: 'varchar', length: 255 })
  public name!: IEntityUser['name']
  @Column({ type: 'varchar', length: 255 })
  public lastName!: IEntityUser['lastName']
  @Column({ type: 'varchar', length: 255 })
  public email!: IEntityUser['email']
  @Column({ type: 'varchar', length: 255 })
  public password!: IEntityUser['password']
  @Column({ type: 'boolean' })
  public isAdmin!: IEntityUser['isAdmin']
  @Column({ type: 'timestamp', nullable: true })
  public tokenExpiration!: Date
  @CreateDateColumn({ type: 'timestamp' })
  public created_at!: Date
  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at!: Date
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deleted_at!: Date
}