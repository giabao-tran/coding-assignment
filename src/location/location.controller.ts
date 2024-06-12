import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/createLocation.dto';
import { UpdateLocationDto } from './dto/updateLocation.dto';

@Controller('location')
export class LocationController {
  private readonly logger = new Logger(LocationController.name);
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async createLocation(@Body() location: CreateLocationDto) {
    this.logger.log(`Creating location with data: ${JSON.stringify(location)}`);
    return this.locationService.createLocation(location);
  }

  @Get()
  async findAll() {
    this.logger.log('Fetching all locations');
    return this.locationService.findAll();
  }

  @Get(':id')
  async findOneLocation(@Param('id') id: number) {
    this.logger.log(`Fetching location with id: ${id}`);
    return this.locationService.findOneLocation(id);
  }

  @Put(':id')
  async updateLocation(
    @Param('id') id: number,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    this.logger.log(
      `Updating location with id: ${id}, data: ${JSON.stringify(updateLocationDto)}`,
    );
    return this.locationService.updateLocation(id, updateLocationDto);
  }

  @Delete(':id')
  async removeLocation(@Param('id') id: number) {
    this.logger.log(`Removing location with id: ${id}`);
    return this.locationService.removeLocation(id);
  }
}
