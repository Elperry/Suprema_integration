#!/bin/bash

# Fix gRPC Package Import in Example Files
# This script replaces require('grpc') with require('@grpc/grpc-js')

echo "Fixing gRPC package imports in example files..."

file_count=0
updated_count=0

# Find all JS files in the example directory
while IFS= read -r -d '' file; do
    ((file_count++))
    
    # Check if file contains require('grpc')
    if grep -q "require('grpc')" "$file"; then
        echo "Updating: $file"
        
        # Replace require('grpc') with require('@grpc/grpc-js')
        sed -i "s/require('grpc')/require('@grpc\/grpc-js')/g" "$file"
        
        ((updated_count++))
        echo "  ✓ Updated"
    fi
done < <(find example -name "*.js" -type f -print0)

echo ""
echo "Summary:"
echo "  Files scanned: $file_count"
echo "  Files updated: $updated_count"

if [ $updated_count -gt 0 ]; then
    echo ""
    echo "✓ All example files have been updated to use '@grpc/grpc-js'"
    echo "You can now run example files without credential errors."
else
    echo ""
    echo "✓ No files needed updating"
fi
