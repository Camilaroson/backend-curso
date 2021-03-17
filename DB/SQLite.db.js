const sqlite3 = {
    client: 'sqlite3',
    connection: {
      filename: "./mensajes.sqlite"
},
useNullAsDefault: true
}

module.exports = {
    sqlite3
}