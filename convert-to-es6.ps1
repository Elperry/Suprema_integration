# PowerShell Script to Convert Node.js Project to ES6 Modules
# Converts require/module.exports to import/export

Write-Host "Converting Node.js project to ES6 modules..." -ForegroundColor Green

# Define file patterns to convert
$filePaths = @(
    "packages\backend\src\**\*.js",
    "example\**\*.js",
    "packages\backend\*.js"
)

# Function to convert a single file
function Convert-FileToES6 {
    param (
        [string]$filePath
    )
    
    if (-not (Test-Path $filePath)) {
        Write-Host "File not found: $filePath" -ForegroundColor Yellow
        return
    }
    
    Write-Host "Converting: $filePath" -ForegroundColor Cyan
    
    $content = Get-Content $filePath -Raw
    $originalContent = $content
    
    # Skip if already using ES6 imports
    if ($content -match "^import .* from" -or $content -match "^export ") {
        Write-Host "  Already ES6, skipping" -ForegroundColor Gray
        return
    }
    
    # Convert require statements to import
    # Pattern: const name = require('module');
    $content = $content -replace "const\s+(\w+)\s*=\s*require\s*\(\s*[`""']([^`""']+)[`""']\s*\)\s*;", "import `$1 from '`$2.js';"
    
    # Pattern: const { item1, item2 } = require('module');
    $content = $content -replace "const\s+\{([^}]+)\}\s*=\s*require\s*\(\s*[`""']([^`""']+)[`""']\s*\)\s*;", "import { `$1 } from '`$2.js';"
    
    # Pattern: require('module') without assignment (like dotenv)
    $content = $content -replace "require\s*\(\s*[`""']([^`""']+)[`""']\s*\)\.config\(\)", "import '$1'`nimport { config } from 'dotenv'`nconfig()"
    
    # Convert module.exports to export default
    $content = $content -replace "module\.exports\s*=\s*(\w+)\s*;", "export default `$1;"
    
    # Convert exports.name = value to export const name = value
    $content = $content -replace "exports\.(\w+)\s*=", "export const `$1 ="
    
    # Fix .js extensions for non-npm modules (local files starting with ./)
    $content = $content -replace "from\s+[`""'](\./[^`""']+)\.js\.js[`""']", "from '`$1.js'"
    $content = $content -replace "from\s+[`""'](\.\./[^`""']+)\.js\.js[`""']", "from '`$1.js'"
    
    # Don't add .js to npm packages
    $content = $content -replace "from\s+[`""'](@[^/]+/[^`""']+)\.js[`""']", "from '`$1'"
    $content = $content -replace "from\s+[`""']([^./][^`""']+)\.js[`""']", "from '`$1'"
    
    # Save if changed
    if ($content -ne $originalContent) {
        Set-Content -Path $filePath -Value $content -NoNewline
        Write-Host "  Converted successfully" -ForegroundColor Green
    } else {
        Write-Host "  No changes needed" -ForegroundColor Gray
    }
}

# Get all JavaScript files
Write-Host "`nFinding JavaScript files..." -ForegroundColor Yellow

$allFiles = @()
foreach ($pattern in $filePaths) {
    $files = Get-ChildItem -Path $pattern -Recurse -ErrorAction SilentlyContinue
    $allFiles += $files
}

Write-Host "Found $($allFiles.Count) JavaScript files`n" -ForegroundColor Yellow

# Convert each file
$converted = 0
foreach ($file in $allFiles) {
    Convert-FileToES6 -filePath $file.FullName
    $converted++
}

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "Conversion Complete!" -ForegroundColor Green
Write-Host "Processed: $converted files" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review the converted files for any manual fixes needed" -ForegroundColor White
Write-Host "2. Update require.main === module checks to use import.meta.url" -ForegroundColor White
Write-Host "3. Add .js extensions to all local imports if missing" -ForegroundColor White
Write-Host "4. Test the application: npm run dev:backend" -ForegroundColor White
