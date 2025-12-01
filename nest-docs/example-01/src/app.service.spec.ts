import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {beforeEach, describe, expect, it } from 'vitest';

describe('AppController', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {

    it('should return "Hello World!"', () => {
      expect(appService.getHello()).toBe('Hello World!');
    })

    it('should return personal hello', ()=>{
      expect(appService.getPersonalHello('Unknown Hero')).toBe('Hello, Unknown Hero');
    })

  });
});
