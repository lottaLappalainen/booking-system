## Requirements

**Node >= 16.0.0**

This server requires Node version 16 or later. All javascript files use ES6 modules
and Node requires the file extension to be ``.mjs`` instead of ``.js``

## Installation

```
npm install
```

Database of users is saved to ``db/db.json`` and it can be reset again with the above command.
If you want to start with empty database just delete the file ``db/db.json``


## Running server

```
npm start
```

Server listens on port _3001_. You can define a different port inside ``nodemon.json``
file.


