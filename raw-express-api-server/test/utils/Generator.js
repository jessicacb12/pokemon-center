module.exports = class Generator {
  static get idFormat() {
    return "00000000-00{type}-4000-0000-{parents}{idOffset}";
  }

  static get types() {
    return {
      user: 1,
    };
  }

  constructor() {
    this.records = [];
  }

  static id(type, offset, parents = []) {
    if (!type) throw new Error(`unknown type: ${type}`);
    if (parents.length > 4) throw new Error("parents length too long");
    const parentsPad = [];
    for (let i = 0; i < 4; i += 1) {
      const parentId = parents[i] || 0;
      parentsPad.push(Generator.pad(parentId));
    }
    const parentsString = parentsPad.join("");
    return Generator.idFormat.replace("{type}", Generator.pad(Generator.types[type])).replace("{parents}", parentsString).replace("{idOffset}", Generator.pad(offset, 4));
  }

  static generateHex(length = 4) {
    let result = "";
    for (let i = 0; i < length; i += 1) {
      result += "0123456789abcdef"[Math.round(Math.random() * 15)];
    }
    return result;
  }

  static pad(number, width = 2, z = "0") {
    const n = `${number}`;
    return n.length >= width ? n : new Array((width - n.length) + 1).join(z) + n;
  }

  push(modelName, data) {
    this.records.push({
      model: modelName,
      keys: ["id"],
      data,
    });
  }

  addUser(idOffset, name, details = {}) {
    const userId = Generator.id("user", idOffset);
    const email = `${name}@email.system`;
    const data = {
      id: userId,
      name,
      email,
      rawPassword: "password",
      role: "user",
      ...details,
    };
    this.push("User", data);
    return data;
  }
};
