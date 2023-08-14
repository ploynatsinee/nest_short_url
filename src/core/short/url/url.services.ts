import { Injectable, HttpException } from "@nestjs/common";
import { Url } from "./url.schema";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
@Injectable()
export class UrlServices extends Url {
  constructor(
    @InjectModel(Url.name)
    private readonly model: mongoose.Model<Url>
  ) {
    super()
  }

  private generateShortUrl(): string {
    const shortUrl = Math.random().toString(36).substring(2, 7)
    return shortUrl
  }

  public async getFullUrl(shortUrl: string): Promise<string> {

    const url = await this.model.findOne({ short_url: shortUrl })
    if (!url) {
      throw new HttpException("Page not found", 404);
    }
    if (url.use_life_time) {
      const now = new Date()
      if (url.expires_date <= now) {
        throw new HttpException("Page not found, This Url is expired", 404);
      }
    }
    return url.full_url
  }

  public async createShortUrl(fulUrl: string): Promise<string> {
    const url = await this.model.findOne({ full_url: fulUrl })
    if (url) {
      return url.short_url
    }
    const shortUrl = this.generateShortUrl()
    const newUrl = new this.model({
      full_url: fulUrl,
      short_url: shortUrl,
      use_life_time: false,
      expires_date: new Date(),
      user_role: "user",
    })
    await newUrl.save()
    return shortUrl
  }
}