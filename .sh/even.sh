#! /bin/bash

# Ask if the user wants to build the project
read -p "Do you want to build the project? (y/n) " build_project

# Set default dist directory
dist_dir="client/dist"

# If user doesn't want to build the project, check if dist directory exists
if [ "$build_project" != "y" ] && [ ! -d "$dist_dir" ]; then
    echo "Error: $dist_dir does not exist. Please build the project or create the directory."
    exit 1
fi

# If user wants to build the project, run npm build
if [ "$build_project" = "y" ]; then
    read -p "Is a production deploy? (y/n) " production_deploy
    
    if [ "$production_deploy" = "y" ]; then
      npm run build
    else
      npm run build_dev
    fi
fi

# Force add web
git add "$dist_dir" -f
git commit -m "[production deploy]"

# Always return to the previous state
trap '
  git reset --soft HEAD~1 && 
  git restore --staged "$dist_dir" && 
  echo -e "\n\nRestored git"
  ' EXIT

# Publish
git push even main -f

#
echo -e "\n\nPublished to even/main !"