import fs from 'fs';

export function formatFbs(path: string): void {
  let fbsContents = fs.readFileSync(path, 'utf8');
  fbsContents = formatSpace(fbsContents);
  fbsContents = formatNewline(fbsContents);
  fbsContents = formatField(fbsContents);
  fbsContents = formatRemove(fbsContents);

  fs.writeFileSync(path, fbsContents, 'utf8');
}

function formatSpace(fbsContents: string): string {
  fbsContents = fbsContents.replace(/(table|struct|union|enum|namespace)\s?([a-zA-Z0-9_]+)\s?{/g, '$1 $2 {');
  // nospace before colon
  fbsContents = fbsContents.replace(/([a-zA-Z0-9_]+) :/g, '$1:');
  // space after colon
  fbsContents = fbsContents.replace(/:(\[?[a-zA-Z0-9_\]?]+)/g, ': $1');
  // space before equal
  fbsContents = fbsContents.replace(/([a-zA-Z0-9_]+)=/g, '$1 =');
  // space after equal
  fbsContents = fbsContents.replace(/=([a-zA-Z0-9_]+)/g, '= $1');
  // replace tab with space
  fbsContents = fbsContents.replace(/\t/g, '  ');
  // replace multiple spaces with two space
  fbsContents = fbsContents.replace(/ {2,}/g, '  ');
  return fbsContents;
}

function formatNewline(fbsContents: string): string {
  // force double newline after multiple includes
  fbsContents = fbsContents.replace(/(include "[a-zA-Z0-9_./]+";\n)+/g, '$&\n\n');
  // force double newline after namespace block
  fbsContents = fbsContents.replace(/(namespace [a-zA-Z0-9_.]+;)/g, '$1\n\n');
  // force double newline after close curly bracket
  fbsContents = fbsContents.replace(/(}\n)/g, '$1\n\n');
  // replace multi newlines with double newline
  fbsContents = fbsContents.replace(/\n{2,}/g, '\n\n');
  return fbsContents;
}

function formatField(fbsContents: string): string {
  // force snake case for field names
  fbsContents = fbsContents.replace(/(\n\s+[a-zA-Z0-9_]+):/g, (match: string, p1: string) => {
    return p1.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase() + ':';
  });
  return fbsContents;
}

function formatRemove(fbsContents: string): string {
  // remove trailing space
  fbsContents = fbsContents.replace(/[ \t]+$/gm, '');
  // remove trailing multi newlines
  fbsContents = fbsContents.replace(/\n{2,}$/gm, '');

  return fbsContents;
}
