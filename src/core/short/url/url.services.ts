import { Injectable } from "@nestjs/common";
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

  public async getFullUrl(url: string): Promise<string> {
    console.log("----- Get full url ------")
    return url
  }
}