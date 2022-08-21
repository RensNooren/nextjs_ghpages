import Head from 'next/head';
import Link from 'next/link';

export default function Items({ items }) {
  return (
    <div className='container mx-auto'>
      <h1 className='text-3xl font-bold'>Items</h1>
      <p>These are items... Just items, nothing special:</p>
      <ul>
        {items.map(item => {
          return (
            <li key={item}>
              <Link href={`/items/${item}`}>
                <p>{ item }</p>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// Get JSON data
import fsPromises from 'fs/promises';
export async function getStaticProps() {
  const overview = await fsPromises.readFile('public/overview.txt', 'utf-8');
  const items = overview.split(/\r?\n/);
  return {
    props: {
      items
    }
  }
}
