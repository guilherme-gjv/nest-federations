import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';
import { Session } from './entities/session.entity';
import { Verification } from './entities/verification.entity';
import { UserService } from './services/user.service';
import { AccountService } from './services/account.service';
import { SessionService } from './services/session.service';
import { VerificationService } from './services/verification.service';
import { UserRepository } from './repositories/user.repository';
import { AccountRepository } from './repositories/account.repository';
import { SessionRepository } from './repositories/session.repository';
import { VerificationRepository } from './repositories/verification.repository';
import { ConfigService } from '@nestjs/config';
import { getMikroOrmConfig } from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => getMikroOrmConfig(config),
    }),
    MikroOrmModule.forFeature([User, Account, Session, Verification]),
  ],
  providers: [
    DatabaseService,
    UserService,
    AccountService,
    SessionService,
    VerificationService,
    UserRepository,
    AccountRepository,
    SessionRepository,
    VerificationRepository,
  ],
  exports: [
    DatabaseService,
    UserService,
    AccountService,
    SessionService,
    VerificationService,
    UserRepository,
    AccountRepository,
    SessionRepository,
    VerificationRepository,
  ],
})
export class DatabaseModule {}
