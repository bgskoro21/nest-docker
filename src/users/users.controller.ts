import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse } from 'src/common/dtos/response.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return new ApiResponse(
      200,
      'Success',
      this.usersService.create(createUserDto),
    );
  }

  @Get()
  async findAll(@Query() query: PaginationDto) {
    const paginationDto = new PaginationDto(query.page, query.limit);
    const result = await this.usersService.findAll(paginationDto);
    return new ApiResponse(200, 'Success', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new ApiResponse(200, 'Success', this.usersService.findOne(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return new ApiResponse(
      200,
      'Success',
      this.usersService.update(id, updateUserDto),
    );
  }

  @Post(':id/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profile_pictures',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadProfilePicture(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const filePath = `/uploads/profile_pictures/${file.filename}`;

    return new ApiResponse(
      200,
      'Success',
      this.usersService.update(id, { profilePicture: filePath }),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new ApiResponse(200, 'Success', this.usersService.remove(id));
  }
}
