import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

//----- Module
import { UserModule } from '../user/user.module';

//----- Utils
import { RedisModule } from '../utils/redis/redis.module';

//----- Provider
import { SmailModule } from '../providers/smail/smail.module';
import { SmsModule } from '../providers/sms/sms.module';
import { FacebookStrategy } from './passport/facebook.strategy';
import { GithubStrategy } from './passport/github.strategy';
import { GoogleStrategy } from './passport/google.strategy';

//----- Service
import { AuthService } from './auth.service';

//----- Repository
import { ReTokenRepository } from './entities/re-token.repository';

//----- Controller
import { AuthController } from './auth.controller';

@Module({
      imports: [TypeOrmModule.forFeature([ReTokenRepository]), UserModule, RedisModule],
      controllers: [],
      providers: [
            AuthService,
            {
                  provide: JwtService,
                  useFactory: () => {
                        return new JwtService({ secret: process.env.JWT_SECRET_KEY });
                  },
            },
      ],
      exports: [AuthService],
})
export class AuthModule {}
