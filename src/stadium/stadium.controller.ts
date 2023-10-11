import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req} from '@nestjs/common';
import { StadiumService } from './stadium.service';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Stadium} from "./models/stadium.model";
import {UserGuard} from "../guards/user.guard";

@ApiTags('Stadium')
@Controller('stadium')
export class StadiumController {
  constructor(private readonly stadiumService: StadiumService) {}

  @ApiOperation({summary: 'Create Stadium'})
  @ApiResponse({status: 201, type: Stadium})
  @UseGuards(UserGuard)
  @Post()
  create(
      @Body() createStadiumDto: CreateStadiumDto,
      @Req() req: Request
  ) {
    return this.stadiumService.create(createStadiumDto, req);
  }

  @ApiOperation({summary: "Find Stadium"})
  @ApiResponse({status: 200, type: [Stadium]})
  @Get()
  findAll() {
    return this.stadiumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stadiumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStadiumDto: UpdateStadiumDto) {
    return this.stadiumService.update(+id, updateStadiumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stadiumService.remove(+id);
  }
}
