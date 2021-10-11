#!/bin/bash

curl http://localhost:5000/

curl --header "Content-Type: application/json" -d "{\"value\":\"node JS\"}" http://localhost:3000/test
