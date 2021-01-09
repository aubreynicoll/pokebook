#!/bin/bash

git for-each-ref --format '%(refname:short)' refs/heads | grep -v main | xargs git branch -D