import mongoose, { Document, Model, Schema } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  pp?: string;
  chats: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  pp: {
    type: String,
    default: "",
  },
  chats: {
    type: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
    default: [],
  }
});

const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default User;
