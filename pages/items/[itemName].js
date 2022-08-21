export default function Item({ itemName }) {
  return (
    <div>
      <div>
        <h1>{ itemName }</h1>
        <p>Color: ....</p>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const itemName = params.itemName
  return {
    props: {
      itemName
    }
  }
}

// Get JSON data create static paths
import fsPromises from 'fs/promises';
import path from 'path'
export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'public/testdata.json');
  const jsonData = await fsPromises.readFile(filePath);
  const items = JSON.parse(jsonData);
  return {
    paths: items.map(item => {
      const itemName = item.name;
      return {
        params: {
          itemName
        }
      }
    }),
    fallback: false
  }
}