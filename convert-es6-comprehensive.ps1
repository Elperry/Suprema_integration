# Comprehensive ES6 Conversion Script
# Converts entire Node.js project to ES6 modules with proper handling of edge cases

param(
    [switch]$DryRun,
    [switch]$Verbose
)

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "ES6 Conversion Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

$stats = @{
    Total = 0
    Converted = 0
    Skipped = 0
    Errors = 0
}

# Define conversion rules
function Convert-RequireToImport {
    param([string]$content)
    
    # const something = require('module');
    $content = $content -replace '(?m)^const\s+(\w+)\s*=\s*require\([''"]([^''""]+ )[''"])\;?$', 'import $1 from ''$2'';'
    
    # const { item1, item2 } = require('module');
    $content = $content -replace '(?m)^const\s+\{([^}]+)\}\s*=\s*require\([''"]([^''""]+)[''"])\;?$', 'import {$1} from ''$2'';'
    
    # require('dotenv').config()
    $content = $content -replace 'require\([''"]dotenv[''"])\\.config\(\)\;?', "import dotenv from 'dotenv';`ndotenv.config();"
    
    # EventEmitter from events
    $content = $content -replace 'const\s+EventEmitter\s*=\s*require\([''"]events[''"])\;?', "import { EventEmitter } from 'events';"
    
    return $content
}

function Add-JSExtensions {
    param([string]$content)
    
    # Add .js to local imports (starting with ./ or ../)
    $content = $content -replace "from\s+(['`""])(\./[^'`""]+)(['`""])", "from `$1`$2.js`$3"
    $content = $content -replace "from\s+(['`""])(\.\./[^'`""]+)(['`""])", "from `$1`$2.js`$3"
    
    # Fix double .js.js
    $content = $content -replace "\.js\.js(['`""])", ".js`$1"
    
    # Don't add .js to npm packages (no ./ or ../)
    # Already handled by the patterns above
    
    return $content
}

function Convert-ModuleExports {
    param([string]$content)
    
    # module.exports = Something;
    $content = $content -replace "(?m)^module\.exports\s*=\s*(\w+);?$", "export default `$1;"
    
    # exports.something = value
    $content = $content -replace "(?m)^exports\.(\w+)\s*=", "export const `$1 ="
    
    return $content
}

function Convert-RequireMain {
    param([string]$content)
    
    # require.main === module
    $content = $content -replace "if\s*\(\s*require\.main\s*===\s*module\s*\)", "if (import.meta.url === ``file:///`${process.argv[1].replace(/\\/g, '/')}``)"
    
    return $content
}

function Convert-Dirname {
    param([string]$content)
    
    # Add __dirname/__filename imports if used
    if ($content -match '__dirname|__filename') {
        if ($content -notmatch 'import.*fileURLToPath') {
            $imports = "import { fileURLToPath } from 'url';`nimport { dirname } from 'path';`n`nconst __filename = fileURLToPath(import.meta.url);`nconst __dirname = dirname(__filename);`n`n"
            # Insert after first import or at the start
            if ($content -match '(?s)(import .+?\n)+') {
                $content = $content -replace '(?s)((import .+?\n)+)', "`$1`n$imports"
            }
        }
    }
    
    return $content
}

function Convert-File {
    param(
        [string]$FilePath
    )
    
    try {
        $stats.Total++
        
        if (-not (Test-Path $FilePath)) {
            Write-Host "  [SKIP] File not found: $FilePath" -ForegroundColor Yellow
            $stats.Skipped++
            return
        }
        
        $content = Get-Content $FilePath -Raw -ErrorAction Stop
        $original = $content
        
        # Skip if already ES6
        if ($content -match "(?m)^import .+ from" -and $content -match "(?m)^export (default|const|class)") {
            if ($Verbose) {
                Write-Host "  [SKIP] Already ES6: $FilePath" -ForegroundColor Gray
            }
            $stats.Skipped++
            return
        }
        
        # Apply conversions
        $content = Convert-RequireToImport $content
        $content = Add-JSExtensions $content
        $content = Convert-ModuleExports $content
        $content = Convert-RequireMain $content
        $content = Convert-Dirname $content
        
        # Check if changed
        if ($content -ne $original) {
            if (-not $DryRun) {
                Set-Content -Path $FilePath -Value $content -NoNewline -ErrorAction Stop
            }
            Write-Host "  [OK] $FilePath" -ForegroundColor Green
            $stats.Converted++
        } else {
            if ($Verbose) {
                Write-Host "  [NO CHANGE] $FilePath" -ForegroundColor Gray
            }
            $stats.Skipped++
        }
        
    } catch {
        Write-Host "  [ERROR] $FilePath : $_" -ForegroundColor Red
        $stats.Errors++
    }
}

# Main execution
Write-Host "Finding JavaScript files..." -ForegroundColor Yellow

# Get all files
$backendFiles = Get-ChildItem -Path "packages\backend\src" -Filter "*.js" -Recurse -ErrorAction SilentlyContinue
$exampleFiles = Get-ChildItem -Path "example" -Filter "*.js" -Recurse -ErrorAction SilentlyContinue
$rootBackendFiles = Get-ChildItem -Path "packages\backend" -Filter "*.js" -File -ErrorAction SilentlyContinue

$allFiles = @()
$allFiles += $backendFiles
$allFiles += $exampleFiles
$allFiles += $rootBackendFiles

Write-Host "Found $($allFiles.Count) files to process`n" -ForegroundColor Yellow

if ($DryRun) {
    Write-Host "[DRY RUN MODE - No files will be modified]`n" -ForegroundColor Magenta
}

# Convert each file
Write-Host "Converting files...`n" -ForegroundColor Yellow

foreach ($file in $allFiles) {
    Convert-File -FilePath $file.FullName
}

# Summary
Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "Conversion Summary" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Total files:     $($stats.Total)" -ForegroundColor White
Write-Host "Converted:       $($stats.Converted)" -ForegroundColor Green
Write-Host "Skipped:         $($stats.Skipped)" -ForegroundColor Gray
Write-Host "Errors:          $($stats.Errors)" -ForegroundColor Red
Write-Host "==================================" -ForegroundColor Cyan

if ($stats.Errors -gt 0) {
    Write-Host "`nSome files had errors. Please review them manually." -ForegroundColor Yellow
}

if (-not $DryRun) {
    Write-Host "`nNext steps:" -ForegroundColor Yellow
    Write-Host "1. Review converted files" -ForegroundColor White
    Write-Host "2. Fix any protobuf import statements manually" -ForegroundColor White
    Write-Host "3. Test: npm run dev:backend" -ForegroundColor White
} else {
    Write-Host "`nRun without -DryRun to apply changes" -ForegroundColor Yellow
}
