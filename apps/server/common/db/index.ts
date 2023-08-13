import mysql from "mysql";

export const createDBConnection = () => {
  return new Promise<mysql.Connection>((resolve, reject) => {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "123456",
      database: "mmodb",
    });
    connection.connect((e) => {
      if (e) {
        reject(e);
        return;
      }
      resolve(connection);
    });
  });
};
