#!/bin/bash
git config --global push.default simple
git remote add production ssh://fonnie@120.50.78.185/CustomBlog
git push production deploy