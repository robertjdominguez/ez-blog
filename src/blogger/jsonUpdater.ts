const fs = require('fs');
const path = require('path');
import { BlogPost } from './generator';

export async function updateJson(post: BlogPost): Promise<void> {
  const filePath = path.join(__dirname, '../../posts.json');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileContents);

  data.posts.push(post);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`✅ Post logged`);
}
