#!/bin/bash
cd /home/kavia/workspace/code-generation/ayuheal-hub-107395-bef9d6cc/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

