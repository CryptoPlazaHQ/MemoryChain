# ARQUITECTURA TÉCNICA DETALLADA: MemoriaChain + POK DApp
## Especificaciones para Equipo de Desarrollo

---

## 1. STACK TECNOLÓGICO PROPUESTO

### 1.1 Capas del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│ CAPA 0: FRONTEND (User-Facing)                             │
│ ├─ Frontend Web: React 18 + TypeScript + TailwindCSS       │
│ ├─ Mobile: React Native / Flutter                          │
│ ├─ Admin Dashboard: Next.js + Shadcn UI                    │
│ └─ Public Verifier: Static site (Vercel) con búsqueda      │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ CAPA 1: API GATEWAY & MIDDLEWARE                            │
│ ├─ Framework: Node.js + Express / Fastify                  │
│ ├─ Authentication: JWT + 2FA (TOTP)                         │
│ ├─ Rate Limiting: Redis + bucket algorithm                 │
│ ├─ CORS & Security Headers: Helmet.js                      │
│ └─ Logging: Winston + Datadog                              │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ CAPA 2: LÓGICA DE NEGOCIO                                  │
│ ├─ Document Ingestion Service                              │
│ ├─ POK Integration Service (API calls a POK)               │
│ ├─ Blockchain Service (Smart contracts)                    │
│ ├─ IPFS Service (Fragmentación + distribución)             │
│ ├─ Search Service (IA + Elasticsearch)                     │
│ ├─ Access Control Service (RBAC + atributos)               │
│ └─ Audit & Logging Service                                 │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ CAPA 3: INTEGRACIONES EXTERNAS                             │
│ ├─ POK API (Credenciales digitales)                        │
│ ├─ Blockchain RPC (Polygon/Avalanche)                      │
│ ├─ IPFS Pinning Service (Pinata / nft.storage)             │
│ ├─ LMS Adapters (Moodle, Canvas, Blackboard)               │
│ ├─ Email Service (SendGrid)                                │
│ └─ Payment Gateway (Stripe / Wompi)                        │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ CAPA 4: DATA & STORAGE                                     │
│ ├─ PostgreSQL 15 (Metadatos, usuarios, transacciones)      │
│ ├─ Redis (Cache, sesiones, rate limiting)                  │
│ ├─ Elasticsearch 8 (Búsqueda semántica + logs)             │
│ ├─ S3 / GCS (Archivos temporales durante ingesta)          │
│ └─ IPFS + Blockchain (Almacenamiento descentralizado)      │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ CAPA 5: BLOCKCHAIN & DESCENTRALIZACIÓN                     │
│ ├─ Red Principal: Polygon (mainnet) para producción        │
│ ├─ Red de Pruebas: Polygon Mumbai para staging             │
│ ├─ Smart Contracts: Solidity 0.8.x                         │
│ ├─ IPFS: Kubo / Go-IPFS para nodos propios                 │
│ └─ Pinning: Pinata + Protocol Labs (redundancia)           │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Lenguajes y Frameworks

| Componente | Lenguaje | Framework | Justificación |
|-----------|----------|-----------|---|
| Frontend | TypeScript | React 18 | Ecosistema web3, librerías blockchain |
| Backend | TypeScript/Node | Express + NestJS | Performance, event-driven, async |
| Smart Contracts | Solidity | OpenZeppelin | Auditable, estándares, seguridad |
| Backend Scripts | Python | FastAPI | ML/IA para búsqueda semántica |
| DevOps/IaC | HCL/YAML | Terraform/K8s | Escalabilidad, reproducibilidad |

---

## 2. ESPECIFICACIÓN DE ENTIDADES PRINCIPALES

### 2.1 Document (Documento Histórico)

