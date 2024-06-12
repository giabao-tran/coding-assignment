import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLocationDto } from './dto/createLocation.dto';
import { Location } from 'src/entity/location.entity';
import { UpdateLocationDto } from './dto/updateLocation.dto';

@Injectable()
export class LocationService {
  constructor(@InjectRepository(Location) private locationRepository) {}

  async createLocation(location: CreateLocationDto) {
    const newLocation = this.locationRepository.create(location);

    const existingLocation = await this.locationRepository.findOne({
      where: { location_number: location.location_number },
    });

    if (existingLocation) {
      throw new BadRequestException('This location number already exists');
    }

    if (location.parent_id) {
      const parent = await this.locationRepository.findOne({
        where: { id: location.parent_id },
      });
      if (!parent) {
        throw new NotFoundException('Parent location not found');
      }

      newLocation.parent = parent;
    }
    return this.locationRepository.save(newLocation);
  }

  findAll() {
    return this.locationRepository.find({ relations: ['parent', 'children'] });
  }

  async findOneLocation(id: number) {
    const location = await this.locationRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    return location;
  }

  async updateLocation(id: number, updateDto: UpdateLocationDto) {
    const location = await this.locationRepository.findOne({ where: { id } });

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    const existingLocation = await this.locationRepository.findOne({
      where: { location_number: updateDto.location_number },
    });

    if (existingLocation) {
      throw new BadRequestException('This location number already exists');
    }

    if (updateDto.parent_id) {
      const parentLocation = await this.locationRepository.findOne({
        where: { id: updateDto.parent_id },
      });

      if (!parentLocation) {
        throw new NotFoundException('Parent location not found');
      }

      location.parent = parentLocation;
    } else {
      location.parent = null;
    }

    await this.locationRepository.update(id, updateDto);

    return this.findOneLocation(id);
  }

  async removeLocation(id: number) {
    const location = await this.findOneLocation(id);

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    const childrens = await this.locationRepository.find({
      where: { parent: { id } },
    });

    if (childrens.length > 0) {
      await this.locationRepository.remove(childrens);
    }

    await this.locationRepository.remove(location);
  }
}
