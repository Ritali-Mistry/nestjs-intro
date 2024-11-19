import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { Tags } from '../tags.entity';

@Injectable()
export class TagsService {
  constructor(
    /**
     * Inject Repository
     */
    @InjectRepository(Tags)
    private readonly tagRepostory: Repository<Tags>,
  ) {}

  public async create(createTagDto: CreateTagDto) {
    let tag = this.tagRepostory.create(createTagDto);
    return await this.tagRepostory.save(tag);
  }

  public async findMultipleTags(tags: number[]) {
    let results = await this.tagRepostory.find({
      where: {
        id: In(tags),
      },
    });

    return results;
  }

  public async delete(id: number) {
    await this.tagRepostory.delete(id);

    return {
      deleted: true,
      id,
    };
  }

  public async softRemove(id: number) {
    await this.tagRepostory.softDelete(id);

    return {
      deleted: true,
      id,
    };
  }
}
