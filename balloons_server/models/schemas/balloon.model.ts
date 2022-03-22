import mongoose from 'mongoose';
const balloonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    longitude: {
      type: Number,
      required: false,
    },
    latitude: {
      type: Number,
      required: false,
    },
    altitude: {
      type: Number,
      required: false,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
export default mongoose.model('balloon', balloonSchema);
