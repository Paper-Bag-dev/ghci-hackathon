import { Schema, model, Document, Types } from "mongoose";

export interface IRelationship extends Document {
  owner: Types.ObjectId;
  ownerClerkId: string;
  targetUser: Types.ObjectId;
  targetClerkId: string;
  nickname: string;
  notes?: string;
}

const relationshipSchema = new Schema<IRelationship>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    ownerClerkId: {
      type: String,
      required: true,
      index: true,
    },

    targetUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    targetClerkId: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
      trim: true,
    },

    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

// Ensure nickname is unique per owner
relationshipSchema.index({ owner: 1, nickname: 1 }, { unique: true });

const RelationshipModel = model<IRelationship>(
  "Relationship",
  relationshipSchema
);

export default RelationshipModel;
