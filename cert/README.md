# Certificate Directory

Place your Suprema gateway certificates in this directory:

- `gateway/ca.crt` - Root certificate from the device gateway
- `gateway/server.crt` - Server certificate (if needed)
- `gateway/server.key` - Server private key (if needed)

## How to get certificates:

1. Install and run the Suprema device gateway
2. The default certificate (ca.crt) should be located in the `cert` directory of the gateway installation
3. Copy the certificate file to this directory

## Directory structure:
```
cert/
├── gateway/
│   ├── ca.crt
│   ├── server.crt (optional)
│   └── server.key (optional)
└── README.md (this file)
```