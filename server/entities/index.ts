import { Field, ObjectType } from 'type-graphql';
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@ObjectType()
export default abstract class Base extends BaseEntity {
  @Field({ nullable: false })
  @PrimaryGeneratedColumn('uuid')
  UID: string;

  @Field(type => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(type => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
