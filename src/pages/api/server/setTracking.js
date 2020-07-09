const low = require('lowdb');
const path = require('path');
const passwordHash = require('password-hash');

const FileSync = require('lowdb/adapters/FileSync');
const configAdapter = new FileSync(path.resolve('server/bin', 'config.json'));
const { logger } = require('../../../server/helpers/logger');

export default async (req, res) => {
  try {
    const config = await low(configAdapter);
    const password = req.body.password;
    await config.set('password', passwordHash.generate(password)).write();
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    logger.log('error', e.message, { service: 'api' });
    res.status(500).send(e.message);
  }
};
