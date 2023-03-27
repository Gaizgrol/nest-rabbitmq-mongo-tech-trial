import { Avatar } from '../entities/avatar.entity';
import { User } from '../entities/user.entity';
import CreateUserRequestDto from '../dto/request/createUser.dto';
import ReqResUserDto from '../dto/response/reqResUser.dto';

export default abstract class AbstractUserRepository {
  abstract createUser(createUserDto: CreateUserRequestDto): Promise<User>;
  abstract getUserByEmail(email: string): Promise<User | null>;
  abstract getUserById(userId: string): Promise<ReqResUserDto | null>;
  abstract getUserAvatar(userId: string): Promise<Avatar | null>;
  abstract createAvatar(
    userId: string,
    path: string,
    content: string,
  ): Promise<void>;
  abstract removeAvatar(userId: string): Promise<void>;
}
