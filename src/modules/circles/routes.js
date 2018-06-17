import { Router } from 'express';
import * as CircleController from './controller'; // import everything from controller.

// Initialize Router.
const router = new Router();

/**
 *  - Post functions -
 * 
 *  Create new Circle. 
 *      When access to /circle/new, call createCircle function from circle controller
 *  Create new Circle event.
 *      When access to /circles/:circleId/events/new, 
 *      call createCircleEvent function from controller,
 *      this post takes circleId param which is used in this function. 
 */

router.post('/circles/new', CircleController.createCircle);
router.post('/circles/:circleId/events/new', CircleController.createCircleEvent);

/**
 *  - Get functions -
 * 
 *  Get Events from circle with circle Id. 
 */

router.get('/circles/:circleId/events', CircleController.getCircleEvents);


// export to index.js
export default router;
