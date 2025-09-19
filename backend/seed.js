const mongoose = require('mongoose');
const faker = require('faker');
const Customer = require('./models/customer');
const Product = require('./models/product');
const Sale = require('./models/sale');

mongoose.connect('mongodb://localhost:27017/salesdb');

async function seed() {
    await Customer.deleteMany({});
    await Product.deleteMany({});
    await Sale.deleteMany({});

    // Customers
    const customers = [];
    const regions = ['North', 'South', 'East', 'West'];
    const types = ['Individual', 'Business'];
    for (let i = 0; i < 20; i++) {
        customers.push({
            name: faker.name.findName(),
            region: faker.random.arrayElement(regions),
            type: faker.random.arrayElement(types)
        });
    }
    const createdCustomers = await Customer.insertMany(customers);

    // Products
    const categories = ['Electronics', 'Apparel', 'Food', 'Books'];
    const products = [];
    for (let i = 0; i < 15; i++) {
        products.push({
            name: faker.commerce.productName(),
            category: faker.random.arrayElement(categories),
            price: faker.commerce.price(10, 200)
        });
    }
    const createdProducts = await Product.insertMany(products);

    // Sales (100+ records over 2 years)
    const sales = [];
    for (let i = 0; i < 120; i++) {
        const customer = faker.random.arrayElement(createdCustomers);
        const product = faker.random.arrayElement(createdProducts);
        const quantity = faker.datatype.number({ min: 1, max: 10 });
        const date = faker.date.between('2023-01-01', '2025-01-01');
        sales.push({
            reportDate: date,
            customer: customer._id,
            product: product._id,
            quantity,
            totalRevenue: quantity * Number(product.price),
            region: customer.region,
        });
    }
    await Sale.insertMany(sales);
    console.log('Database seeded.');
    mongoose.connection.close();
}

seed();