```typescript
interface Document {
  id: UUID;
  title: string;
  description: string;
  documentType: 'PDF' | 'VIDEO' | 'AUDIO' | 'IMAGE' | 'TESTIMONY';
  
  // Datos de ingesta
  uploadedBy: UserId;
  uploadedAt: DateTime;
  uploadedFileHash: SHA256;  // Hash del archivo original
  
  // Encriptación y almacenamiento
  encryptionKey: AES256;
  ipfsHash: String;  // QmXxxx... (IPFS)
  ipfsGatewayURL: String;
  backupIPFSNodes: String[];  // Múltiples nodos para redundancia
  
  // Blockchain
  blockchainHash: String;  // Hash registrado en Polygon
  blockchainTxId: String;  // ID transacción blockchain
  blockchainTimestamp: DateTime;
  
  // Metadatos históricos
  historicalDate: DateTime;  // Fecha del evento
  historicalLocation: GeoPoint;
  witnesses: Witness[];
  keyPersons: Person[];
  keyEvents: String[];
  
  // POK Credential
  pokCredentialId?: String;  // Vinculación a credencial POK
  pokNFTId?: String;  // Si fue emitida como NFT
  
  // Control de acceso
  accessLevel: 'PUBLIC' | 'RESTRICTED' | 'PRIVATE';
  allowedUsers: UserId[];
  ipRestrictions?: String[];
  expiresAt?: DateTime;
  
  // Anonimización
  anonimized: boolean;
  sensitiveFieldsMasked: String[];  // Campos ocultados (nombres, identificaciones)
  
  // Auditoría
  createdAt: DateTime;
  updatedAt: DateTime;
  revisionHistory: DocumentRevision[];
  accessLog: AccessLogEntry[];
}

interface Witness {
  name: String;
  relationship: String;
  contact?: String;
}

interface Person {
  name: String;
  role: String;  // 'Victim', 'Perpetrator', 'Witness', etc.
}
```

### 2.2 Credential (Credencial POK + Blockchain)

```typescript
interface Credential {
  id: UUID;
  
  // Vinculación a documento o logro académico
  linkedDocumentId?: DocumentId;
  linkedStudentAchievementId?: AchievementId;
  
  // Metadatos POK
  pokCredentialId: String;  // ID en plataforma POK
  badgeUrl: String;  // URL del badge visual
  issuerName: String;  // CNMH, Universidad XYZ, etc.
  issuedAt: DateTime;
  expiresAt?: DateTime;  // null si no expira
  revokedAt?: DateTime;
  
  // Estándares abiertos
  openBadgeVersion: '3.0';  // Siempre usar 3.0
  w3cFormat: VerifiableCredential;  // Formato W3C
  
  // Blockchain
  nftMinted: boolean;
  nftChainId: ChainId;  // Polygon = 137
  nftContractAddress: String;
  nftTokenId: BigInt;
  nftBlockchainHash: String;
  nftVerifiableAt: String;  // URL de verificación en blockchain explorer
  
  // Contenido
  credentialSubject: {
    type: 'HistoricalDocument' | 'EducationalAchievement';
    title: String;
    description: String;
    criteria: String;
    evidenceUrls: String[];
  };
  
  // Verificación
  verificationUrl: String;  // Link único para verificar
  qrCode: String;  // Base64 QR code
  verifiedAt?: DateTime;
  verificationCount: number;  // Cuántas veces fue verificada
  
  // Distribución
  recipientEmail: String;
  recipientLinkedInProfile?: String;
  sharingPermission: 'PUBLIC' | 'RESTRICTED' | 'PRIVATE';
  
  // Auditoría
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

### 2.3 User (Usuario del Sistema)

```typescript
interface User {
  id: UUID;
  email: String;
  passwordHash: String;  // bcrypt
  
  // Perfil
  firstName: String;
  lastName: String;
  institution: String;  // CNMH, Universidad, etc.
  
  // Roles y permisos
  role: 'ADMIN' | 'EDITOR' | 'RESEARCHER' | 'PUBLIC_VIEWER';
  permissions: Permission[];  // Granular, RBAC
  
  // Seguridad
  mfaEnabled: boolean;
  mfaSecret?: String;  // TOTP secret (encriptado)
  lastLogin: DateTime;
  loginAttempts: number;
  lockedUntil?: DateTime;
  
  // Preferencias
  language: 'ES' | 'EN' | 'PT';
  theme: 'LIGHT' | 'DARK';
  notificationsEnabled: boolean;
  
  // Auditoría
  createdAt: DateTime;
  updatedAt: DateTime;
  deletedAt?: DateTime;
}

type Permission = 
  | 'documents:read' 
  | 'documents:create' 
  | 'documents:edit' 
  | 'documents:delete'
  | 'credentials:issue'
  | 'credentials:revoke'
  | 'users:manage'
  | 'analytics:view';
