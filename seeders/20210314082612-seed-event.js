'use strict';

export async function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert(
    'Users',
    [
      {
        user_id: 123456,
        user_name: 'aaaaaa',
        user_password: '123123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('Users', null, {});
}
