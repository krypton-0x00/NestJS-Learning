import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Cornor',
      email: 'p6t6S@example.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Jansdfe Doe',
      email: 'p6t6S@example.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Janew Doe',
      email: 'p6t6S@example.com',
      role: 'ADMIN',
    },
    {
      id: 4,
      name: 'Jasxene dDoe',
      email: 'p6t6S@example.com',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: 'Jasxene dDoe',
      email: 'p6t6S@example.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0) {
        throw new NotFoundException('User Role Not Found');
      }
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id); //this will return an object
    if (!user) throw new NotFoundException('User Not Found'); //this will throw an error if the user is not found
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
