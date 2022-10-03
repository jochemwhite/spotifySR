import express from "express";
const router = express.Router();


router.post("/eventsub", (req, res) => {
  let type = req.body.subscription.type;
  let event = req.body.event;

  console.log(event)


});


export default router;
