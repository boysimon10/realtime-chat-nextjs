import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface ChatDocument extends Document {
  members: Types.ObjectId[];
  messages: Types.ObjectId[];
  //isGroup: boolean;
  name: string;
  //groupPhoto: string;
  createdAt: Date;
  lastMessageAt: Date;
}

const ChatSchema: Schema = new mongoose.Schema({
  members: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: []
  },
  messages: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    default: []
  },
  /*isGroup: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
  },
  groupPhoto: {
    type: String,
  },*/
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastMessageAt: {
    type: Date,
    default: Date.now
  }
});

const Chat: Model<ChatDocument> = mongoose.models.Chat || mongoose.model<ChatDocument>('Chat', ChatSchema);

export default Chat;