```

---

## 3. FLUJO DE INGESTA DE DOCUMENTO (Arquitectura de Procesos)

### 3.1 Diagrama de Secuencia

```
Investigador          Frontend              Backend            Blockchain/IPFS
    │                   │                      │                      │
    ├──Sube archivo─────>│                      │                      │
    │                   │                      │                      │
    │                   ├──POST /documents─────>│                      │
    │                   │                      │                      │
    │                   │                      ├─Validar archivo       │
    │                   │                      ├─Extraer metadatos     │
    │                   │                      ├─Generar SHA-256       │
    │                   │   Almacenamiento     │                      │
    │                   │   temporal (S3)      │                      │
    │                   │                      ├─Mostrar vista previa  │
    │                   │   <─Resultado─────────│                      │
    │                   │<─Document created────│                      │
    │                   │                      │                      │
    │   [EDITOR REVISA DOCUMENTO]             │                      │
    │                   │                      │                      │
    │                   ├──PUT /documents/:id──>│                      │
    │                   │   /approve            ├─Validar CNMH perms  │
    │                   │                      │                      │
    │                   │                      ├─Encriptar (AES-256)──>│
    │                   │                      │                      │
    │                   │                      ├─Subir a IPFS─────────>│
    │                   │                      │   (fragmentado)       │
    │                   │   <──IPFS hash────────<───────────────────  │
    │                   │                      │                      │
    │                   │                      ├─Registrar en Polygon->│
    │                   │                      │   (Smart Contract)    │
    │                   │                      │                      │
    │                   │                      ├─Llamar POK API───────>│ (externos)
    │                   │                      │   (emitir credencial) │
    │                   │                      │                      │
    │                   │                      ├─Generar QR code      │
    │                   │                      │                      │
    │                   │   <─Documento────────│                      │
    │                   │   aprobado + verificado
    │ <─Notificación OK─│                      │                      │
    │                   │                      │                      │
```

### 3.2 Pseudocódigo del Endpoint

```typescript
// POST /api/documents
async function ingestDocument(req: Request, res: Response) {
  try {
    // 1. Validar usuario y permisos
    const user = await validateUser(req.headers.authorization);
    if (user.role !== 'EDITOR' && user.role !== 'ADMIN') {
      throw new UnauthorizedError();
    }

    // 2. Procesar archivo
    const file = req.file;
    const fileHash = await computeSHA256(file.buffer);
    const fileType = detectFileType(file);
    
    // 3. Extraer metadatos con IA (si es PDF o imagen)
    const extractedMetadata = await extractMetadataAI(file);
    
    // 4. Guardar temporalmente en S3
    const tempS3Url = await uploadToS3(file, tempDir);
    
    // 5. Crear documento en BD (estado = PENDING_APPROVAL)
    const document = await Database.documents.create({
      title: req.body.title,
      description: req.body.description,
      uploadedBy: user.id,
      uploadedFileHash: fileHash,
      documentType: fileType,
      ...extractedMetadata,
      accessLevel: 'PRIVATE',  // Default: solo creador puede ver
      status: 'PENDING_APPROVAL',
    });
    
    // 6. Responder con documento y vista previa
    res.json({
      id: document.id,
      status: 'PENDING_APPROVAL',
      previewUrl: tempS3Url,
      extractedFields: extractedMetadata,
    });
    
  } catch (error) {
    logger.error('Document ingestion error:', error);
    res.status(500).json({ error: error.message });
  }
}

