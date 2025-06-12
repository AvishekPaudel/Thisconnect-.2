#!/bin/bash

# Start backend
(cd thisconnect-backend && node app.js) &

# Start frontend
(cd thisconnect-frontend && npm run dev)
