export default function Item({ item, keywordCollection }) {
  return (
    <div>
      <div>
        <h1>{ item.name }</h1>
        <p>Color: { item.color }</p>
        <ul>
          {keywordCollection.map(keyword => {
            return (
              <li key={ keyword.name }>
                <p>{ keyword.name } + { keyword.nickname }</p>
              </li>
            )
          })}
      </ul>
      </div>
    </div>
  )
}

export let keywordCollection = []
import path from 'path';
export async function getStaticProps({ params }) {
  const thisItem = params.itemName
  // Currently filePath is NOT case sensitive TODO: make the path case sensitive
  const filePath = path.join(process.cwd(), 'public/items/' + thisItem + '.json');
  const jsonData = await fsPromises.readFile(filePath);
  const item = JSON.parse(jsonData);
  // collect all keywords from an entry and create a usable array
  Object.entries(item.keywords).forEach(
    ([key, value]) => {
        keywordCollection.push({ name: value.name, nickname: value.nickname, keyword: key})
        console.log(keywordCollection);
      })
  return {
    props: {
      item,
      keywordCollection
    }
  }
}

// Get path from overview.txt
import fsPromises from 'fs/promises';
export async function getStaticPaths() {
  const overview = await fsPromises.readFile('public/overview.txt', 'utf-8');
  const items = overview.split(/\r?\n/);
  return {
    paths: items.map(item => {
      const itemName = item;
      return {
        params: {
          itemName
        }
      }
    }),
    fallback: false
  }
}