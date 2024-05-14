import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApartmentModule } from './modules/apartment/apartment.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CaslModule } from './modules/casl/casl.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';
import { ReservationModule } from './modules/reservation/reservation.module';

@Module({
  imports: [
    CaslModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'booking_db',
      entities: ["dist/**/*.model.js"],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    ApartmentModule,
    AuthModule,
    UserModule,
    ReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
