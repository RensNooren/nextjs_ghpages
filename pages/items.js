import Link from 'next/link';

export default function Items({ items }) {
  return (
    <div>
      <h1>Items</h1>
      <p>These are items... Just items, nothing special:</p>
      <ul>
        {items.map(item => {
          return (
            <li key={item.name}>
              <Link href={`/items/${item.name}`}>
                <p>{ item.name }</p>
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
import path from 'path'
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public/testdata.json');
  const jsonData = await fsPromises.readFile(filePath);
  const items = JSON.parse(jsonData);
  return {
    props: {
      items
    }
  }
}