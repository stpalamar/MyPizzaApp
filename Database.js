import * as SQLite from 'expo-sqlite';

export function openDatabase() {
  const db = SQLite.openDatabase('pizza.db');
  return db;
}
