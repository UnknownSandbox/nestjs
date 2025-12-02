import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Redirect
} from '@nestjs/common';
import {CreateCatDto} from "./dto/create-cat.dto";
import {UpdateCatDto} from "./dto/update-cat.dto";
import {CatsService} from "./cats.service";

@Controller('cats')
export class CatsController {

  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(@Query('age') age: number, @Query('breed') breed: string) {
    return await this.catsService.findAll(age, breed);
  }

  @Post()
  @Header('Cache-Control', 'no-store')
  @HttpCode(201)
  async create(@Body(new DefaultValuePipe({})) createCatDto: CreateCatDto): Promise<void>{
    return await this.catsService.create({
      name: createCatDto.name,
      age: 0,
      breed: 'Unknown'
    });
  }

  @Get('abcd/*path')
  findAllWildcard() {
    return 'This route uses a wildcard';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version: string | undefined) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat.${updateCatDto?.name ? ` New name - ${updateCatDto.name}` : ''}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }

}