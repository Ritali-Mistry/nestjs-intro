import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from './user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    /**
     * inject dataScource
     */
    private readonly dataSource: DataSource,
  ) {}
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    let newUsers: User[] = [];

    //create quary runner instance
    const quaryRunner = this.dataSource.createQueryRunner();

    try {
      //connect query Runner to dataSource
      await quaryRunner.connect();

      //start Transaction
      await quaryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Could not connect to the database');
    }

    try {
      for (let user of createManyUsersDto.users) {
        let newUser = quaryRunner.manager.create(User, user);
        let result = await quaryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      //If successfull commit
      await quaryRunner.commitTransaction();
    } catch (error) {
      //If successfull rollback
      await quaryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transction', {
        description: String(error),
      });
    } finally {
      try {
        //Release connection
        await quaryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('Could not release the Connection', {
          description: String(error),
        });
      }
    }
    return newUsers;
  }
}
