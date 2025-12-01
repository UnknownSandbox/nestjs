import {Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Put, Query, Redirect} from '@nestjs/common';
import {CreateCatDto} from "./dto/create-cat.dto";
import {UpdateCatDto} from "./dto/update-cat.dto";

@Controller('cats')
export class CatsController {
  @Get()
  async findAll(@Query('age') age: number, @Query('breed') breed: string) {
    return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
  }

  @Post()
  @Header('Cache-Control', 'no-store')
  @HttpCode(201)
  create(@Body() createCatDto: CreateCatDto): string{
    return `This action adds a new cat${createCatDto?.name ? ` - ${createCatDto?.name}` : ``}`
  }

  @Get('abcd/*')
  findAllWildcard() {
    return 'This route uses a wildcard';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
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