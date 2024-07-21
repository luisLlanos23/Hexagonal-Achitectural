import { Entity, PrimaryColumn, Column } from 'typeorm'
import { AEntity } from 'src/infrastructure/db/entities/AEntity'
import { IEntityUser } from 'src/infrastructure/db/entities/postgresql/user/types'
import { Environments } from 'src/constants/Environment'

@Entity({ schema: 'public', name: 'user', synchronize: Environments.postgreSQLConnectionParams.synchronize })
export class EntityUserPostgreSQL extends AEntity<IEntityUser> implements IEntityUser {
  @PrimaryColumn()
  public id!: number
  @Column()
  public name!: string
  @Column()
  public lastname!: string
  @Column()
  public email!: string
  @Column()
  public password!: string
  @Column()
  public active!: 0 | 1 | -1
}