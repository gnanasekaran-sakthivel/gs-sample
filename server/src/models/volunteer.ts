import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface VolunteerAttributes {
  id: number;
  volunteerName: string;
}

interface VolunteerCreationAttributes
  extends Optional<VolunteerAttributes, "id"> {}

export class Volunteer
  extends Model<VolunteerAttributes, VolunteerCreationAttributes>
  implements VolunteerAttributes
{
  /* TODO: 
    Create id and volunteerName properties
    id: public & number
    volunteerName: public & string
  */
  public id!: number;
  public volunteerName!: string;
}

export function VolunteerFactory(sequelize: Sequelize): typeof Volunteer {
  // TODO: Initialize the Volunteer Model
  Volunteer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      volunteerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "volunteer",
      sequelize,
    }
  );
  return Volunteer;
}