// PUT /api/documents/:id/approve
async function approveDocument(req: Request, res: Response) {
  try {
    // 1. Validar permisos (solo EDITOR, ADMIN)
    const user = await validateUser(req.headers.authorization);
    if (user.role !== 'EDITOR' && user.role !== 'ADMIN') {
      throw new UnauthorizedError();
    }

    const document = await Database.documents.findById(req.params.id);
    
    // 2. Encriptar archivo con AES-256
    const encryptionKey = generateAES256Key();
    const encryptedFile = await encryptFile(
      document.uploadedFileHash,
      encryptionKey
    );

    // 3. Subir a IPFS (con múltiples nodos pin)
    const ipfsHash = await ipfs.add(encryptedFile);
    await pinataService.pin(ipfsHash);  // Backup a Pinata
    await nftStorageService.pin(ipfsHash);  // Backup a nft.storage

    // 4. Registrar en Blockchain (Polygon)
    const blockchainTx = await blockchainService.registerDocument({
      documentHash: document.uploadedFileHash,
      ipfsHash,
      metadataHash: keccak256(JSON.stringify(document.metadata)),
      timestamp: Math.floor(Date.now() / 1000),
    });

    // 5. Emitir credencial en POK
    const pokCredential = await pokService.issueCredential({
      recipientEmail: document.uploadedBy.email,
      title: `Documento Archivado: ${document.title}`,
      description: `Certificado de autenticidad. Hash: ${ipfsHash.substring(0, 20)}...`,
      criteria: 'Documento registrado en blockchain descentralizado',
      evidenceUrls: [
        `https://polygon-explorer.com/tx/${blockchainTx.hash}`,
      ],
      badgeUrl: 'https://cdn.memoriachain.io/badge-authenticated.png',
    });

    // 6. Generar QR code
    const qrCode = await generateQRCode({
      content: `https://verify.memoriachain.io/${document.id}`,
      size: 200,
    });

    // 7. Actualizar documento
    await Database.documents.update(req.params.id, {
      status: 'APPROVED',
      encryptionKey,
      ipfsHash,
      blockchainHash: blockchainTx.documentHash,
      blockchainTxId: blockchainTx.hash,
      blockchainTimestamp: blockchainTx.timestamp,
      pokCredentialId: pokCredential.id,
      pokNFTId: pokCredential.nftId,
      qrCode,
      accessLevel: req.body.accessLevel || 'RESTRICTED',
    });

    // 8. Notificar al investigador
    await emailService.send({
      to: document.uploadedBy.email,
      template: 'document-approved',
      variables: {
        documentTitle: document.title,
        blockchainTxUrl: `https://polygonscan.com/tx/${blockchainTx.hash}`,
        verifyUrl: `https://verify.memoriachain.io/${document.id}`,
      },
    });

    res.json({
      id: document.id,
      status: 'APPROVED',
      ipfsHash,
      blockchainTxUrl: `https://polygonscan.com/tx/${blockchainTx.hash}`,
      verifyUrl: `https://verify.memoriachain.io/${document.id}`,
      qrCode,
      pokCredentialId: pokCredential.id,
    });

  } catch (error) {
    logger.error('Document approval error:', error);
    res.status(500).json({ error: error.message });
  }
}
```

---

## 4. SMART CONTRACTS EN SOLIDITY

### 4.1 Contrato Principal: MemoriaRegistry

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MemoriaRegistry is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    // Eventos
    event DocumentRegistered(
        bytes32 indexed documentHash,
        string ipfsHash,
        address indexed registeredBy,
        uint256 timestamp
    );
    
    event DocumentVerified(
        bytes32 indexed documentHash,
        address indexed verifier,
        uint256 timestamp
    );
    
    event CredentialLinked(
        bytes32 indexed documentHash,
        bytes32 indexed credentialHash,
        uint256 timestamp
    );

    // Estructuras
    struct DocumentRecord {
        bytes32 documentHash;
        string ipfsHash;
        bytes32 metadataHash;
        address registeredBy;
        uint256 timestamp;
        uint256 verificationCount;
        bytes32[] linkedCredentials;
        bool revoked;
    }

    struct CredentialRecord {
        bytes32 credentialHash;
        string pokCredentialId;
        address issuer;
        uint256 issuedAt;
        bool revoked;
    }

    // State variables
    mapping(bytes32 => DocumentRecord) public documents;
    mapping(bytes32 => CredentialRecord) public credentials;
    mapping(address => bool) public authorizedIssuers;
    
    Counters.Counter private documentCounter;
    Counters.Counter private credentialCounter;

    // Modifiers
    modifier onlyAuthorized() {
        require(
            authorizedIssuers[msg.sender] || msg.sender == owner(),
            "Not authorized"
        );
        _;
    }

    // Admin functions
    function authorizeIssuer(address issuer) public onlyOwner {
        authorizedIssuers[issuer] = true;
    }

    function revokeIssuer(address issuer) public onlyOwner {
        authorizedIssuers[issuer] = false;
    }

    // Core functions
    function registerDocument(
        bytes32 documentHash,
        string memory ipfsHash,
        bytes32 metadataHash
    ) public onlyAuthorized nonReentrant {
        require(documents[documentHash].timestamp == 0, "Already registered");
        
        DocumentRecord storage doc = documents[documentHash];
        doc.documentHash = documentHash;
        doc.ipfsHash = ipfsHash;
        doc.metadataHash = metadataHash;
        doc.registeredBy = msg.sender;
        doc.timestamp = block.timestamp;
        doc.verificationCount = 0;
        
        documentCounter.increment();
        
        emit DocumentRegistered(
            documentHash,
            ipfsHash,
            msg.sender,
            block.timestamp
        );
    }

    function verifyDocument(bytes32 documentHash) public {
        DocumentRecord storage doc = documents[documentHash];
        require(doc.timestamp != 0, "Document not found");
        require(!doc.revoked, "Document revoked");
        
        doc.verificationCount += 1;
        
        emit DocumentVerified(documentHash, msg.sender, block.timestamp);
    }

    function linkCredential(
        bytes32 documentHash,
        bytes32 credentialHash,
        string memory pokCredentialId
    ) public onlyAuthorized {
        require(documents[documentHash].timestamp != 0, "Document not found");
        
        CredentialRecord storage cred = credentials[credentialHash];
        cred.credentialHash = credentialHash;
        cred.pokCredentialId = pokCredentialId;
        cred.issuer = msg.sender;
        cred.issuedAt = block.timestamp;
        
        documents[documentHash].linkedCredentials.push(credentialHash);
        credentialCounter.increment();
        
        emit CredentialLinked(documentHash, credentialHash, block.timestamp);
    }

    function revokeDocument(bytes32 documentHash) public onlyAuthorized {
        DocumentRecord storage doc = documents[documentHash];
        require(doc.timestamp != 0, "Document not found");
        doc.revoked = true;
    }

    function getDocument(bytes32 documentHash) 
        public 
        view 
        returns (DocumentRecord memory) 
    {
        return documents[documentHash];
    }

    function getDocumentCredentials(bytes32 documentHash) 
        public 
        view 
        returns (bytes32[] memory) 
    {
        return documents[documentHash].linkedCredentials;
    }
}
```

