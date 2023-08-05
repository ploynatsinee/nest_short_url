import { Controller, Get, Param } from "@nestjs/common";
import { UrlServices } from "./url.services";

@Controller('url')
export class UrlController {
  constructor(protected service: UrlServices) { }

  @Get("full-url/:url")
  async getFullUrl(@Param() params: any) {
    return this.service.getFullUrl(params.url);
  }
}