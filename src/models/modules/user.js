import { Model } from "../model";

export default class User extends Model {
    static ENDPOINT_PATH = "user/";

    static Name = "User";

    static MAPPING = {
        id: { type: Model.TYPES.Primary, default: undefined },
        username: { type: Model.TYPES.String, default: '' },
        image: { type: Model.TYPES.String, default: '' },
        isAdmin: { type: Model.TYPES.Number, default: 0}
    }

    constructor(obj) {
        super(User.MAPPING, User.ENDPOINT_PATH, obj);
    }
}
