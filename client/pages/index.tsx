// pages/index.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>♻️ AI Trash Sorter</h1>
      <p>Welcome! Start sorting your trash!</p>
      <Link href="/trash">
        <button>Go to Trash Sorter</button>
      </Link>
    </div>
  );
}


