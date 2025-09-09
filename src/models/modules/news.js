import { Model} from "../model";

export default class News extends Model {
    static ENDPOINT_PATH = "news/";

    static MAPPING = {
        id: { type: Model.TYPES.Primary, default: undefined},
        title: { type: Model.TYPES.String, default: ""},
        message: { type: Model.TYPES.String, default: ""},
        active: { type: Model.TYPES.Boolean, default: false}
    };

    constructor(obj) {
        super(News.MAPPING, News.ENDPOINT_PATH, obj);
    }
}
