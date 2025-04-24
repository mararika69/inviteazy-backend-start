import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    event_name: { type: String, required: true },
    event_datetime: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Add virtual 'id' field
eventSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export const EventModel = mongoose.model("Event", eventSchema);
