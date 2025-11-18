import React, { useState, useEffect } from 'react';
import { createHelia } from 'helia';
import { unixfs } from '@helia/unixfs';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

interface Asset {
  cid: string;
  title: string;
  author: string;
  date: string;
  description: string;
}

interface AdminDashboardProps {
  assets: Asset[];
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ assets, setAssets }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [helia, setHelia] = useState<any>(null);
  const [fs, setFs] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const initHelia = async () => {
      const heliaNode = await createHelia();
      const fs = unixfs(heliaNode);
      setHelia(heliaNode);
      setFs(fs);
    };
    initHelia();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file && fs) {
      const fileBytes = await file.arrayBuffer();
      const fileCid = await fs.addBytes(new Uint8Array(fileBytes));
      const newAsset: Asset = {
        cid: fileCid.toString(),
        title,
        author,
        date,
        description,
      };
      setAssets([...assets, newAsset]);
      setTitle('');
      setAuthor('');
      setDate('');
      setDescription('');
      setFile(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <button onClick={handleLogout} style={{ float: 'right' }}>
        Logout
      </button>
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">File</label>
          <input type="file" id="file" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Upload</button>
      </form>
      <h2>Uploaded Assets</h2>
      <ul>
        {assets.map((asset, index) => (
          <li key={index}>
            <h3>{asset.title}</h3>
            <p>Author: {asset.author}</p>
            <p>Date: {asset.date}</p>
            <p>Description: {asset.description}</p>
            <p>
              <a href={`https://ipfs.io/ipfs/${asset.cid}`} target="_blank" rel="noopener noreferrer">
                View on IPFS
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
