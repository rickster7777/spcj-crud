import BaseRepository from '@tczdigital/node-utilities/database/mongodb/BaseRepository';
import { uploadModel } from './upload.model';
import client from '../../configs/redis.config';

/* This class is a repository for the UserRepository class. */
export default class uploadRepository extends BaseRepository {
    constructor() {
        super(uploadModel, client);
    }

    /**
     * "If the native parameter is true, return the native model, otherwise return a new instance of the
     * repository."
     *
     * @param [native=false] - If true, returns the native mongoose model. If false, returns a repository
     * instance.
     * @returns A new instance of the SessionRepository class.
     */
    static get(native = false) {
        if (native) return uploadModel;
        return new uploadRepository();
    }
}
