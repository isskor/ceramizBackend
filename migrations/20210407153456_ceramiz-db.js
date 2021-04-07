exports.up = async (knex) => {
  await knex.schema.createTable('categories', (tbl) => {
    tbl.increments('id').primary();
    tbl.text('name').notNullable();
    tbl.text('path').notNullable();
    tbl.text('imageUrl').notNullable();
    tbl.text('description').notNullable();
    tbl.text('alt_description').notNullable();
  });
  await knex.schema.createTable('collections', (tbl) => {
    tbl.increments('id').primary();
    tbl.integer('categoryId').notNullable();
    tbl.text('collectionType').notNullable();
    tbl.text('name').notNullable();
    tbl.text('path').notNullable();
    tbl.text('imageUrl').notNullable();
    tbl.text('description').notNullable();
    tbl.integer('stylingId').references('id').inTable('stylings');
  });

  await knex.schema.createTable('products', (tbl) => {
    tbl.increments('id').primary();
    tbl.integer('price').notNullable();
    tbl.text('name').notNullable();
  });
  await knex.schema.createTable('collectionXproducts', (tbl) => {
    tbl.integer('collectionsId').references('id').inTable('collections');
    tbl.integer('productsId').references('id').inTable('products');
    tbl.integer('quantity').notNullable();
  });
  await knex.schema.createTable('users', (tbl) => {
    tbl.increments('id').primary();
    tbl.text('email').notNullable();
    tbl.text('password').notNullable();
    tbl.text('name').notNullable();
    tbl.text('address');
    tbl.text('addressNUmber');
    tbl.text('zipCode');
    tbl.text('city');
  });
  await knex.schema.createTable('orders', (tbl) => {
    tbl.increments('id').primary();
    tbl.text('email').notNullable();
    tbl.integer('userId').references('id').inTable('users');
    tbl.text('name').notNullable();
    tbl.text('address').notNullable();
    tbl.text('addressNUmber').notNullable();
    tbl.text('zipCode').notNullable();
    tbl.text('city').notNullable();
    tbl.integer('subTotal').notNullable();
    tbl.text('timestamp').notNullable();
  });
  await knex.schema.createTable('orderItems', (tbl) => {
    tbl.integer('orderId').primary().references('id').inTable('orders');
    tbl.integer('productId').primary().references('id').inTable('products');
    tbl
      .integer('collectionsId')
      .primary()
      .references('id')
      .inTable('collectionsId');
    tbl.integer('quantity').notNullable();
    tbl.text('name').notNullable();
    tbl.integer('price').notNullable();
  });

  await knex.schema.createTable('stylings', (tbl) => {
    tbl.increments('id').primary();
    tbl.text('name').notNullable();
    tbl.text('backgroundColor').notNullable();
    tbl.text('primaryColor').notNullable();
    tbl.text('secondaryColor').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('categories');
  await knex.schema.dropTableIfExists('collections');
  await knex.schema.dropTableIfExists('products');
  await knex.schema.dropTableIfExists('collectionXproducts');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('styling');
  await knex.schema.dropTableIfExists('orders');
  await knex.schema.dropTableIfExists('ordersId');
};
