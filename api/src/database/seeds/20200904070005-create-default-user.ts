import { QueryInterface } from "sequelize";
import { hash } from "bcryptjs";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const passwordHash = await hash("123456", 8);
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          // companyId: 1,
          name: "Admin",
          email: "admin@admin.com",
          profile: "super",
          passwordHash,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("Users", {});
  }
};