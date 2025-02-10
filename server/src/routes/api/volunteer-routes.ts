import express from "express";
import type { Request, Response } from "express";
import { Volunteer } from "../../models/index.js";

const router = express.Router();

// GET /volunteers - Get all volunteers
router.get("/", async (_req: Request, res: Response) => {
  // TODO: Update code to return all Volunteers
  try {
    const volunteers = await Volunteer.findAll();
    res.json(volunteers);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET /volunteers/:id - Get a volunteer by ID
router.get("/:id", async (req: Request, res: Response) => {
  // TODO: Update code to return one Volunteer based on ID
  const { id } = req.params;
  try {
    const volunteer = await Volunteer.findByPk(id);
    if (volunteer) {
      res.json(volunteer);
    } else {
      res.status(404).json({
        message: "Volunteer not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST /volunteers - Create a new volunteer
router.post("/", async (req: Request, res: Response) => {
  // TODO: Update code to create a Volunteer
  const { volunteerName } = req.body;
  try {
    const volunteer = await Volunteer.create({
      volunteerName,
    });
    res.status(201).json(volunteer);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /volunteers/:id - Update a volunteer by ID
router.put("/:id", async (req: Request, res: Response) => {
  // TODO: Update code to retrieve one Volunteer based on id and username and return an updated Volunteer object
  const { id } = req.params;
  const { name } = req.body;

  try {
    const volunteer = await Volunteer.findByPk(id);
    if (volunteer) {
      volunteer.volunteerName = name;
      await volunteer.save();
      res.json(volunteer);
    } else {
      res.status(404).json({
        message: "Volunteer not found",
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE /volunteers/:id - Delete a volunteer by ID
router.delete("/:id", async (req: Request, res: Response) => {
  // TODO: Update code to delete Volunteer based on ID
  const { id } = req.params;
  try {
    const volunteer = await Volunteer.findByPk(id);
    if (volunteer) {
      await volunteer.destroy();
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export { router as volunteerRouter };
