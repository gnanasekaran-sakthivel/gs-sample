import sequelize from "../config/connection.js";
import { VolunteerFactory } from "./volunteer.js";
import { WorkFactory } from "./work.js";

const Volunteer = VolunteerFactory(sequelize);
const Work = WorkFactory(sequelize);

// TODO: Create a One-to-Many relationship (Volunteer can have numerous volunteer works)
Volunteer.hasMany(Work, { foreignKey: "assignedVolunteerId", as: "works" });
Work.belongsTo(Volunteer, {
  foreignKey: "assignedVolunteerId",
  as: "assignedVolunteer",
});
export { Volunteer, Work, sequelize };
