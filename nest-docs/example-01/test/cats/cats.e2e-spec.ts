import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../../src/app.module';
import { describe, it, beforeEach } from 'vitest';
import {CreateCatDto} from "../../src/modules/cats/dto/create-cat.dto";
import {UpdateCatDto} from "../../src/modules/cats/dto/update-cat.dto";

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cats (GET)', () => {
    return request(app.getHttpServer())
      .get('/cats?age=11&breed=dog')
      .expect(200)
      .expect(`This action returns all cats filtered by age: 11 and breed: dog`);
  });

  it('/cats with data (POST)', () => {
    const data: CreateCatDto ={
      name: 'Mila',
    }

    return request(app.getHttpServer())
      .post('/cats')
      .send(data)
      .expect('Cache-Control', 'no-store')
      .expect(201)
      .expect('This action adds a new cat - Mila')
  });

  it('/cats without data (POST)', () => {
    return request(app.getHttpServer())
      .post('/cats')
      .expect('Cache-Control', 'no-store')
      .expect(201)
      .expect('This action adds a new cat')
  });

  it('/cats with data (PUT)', () => {
    const data: UpdateCatDto ={
      name: 'Silvia',
    }

    return request(app.getHttpServer())
      .put('/cats/1100')
      .send(data)
      .expect(200)
      .expect('This action updates a #1100 cat. New name - Silvia')
  });

  it('/cats without data (PUT)', () => {
    return request(app.getHttpServer())
      .put('/cats/1100')
      .expect(200)
      .expect('This action updates a #1100 cat.')
  });

  it('/cats/abcd/random/any/data (GET)', () => {
    return request(app.getHttpServer())
      .get('/cats/abcd/random/any/data')
      .expect(200)
      .expect('This route uses a wildcard')
  });

  it('/cats/docs (GET)', () => {
    return request(app.getHttpServer())
      .get('/cats/docs')
      .expect(302)
      .expect('Location', 'https://docs.nestjs.com');
  });

  it('/cats/docs?version=5 (GET)', () => {
    return request(app.getHttpServer())
      .get('/cats/docs')
      .query({ version: '5' })
      .expect(302)
      .expect('Location', 'https://docs.nestjs.com/v5/');
  });

  it('/cats/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/cats/1100')
      .expect(200)
      .expect(`This action returns a #1100 cat`);
  });

  it('/cats/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/cats/1100')
      .expect(200)
      .expect(`This action removes a #${1100} cat`);
  });

});
