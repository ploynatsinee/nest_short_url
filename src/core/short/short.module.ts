import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { UrlController } from "./url/url.controller";
import { UrlServices } from "./url/url.services";
import { Url, UrlSchema } from "./url/url.schema";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: `${Url.name}`,
        useFactory: () => {
          return UrlSchema
        }
      }
    ]),

  ],
  controllers: [UrlController],
  providers: [UrlServices],
  exports: [UrlServices]
})
export class ShortModule { }