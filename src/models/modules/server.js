import { Model } from "../model";

export default class Server extends Model {
    static ENDPOINT_PATH = "servers/";

    static NAME = "Server";

    static MAPPING = {
        id: { type: Model.TYPES.Primary, default: undefined },
        name: { type: Model.TYPES.String, default: "" }
    };

    constructor(obj) {
        super(Server.MAPPING, Server.ENDPOINT_PATH, obj);
    }
}
