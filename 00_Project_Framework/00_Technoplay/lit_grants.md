1 Generating Privacy-Preserving Proofs with Lit #6
Open
@a1ttech
Description
a1ttech
opened on Aug 7, 2023 · edited by a1ttech
Contributor
Description
Using the Lit privacy SDK as a starting point, build an SDK that enables users to generate private proofs over off-chain data. An example would be pulling in social or business data (via API) and generating a signed proof over those inputs.

Why? (problem statement)
Digital signatures can be used to bring greater credibility to our world at large, creating chains of trust using immutable cryptographic primitives. “Signed data” (whether it be a blockchain tx, verifiable credential, contract, or the like) refers to data that has been signed by a private key, the signature representing proof or consent over a particular digital interaction having taken place.

What will this tool enable?
Enable the issuance of privacy-preserving proofs over off-chain data.

Resources
Lit Privacy SDK
Intro to Lit Actions
Working with the Lit SDK

# AN : This is a very important SDK ya que puede ser integrada de cierta manera en el proyecto

2 Multichain Decentralized Communication #11
Open
@alekcangp
Description
alekcangp
opened on Jun 27, 2024
Description
Create a fully decentralized inbox based on programmable key pairs (PKP) and input data messages (IDM). Imagine of Lit Actions as the next layer of IDM, making it more versatile.

Why? (problem statement)
This is similar to etherscan.io/idm, but with some advantages:

there is no need to confirm every message with your wallet, one session signature is enough
several mailboxes (PKP) for one account
ability to send messages not only to Eth, but also to other chains
encrypt and decrypt messages in a chain through permitted addresses
programmable decentralized messaging, e.g. newsletters
Resources
https://etherscan.io/idm

3 Credentialing SDK #4
Open
Open
Credentialing SDK
#4
@a1ttech
Description
a1ttech
opened on Aug 3, 2023
Contributor
Description
Create an SDK that enables the automated issuance of VCreds or NFTs using off-chain data as inputs. This SDK should utilize Programmable Key Pairs (PKPs) and Lit Actions for condition-based signing.

Why? (problem statement)
Verifiable credentials (VCs) are a way to express qualifications or achievements in a tamper-proof and privacy-respecting way, using cryptographic signatures to ensure the authenticity of data inputs. In the context of Web3 identity solutions, verifiable credentials are often used alongside decentralized identifiers to enable secure and trustworthy digital identities.

However, the core problem of VC systems as they exist today is the issue of trust when it comes down to the signature on the VC itself: how can you verify that a particular issuer is valid and legitimate?

What will this tool enable?
By distributing ownership of the issuer key across a decentralized network, we can have greater confidence in the validity of a signed input, trusting the consensus that was reached across the nodes participating in the network.

Resources
Introduction to PKPs
Working with PKPs and Lit Actions
Example: Using Lit Actions to automate VC issuance


4 Private On-Chain Card Games #2
Open
@a1ttech
Description
a1ttech
opened on Aug 3, 2023
Contributor
Description
Create a fully on-chain card game -- like go-fish or poker -- where only players (denoted by their address) can decrypt their own hand on a given turn.

Why? (problem statement)
Many blockchain-based applications currently suffer from being "public-by-default". For certain use cases (such as competitive gaming), this notion of radical transparency creates certain challenges and design constraints.

What will this tool enable?
Privacy preserving on-chain gaming, without relying on a centralized key custodian or access control list!

Resources
Building next-gen games with Lit
Getting started with decentralized access control
