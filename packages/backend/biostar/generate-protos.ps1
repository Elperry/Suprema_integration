# G-SDK Protobuf Generator (PowerShell)
# Generates JavaScript files from .proto files

$ErrorActionPreference = "Stop"

# Colors
function Write-Success { param($msg) Write-Host $msg -ForegroundColor Green }
function Write-Error { param($msg) Write-Host $msg -ForegroundColor Red }
function Write-Info { param($msg) Write-Host $msg -ForegroundColor Cyan }
function Write-Warning { param($msg) Write-Host $msg -ForegroundColor Yellow }
function Write-Section { 
    param($title) 
    Write-Host "`n========================================================================" -ForegroundColor Cyan
    Write-Host "  $title" -ForegroundColor White
    Write-Host "========================================================================`n" -ForegroundColor Cyan
}

# Check if grpc-tools is installed
function Test-GrpcTools {
    try {
        $null = & grpc_tools_node_protoc --version 2>&1
        return $true
    } catch {
        return $false
    }
}

# Main script
Write-Section "G-SDK PROTOBUF GENERATOR"

# Step 1: Check grpc-tools
Write-Info "Step 1: Checking grpc-tools..."
if (-not (Test-GrpcTools)) {
    Write-Error "✗ grpc-tools not found!"
    Write-Warning "`nPlease install it:"
    Write-Info "  npm install -g grpc-tools"
    Write-Info "  OR"
    Write-Info "  npm install grpc-tools --save-dev"
    exit 1
}
Write-Success "✓ grpc-tools is installed"

# Step 2: Check proto files
Write-Info "`nStep 2: Checking for .proto files..."
$protoDir = Join-Path $PSScriptRoot "proto"
$serviceDir = Join-Path $PSScriptRoot "service"

if (-not (Test-Path $protoDir)) {
    Write-Error "✗ Proto directory not found: $protoDir"
    exit 1
}

$protoFiles = Get-ChildItem -Path $protoDir -Filter "*.proto" -File

if ($protoFiles.Count -eq 0) {
    Write-Error "✗ No .proto files found in $protoDir"
    Write-Warning "`n⚠️  YOU NEED TO GET PROTO FILES FROM SUPREMA!"
    Write-Info "`nNext steps:"
    Write-Info "1. Contact Suprema: support@supremainc.com"
    Write-Info "2. Request: G-SDK (gRPC SDK) with .proto files"
    Write-Info "3. Place .proto files in: biostar\proto\"
    Write-Info "4. Run this script again: .\biostar\generate-protos.ps1"
    Write-Warning "`n📖 See biostar\README.md for details"
    exit 1
}

Write-Success "✓ Found $($protoFiles.Count) proto file(s)"
foreach ($file in $protoFiles) {
    Write-Info "  - $($file.Name)"
}

# Create service directory if it doesn't exist
if (-not (Test-Path $serviceDir)) {
    New-Item -ItemType Directory -Path $serviceDir -Force | Out-Null
}

# Step 3: Generate JavaScript files
Write-Info "`nStep 3: Generating JavaScript files..."

$successCount = 0
$failCount = 0

foreach ($protoFile in $protoFiles) {
    try {
        Write-Warning "⏳ Generating from $($protoFile.Name)..."
        
        $pluginPath = Join-Path (Get-Location) "node_modules\.bin\grpc_tools_node_protoc_plugin.cmd"
        
        $command = "grpc_tools_node_protoc " +
            "--js_out=import_style=commonjs,binary:$serviceDir " +
            "--grpc_out=grpc_js:$serviceDir " +
            "--plugin=protoc-gen-grpc=$pluginPath " +
            "-I $protoDir " +
            "$($protoFile.FullName)"
        
        Invoke-Expression $command
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "✓ Generated: $($protoFile.Name)"
            $successCount++
        } else {
            Write-Error "✗ Failed: $($protoFile.Name)"
            $failCount++
        }
    } catch {
        Write-Error "✗ Failed: $($protoFile.Name) - $($_.Exception.Message)"
        $failCount++
    }
}

# Step 4: Summary
Write-Section "GENERATION COMPLETE"

if ($failCount -eq 0) {
    Write-Success "🎉 SUCCESS! Generated $successCount protobuf file(s)"
    Write-Info "`nNext steps:"
    Write-Info "1. Update .env with your device IPs"
    Write-Info "2. Start server: npm start"
    Write-Info "3. Test endpoints: npm run test:card"
} else {
    Write-Warning "⚠️  Partial success: $successCount succeeded, $failCount failed"
    Write-Warning "`nCheck the errors above and fix them before starting the server."
}

# List generated files
if (Test-Path $serviceDir) {
    $generatedFiles = Get-ChildItem -Path $serviceDir -File
    if ($generatedFiles.Count -gt 0) {
        Write-Info "`n📁 Generated files:"
        foreach ($file in $generatedFiles) {
            Write-Success "  ✓ $($file.Name)"
        }
    }
}

Write-Host ""
