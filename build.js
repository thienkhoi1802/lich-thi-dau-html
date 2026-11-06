// Ghép app/template/main.html + app/page/*.html -> file HTML hoàn chỉnh ở thư mục gốc.
// Quy ước marker (giống bộ HTML-PC): build:title | build:head | build:head2 | build:content | build:script | build:script2
const fs = require('fs'), path = require('path');
const root = __dirname;
const tpl = fs.readFileSync(path.join(root, 'app/template/main.html'), 'utf8');
const pageDir = path.join(root, 'app/page');
const SLOTS = ['title', 'head2', 'head', 'content', 'script', 'script2'];

fs.readdirSync(pageDir).filter(f => f.endsWith('.html')).forEach(f => {
  const src = fs.readFileSync(path.join(pageDir, f), 'utf8');
  let out = tpl;
  SLOTS.forEach(s => {
    const re = new RegExp(`<!-- build:${s} -->([\\s\\S]*?)<!-- /build:${s} -->`);
    const m = src.match(re);
    out = out.replace(`<!-- build:${s} -->`, m ? m[1].trim() : '');
  });
  fs.writeFileSync(path.join(root, f), out);
  console.log('built', f);
});
