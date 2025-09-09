import { Model} from "../model";

export default class SererScripts extends Model {
    static ENDPOINT_PATH = "server/scripts/";

    static MAPPING = {
        id: { type: Model.TYPES.Primary, default: undefined},
        server_id: { type: Model.TYPES.Number, default: undefined},
        name: { type: Model.TYPES.String, default: ""},
        type: { type: Model.TYPES.Number, default: undefined}
    };

    constructor(obj) {
        super(SererScripts.MAPPING, SererScripts.ENDPOINT_PATH, obj);
    }
}
