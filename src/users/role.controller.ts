import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
@Controller('roles')
@UseGuards(AuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Post('create')
  @UseGuards(AuthGuard)
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  async get(@Param('id', ParseIntPipe) id: number) {
    return await this.roleService.getById(id);
  }
  @Get('')
  @UseGuards(AuthGuard)
  async getAll() {
    return await this.roleService.getAll();
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.roleService.delete(id);
  }
  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    return await this.roleService.update(id, updateRoleDto);
  }
}
