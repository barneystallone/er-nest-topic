import { CryptoHelper } from '@/common';
import { User } from '@/entities';
import { translate } from '@/lib';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from '../user';
import { RegisterUserDto } from './dto';

@Injectable({})
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
    private readonly em: EntityManager,

    private readonly userService: UserService,
  ) {}

  //  1 - Check email
  //  2 - save user
  //  3 - Send OTP, Verify email (otp service, email service)
  /**
   * @todo registeruser with google, facebook, 2fa authenticate
   */
  async registerUser(dto: RegisterUserDto) {
    const foundEmail = await this.userService.findByEmail(dto.email);

    if (foundEmail) {
      throw new UnprocessableEntityException(
        translate('exception.emailExists', { args: { email: dto.email } }),
      );
    }
    if (dto?.password) {
      const newUser = this.userRepo.create(dto);

      const { secret, otp } = CryptoHelper.generateOtp();

      // send otp via email;

      // save otp into redis

      return this.em.persistAndFlush(newUser).then(() => newUser);
    }

    return null;
  }
}
