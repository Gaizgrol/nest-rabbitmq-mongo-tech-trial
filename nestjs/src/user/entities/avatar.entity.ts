import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Avatar {
  @ObjectIdColumn()
  oid: ObjectID;

  @Column()
  userId: string;

  @Column()
  hash: string;

  @Column()
  content: string;
}