---

## 5. INTEGRACIÓN CON POK API

### 5.1 Servicio POK

```typescript
// src/services/pokService.ts

import axios from 'axios';
import { Logger } from '@nestjs/common';

interface IssueCredentialRequest {
  recipientEmail: string;
  title: string;
  description: string;
  criteria: string;
  evidenceUrls: string[];
  badgeUrl: string;
  issuer?: string;
  expiresAt?: Date;
}

interface IssueCredentialResponse {
  id: string;
  nftId?: string;
  verificationUrl: string;
  qrCode: string;
}

export class POKService {
  private readonly logger = new Logger(POKService.name);
  private readonly baseUrl = process.env.POK_BASE_URL || 'https://api.pok.tech/v1';
  private readonly apiKey = process.env.POK_API_KEY;

  async issueCredential(
    request: IssueCredentialRequest,
    emitNFT: boolean = false
  ): Promise<IssueCredentialResponse> {
    try {
      const payload = {
        recipient: {
          email: request.recipientEmail,
        },
        badge: {
          name: request.title,
          description: request.description,
          image: request.badgeUrl,
        },
        criteria: {
          narrative: request.criteria,
          evidence: request.evidenceUrls.map(url => ({ url })),
        },
        issuedOn: new Date().toISOString(),
        expiresOn: request.expiresAt?.toISOString() || null,
        issuer: request.issuer || 'MemoriaChain CNMH',
      };

      // Endpoint Web2 (gratuito, sin blockchain)
      const response = await axios.post(
        `${this.baseUrl}/credentials/issue`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Si se requiere emisión NFT (blockchain)
      let nftId: string | undefined;
      if (emitNFT) {
        nftId = await this.issueNFTCredential(response.data.id);
      }

      return {
        id: response.data.id,
        nftId,
        verificationUrl: response.data.verifyUrl,
        qrCode: response.data.qrCode,
      };
    } catch (error) {
      this.logger.error('POK credential issuance failed:', error.message);
      throw error;
    }
  }

  async issueNFTCredential(credentialId: string): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/credentials/${credentialId}/nft`,
        {
          blockchain: 'polygon',  // Usar Polygon (más económico que Ethereum)
          network: 'mainnet',
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.nftTokenId;
    } catch (error) {
      this.logger.error('NFT issuance failed:', error.message);
      throw error;
    }
  }

  async revokeCredential(credentialId: string): Promise<void> {
    try {
      await axios.put(
        `${this.baseUrl}/credentials/${credentialId}/revoke`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      this.logger.log(`Credential ${credentialId} revoked`);
    } catch (error) {
      this.logger.error('Credential revocation failed:', error.message);
      throw error;
    }
  }

  async verifyCredential(credentialId: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/credentials/${credentialId}/verify`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      return response.data.valid;
    } catch (error) {
      this.logger.error('Credential verification failed:', error.message);
      return false;
    }
  }
}
```

---

## 6. INTEGRACIÓN CON IPFS

### 6.1 Servicio IPFS

```typescript
// src/services/ipfsService.ts

import * as IPFS from 'ipfs-http-client';
import { Logger } from '@nestjs/common';
import { Readable } from 'stream';

export class IPFSService {
  private readonly logger = new Logger(IPFSService.name);
  private ipfs: any;

  constructor() {
    // Conexión a nodo IPFS local o remoto
    const nodeUrl = process.env.IPFS_NODE_URL || '/ip4/127.0.0.1/tcp/5001';
    this.ipfs = IPFS.create({ url: nodeUrl });
  }

  async uploadFile(fileBuffer: Buffer, filename: string): Promise<string> {
    try {
      const result = await this.ipfs.add(
        {
          path: filename,
          content: fileBuffer,
        },
        {
          pin: true,  // Pinear en nodo local
          progress: (bytes: number) => {
            this.logger.log(`Upload progress: ${bytes} bytes`);
          },
        }
      );

      const hash = result.cid.toString();
      this.logger.log(`File uploaded to IPFS: ${hash}`);

      return hash;
    } catch (error) {
      this.logger.error('IPFS upload failed:', error.message);
      throw error;
    }
  }

  async downloadFile(ipfsHash: string): Promise<Buffer> {
    try {
      const chunks = [];

      for await (const chunk of this.ipfs.cat(ipfsHash)) {
        chunks.push(chunk);
      }

      return Buffer.concat(chunks);
    } catch (error) {
      this.logger.error('IPFS download failed:', error.message);
      throw error;
    }
  }

  async pinFile(ipfsHash: string, pinServiceUrl: string): Promise<void> {
    // Usar servicio de pinning (Pinata, nft.storage) para redundancia
    try {
      await axios.post(
        `${pinServiceUrl}/pinning/pinObjects`,
        {
          hashesToPin: [ipfsHash],
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.PIN_SERVICE_TOKEN}`,
          },
        }
      );

      this.logger.log(`File pinned: ${ipfsHash}`);
    } catch (error) {
      this.logger.error('Pinning failed:', error.message);
    }
  }
}
```

---

## 7. DEPLOYMENT Y INFRAESTRUCTURA

### 7.1 Docker Compose para Desarrollo

```yaml
version: '3.9'

