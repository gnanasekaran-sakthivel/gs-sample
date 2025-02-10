import express from "express";
import type { Request, Response } from "express";
import { Work, Volunteer } from "../../models/index.js";
import { sequelize } from "../../models/index.js";
import { QueryTypes } from "sequelize";

const router = express.Router();

//  GET /works - Get all Works
router.get("/", async (_req: Request, res: Response) => {
  // TODO: Update code to retrieve all Work objects with associated Volunteer
  try {
    const works = await sequelize.query(
      `SELECT * FROM "work" LEFT JOIN "volunteer" ON "work"."assignedVolunteerId" = "volunteer"."id";`,
      {
        type: QueryTypes.SELECT, // Ensures the query returns rows
        logging: console.log, // Logs the SQL query to the console
        nest: true, // Nest the joined results to reflect the model relationships
        raw: true, // Returns raw results without Sequelize model instances
      }
    );

    // Log and process the result
    console.log(works);
    // Check if works data is empty or null
    if (!works || works.length === 0) {
      return res.status(404).json({ message: "No works found" });
    }

    // Return the works if valid
    return res.status(200).json(works);
  } catch (error: unknown) {
    console.error("Error retrieving works:", error);

    return res.status(500).json({
      description: "Internal server error",
      error: error,
      message: (error as Error).message,
    });
  }
});

// GET /works/:id - Get work by ID
router.get("/:id", async (req: Request, res: Response) => {
  // TODO: Update code to retrieve work object with associated Volunteer based on passing ID of Work
  const { id } = req.params;
  try {
    const work = await Work.findByPk(id, {
      include: [
        {
          model: Volunteer,
          as: "assignedVolunteer", // This should match the alias defined in the association
          attributes: ["volunteerName"], //Include only the volunteerName attribute
        },
      ],
    });
    if (work) {
      res.json(work);
    } else {
      res.status(404).json({
        message: "Work not found",
      });
    }
  } catch (error: unknown) {
    res.status(500).json({
      message: (error as Error).message,
    });
  }
});

// POST /works - Create new work
router.post("/", async (req: Request, res: Response) => {
  // TODO: Update code to create new Work based on passing name, status, description, and assignedVolunteerId
  const { name, status, description, assignedVolunteerId } = req.body;
  try {
    const newWork = await Work.create({
      name,
      status,
      description,
      assignedVolunteerId,
    });
    res.status(201).json(newWork);
  } catch (error: unknown) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
});

// PUT /works/:id - Update work by ID
router.put("/:id", async (req: Request, res: Response) => {
  // TODO: Update code to update already existing work by passing values of name, status, description, assignedVolunteerId.
  const { id } = req.params;
  const { name, status, description, assignedVolunteerId } = req.body;
  try {
    const work = await Work.findByPk(id);
    if (work) {
      work.name = name;
      work.status = status;
      work.description = description;
      work.assignedVolunteerId = assignedVolunteerId;
      await work.save();
      res.json(work);
    } else {
      res.status(404).json({
        message: "Work not found",
      });
    }
  } catch (error: unknown) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
});

// DELETE /works/:id - Delete work by ID
router.delete("/:id", async (req: Request, res: Response) => {
  // TODO: Update code to delete work based on passing ID of Work
  const { id } = req.params;
  try {
    const work = await Work.findByPk(id);
    if (work) {
      await work.destroy();
      res.json({ message: "Work deleted" });
    } else {
      res.status(404).json({
        message: "Work not found",
      });
    }
  } catch (error: unknown) {
    res.status(500).json({
      message: (error as Error).message,
    });
  }
});

export { router as workRouter, sequelize };
