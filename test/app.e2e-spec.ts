import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'app.module';
import { PrismaService } from 'prisma/prisma.service';

describe('App Instantiation (e2e)', () => {
  let app: INestApplication;

  it('instantiates an app with the app module without any errors', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    const prisma = app.get(PrismaService);
    await prisma.$disconnect();
  });
});
