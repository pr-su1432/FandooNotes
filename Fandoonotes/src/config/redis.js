import { createClient } from 'redis';
import logger from './logger';

export const client = createClient();

const clientRedis = async () => {
    try {
        await client.connect();
        logger.info('Connected to the reddis database');
    } catch (error) {
        logger.error('could not connec to the reddis database.', error);
    }
}
export default clientRedis;