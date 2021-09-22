import api from "../services/api";

export class Model {
  static TYPES = {
    String: "string",
    Number: "number",
    Boolean: "boolean",
    Array: "array",
    Primary: "primary",
    Date: "date"
  };

  constructor(mapping, path, _obj) {
    const obj = _obj || {};
    this.path = path;
    Model.validateMapping(mapping);

    Object.entries(mapping).forEach((key, mappingData) => {
      if (
        mappingData.type.prototype instanceof Model &&
        !mappingData.isNested
      ) {
        this.createForeignRelations(key, mappingData.type);
      }

      let val = obj[key] || mappingData.default;
      if (mappingData.attributeName) {
        val = obj[mappingData.attributeName] || mappingData.default;
      }
      if (mappingData.type.prototype instanceof Model && mappingData.isNested) {
        if (mappingData.isArray) {
          if (Array.isArray(val)) {
            val = val.map((v) => new mappingData.type(v));
          } else {
            throw Error(
              `Attribute ${key} should be array, found ${typeof val}`
            );
          }
        } else {
          val = new mappingData.type(val);
        }
      }
      this[key] = val;
    });
  }

  get endpoint() {
    if (this.id) {
      return `${this.path + this.id}/`;
    }
    return this.path;
  }

  static validateMapping(mapping) {
    Object.entries(mapping).forEach(([key, value]) => {
      if (!value.hasOwnProperty("type")) {
        throw Error(`Missing type in ${key}`);
      }

      if (!value.hasOwnProperty("default")) {
        throw Error(`Missing default in ${key}`);
      }
    });
  }

  createForeignRelations(_property, Clazz) {
    let property = _property.replace(/_id$/g, "");

    property = property
      .replace(
        /([^\W_])([^\W_]*)/g,
        (g0, g1, g2) => g1.toUpperCase() + g2.toUpperCase()
      )
      .replace(/(-*_*)/g, "");

    Object.defineProperty(this, property, {
      get() {
        if (this[_property]) {
          const res = window.app.$store.getters[`${Clazz.NAME}/byId`](
            this[_property]
          );
          if (!res.id && this.id) {
            window.app.$store.dispatch(`${Clazz.NAME}/byId`, this[_property]);
          }
          return res;
        }
        return new Clazz();
      },
      set(value) {
        if (typeof value !== "object") {
          this[_property] = value;
        } else if (value.id) {
          this[_property] = value.id;
        }
      }
    });
  }

  update() {
    const obj = this;
    return new Promise((resolve, reject) => {
      if (obj.id) {
        api
          .put(obj.endpoint, obj)
          .then((resp) => {
            resolve(resp.data);
          })
          .catch((e) => {
            reject(e);
          });
      } else {
        api
          .post(obj.endpoint, obj)
          .then((resp) => {
            resolve(resp.data);
          })
          .catch((e) => {
            reject(e);
          });
      }
    });
  }
}
