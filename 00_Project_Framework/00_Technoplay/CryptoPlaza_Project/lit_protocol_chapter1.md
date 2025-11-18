**James:** "Remember when we thought this problem was unsolvable?"

**Maya:** "We were trying to solve it with traditional architecture. The breakthrough was realizing that AI agents don't need *access* to private keys—they need the *ability to get signatures*. And those are very different things."

**Sarah:** "What still amazes me is that the solution doesn't require users to trust us. They trust math, public code, and economic incentives. That's what decentralization was supposed to be."

---

## Your Turn: Building Your First Agent Wallet

### Prerequisites Checklist

Before you start, make sure you have:

- [ ] Node.js v18.12 or higher installed
- [ ] Git installed
- [ ] A code editor (VS Code recommended)
- [ ] Basic understanding of TypeScript/JavaScript
- [ ] Familiarity with async/await patterns
- [ ] An Ethereum wallet (MetaMask works fine)
- [ ] Test ETH from a faucet (we'll show you where)

**Time Investment:** 30-45 minutes for this tutorial

**What You'll Build:** A simple AI agent that can transfer ERC-20 tokens, with full policy controls

---

### Step 1: Environment Setup

```bash
# Clone the Agent Wallet repository
git clone https://github.com/LIT-Protocol/agent-wallet.git
cd agent-wallet

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Create your environment file
cp .env.example .env
```

**Edit `.env`:**
```bash
# Get a Pinata JWT token (free tier is fine)
# https://app.pinata.cloud/
PINATA_JWT=your_pinata_jwt_token_here
```

**Why Pinata?** The tools need to upload Lit Actions to IPFS. Pinata provides a simple API for this. Don't worry—the uploaded code is public and auditable.

---

### Step 2: Get Test Tokens

You'll need two things:
1. **Test ETH** (for gas fees)
2. **tstLPX tokens** (Lit Protocol's test token for Chronicle Yellowstone)

```bash
# Visit the Lit faucet
# https://chronicle-yellowstone-faucet.getlit.dev/

# Connect your wallet
# Request tokens (you'll get both test ETH and tstLPX)
```

**Pro tip:** Save this wallet's private key—you'll need it for the Admin role.

---

### Step 3: Understanding the Two-Wallet Setup

Here's where beginners get confused. You need **TWO separate wallets**:

**Wallet 1: Admin (You)**
- Owns the PKP NFT
- Sets policies
- Adds/removes delegatees
- Has ultimate control

**Wallet 2: Delegatee (Also you, for this tutorial)**
- Executes actions within policies
- Can be your dev server, your laptop, whatever
- Limited by policies Admin sets

**Why two wallets?** This simulates the real-world pattern:
- Admin = Your users (or a DAO, or a multi-sig)
- Delegatee = Your application server

For this tutorial, you'll wear both hats. Create a second wallet:

```bash
# In your terminal (or use MetaMask to generate a new account)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# This gives you a random private key for the delegatee wallet
# Save this somewhere secure (but remember it's testnet)
```

---

### Step 4: Start the CLI (Your Control Panel)

```bash
pnpm start:cli
```

You'll see:
```
🎭 Lit Agent Wallet CLI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

? Select a Lit Network:
  ❯ datil-dev (Development Network)
    datil-test (Testing Network)
    datil (Production Network)
```

**Choose `datil-dev`** for this tutorial.

Next choice:
```
? Select your role:
  ❯ Admin (Mint PKPs, set policies, manage delegatees)
    Delegatee (Execute tools within policies)
```

**Choose `Admin`** first.

---

### Step 5: Admin Session - Minting Your PKP

```
? Enter your private key:
[paste your Admin wallet private key]

? What would you like to do?
  ❯ Mint New Agent Wallet
    Manage Existing Agent Wallet
```

**Choose `Mint New Agent Wallet`**

The CLI will:
1. Connect to Lit Network
2. Mint a new PKP (this creates an ERC-721 NFT)
3. Display the PKP info

```
✅ PKP Minted Successfully!

PKP Token ID: 0x1234...
Public Key:   0x04abcd...
ETH Address:  0x9876...

📝 Important: Save this information!
```

**What just happened?**

- A new PKP was created on Chronicle Yellowstone
- The private key was generated through Distributed Key Generation (DKG)
- **Nobody has the full private key** (not even Lit Protocol)
- You own the NFT that controls this PKP's policies
- The PKP has an Ethereum address (you can send it funds)

---

### Step 6: Adding a Delegatee

```
? What would you like to manage?
  ❯ Delegatees
    Tools
    Policies
    Transfer Ownership
```

**Choose `Delegatees`**

```
? Delegatee Management:
  ❯ Add Delegatee
    Remove Delegatee
    List Delegatees
```

**Choose `Add Delegatee`**

```
? Enter delegatee Ethereum address:
[paste your second wallet address]
```

**What just happened?**

You just authorized your second wallet to execute actions on behalf of this PKP. But it can't do anything yet—you haven't permitted any tools.

---

### Step 7: Permitting a Tool

```
? What would you like to manage?
  ❯ Tools
    Delegatees
    Policies
    Transfer Ownership
```

**Choose `Tools`**

```
? Tool Management:
  ❯ Permit Tool
    List Permitted Tools
```

**Choose `Permit Tool`**

```
? Select a tool to permit:
  ❯ ERC20 Transfer
    Uniswap Swap
    Sign ECDSA
```

**Choose `ERC20 Transfer`**

```
✅ Tool permitted successfully!

Tool: ERC20 Transfer
IPFS CID: Qm...
Signing Scopes: [SignAnything]
```

**What just happened?**

You gave this PKP permission to execute the ERC-20 Transfer Lit Action. But there's no policy yet, so it's unlimited. Let's fix that.

---

### Step 8: Setting a Policy

```
? What would you like to manage?
  ❯ Policies
    Tools
    Delegatees
```

**Choose `Policies`**

```
? Select a tool to configure policy:
  ❯ ERC20 Transfer (QmVHC5c...)
```

The CLI will guide you through policy setup:

```
? Maximum amount per transaction (in token decimals):
1000000000000000000
[This is 1 ETH worth of tokens, assuming 18 decimals]

? Allowed token addresses (comma-separated):
0x1234..., 0x5678...
[Enter test token addresses, or leave empty for "any"]

? Allowed recipient addresses (comma-separated):
0xabcd..., 0xef01...
[Enter allowed recipients, or leave empty for "any"]

✅ Policy set successfully!
```

**What just happened?**

You created an on-chain policy that restricts what the PKP can do:
- Max 1 token per transaction
- Only to specific tokens (if you specified)
- Only to specific recipients (if you specified)

The Lit Action will check this policy BEFORE signing any transaction. Even if your delegatee wallet is compromised, it can't bypass these limits.

---

### Step 9: Delegatee Session - Executing a Transfer

Exit the CLI (Ctrl+C) and start it again:

```bash
pnpm start:cli
```

This time:
- **Network:** `datil-dev` (same as before)
- **Role:** `Delegatee`
- **Private Key:** [your second wallet's private key]

```
? Select a PKP to use:
  ❯ PKP 0x1234... (ETH Address: 0x9876...)
```

**Choose the PKP you just created**

```
? Available tools:
  ❯ ERC20 Transfer
```

**Choose `ERC20 Transfer`**

```
Current Policy:
- Max Amount: 1000000000000000000
- Allowed Tokens: [Any] (or your list)
- Allowed Recipients: [Any] (or your list)

? Token address:
[enter a test ERC-20 token address]

? Recipient address:
[enter where you want to send tokens]

? Amount (in smallest unit):
500000000000000000
[0.5 tokens]

? Chain ID:
175188
[Chronicle Yellowstone chain ID]

? RPC URL:
https://yellowstone-rpc.litprotocol.com
```

```
🔄 Executing ERC20 Transfer...
   Validating parameters...
   Checking policy...
   Generating signature via Lit Protocol...
   Broadcasting transaction...

✅ Transaction successful!
   TX Hash: 0xabc123...
```

**What just happened?**

1. Your delegatee wallet requested a token transfer
2. The CLI sent parameters to Lit Protocol
3. Lit nodes executed the ERC20 Transfer Lit Action
4. The Lit Action checked the policy on-chain
5. Policy validated (amount < max, token allowed, recipient allowed)
6. Lit nodes cooperated to create a signature (threshold cryptography)
7. Transaction was broadcast to Chronicle Yellowstone
8. Tokens were transferred!

**Critically:** At no point did anyone have the PKP's full private key.

---

### Step 10: Testing Policy Enforcement

Try to violate the policy:

```
? Amount (in smallest unit):
2000000000000000000
[2 tokens - exceeds the 1 token limit]
```

```
❌ Execution failed!
   Error: Amount exceeds policy maximum
   
   Your policy allows: 1000000000000000000
   You tried to send:   2000000000000000000
```

**What just happened?**

The Lit Action checked the policy BEFORE creating a signature. Because you tried to exceed the limit, it refused to sign the transaction.

**Critically:** This happened on Lit nodes, not on your computer. Even if you modified the CLI code to lie about the amount, the Lit Action would still catch it because it reads the policy directly from the blockchain.

---

## Meanwhile: What's Actually Happening Under the Hood?

<details>
<summary>Click for technical deep-dive of the execution flow</summary>

When you click "Execute" in the CLI, here's the full journey:

**Phase 1: Request Preparation (Your Computer)**
```typescript
// 1. CLI collects parameters
const params = {
  pkpEthAddress: "0x9876...",
  tokenAddress: "0x1234...",
  recipientAddress: "0xabcd...",
  amount: "500000000000000000",
  chainId: 175188,
  rpcUrl: "https://yellowstone-rpc.litprotocol.com"
};

// 2. CLI fetches the Lit Action code from IPFS
const litActionCode = await fetchFromIPFS('QmVHC5c...');

// 3. CLI creates a session signature (proves you're the delegatee)
const sessionSig = await delegatee.getSessionSig();
```

**Phase 2: Lit Protocol Execution (Lit Nodes)**
```javascript
// This code runs on MULTIPLE Lit nodes simultaneously

(async () => {
  // 1. Verify delegatee is authorized
  const pkpInfo = await getPKPInfo(jsParams.pkpEthAddress);
  const isDelegatee = await checkDelegatee(
    sessionSig.address,
    pkpInfo.tokenId
  );
  
  if (!isDelegatee) {
    return { error: "Not authorized delegatee" };
  }
  
  // 2. Fetch policy from blockchain
  const policy = await Lit.Actions.call({
    chain: 'yellowstone',
    contractAddress: PKP_TOOL_REGISTRY_ADDRESS,
    abi: PKP_TOOL_REGISTRY_ABI,
    method: 'getToolPolicy',
    params: [pkpInfo.tokenId, jsParams.toolCid]
  });
  
  // 3. Decode and validate policy
  const decodedPolicy = decodePolicy(policy);
  
  if (BigInt(jsParams.amount) > BigInt(decodedPolicy.maxAmount)) {
    return { error: "Amount exceeds policy maximum" };
  }
  
  if (decodedPolicy.allowedTokens.length > 0) {
    if (!decodedPolicy.allowedTokens.includes(jsParams.tokenAddress)) {
      return { error: "Token not in allowlist" };
    }
  }
  
  if (decodedPolicy.allowedRecipients.length > 0) {
    if (!decodedPolicy.allowedRecipients.includes(jsParams.recipientAddress)) {
      return { error: "Recipient not in allowlist" };
    }
  }
  
  // 4. Create transaction
  const erc20Interface = new ethers.utils.Interface([
    'function transfer(address to, uint256 amount)'
  ]);
  
  const txData = erc20Interface.encodeFunctionData('transfer', [
    jsParams.recipientAddress,
    jsParams.amount
  ]);
  
  const tx = {
    to: jsParams.tokenAddress,
    data: txData,
    gasLimit: 100000,
    chainId: jsParams.chainId
  };
  
  // 5. Each Lit node creates a signature SHARE
  const signatureShare = await Lit.Actions.signEcdsa({
    toSign: ethers.utils.arrayify(
      ethers.utils.keccak256(
        ethers.utils.serializeTransaction(tx)
      )
    ),
    publicKey: pkpInfo.publicKey,
    sigName: "erc20TransferSig"
  });
  
  // 6. Signature shares are combined (threshold cryptography)
  // This happens automatically - the full signature is returned
  return signatureShare;
})();
```

**Phase 3: Transaction Broadcasting (Your Computer)**
```typescript
// 7. CLI receives the complete signature
const signature = await litResponse.signatures.erc20TransferSig;

// 8. CLI broadcasts the signed transaction
const provider = new ethers.providers.JsonRpcProvider(params.rpcUrl);
const signedTx = ethers.utils.serializeTransaction(tx, signature);
const txResponse = await provider.sendTransaction(signedTx);

// 9. Wait for confirmation
const receipt = await txResponse.wait();

console.log("Transaction confirmed:", receipt.transactionHash);
```

**Key Security Properties:**

1. **No Single Point of Failure:**
   - Each Lit node only has a KEY SHARE
   - Compromise one node = learn nothing about the private key
   - Need to compromise 2/3 of nodes simultaneously

2. **Policy Enforced at Signature Time:**
   - Policy is read from blockchain (can't be faked)
   - Checked BEFORE signature shares are created
   - Impossible to bypass without changing on-chain policy

3. **Delegatee Authorization:**
   - Session signature proves you're the delegatee
   - Verified against on-chain registry
   - Can be revoked instantly by Admin

4. **Immutable Code:**
   - Lit Action stored on IPFS (content-addressed)
   - Anyone can verify what code is running
   - Code can't be changed after deployment

5. **Transparent Execution:**
   - All policy checks visible in Lit Action code
   - All on-chain policy data is public
   - All transactions are on a public blockchain

</details>

---

## Practical Patterns: Real-World Use Cases

### Pattern 1: The "Allowance Bot" (DeFi Automation)

**Use Case:** Users want an AI to manage their DeFi positions but don't trust the developer with unlimited access.

**Implementation:**
```typescript
// User (Admin) creates PKP and sets aggressive constraints
const policy = {
  // Can only interact with audited protocols
  allowedProtocols: [
    AAVE_ADDRESS,
    COMPOUND_ADDRESS,
    UNISWAP_V3_ADDRESS
  ],
  
  // Maximum position size
  maxPositionValue: ethers.utils.parseEther("10"), // 10 ETH max
  
  // Maximum single transaction
  maxTxValue: ethers.utils.parseEther("1"), // 1 ETH per tx
  
  // Maximum daily volume
  maxDailyVolume: ethers.utils.parseEther("5"), // 5 ETH per day
  
  // Emergency exit always allowed (to user's address only)
  emergencyWithdrawal: {
    enabled: true,
    destinationAddress: USER_SAFE_ADDRESS,
    requiresNoDelay: true
  },
  
  // Pause functionality
  canPauseAgent: true,
  pauseCooldown: 24 * 60 * 60 // 24 hours
};

// Developer (Delegatee) can optimize within these constraints
// But cannot:
// - Access other protocols (even if more profitable)
// - Risk more than policy allows
// - Send funds to themselves
// - Prevent emergency exits
```

**Why This Works:**
- User maintains control (can revoke delegatee, change policy, emergency exit)
- Developer has flexibility to optimize (within boundaries)
- System survives developer compromise (attacker limited by policy)
- Transparent to auditors (all code and policies public)

---

### Pattern 2: The "Treasury Bot" (DAO Operations)

**Use Case:** A DAO needs an agent to handle routine operations (paying contributors, rebalancing assets) without giving complete treasury control to a developer.

**Implementation:**
```typescript
// DAO (Admin - via Gnosis Safe multi-sig) creates PKP
// Multiple permitted tools with different risk profiles:

// Low Risk Tool: Pay Contributors
{
  tool: "PayContributors",
  policy: {
    maxAmount: ethers.utils.parseEther("5"),
    allowedRecipients: VERIFIED_CONTRIBUTOR_REGISTRY,
    requiresProposalId: false, // Can execute automatically
    maxPerDay: ethers.utils.parseEther("50")
  }
}

// Medium Risk Tool: Rebalance Assets
{
  tool: "RebalanceAssets",
  policy: {
    maxAmount: ethers.utils.parseEther("20"),
    allowedProtocols: [CURVE, BALANCER, UNISWAP_V3],
    requiresProposalId: true, // Needs DAO vote
    requiresMultiSigApproval: false, // Can execute after vote passes
    minVotingPeriod: 3 * 24 * 60 * 60 // 3 days
  }
}

// High Risk Tool: Execute Major Proposals
{
  tool: "ExecuteProposal",
  policy: {
    maxAmount: ethers.utils.parseEther("100"),
    requiresProposalId: true,
    requiresMultiSigApproval: true, // Needs council confirmation
    requiresSuperMajority: true, // Needs 66%+ vote
    minVotingPeriod: 7 * 24 * 60 * 60, // 7 days
    cooldownPeriod: 24 * 60 * 60 // 24 hour timelock
  }
}

// Emergency Tool: Pause All Operations
{
  tool: "EmergencyPause",
  policy: {
    canBeCalledBy: [SECURITY_COUNCIL, DELEGATEE],
    canOnlyPauseNotUnpause: true, // Unpause requires DAO vote
    pauseDuration: 48 * 60 * 60 // 48 hours
  }
}
```

**Security Layers:**

1. **Tiered Permissions**: Different operations have different requirements
2. **Multi-Sig for High Risk**: Big decisions require council approval
3. **Time Delays**: Proposals have minimum periods before execution
4. **Emergency Brake**: Pause functionality that can't be bypassed
5. **Transparent Governance**: All votes and approvals on-chain

---

### Pattern 3: The "NFT Mint Bot" (Creator Tools)

**Use Case:** Artist wants an AI to mint NFTs based on prompts, but doesn't want the developer to be able to mint unlimited NFTs or change the collection.

**Implementation:**
```typescript
// Artist (Admin) creates PKP for NFT collection
const policy = {
  // Rate limiting
  maxMintsPerHour: 10,
  maxMintsPerDay: 100,
  maxMintsPerAddress: 5, // Per user
  
  // Quality control
  requiresMetadataApproval: false, // AI generates directly
  allowedContentTypes: ["image/png", "image/jpeg", "model/gltf"],
  maxFileSizeBytes: 50 * 1024 * 1024, // 50MB
  
  // Economic controls
  mintPrice: ethers.utils.parseEther("0.01"), // 0.01 ETH
  royaltyPercentage: 500, // 5%
  royaltyRecipient: ARTIST_ADDRESS,
  
  // Collection integrity
  collectionContract: NFT_COLLECTION_ADDRESS, // Immutable
  cannotMintToSelf: true, // Developer can't mint to themselves
  
  // Emergency controls
  pausable: true,
  pauseRequiresReason: true // Must provide explanation
};

// Developer (Delegatee) gets mint requests from users
// Lit Action verifies:
// - Mint rate not exceeded
// - Payment received
// - Content type allowed
// - Not minting to developer's address
// Then signs the minting transaction
```

**What This Prevents:**

- Developer can't mint unlimited NFTs
- Developer can't mint to themselves
- Developer can't change royalty recipient
- Developer can't modify collection contract
- Artist retains ultimate control (owns PKP NFT)

**What This Enables:**

- Developer can innovate on AI generation
- Developer can optimize minting flow
- Developer can update metadata generation
- Users get responsive service
- Artist doesn't need to be involved in every mint

---

## Common Pitfalls (And How to Avoid Them)

### Pitfall #1: "I'll Just Set Policy Later"

**Bad:**
```typescript
// Permit tool without policy
await admin.permitTool(pkpTokenId, { ipfsCid: toolCid });
// "I'll set the policy tomorrow"

// Developer executes transfer
await delegatee.executeTool({ /* unlimited transfers! */ });
```

**Good:**
```typescript
// Always set policy immediately after permitting
await admin.permitTool(pkpTokenId, { ipfsCid: toolCid });

await admin.setToolPolicy(pkpTokenId, toolCid, {
  maxAmount: ethers.utils.parseEther("1"),
  // Even restrictive policy better than none
}, 'v1');
```

**Why:** An unpermitted tool does nothing. A permitted tool without policy does *everything*. Always set initial policy, even if restrictive—you can relax it later.

---

### Pitfall #2: "I'll Make the Policy Really Flexible"

**Bad:**
```typescript
const policy = {
  maxAmount: ethers.constants.MaxUint256, // Unlimited!
  allowedTokens: [], // Empty = all tokens
  allowedRecipients: [], // Empty = anywhere
  // This defeats the entire purpose
};
```

**Good:**
```typescript
const policy = {
  // Start restrictive, expand as needed
  maxAmount: ethers.utils.parseEther("10"),
  allowedTokens: [USDC, DAI, WETH], // Specific tokens
  allowedRecipients: [TREASURY, MULTISIG], // Specific destinations
  
  // Or if you need flexibility, add time limits:
  maxDailyVolume: ethers.utils.parseEther("100"),
  cooldownBetweenTx: 60 * 60, // 1 hour
};
```

**Why:** The policy is your security boundary. "Flexible" policy = "no security." Start restrictive and expand based on actual needs.

---

### Pitfall #3: "I Don't Need to Test the Lit Action"

**Bad:**
```javascript
// Writing complex logic without testing
const litAction = `
  (async () => {
    // Lots of complex validation
    // Multiple external calls
    // Complicated math
    // Ship it!
  })();
`;
```

**Good:**
```javascript
// Test Lit Actions thoroughly before deployment
// They're immutable once on IPFS!

// Use the Lit SDK to test locally:
import { executeJs } from '@lit-protocol/lit-node-client';

const testParams = {
  pkpEthAddress: "0x...",
  tokenAddress: "0x...",
  amount: "1000000000000000000"
};

const result = await executeJs({
  code: litAction,
  jsParams: testParams,
  // ... other params
});

console.log("Test result:", result);

// Test ALL edge cases:
// - Maximum amounts
// - Empty allowlists
// - Invalid addresses
// - Missing parameters
// - Policy violations
```

**Why:** Lit Actions are immutable once deployed to IPFS. A bug in production means you need to deploy a new version and update the policy registry. Test thoroughly first.

---

### Pitfall #4: "I'll Store Sensitive Data in the Lit Action"

**Bad:**
```javascript
const litAction = `
  (async () => {
    const API_KEY = "sk_live_abc123..."; // DON'T DO THIS
    const SECRET = "my-secret-password"; // DON'T DO THIS
    
    // This code is PUBLIC on IPFS!
  })();
`;
```

**Good:**
```javascript
// Use Lit Protocol's encrypted parameters
const encrypted = await LitJsSdk.encryptString(
  "my-api-key",
  accessControlConditions,
  chain
);

const litAction = `
  (async () => {
    // Decrypt only when authorized
    const apiKey = await Lit.Actions.decryptToString({
      accessControlConditions: jsParams.accessControlConditions,
      ciphertext: jsParams.ciphertext,
      dataToEncryptHash: jsParams.dataToEncryptHash,
      authSig: jsParams.authSig,
      chain: jsParams.chain
    });
    
    // Now use the key
  })();
`;
```

**Why:** Everything in a Lit Action is public (it's on IPFS). Never hardcode secrets. Use Lit's encryption features for sensitive data.

---

### Pitfall #5: "I'll Use One PKP for Everything"

**Bad:**
```typescript
// Single PKP with multiple tools and policies
const godPKP = await admin.mintPkp();

await admin.permitTool(godPKP.tokenId, { ipfsCid: transferToolCid });
await admin.permitTool(godPKP.tokenId, { ipfsCid: swapToolCid });
await admin.permitTool(godPKP.tokenId, { ipfsCid: lendToolCid });
await admin.permitTool(godPKP.tokenId, { ipfsCid: mintToolCid });
// ... 10 more tools

// Now one compromised tool can affect all operations
```

**Good:**
```typescript
// Separate PKPs for different risk profiles
const lowRiskPKP = await admin.mintPkp(); // For routine ops
const highRiskPKP = await admin.mintPkp(); // For large transfers
const emergencyPKP = await admin.mintPkp(); // For recovery only

// Each has isolated permissions and policies
// Compromise of one doesn't affect others
```

**Why:** PKPs are cheap to create. Isolate risk by using different PKPs for different purposes. Think of them like service accounts with specific roles.

---

## Next Steps: Where to Go From Here

### Immediate Next Steps (Today)

1. **Read the PKP Documentation**
   - https://developer.litprotocol.com/sdk/authentication/overview
   - Understanding PKPs deeply will unlock advanced patterns

2. **Explore Existing Tools**
   ```bash
   # Look at the source code for existing tools
   cd packages/aw-tool-erc20-transfer/src/lib/lit-actions
   cat tool.ts
   ```
   - See how real Lit Actions are structured
   - Understand policy validation patterns

3. **Join the Community**
   - Telegram: https://t.me/+aa73FAF9Vp82ZjJh
   - Ask questions, share your use case
   - Learn from others building similar things

---

### Short-Term Goals (This Week)

1. **Build a Custom Tool**
   ```bash
   pnpm new-tool my-custom-tool
   ```
   - Start simple: create a tool that signs messages
   - Add policy: only sign messages with specific prefixes
   - Test thoroughly before deploying

2. **Implement a Real Use Case**
   - Take one of your actual projects
   - Identify where an AI agent would be useful
   - Design the policy constraints
   - Build and deploy

3. **Understand the Economics**
   - Calculate actual costs for your use case
   - Consider gas fees on different networks
   - Plan for scaling (more users = more transactions)

---

### Medium-Term Mastery (This Month)

1. **Advanced Patterns**
   - Multi-PKP architectures
   - Hierarchical policies
   - Emergency recovery mechanisms
   - Cross-chain operations

2. **Production Readiness**
   - Monitoring and alerting
   - Rate limiting strategies
   - Gas optimization
   - Incident response planning

3. **Contribute to the Ecosystem**
   - Open source your custom tools
   - Write tutorials for your use case
   - Help other developers in the community
   - Submit improvements to Agent Wallet repo

---

## Chapter Summary: What You've Learned

### Conceptual Understanding

✅ **The Problem**: Traditional AI agents with blockchain wallets require trusting the developer with full access to private keys—a fundamental security flaw.

✅ **The Solution**: Lit Protocol's distributed key generation creates private keys that never exist in one place, combined with programmable policies enforced through immutable code.

✅ **The Pattern**: Admin/Delegatee separation where owners set policies and developers execute within constraints, with no way to bypass.

✅ **The Security Model**: Trust is replaced by cryptographic proofs, public code, and economic incentives. No single party can steal funds.

### Technical Skills

✅ **PKP Basics**: Created and managed Programmable Key Pairs, understanding they're NFTs that control distributed private keys.

✅ **Policy Setting**: Defined on-chain policies that restrict what a PKP can do, including amount limits, allowed addresses, and execution conditions.

✅ **Delegatee Execution**: Executed tools as a delegatee, seeing how Lit Actions validate policies before signing transactions.

✅ **CLI Navigation**: Used the Agent Wallet CLI to manage PKPs, set policies, add delegatees, and execute tools.

### Practical Experience

✅ **Hands-On Setup**: Installed and configured the Agent Wallet system, including dependencies, test tokens, and environment variables.

✅ **End-to-End Flow**: Completed the full journey from minting a PKP to executing a policy-restricted token transfer.

✅ **Policy Testing**: Verified that policies actually prevent unauthorized actions, not just in theory but in practice.

---

## Coming in Chapter 2: "Building Your First Custom Tool"

In the next chapter, we'll dive deeper into creating custom Lit Actions. You'll learn:

- **Lit Action Structure**: Anatomy of a production-ready Lit Action
- **Policy Design Patterns**: Common policy structures and when to use them
- **External API Integration**: Calling external services from Lit Actions
- **Error Handling**: Robust error handling and user-friendly error messages
- **Testing Strategies**: How to test Lit Actions before deploying to IPFS
- **Gas Optimization**: Making your Lit Actions efficient and cost-effective

**Teaser: The Case You'll Build**

You'll create a "Dollar-Cost Averaging# The Agent's Dilemma
## Chapter 1: When Your AI Needs a Wallet (And Why That's Terrifying)

### A MemoryChain Technical Series | Season 1: Lit Protocol Agent Wallets

---

## Meta-Narrativa de Este Capítulo

### ¿QUÉ es este capítulo?
El primer episodio de una serie técnica transmedia que enseña Lit Protocol Agent Wallets a través de narrativa dramática, casos de uso reales, y código funcional—diseñado específicamente para developers que encuentran la documentación tradicional confusa o abrumadora.

### ¿POR QUÉ existe?
Porque la documentación técnica tradicional de Lit Protocol (y most blockchain tech) es como leer el manual de un avión en mitad del vuelo. Este capítulo transforma complejidad en historia, permitiendo que developers comprendan *por qué* necesitan esta tecnología antes de sumergirse en *cómo* implementarla.

### ¿PARA QUÉ sirve?
- **Onboarding de developers**: Entrada suave a conceptos complejos
- **Validación de use case**: "¿Es esto para mi proyecto?"
- **Foundation arquitectural**: Comprensión profunda antes de código
- **Content marketing**: Muestra CryptoPlaza's approach a educación técnica

### ¿CÓMO usar este capítulo?
1. **Read sequentially**: Como episodio de TV, tiene arco narrativo
2. **Pause at code blocks**: Cada snippet es ejecutable y comentado
3. **Follow character journeys**: Tres developers, tres problemas, tres soluciones
4. **Check "Meanwhile" sections**: Deep dives técnicos opcionales
5. **Try "Your Turn"**: Ejercicios hands-on al final

### ¿CUÁNDO leer siguientes capítulos?
- **Chapter 2**: Después de entender el problema (este chapter)
- **Chapter 3**: Después de setup básico (Chapter 2)
- **Chapter 4-6**: Deep dives en tools específicos
- **Chapter 7+**: Advanced patterns y production deployment

---

> "Any sufficiently advanced AI is indistinguishable from a security nightmare." — Not Arthur C. Clarke, but should have been

**Cold Open: The $2.3 Million Mistake**

It's 3:47 AM in Singapore. Alex Chen hasn't slept in thirty-six hours. She's watching her AI trading agent execute its 147th transaction of the night—buying low, selling high, accumulating profits with the cold efficiency only algorithms can achieve.

The agent is working perfectly. Too perfectly.

At 3:51 AM, the agent receives a routine software update from the development team. New trading strategies, better risk management, improved execution. Alex approves the deployment—she trusts her devs.

At 3:52 AM, the agent begins transferring all accumulated funds to an address Alex doesn't recognize.

By 3:54 AM, $2.3 million in ETH is gone.

The developer who pushed the update? Fired three weeks ago. Bitter. Smart. Patient. He'd inserted a time-delayed wallet drain into the "improvement" patch. The agent executed it flawlessly because **the agent couldn't distinguish between legitimate commands and theft**.

**This isn't a hypothetical.** It happened. Not to Alex specifically, but to someone like her. Multiple someones. Because here's the fundamental problem with AI agents that have blockchain wallets:

**The developer who codes the agent has the same level of access as the owner. And that's terrifying.**

---

## Act I: The Problem Nobody Saw Coming

### Scene 1: The Three Developers (And Three Nightmares)

Let's meet our protagonists. Each is building something legitimate, valuable, potentially transformative. Each is about to discover the same architectural flaw.

#### Developer #1: Maya - The DeFi Automator

**Background:**
- Building an AI agent that automates DeFi yield farming
- Users delegate their funds, agent finds best yields across protocols
- Smart enough to rebalance based on gas costs, APYs, and risk scores

**The Problem:**
```typescript
// Maya's initial architecture (DANGEROUS - DON'T DO THIS)
class YieldAgent {
  private agentWallet: Wallet; // Agent has direct control
  
  constructor(privateKey: string) {
    this.agentWallet = new Wallet(privateKey);
  }
  
  async optimizeYield(userFunds: bigint) {
    // Agent decides where to move funds
    const bestProtocol = await this.findBestYield();
    
    // Agent executes transaction
    await this.agentWallet.sendTransaction({
      to: bestProtocol.address,
      value: userFunds,
      data: bestProtocol.depositCalldata
    });
  }
}
```

**What Could Go Wrong:**

Maya's code review reveals a chilling realization: Every time the agent executes a "deposit to best protocol" transaction, it's using a private key that Maya (the developer) has access to. 

Her users are trusting her with:
- The agent's logic (is it really finding the best yield?)
- The agent's wallet (can Maya change where funds go?)
- The deployment infrastructure (what if Maya's server is compromised?)

One disgruntled dev on her team could modify the `findBestYield()` function to return their own address. **Users would have no way to know until their funds disappeared.**

#### Developer #2: James - The NFT Minter

**Background:**
- Building an AI that mints NFTs based on user prompts
- Users pay a fee, AI generates art, mints on-chain
- Scaling to hundreds of mints per day

**The Problem:**
```typescript
// James's architecture (ALSO DANGEROUS)
class NFTMintingAgent {
  private masterWallet: Wallet;
  
  async mintForUser(userRequest: MintRequest) {
    // Generate NFT metadata
    const metadata = await this.generateArt(userRequest.prompt);
    
    // Mint NFT (using master wallet)
    const tx = await this.nftContract.mint(
      userRequest.userAddress,
      metadata.uri,
      { 
        from: this.masterWallet.address,
        // This wallet pays gas and has minting privileges
      }
    );
  }
}
```

**What Could Go Wrong:**

James realizes that his "master wallet" has permission to mint unlimited NFTs in his collection contract. If someone compromises his deployment or convinces him to add a "helpful feature," they could:
- Mint thousands of NFTs to their own address (diluting the collection)
- Change the minting logic to send NFTs to wrong addresses
- Drain the gas funds from the master wallet

His users have to trust that James will never:
- Get hacked
- Turn malicious
- Hire a bad actor
- Accidentally introduce a vulnerability

That's a lot of trust for "I just wanted an AI to make cool art."

#### Developer #3: Sarah - The DAO Treasurer Bot

**Background:**
- Building an AI agent that manages DAO treasury operations
- Executes approved proposals, rebalances assets, pays contributors
- Handles millions in community funds

**The Problem:**
```typescript
// Sarah's architecture (EXTREMELY DANGEROUS)
class DAOTreasurerAgent {
  private treasuryWallet: Wallet; // Controls ALL DAO funds
  
  async executeApprovedProposal(proposalId: number) {
    const proposal = await this.dao.getProposal(proposalId);
    
    if (proposal.approved) {
      // Agent directly executes treasury operations
      await this.treasuryWallet.sendTransaction({
        to: proposal.recipient,
        value: proposal.amount,
        data: proposal.calldata
      });
    }
  }
}
```

**What Could Go Wrong:**

Sarah's DAO community discovers that while proposals require community votes, the *execution* happens through a wallet Sarah controls. The DAO has voted to trust Sarah's code, but:
- Sarah could modify the code to ignore the `if (proposal.approved)` check
- A bug in Sarah's code could send funds to wrong addresses
- Sarah's deployment server is a single point of failure

The DAO can vote all they want. If Sarah's infrastructure is compromised, all votes are meaningless.

---

### Scene 2: The Common Thread (And Why It's Unsolvable in Traditional Architecture)

Maya, James, and Sarah meet at a Web3 developer conference. They compare notes and realize they've all discovered the same fundamental problem:

**Traditional AI + Blockchain Architecture:**
```
User Trust → Developer → Agent Code → Wallet Private Key → Blockchain

Problem: Developer is in the middle of the trust chain
```

The user has to trust:
1. Developer wrote secure code
2. Developer won't modify code maliciously
3. Developer's infrastructure won't be compromised
4. Developer won't get hacked/coerced/bribed
5. Developer will exist and be honest forever

**This is not how decentralized systems are supposed to work.**

Blockchain was invented specifically to eliminate the need for trusted intermediaries. But AI agents reintroduce that intermediary in the worst possible place: with direct access to user funds.

Over drinks, James jokes darkly: "We've invented a system where users trust an AI to manage their money, but the AI has to trust us not to rob them. That's not decentralization. That's a fancy custody service with extra steps."

### The Failed Solutions

They brainstorm traditional approaches:

**Attempt 1: Multi-Sig Wallets**
```typescript
// Require multiple signatures for transactions
const wallet = new MultiSig([userAddress, agentAddress, developerAddress]);
```

**Problem:** This makes the agent slower (requires coordination) and doesn't solve the developer trust issue—developer's key is still in the multi-sig.

**Attempt 2: Smart Contract Escrow**
```typescript
// Lock funds in a contract, agent can only execute specific actions
contract AgentEscrow {
  function executeIfValid(action: Action) {
    require(validateAction(action), "Invalid action");
    // Execute action
  }
}
```

**Problem:** The agent still needs a private key to call the contract. Who controls that key? The developer. We're back to square one.

**Attempt 3: Hardware Wallets**
```typescript
// Store private key in hardware device
const secureAgent = new Agent(hardwareWallet);
```

**Problem:** Hardware wallets require human interaction for signing. That defeats the entire purpose of an autonomous AI agent.

**Attempt 4: Zero-Knowledge Proofs**
```typescript
// Generate proofs that action is valid without revealing private key
const proof = await generateZKProof(action, privateKey);
```

**Problem:** ZK proofs are computationally expensive, complex to implement, and still don't solve the fundamental issue: someone has to hold the private key to generate proofs.

---

## Act II: The Solution (That Sounds Like Magic But Is Actually Math)

### Scene 3: Maya Discovers Lit Protocol

Maya is about to give up on her DeFi agent project when a fellow developer mentions Lit Protocol over lunch.

**Developer:** "What if the private key never exists in one place?"

**Maya:** "Then how does anyone use it?"

**Developer:** "Exactly."

This sounds like a riddle, but it's actually the core insight of Lit Protocol's approach:

**Instead of:**
```
Private Key (held by someone) → Signs Transactions
```

**Lit Protocol does:**
```
Private Key Shares (distributed across nodes) + Consensus → Signs Transactions
```

The private key is never reconstructed. It exists only as mathematical shares across a decentralized network of nodes. No single party—not the developer, not the user, not even Lit Protocol—can access the private key.

**Maya's skepticism intensifies:** "Okay, but if no one has the private key, how does the agent sign transactions?"

---

### Meanwhile: A Technical Deep Dive (Optional - For the Curious)

**How Distributed Key Generation (DKG) Actually Works:**

<details>
<summary>Click to expand technical explanation</summary>

Imagine you have a secret number: `42`

Traditional approach:
```
You know: 42
Problem: You're a single point of failure/trust
```

DKG approach:
```
Node 1 knows: 15
Node 2 knows: 12  
Node 3 knows: 8
Node 4 knows: 7

If any 3 nodes cooperate:
15 + 12 + 8 = 35 (can reconstruct something useful)
15 + 12 + 7 = 34 (can reconstruct something useful)
...but no single node knows 42

If only 2 nodes cooperate:
15 + 12 = 27 (not enough information)
```

In reality, this uses **Shamir's Secret Sharing** with threshold signatures:

```typescript
// Conceptual (not actual Lit Protocol code)
class DistributedKey {
  // Key is generated such that:
  // - No single node ever sees the full key
  // - Any threshold (e.g. 2/3) of nodes can cooperate to sign
  // - Fewer than threshold reveals nothing about the key
  
  static async generate(threshold: number, totalNodes: number) {
    // Mathematics ensures key shares are generated without
    // ever creating the complete key in any single location
    const shares = await generateShares(threshold, totalNodes);
    
    // Each node receives one share
    return shares.map((share, i) => ({
      nodeId: i,
      share: share, // This alone is useless
      threshold: threshold // Need this many to sign
    }));
  }
  
  static async sign(message: string, shares: Share[]) {
    if (shares.length < this.threshold) {
      throw new Error("Not enough shares");
    }
    
    // Each node creates a signature share
    const signatureShares = shares.map(share => 
      createPartialSignature(message, share)
    );
    
    // Combine shares into complete signature
    // WITHOUT ever reconstructing the private key
    return combineSignatureShares(signatureShares);
  }
}
```

**The Magic:**
- Private key exists mathematically but never physically
- Signing happens through threshold cooperation
- Compromising one node reveals nothing
- No single party can sign alone

</details>

---

### Scene 4: Understanding PKPs (Programmable Key Pairs)

Maya's next question: "Okay, distributed keys are cool. But how do I program the agent's behavior if no one controls the key?"

This is where **PKPs (Programmable Key Pairs)** enter the story.

**Traditional Wallet:**
```
Private Key → Can sign anything the holder wants
```

**PKP:**
```
Private Key (distributed) + Immutable Code → Can only sign what the code allows
```

Think of it like this:

**Traditional Safe:**
```
- You have the key
- You can open it whenever
- You decide what to take out
- Trust model: "Trust me not to rob it"
```

**PKP "Safe":**
```
- Nobody has the full key
- Can only open if distributed nodes agree
- Can only take out specific items according to pre-programmed rules
- Trust model: "Trust the math and the public code"
```

**Maya's Implementation (Using Lit Protocol):**

```typescript
import { LitNodeClient } from '@lit-protocol/lit-node-client';
import { LitPKP } from '@lit-protocol/pkp-ethers';

// Step 1: Create a PKP (one-time setup)
async function createYieldAgentPKP() {
  const litNodeClient = new LitNodeClient({
    litNetwork: 'datil-dev',
  });
  await litNodeClient.connect();
  
  // This creates a new PKP NFT
  // The private key is NEVER reconstructed
  // It exists only as shares across Lit nodes
  const pkp = await litNodeClient.pkpCreate();
  
  return {
    tokenId: pkp.tokenId,           // NFT representing ownership
    publicKey: pkp.publicKey,         // Public key (shareable)
    ethAddress: pkp.ethAddress,       // Ethereum address (shareable)
    // privateKey: DOES NOT EXIST HERE
  };
}
```

**Key Insight:** The PKP is represented as an **ERC-721 NFT**. Whoever owns the NFT controls the policy for what the PKP can do, but *nobody* controls the actual private key.

```typescript
// Step 2: Define what the agent CAN do (Lit Action)
const yieldOptimizationAction = `
  // This code runs on Lit nodes, not Maya's server
  (async () => {
    // Get the best yield protocol
    const bestProtocol = await Lit.Actions.runOnce({
      waitForResponse: true,
      name: "findBestYield"
    }, async () => {
      // This would call DeFi APIs to find best APY
      // Simplified for example:
      return {
        protocol: "Aave",
        address: "0x...",
        expectedAPY: 5.2
      };
    });
    
    // Check if protocol is in allowlist (defined by user)
    const allowedProtocols = JSON.parse(await Lit.Actions.getPermittedAddresses());
    if (!allowedProtocols.includes(bestProtocol.address)) {
      return { error: "Protocol not in allowlist" };
    }
    
    // Sign the transaction (using distributed key shares)
    const txn = {
      to: bestProtocol.address,
      value: jsParams.amount,
      data: jsParams.depositCalldata,
      gasLimit: 200000
    };
    
    // This signature is created through threshold cooperation
    // The private key is NEVER reconstructed
    const signature = await Lit.Actions.signEcdsa({
      toSign: ethers.utils.arrayify(ethers.utils.keccak256(txn)),
      publicKey: jsParams.pkpPublicKey,
      sigName: "yieldOptimizationSig"
    });
    
    return signature;
  })();
`;
```

**Maya's Realization:**

"Wait. So the code that controls what the PKP can sign is stored on **IPFS** (immutable), and executed on **Lit nodes** (distributed), which means:

1. **I can't change it** after deployment (it's on IPFS)
2. **Users can audit it** (IPFS is public)
3. **Nobody can steal the key** (it never exists in one place)
4. **The agent works autonomously** (nodes execute code, create signatures)

This means my users don't have to trust me—they only have to trust:
- The math (distributed key generation)
- The code (which they can read on IPFS)
- The Lit network (decentralized, no single point of control)

**That's actually decentralized!**"

---

### Scene 5: James and the Delegatee Pattern

James has been following Maya's research and realizes something: "But what if I *need* to execute different actions over time? My NFT agent needs to mint different styles, adjust to market conditions, maybe even pause minting if there's a security concern. Can I update the Lit Action?"

**Answer:** No. Lit Actions on IPFS are immutable.

**Better Answer:** You use the **Admin/Delegatee pattern**.

**The Pattern:**
```
Admin (NFT Owner) → Sets Policy → Delegatee (Developer) → Executes Within Policy
```

**James's Implementation:**

```typescript
// James (Admin) mints a PKP and sets policy
async function setupNFTAgent() {
  const admin = await Admin.create({
    type: 'eoa',
    privateKey: process.env.JAMES_PRIVATE_KEY
  }, {
    litNetwork: 'datil-dev'
  });
  
  // Mint PKP (James owns the NFT)
  const pkpInfo = await admin.mintPkp();
  
  // Add himself as delegatee (can execute actions)
  await admin.addDelegatee(
    pkpInfo.tokenId,
    process.env.JAMES_ETH_ADDRESS
  );
  
  // Permit the NFT minting tool
  await admin.permitTool(pkpInfo.tokenId, {
    ipfsCid: 'QmNFTMintingActionCID...',
    signingScopes: [AUTH_METHOD_SCOPE.SignAnything]
  });
  
  // Set policy: Max 10 mints per day, only to verified users
  await admin.setToolPolicy(
    pkpInfo.tokenId,
    'QmNFTMintingActionCID...',
    {
      maxMintsPerDay: 10,
      requireVerifiedUser: true,
      allowedCollections: [process.env.NFT_CONTRACT_ADDRESS]
    },
    'v1'
  );
}
```

```typescript
// James (Delegatee) executes minting within policy
async function mintNFT(userRequest: MintRequest) {
  const delegatee = await Delegatee.create(
    process.env.JAMES_DELEGATEE_KEY,
    { litNetwork: 'datil-dev' }
  );
  
  // Execute tool (policy is checked by Lit Action)
  const result = await delegatee.executeTool({
    ipfsId: 'QmNFTMintingActionCID...',
    jsParams: {
      params: {
        recipientAddress: userRequest.userAddress,
        metadataURI: userRequest.generatedMetadata,
        collectionAddress: process.env.NFT_CONTRACT_ADDRESS
      }
    }
  });
  
  return result;
}
```

**The Lit Action (enforces policy):**

```javascript
(async () => {
  // Get policy from PKP Tool Registry (on-chain)
  const policy = await Lit.Actions.getToolPolicy({
    pkpTokenId: jsParams.pkpTokenId,
    toolCid: jsParams.toolCid
  });
  
  const policyData = decodePolicy(policy);
  
  // Check: Is delegatee authorized?
  if (!await Lit.Actions.isDelegatee(jsParams.delegateeAddress, jsParams.pkpTokenId)) {
    return { error: "Unauthorized delegatee" };
  }
  
  // Check: Within daily mint limit?
  const mintsToday = await Lit.Actions.getMintsToday(jsParams.pkpTokenId);
  if (mintsToday >= policyData.maxMintsPerDay) {
    return { error: "Daily mint limit exceeded" };
  }
  
  // Check: Is recipient verified?
  if (policyData.requireVerifiedUser) {
    const isVerified = await Lit.Actions.checkVerification(jsParams.recipientAddress);
    if (!isVerified) {
      return { error: "Recipient not verified" };
    }
  }
  
  // Check: Is collection allowed?
  if (!policyData.allowedCollections.includes(jsParams.collectionAddress)) {
    return { error: "Collection not in allowlist" };
  }
  
  // All checks passed - sign the minting transaction
  const mintTxn = await createMintTransaction(jsParams);
  const signature = await Lit.Actions.signEcdsa({
    toSign: ethers.utils.arrayify(ethers.utils.keccak256(mintTxn)),
    publicKey: jsParams.pkpPublicKey,
    sigName: "nftMintSig"
  });
  
  return signature;
})();
```

**James's Epiphany:**

"So I'm the delegatee—I can execute actions—but I can't bypass the policy. Even if I wanted to mint 1000 NFTs to my own address, the Lit Action would reject it because:

1. Policy is stored on-chain (in PKP Tool Registry contract)
2. Lit Action checks policy before signing
3. I can't modify the Lit Action (it's on IPFS)
4. I can't modify the policy (only the Admin/NFT owner can)

My users see:
- The policy (on-chain, public)
- The Lit Action code (on IPFS, public)
- My delegatee address (on-chain, public)

They can verify that even if I'm compromised, the worst I can do is execute actions within the policy they set. That's... actually secure."

---

### Scene 6: Sarah and the DAO Treasury

Sarah's use case is the most complex: a DAO with millions in treasury, hundreds of proposals, multiple contributors to pay. She needs:

- **Flexibility**: Different types of treasury operations
- **Accountability**: DAO can revoke access if needed
- **Automation**: Agent handles routine operations
- **Safety**: Even a compromised agent can't drain treasury

**Sarah's Solution: Multiple Tools with Hierarchical Policies**

```typescript
// DAO setup (one-time)
async function setupDAOTreasury() {
  const daoMultisig = await createGnosisSafe([
    council_member_1,
    council_member_2,
    council_member_3
  ], threshold=2);
  
  // DAO (as Admin) creates PKP for agent
  const admin = await Admin.create({
    type: 'eoa',
    privateKey: daoMultisig.privateKey // Controlled by multi-sig
  }, {
    litNetwork: 'datil-dev'
  });
  
  const treasuryPKP = await admin.mintPkp();
  
  // Add Sarah (agent developer) as delegatee
  await admin.addDelegatee(
    treasuryPKP.tokenId,
    SARAH_DELEGATEE_ADDRESS
  );
  
  // Permit multiple tools with different permissions
  
  // Tool 1: Pay Contributors (low risk, high frequency)
  await admin.permitTool(treasuryPKP.tokenId, {
    ipfsCid: 'QmPayContributorsCID...'
  });
  await admin.setToolPolicy(
    treasuryPKP.tokenId,
    'QmPayContributorsCID...',
    {
      maxAmountPerTx: ethers.utils.parseEther("5"), // 5 ETH max
      maxAmountPerDay: ethers.utils.parseEther("50"), // 50 ETH daily
      allowedRecipients: [/* verified contributor addresses */],
      requireProposalApproval: false // Can execute automatically
    },
    'v1'
  );
  
  // Tool 2: Execute Proposals (high risk, low frequency)
  await admin.permitTool(treasuryPKP.tokenId, {
    ipfsCid: 'QmExecuteProposalCID...'
  });
  await admin.setToolPolicy(
    treasuryPKP.tokenId,
    'QmExecuteProposalCID...',
    {
      maxAmountPerTx: ethers.utils.parseEther("100"), // 100 ETH max
      requireProposalApproval: true, // Must have DAO vote
      requireMultiSigConfirmation: true, // Needs 2/3 council
      minVotingPeriod: 7 * 24 * 60 * 60 // 7 days minimum
    },
    'v1'
  );
  
  // Tool 3: Emergency Pause (safety mechanism)
  await admin.permitTool(treasuryPKP.tokenId, {
    ipfsCid: 'QmEmergencyPauseCID...'
  });
  await admin.setToolPolicy(
    treasuryPKP.tokenId,
    'QmEmergencyPauseCID...',
    {
      canPause: true,
      cannotUnpauseAlone: true, // Requires DAO vote to unpause
      pauseDuration: 48 * 60 * 60 // 48 hour pause
    },
    'v1'
  );
}
```

**Sarah's Agent Execution (as Delegatee):**

```typescript
class DAOTreasurerAgent {
  private delegatee: Delegatee;
  
  async payContributor(contributorAddress: string, amount: bigint) {
    // Select appropriate tool
    const tool = await this.delegatee.getToolByName('PayContributors');
    
    // Execute within policy
    try {
      const result = await this.delegatee.executeTool({
        ipfsId: tool.ipfsCid,
        jsParams: {
          params: {
            recipient: contributorAddress,
            amount: amount.toString(),
            // Policy will validate these
          }
        }
      });
      
      return { success: true, txHash: result.txHash };
    } catch (error) {
      // Policy violation - agent cannot override
      return { success: false, reason: error.message };
    }
  }
  
  async executeProposal(proposalId: number) {
    // Get proposal from DAO contract
    const proposal = await this.daoContract.getProposal(proposalId);
    
    // Lit Action will verify:
    // - Proposal passed vote
    // - Voting period elapsed
    // - Multi-sig confirmed
    // - Amount within policy limits
    
    const tool = await this.delegatee.getToolByName('ExecuteProposal');
    
    const result = await this.delegatee.executeTool({
      ipfsId: tool.ipfsCid,
      jsParams: {
        params: {
          proposalId: proposalId,
          // Lit Action fetches proposal details on-chain
          // and validates before signing
        }
      }
    });
    
    return result;
  }
  
  async emergencyPause() {
    // If Sarah detects something wrong, she can trigger pause
    // But she CANNOT unpause without DAO approval
    
    const tool = await this.delegatee.getToolByName('EmergencyPause');
    
    await this.delegatee.executeTool({
      ipfsId: tool.ipfsCid,
      jsParams: {
        params: {
          reason: "Suspicious activity detected",
          pauseDuration: 48 * 60 * 60
        }
      }
    });
    
    // Now all treasury operations are paused for 48 hours
    // giving DAO time to investigate
  }
}
```

**Sarah's Insight:**

"The DAO doesn't have to trust me. They can:
- See every tool I can execute (on-chain registry)
- See the policy limits (on-chain)
- See every transaction before it happens (policy check in Lit Action)
- Revoke my delegatee access instantly (on-chain call)
- Take back full control (they own the PKP NFT)

I'm not custodying their funds. I'm not even really controlling the agent. I'm just... facilitating execution within rules the DAO set.

If I go rogue, get hacked, or just make a mistake—the worst damage is limited by the policy. The DAO can revoke my access and assign a new delegatee without ever moving the funds or changing the PKP."

---

## Act III: Putting It All Together

### Scene 7: The Three Developers, One Month Later

Maya, James, and Sarah reunite at the same conference. Their projects are now live.

**Maya's Yield Agent:**
- Managing $1.2M in user funds
- Never had a security incident
- Users can audit the Lit Action code
- Maya doesn't have access to private keys
- Users added their own custom policies (via owning sub-PKPs)

**James's NFT Minter:**
- Minted 3,400 NFTs
- Zero unauthorized mints
- Community verified the policy and code
- James is a delegatee, not a custodian
- Governance vote can change policies without James

**Sarah's DAO Treasury Agent:**
- Processed 147 contributor payments
- Executed 12 major proposals
- Triggered emergency pause once (caught an exploit attempt)
- DAO members sleep soundly
- Sarah can be replaced without funds moving

They compare notes:

**James:** "Remember when we thought this problem was unsolvable?"

**Maya:** "We were trying to solve it with traditional architecture. The breakthrough was realizing that AI agents don't need*access* to private keys—they need the *ability to get