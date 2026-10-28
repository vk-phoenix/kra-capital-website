import { readFile, access, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
const root = resolve('dist');
const html = await readFile(resolve(root,'index.html'),'utf8');
const css = await readFile(resolve(root,'styles.css'),'utf8');
const js = await readFile(resolve(root,'main.js'),'utf8');
const failures = [];
const assert = (condition,message) => { if (!condition) failures.push(message); };
assert((html.match(/<h1\b/g)??[]).length === 1,'Expected exactly one h1');
assert(html.includes('https://kra.capital/'),'Missing canonical URL');
assert(html.includes('application/ld+json'),'Missing structured data');
assert(html.includes('property="og:image"'),'Missing Open Graph image');
assert(html.includes('data-reveal') && css.includes('prefers-reduced-motion'),'Missing reveal/fallback or reduced motion');
assert(html.includes('exclusively with proprietary capital'),'Missing proprietary capital disclosure in About');
assert(!html.includes('href="#"'),'Empty anchor present');
assert(!html.includes('Contact Us') && !html.includes('Join Our'),'Unexpected CTA');
for (const id of ['top','about','trading','technology','risk','research','partnerships','footer']) {
  assert(new RegExp('id="' + id + '"').test(html),'Missing section '+id);
}
for (const match of html.matchAll(/(?:src|href)="(\/[^"]+)"/g)) {
  const asset = match[1].split(/[?#]/)[0];
  if (!asset || asset === '/') continue;
  const full = resolve(root, '.'+asset);
  try {const file = await stat(full);assert(file.isFile(), `Expected file: ${asset}`);} catch{failures.push(`Missing asset ${asset}`);}
}
assert(js.includes("aria-expanded"),'Missing accessible mobile nav');
for (const name of ['robots.txt','sitemap.xml','404.html']) {
 try{await access(resolve(root,name));} catch{failures.push('Missing '+name);}
}
if (failures.length) {console.error('Checks failed:\n'+failures.map(x=>' - '+x).join('\n'));process.exit(1);}
console.log('Checks passed: metadata, anchors, accessibility hooks, copy, assets, outputs.');
