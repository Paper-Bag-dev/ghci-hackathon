import mongoose, { Schema, Document } from "mongoose";

export interface IRelationship extends Document {
  user: string;
  relatedUser: string;
  relationType?: string;
  createdAt?: Date;
}

const RelationshipSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    relatedUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    relationType: { type: String, default: "contact" },
  },
  { timestamps: true }
);

const Relationship = mongoose.model<IRelationship>(
  "Relationship",
  RelationshipSchema
);
export default Relationship;
