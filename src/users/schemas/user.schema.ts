import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true, select: true })
  password: string;
  @Prop({ default: null })
  profilePicture: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
