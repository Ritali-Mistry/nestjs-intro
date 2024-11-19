import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostMetaOptionDto } from './dtos/create-post-meta-option.dto';
import { MetaOptionsService } from './providers/meta-options.service';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(
    /**
     * Inject MetaOptionservice
     */
    private readonly metaOptionsService: MetaOptionsService,
  ) {}
  @Post()
  public create(@Body() createPostMetaOptionDto: CreatePostMetaOptionDto) {
    return this.metaOptionsService.create(createPostMetaOptionDto);
  }
}
