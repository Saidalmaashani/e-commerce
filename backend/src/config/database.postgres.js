import pkg from 'pg';
import { Sequelize } from 'sequelize';

const { Pool } = pkg;

// Connection pools for each database
const pools = {};

export const createPool = (dbName) => {
  if (pools[dbName]) return pools[dbName];

  const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env[`PG_DATABASE_${dbName.toUpperCase()}`],
  });

  pools[dbName] = pool;

  pool.on('error', (err) => {
    console.error(`Unexpected error on idle client in ${dbName}:`, err);
  });

  return pool;
};

// Sequelize instances for each database
const sequelizeInstances = {};

export const getSequelize = (dbName) => {
  if (sequelizeInstances[dbName]) return sequelizeInstances[dbName];

  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env[`PG_DATABASE_${dbName.toUpperCase()}`],
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 2,
      acquire: 30000,
      idle: 10000,
    },
  });

  sequelizeInstances[dbName] = sequelize;
  return sequelize;
};

export const connectPostgreSQL = async () => {
  try {
    const databases = ['shoppers', 'delivery', 'admin', 'shared'];

    for (const dbName of databases) {
      const sequelize = getSequelize(dbName);
      await sequelize.authenticate();
      console.log(`PostgreSQL ${dbName} database connected`);
    }
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    throw error;
  }
};

export const query = async (dbName, sql, values = []) => {
  const pool = createPool(dbName);
  try {
    const result = await pool.query(sql, values);
    return result.rows;
  } catch (error) {
    console.error(`Query error in ${dbName}:`, error);
    throw error;
  }
};

export const disconnectPostgreSQL = async () => {
  try {
    for (const pool of Object.values(pools)) {
      await pool.end();
    }

    for (const sequelize of Object.values(sequelizeInstances)) {
      await sequelize.close();
    }

    console.log('PostgreSQL disconnected');
  } catch (error) {
    console.error('PostgreSQL disconnection error:', error);
    throw error;
  }
};
