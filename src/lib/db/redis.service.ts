/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

// import redis from 'redis';

// const client = redis.createClient({
//   port: process.env.REDIS_PORT,
//   host: process.env.REDIS_HOST,
// });

// client.on('connect', () => {
//   console.log('Client connected to Redis.');
// });

// client.on('ready', () => {
//   console.log('Client connected to Redis and Ready to use.');
// });

// client.on('error', (err) => {
//   console.log(err.message);
// });

// client.on('end', () => {
//   console.log('Client disconnected from redis');
// });

// process.on('SIGINT', () => {
//   client.quit();
// });

// export default client;
