import mongoose, { Schema } from 'mongoose';

// Create new Schema for Event. 
// This has circle column with object ID
const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: [5, 'At least 5 characters'],
  },
  description: {
    type: String,
    required: true,
    min: [10, 'At least 10 characters'],
  },
  eventDate: {
    type: Date,
  },
  circle: {
    type: Schema.Types.ObjectId,
    ref: 'Circle',
  },
}, { timestamps: true });

// export it as named 'Event'
export default mongoose.model('Event', EventSchema);
