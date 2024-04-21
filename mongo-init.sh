#!/bin/bash

set -e

mongosh "mongodb://$MONGO_INITDB_ROOT_USERNAME:$MONGO_INITDB_ROOT_PASSWORD@127.0.0.1:27017/" <<EOF
use $MONGO_INITDB_DATABASE
db.createUser({
  user: '$MONGO_INITDB_USERNAME',
  pwd:  '$MONGO_INITDB_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_INITDB_DATABASE'
  }]
})
EOF
