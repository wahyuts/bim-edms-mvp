export function createBaseRepository(tableName) {
  return {
    tableName,
    list() {
      return [];
    },
    findById() {
      return null;
    },
    create(payload) {
      return { id: Date.now(), ...payload };
    },
    update(id, payload) {
      return { id, ...payload };
    },
    remove(id) {
      return true;
    },
  };
}