services:
  # PostgreSQL
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Elasticsearch
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.0.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:9200 || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Backend API
  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      NODE_ENV: development
      DB_HOST: postgres
      REDIS_HOST: redis
      ELASTICSEARCH_HOST: elasticsearch
      IPFS_NODE_URL: /ip4/ipfs/tcp/5001
      POK_BASE_URL: ${POK_BASE_URL}
      POK_API_KEY: ${POK_API_KEY}
    ports:
      - "3000:3000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
      elasticsearch:
        condition: service_healthy

  # IPFS
  ipfs:
    image: ipfs/go-ipfs:latest
    ports:
      - "4001:4001"
      - "8080:8080"
      - "5001:5001"
    volumes:
      - ipfs_data:/data/ipfs

volumes:
  postgres_data:
  ipfs_data:
```

### 7.2 Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: memoriachain-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: memoriachain-api
  template:
    metadata:
      labels:
        app: memoriachain-api
    spec:
      containers:
      - name: api
        image: gcr.io/memoriachain-prod/api:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DB_HOST
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: host
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: memoriachain-api-service
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: memoriachain-api
```

---

## 8. TESTING STRATEGY

### 8.1 Unit Tests (Jest)

```typescript
// src/services/__tests__/pokService.test.ts

describe('POKService', () => {
  let service: POKService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        POKService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<POKService>(POKService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('issueCredential', () => {
    it('should issue a credential successfully', async () => {
      const request: IssueCredentialRequest = {
        recipientEmail: 'test@example.com',
        title: 'Test Credential',
        description: 'Test description',
        criteria: 'Test criteria',
        evidenceUrls: ['https://example.com/evidence'],
        badgeUrl: 'https://example.com/badge.png',
      };

      jest.spyOn(httpService, 'post').mockReturnValue({
        toPromise: () => Promise.resolve({
          data: {
            id: 'cred-123',
            verifyUrl: 'https://pok.tech/verify/cred-123',
            qrCode: 'data:image/png;base64,...',
          },
        }),
      });

      const result = await service.issueCredential(request);

      expect(result.id).toBe('cred-123');
      expect(result.verificationUrl).toBe('https://pok.tech/verify/cred-123');
    });
  });
});
```

