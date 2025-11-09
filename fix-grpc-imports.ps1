# Fix gRPC Package Import in Example Files
# This script replaces require('grpc') with require('@grpc/grpc-js')

Write-Host "Fixing gRPC package imports in example files..." -ForegroundColor Green

$fileCount = 0
$updatedCount = 0

# Get all JS files in the example directory
$files = Get-ChildItem -Path "example" -Filter "*.js" -Recurse

foreach ($file in $files) {
    $fileCount++
    $content = Get-Content $file.FullName -Raw
    
    # Check if file contains require('grpc')
    if ($content -match "require\('grpc'\)") {
        Write-Host "Updating: $($file.FullName)" -ForegroundColor Yellow
        
        # Replace require('grpc') with require('@grpc/grpc-js')
        $newContent = $content -replace "require\('grpc'\)", "require('@grpc/grpc-js')"
        
        # Write back to file
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        
        $updatedCount++
        Write-Host "  ✓ Updated" -ForegroundColor Green
    }
}

Write-Host "`nSummary:" -ForegroundColor Cyan
Write-Host "  Files scanned: $fileCount" -ForegroundColor White
Write-Host "  Files updated: $updatedCount" -ForegroundColor Green

if ($updatedCount -gt 0) {
    Write-Host "`n✓ All example files have been updated to use '@grpc/grpc-js'" -ForegroundColor Green
    Write-Host "You can now run example files without credential errors." -ForegroundColor White
} else {
    Write-Host "`n✓ No files needed updating" -ForegroundColor Green
}
