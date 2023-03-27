import { ObjectID } from 'typeorm';

type GetUserResponseDto = {
  oid: string | ObjectID;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export default GetUserResponseDto;
