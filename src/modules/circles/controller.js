import Circle from './model';
import { Event } from '../events';

// Create circle with name, description, and category.
// validate them, if passed, new circle model is saved. 
// Otherwise return error. 
export const createCircle = async (req, res) => {
  const {
    name,
    description,
    // category,
  } = req.body;

  if (!name) {
    return res.status(400).json({ error: true, message: 'Name must be needed' });
  } else if (typeof name !== 'string') {
    return res.status(400).json({ error: true, message: 'Name must be a string' });
  } else if (name.length < 4) {
    return res.status(400).json({ error: true, message: 'Name must be more than 5 characters' });
  }
    
  if (!description) {
    return res.status(400).json({ error: true, message: 'Description must be needed' });
  } else if (typeof description !== 'string') {
    return res.status(400).json({ error: true, message: 'Description must be a string' });
  } else if (description.length < 10) {
    return res.status(400).json({ error: true, message: 'Description must be more than 10 characters' });
  }
    
  const circle = new Circle({ name, description });

  try {
    return res.status(201).json({ error: false, circle: await circle.save() });
  } catch (err) {
    return res.status(400).json({ error: true, message: 'Something wrong when created circle' });
  }
};

// Create circle event with circle ID
// validate, if passed, call addCircle funtion from model. 
// Otherwise return error. 
export const createCircleEvent = async (req, res) => {
  const { title, description } = req.body;
  const { circleId } = req.params;

    
  if (!title) {
    return res.status(400).json({ error: true, message: 'title must be needed' });
  } else if (typeof title !== 'string') {
    return res.status(400).json({ error: true, message: 'title must be a string' });
  } else if (title.length < 4) {
    return res.status(400).json({ error: true, message: 'title must be more than 5 characters' });
  }

  if (!description) {
    return res.status(400).json({ error: true, message: 'Description must be needed' });
  } else if (typeof description !== 'string') {
    return res.status(400).json({ error: true, message: 'Description must be a string' });
  } else if (description.length < 9) {
    return res.status(400).json({ error: true, message: 'Description must be more than 5 characters' });
  }

  if (!circleId) {
    return res.status(400).json({ error: true, message: 'Group ID must be provided' });
  }

  try {
    const { event } = await Circle.addEvent(circleId, { title, description });

    console.log('test', event);
        
    return res.status(201).json({ error: false, event });
  } catch (err) {
    return res.status(400).json({ error: true, message: 'Event cannot be created' });
  }
}; 

// Search Circle events with circle id
// validate them, if passed, return circle. 
// Otherwise return error. 
export const getCircleEvents = async (req, res) => {
  const { circleId } = req.params;

  if (!circleId) {
    return res.status(400).json({ error: true, message: 'circle id must be provided' });
  }

  const circle = await Circle.findById(circleId);

  if (!circle) {
    return res.status(400).json({ error: true, message: 'Circle not exist' });
  }

  try {
    return res.status(200).json({
      error: false,
      events: await Event.find({ circle: circleId }).populate('circle', 'name'),
    });
  } catch (err) {
    return res.status(400).json({ error: true, message: 'Cannot get circles' });
  }
};
