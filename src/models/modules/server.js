import { Model} from "../model";

export default class Serer extends Model {
  static ENDPOINT_PATH = "servers/";

  static MAPPING = {
    id: { type: Model.TYPES.Primary, default: undefined},
    name: { type: Model.TYPES.String, default: ""},
    image: { type: Model.TYPES.String, default: ""},
    type: { type: Model.TYPES.String, default: ""},
    information : { type: Model.TYPES.String, default: ""}
  };

  constructor(obj) {
    super(Serer.MAPPING, Serer.ENDPOINT_PATH, obj);
  }
}
