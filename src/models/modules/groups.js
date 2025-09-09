import { Model} from "../model";

export default class Groups extends Model {
    static ENDPOINT_PATH = "groups/";

    static MAPPING = {
        id: { type: Model.TYPES.Primary, default: undefined},
        name: { type: Model.TYPES.String, default: ""},
        users: { type: Model.TYPES.Array, default: []},
        servers: { type: Model.TYPES.Array, default: []}
    };

    constructor(obj) {
        super(Groups.MAPPING, Groups.ENDPOINT_PATH, obj);
    }
}
