import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './mikro-orm.config';
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

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
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
