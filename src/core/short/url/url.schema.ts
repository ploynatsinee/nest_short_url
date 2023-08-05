import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from "mongoose";

@Schema()
export class Url {
  @Prop()
  full_url: string

  @Prop()
  short_url: string

  @Prop()
  use_life_time: boolean

  @Prop({
    type: mongoose.Schema.Types.Date,
    required: true,
    datetime: "datetime"
  })
  expires_date: Date

  @Prop()
  user_role: string

  @Prop()
  user: string
}

export const UrlSchema = SchemaFactory.createForClass(Url)