import { Entity, PrimaryColumn, Column } from 'typeorm'
import { AEntity } from 'src/infrastructure/db/entities/AEntity'
import { IEntityUser } from 'src/infrastructure/db/entities/postgresql/user/types'
import { Environments } from 'src/constants/Environment'

@Entity({ schema: 'public', name: 'user', synchronize: Environments.postgreSQLConnectionParams.synchronize })
export class EntityUserPostgreSQL extends AEntity<IEntityUser> implements IEntityUser {
  @PrimaryColumn({ generated: 'identity', type: 'int' })
  public id!: IEntityUser['id']
  @Column({ type: 'varchar', length: 255 })
  public name!: IEntityUser['name']
  @Column({ type: 'varchar', length: 255 })
  public lastname!: IEntityUser['lastname']
  @Column({ type: 'varchar', length: 255 })
  public email!: IEntityUser['email']
  @Column({ type: 'varchar', length: 255 })
  public password!: IEntityUser['password']
  @Column({ type: 'int' })
  public active!: IEntityUser['active']
  @Column({ type: 'boolean' })
  public isAdmin!: IEntityUser['isAdmin']
}