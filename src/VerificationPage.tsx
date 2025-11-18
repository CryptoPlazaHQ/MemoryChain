import React, { useState } from 'react';

interface Asset {
  cid: string;
  title: string;
  author: string;
  date: string;
  description: string;
}

interface VerificationPageProps {
  assets: Asset[];
}

const VerificationPage: React.FC<VerificationPageProps> = ({ assets }) => {
  const [cid, setCid] = useState('');
  const [asset, setAsset] = useState<Asset | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const foundAsset = assets.find((a) => a.cid === cid);
    if (foundAsset) {
      setAsset(foundAsset);
      setError(null);
    } else {
      setAsset(null);
      setError('Asset not found');
    }
  };

  return (
    <div>
      <h1>Verify Asset</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cid">Enter CID</label>
          <input
            type="text"
            id="cid"
            value={cid}
            onChange={(e) => setCid(e.target.value)}
          />
        </div>
        <button type="submit">Verify</button>
      </form>
      {asset && (
        <div>
          <h2>Asset Details</h2>
          <h3>{asset.title}</h3>
          <p>Author: {asset.author}</p>
          <p>Date: {asset.date}</p>
          <p>Description: {asset.description}</p>
          <p>
            <a href={`https://ipfs.io/ipfs/${asset.cid}`} target="_blank" rel="noopener noreferrer">
              View on IPFS
            </a>
          </p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default VerificationPage;
