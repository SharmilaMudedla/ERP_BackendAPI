import asyncHandler from "../Utils/asyncHandler.js";
import { handleError, handleSuccess } from "../Utils/responseHandler.js";
import Event from "../Models/event.model.js";
import { validationResult } from "express-validator";
import parseValidations from "../Utils/parseValidations.js";
import mongoose from "mongoose";

// ======================== create event  ====================================
const addEvent = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return handleError(
      res,
      "Validation Error",
      400,
      parseValidations(errors.array())
    );
  }
  const event = await Event.create(req.body);
  handleSuccess(res, "Event added successfully", 201, event);
});
// ========================= get all events  ====================================
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();
  handleSuccess(res, "Events fetched successfully", 200, events);
});

//========================= get single event =====================================
const getSingleEvent = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return handleError(res, "Invalid Event ID", 400, null);
  }
  const event = await Event.findById(req.params.id);
  if (!event) {
    return handleError(res, "Event not found", 404, null);
  }
  handleSuccess(res, "Event fetched successfully", 200, event);
});

export { addEvent, getEvents, getSingleEvent };
