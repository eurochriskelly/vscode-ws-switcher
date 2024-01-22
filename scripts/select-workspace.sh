#!/bin/bash

# if $1 is not empty use it, otherwise use default
if [ -n "$1" ]; then
    selected_file="$1"
else
    # Directory containing the files
    directory="workspaces"

    # Get a list of filenames without extensions
    files=($(ls "$directory" | sed 's/\.[^.]*$//' | grep -v "common"))

    # Check if there are any files in the directory
    if [ ${#files[@]} -eq 0 ]; then
        echo "No files found in the $directory."
        exit 1
    fi
    

    # Display the files with numbers
    echo "Please pick a workspace:"
    for i in "${!files[@]}"; do
        echo "$((i+1)). ${files[$i]}"
    done

    # Prompt user for selection
    echo -n "Select: "
    read -r selection

    # Validate selection
    re='^[0-9]+$'
    if ! [[ $selection =~ $re ]] || [ "$selection" -lt 1 ] || [ "$selection" -gt "${#files[@]}" ]; then
        echo "Invalid selection."
        exit 1
    fi

    # Subtract 1 to get the array index
    index=$((selection-1))

    # Get the selected filename based on the second token in the path
    selected_file=$(echo "${files[$index]}" | cut -d'/' -f2)

    # Store the selected filename in a variable
    selected_file=${files[$index]}
fi


# For demonstration purposes, echo the selected file
jsws=.ws-switcher/$selected_file/ws.js
if [ -f "$jsws" ];then
    node $jsws > ws.code-workspace
else
    echo ""
    echo ""
    echo "ERROR: No such file [$jsws]"
    echo ""
    echo ""
fi
