import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Review } from './reviews/entities/review.entity';
// import { AuthService } from './user/auth.service';
import { BusinessesModule } from './businesses/businesses.module';
import { ReviewsModule } from './reviews/reviews.module';
import { Business } from './businesses/entities/business.entity';
import { CommentsModule } from './comments/comments.module';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: '123ana456',
    username: 'anadauane', 
    entities: [User, Review, Business], 
    database: 'reviewhub', 
    synchronize: true, 
    logging: false 
  }),
    UserModule,
    BusinessesModule,
    ReviewsModule,
    CommentsModule,
    CategoriesModule,
    SubcategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
