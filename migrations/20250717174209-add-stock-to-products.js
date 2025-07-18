'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Añade la columna 'stock' a la tabla 'products'
    await queryInterface.addColumn('products', 'stock', {
      type: Sequelize.INTEGER, // O el tipo de dato que necesites (ej. DECIMAL, NUMERIC)
      defaultValue: 0,         // Valor por defecto para las filas existentes
      allowNull: false         // Si la columna no puede ser nula. Cambia a true si sí puede.
    });
  },

  async down (queryInterface, Sequelize) {
    // Si necesitas revertir la migración, elimina la columna 'stock'
    await queryInterface.removeColumn('products', 'stock');
  }
};
