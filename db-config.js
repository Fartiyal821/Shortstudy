const DATABASE_ID = '1CMl86JumnVddhOeg4LmqrqsgIt9xBaKCrchIJOh811s';
const DB_PREFIX = `shortstudy_${DATABASE_ID}_`;

function storageKey(name) {
    return `${DB_PREFIX}${name}`;
}

function storageGet(name) {
    return localStorage.getItem(storageKey(name));
}

function storageSet(name, value) {
    localStorage.setItem(storageKey(name), value);
}

function storageRemove(name) {
    localStorage.removeItem(storageKey(name));
}
