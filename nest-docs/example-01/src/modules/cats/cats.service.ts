import {Injectable} from '@nestjs/common';
import {Cat} from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [{
    age: 8,
    breed: 'Spynx',
    name: 'Mila'
  }, {
    age: 0,
    breed: 'Spynx',
    name: 'Silvia'
  }, {
    age: 11,
    breed: 'Unknown',
    name: 'Kitia'
  }, {
    age: 2,
    breed: 'Unknown',
    name: 'Lusia'
  }];

  async findAll(age?: number, breed?: string): Promise<Cat[]> {
    let finalCats: Cat[] = this.cats;

    if (age) {
      finalCats = finalCats.filter(cat => cat.age === Number(age))
    }

    if (breed) {
      finalCats = finalCats.filter(cat => cat.breed.toLowerCase() === breed.toLowerCase())
    }

    return finalCats;
  }

  async create(cat: Cat) {
    this.cats.push(cat);
  }

}
