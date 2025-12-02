import { Test, TestingModule } from '@nestjs/testing';
import {beforeEach, describe, expect, it } from 'vitest';
import {CatsService} from "./cats.service";
import {CatsController} from "./cats.controller";

describe('CatsService', () => {
  let catsService: CatsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsService = app.get<CatsService>(CatsService);
  });

  describe('root', () => {

    it('should return all cats', async () => {
      expect(await catsService.findAll()).toHaveLength(4);
    })

    it('should return Mila by age', async () => {
      expect(await catsService.findAll(8)).toHaveLength(1);
    })

    it('should return 2 cats by breed', async () => {
      expect(await catsService.findAll(undefined, 'Spynx')).toHaveLength(2);
    })

  });
});
