/**
 * G-SDK Protobuf Generator
 * Generates JavaScript files from .proto files
 * 
 * PREREQUISITE: You must have .proto files from Suprema in biostar/proto/
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function section(title) {
    console.log('\n' + '='.repeat(70));
    log(`  ${title}`, 'bold');
    console.log('='.repeat(70) + '\n');
}

// Check if grpc-tools is installed
function checkGrpcTools() {
    try {
        execSync('grpc_tools_node_protoc --version', { stdio: 'ignore' });
        return true;
    } catch (error) {
        return false;
    }
}

// Check if proto files exist
function checkProtoFiles() {
    const protoDir = path.join(__dirname, 'proto');
    if (!fs.existsSync(protoDir)) {
        return { exists: false, files: [] };
    }
    
    const files = fs.readdirSync(protoDir).filter(f => f.endsWith('.proto'));
    return { exists: files.length > 0, files };
}

// Generate protobuf files
function generateProtos(protoFiles) {
    const protoDir = path.join(__dirname, 'proto');
    const serviceDir = path.join(__dirname, 'service');
    
    // Create service directory if it doesn't exist
    if (!fs.existsSync(serviceDir)) {
        fs.mkdirSync(serviceDir, { recursive: true });
    }
    
    let successCount = 0;
    let failCount = 0;
    
    // Detect grpc plugin path (works on both Windows and Unix)
    const isWindows = process.platform === 'win32';
    let pluginPath;
    
    try {
        // Try to find global grpc-tools installation
        const grpcToolsGlobalPath = execSync('npm root -g', { encoding: 'utf8' }).trim();
        const globalPlugin = path.join(grpcToolsGlobalPath, 'grpc-tools', 'bin', isWindows ? 'grpc_node_plugin.exe' : 'grpc_node_plugin');
        
        if (fs.existsSync(globalPlugin)) {
            pluginPath = globalPlugin;
        }
    } catch (error) {
        // Fallback to local installation
        const localPlugin = path.join(process.cwd(), 'node_modules', 'grpc-tools', 'bin', isWindows ? 'grpc_node_plugin.exe' : 'grpc_node_plugin');
        if (fs.existsSync(localPlugin)) {
            pluginPath = localPlugin;
        }
    }
    
    if (!pluginPath) {
        log('✗ Could not find grpc_node_plugin. Files will generate without gRPC services.', 'yellow');
    }
    
    for (const protoFile of protoFiles) {
        try {
            log(`⏳ Generating from ${protoFile}...`, 'yellow');
            
            // Build command with proper plugin path
            let command = `grpc_tools_node_protoc ` +
                `--js_out=import_style=commonjs,binary:"${serviceDir}" ` +
                `-I "${protoDir}" ` +
                `"${path.join(protoDir, protoFile)}"`;
            
            // Add grpc generation only if plugin is found
            if (pluginPath) {
                command += ` --grpc_out=grpc_js:"${serviceDir}" --plugin=protoc-gen-grpc="${pluginPath}"`;
            }
            
            execSync(command, { stdio: 'pipe' });
            log(`✓ Generated: ${protoFile}`, 'green');
            successCount++;
        } catch (error) {
            log(`✗ Failed: ${protoFile}`, 'red');
            failCount++;
        }
    }
    
    return { successCount, failCount };
}

// Main execution
async function main() {
    section('G-SDK PROTOBUF GENERATOR');
    
    // Step 1: Check grpc-tools
    log('Step 1: Checking grpc-tools...', 'blue');
    if (!checkGrpcTools()) {
        log('✗ grpc-tools not found!', 'red');
        log('\nPlease install it:', 'yellow');
        log('  npm install -g grpc-tools', 'cyan');
        log('  OR', 'yellow');
        log('  npm install grpc-tools --save-dev', 'cyan');
        process.exit(1);
    }
    log('✓ grpc-tools is installed', 'green');
    
    // Step 2: Check proto files
    log('\nStep 2: Checking for .proto files...', 'blue');
    const { exists, files } = checkProtoFiles();
    
    if (!exists) {
        log('✗ No .proto files found in biostar/proto/', 'red');
        log('\n⚠️  YOU NEED TO GET PROTO FILES FROM SUPREMA!', 'yellow');
        log('\nNext steps:', 'cyan');
        log('1. Contact Suprema: support@supremainc.com', 'cyan');
        log('2. Request: G-SDK (gRPC SDK) with .proto files', 'cyan');
        log('3. Place .proto files in: biostar/proto/', 'cyan');
        log('4. Run this script again: node biostar/generate-protos.js', 'cyan');
        log('\n📖 See biostar/README.md for details', 'yellow');
        process.exit(1);
    }
    
    log(`✓ Found ${files.length} proto file(s)`, 'green');
    files.forEach(f => log(`  - ${f}`, 'cyan'));
    
    // Step 3: Generate JavaScript files
    log('\nStep 3: Generating JavaScript files...', 'blue');
    const { successCount, failCount } = generateProtos(files);
    
    // Step 4: Summary
    section('GENERATION COMPLETE');
    
    if (failCount === 0) {
        log(`🎉 SUCCESS! Generated ${successCount} protobuf file(s)`, 'green');
        log('\nNext steps:', 'cyan');
        log('1. Update .env with your device IPs', 'cyan');
        log('2. Start server: npm start', 'cyan');
        log('3. Test endpoints: npm run test:card', 'cyan');
    } else {
        log(`⚠️  Partial success: ${successCount} succeeded, ${failCount} failed`, 'yellow');
        log('\nCheck the errors above and fix them before starting the server.', 'yellow');
    }
    
    // List generated files
    const serviceDir = path.join(__dirname, 'service');
    if (fs.existsSync(serviceDir)) {
        const generatedFiles = fs.readdirSync(serviceDir);
        if (generatedFiles.length > 0) {
            log('\n📁 Generated files:', 'cyan');
            generatedFiles.forEach(f => log(`  ✓ ${f}`, 'green'));
        }
    }
}

// Run
if (require.main === module) {
    main().catch(error => {
        log(`\n❌ Error: ${error.message}`, 'red');
        console.error(error);
        process.exit(1);
    });
}

module.exports = { main };