### 8.2 Integration Tests

```typescript
// src/__tests__/integration/document-flow.test.ts

describe('Document Ingestion Flow', () => {
  let app: INestApplication;
  let documentService: DocumentService;
  let pokService: POKService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({...}).compile();
    app = module.createNestApplication();
    documentService = module.get<DocumentService>(DocumentService);
    pokService = module.get<POKService>(POKService);
  });

  it('should ingest, approve, and create credential for document', async () => {
    // 1. Upload document
    const uploadResponse = await request(app.getHttpServer())
      .post('/api/documents')
      .attach('file', 'test-document.pdf')
      .field('title', 'Test Document')
      .expect(201);

    const documentId = uploadResponse.body.id;

    // 2. Approve document
    const approveResponse = await request(app.getHttpServer())
      .put(`/api/documents/${documentId}/approve`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(approveResponse.body.status).toBe('APPROVED');
    expect(approveResponse.body.ipfsHash).toBeDefined();
    expect(approveResponse.body.pokCredentialId).toBeDefined();

    // 3. Verify credential was created
    const credential = await pokService.verifyCredential(
      approveResponse.body.pokCredentialId
    );
    expect(credential).toBe(true);
  });
});
```

---

## 9. MONITORING Y OBSERVABILIDAD

### 9.1 Datadog / Prometheus Setup

```typescript
// src/monitoring/metrics.ts

import { Gauge, Counter, Histogram } from 'prom-client';

export const documentUploadCounter = new Counter({
  name: 'documents_uploaded_total',
  help: 'Total documents uploaded',
  labelNames: ['type', 'status'],
});

export const documentProcessingDuration = new Histogram({
  name: 'document_processing_duration_seconds',
  help: 'Time taken to process a document',
  buckets: [1, 5, 10, 30, 60],
});

export const activeDocumentsGauge = new Gauge({
  name: 'active_documents',
  help: 'Currently active documents in system',
});

export const blockchainTransactionCounter = new Counter({
  name: 'blockchain_transactions_total',
  help: 'Total blockchain transactions',
  labelNames: ['type', 'status'],
});

export const ipfsUploadDuration = new Histogram({
  name: 'ipfs_upload_duration_seconds',
  help: 'Time taken to upload file to IPFS',
  buckets: [0.5, 1, 2, 5, 10],
});
```

---

## 10. SEGURIDAD

### 10.1 Encriptación y Key Management

```typescript
// src/security/encryptionService.ts

import crypto from 'crypto';
import { SecretsManager } from 'aws-sdk';

export class EncryptionService {
  private secretsManager: SecretsManager;

  async encryptFile(file: Buffer, context: string): Promise<{
    encrypted: Buffer;
    key: string;
    iv: string;
  }> {
    const key = await this.getOrCreateKey(context);
    const iv = crypto.randomBytes(16);
    
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(file);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    
    return {
      encrypted,
      key: key.toString('hex'),
      iv: iv.toString('hex'),
    };
  }

  async decryptFile(
    encryptedBuffer: Buffer,
    keyHex: string,
    ivHex: string
  ): Promise<Buffer> {
    const key = Buffer.from(keyHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    
    return decrypted;
  }

  private async getOrCreateKey(context: string): Promise<Buffer> {
    try {
      const secretValue = await this.secretsManager
        .getSecretValue({ SecretId: `memoriachain/${context}` })
        .promise();
      
      return Buffer.from(secretValue.SecretString, 'hex');
    } catch {
      // Generate new key if not exists
      const newKey = crypto.randomBytes(32);
      await this.secretsManager
        .createSecret({
          Name: `memoriachain/${context}`,
          SecretString: newKey.toString('hex'),
        })
        .promise();
      
      return newKey;
    }
  }
}
```

---

**Documento Técnico Completo**  
**Versión**: 1.0  
**Última Actualización**: Noviembre 2025  
**Destinatarios**: Equipo de Desarrollo, Arquitectos, DevOps