import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { MikroORM } from '@mikro-orm/core';
import { createAuth } from '../../../libs/auth-core/src';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'users', url: 'http://localhost:3000/graphql' },
            { name: 'posts', url: 'http://localhost:3001/graphql' },
          ],
        }),
      },
    }),
    ConfigModule.forRoot(),
    AuthModule.forRootAsync({
      inject: [MikroORM],
      useFactory: (orm: MikroORM) => ({
        auth: createAuth(orm),
      }),
    }),
  ],
})
export class GatewayModule {}
