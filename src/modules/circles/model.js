import mongoose, { Schema } from 'mongoose';

// Create new Schema for Group.
// This takes circles column with object iD. 
const CircleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [4, 'Name must be more than 4 characters'],
  },
  description: {
    type: String,
    required: true,
    minlength: [10, 'Description must be more than 10 characters'],
  },
  category: {
    type: String,
  },
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'Event',
  }],
}, { timestamps: true });

/**
 * Create a event and add it to the events array in the circle
 */
CircleSchema.statics.addEvent = async function (id, args) {
  const Event = mongoose.model('Event');

  // add the circle id to the event element 
  // this is the author of the event
  const event = await new Event({ ...args, circle: id });
  console.log(event.id);

  // find the circle with the id provided from the url 
  // And push the event id in the event element
  console.log(this);

  // Circle schema
  await this.findByIdAndUpdate(id, { $push: { events: event.id } });
    
  // console.log('===================');
  // console.log('Event', event);

  return {
    event: await event.save(),
  };
};

// export this Circle Schema as named 'Circle'
export default mongoose.model('Circle', CircleSchema);
