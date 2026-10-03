// Throwaway verification: simulate DOM + click the built bundle's handlers.
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync('dist/index.html', 'utf8');
const ids = ['home-score', 'guest-score', 'home-increment', 'home-increment2',
             'home-increment3', 'guest-increment', 'guest-increment2', 'guest-increment3'];

const elements = Object.fromEntries(ids.map(id => {
  const listeners = {};
  return [id, { id, textContent: '0', listeners,
    addEventListener: (ev, fn) => { (listeners[ev] ||= []).push(fn); } }];
}));

// Every id used in the built HTML must exist, or the real app would throw.
for (const m of html.matchAll(/id="([^"]+)"/g)) {
  if (!elements[m[1]]) throw new Error(`Missing element for id: ${m[1]}`);
}

const jsFile = fs.readdirSync('dist/assets').find(f => f.endsWith('.js'));
const js = fs.readFileSync(`dist/assets/${jsFile}`, 'utf8');

const ctx = vm.createContext({
  document: {
    getElementById: id => elements[id] ?? null,
    querySelectorAll: () => [],
    createElement: () => ({ relList: { supports: () => false } }),
  },
  MutationObserver: class { observe() {} },
  fetch: () => {},
  console,
  window: {},
});
vm.runInContext(js, ctx);

const click = id => elements[id].listeners.click.forEach(fn => fn());
const read = id => elements[id].textContent;

click('home-increment'); click('home-increment'); click('home-increment2');
click('guest-increment3'); click('guest-increment3'); click('guest-increment3');

console.log('home-score :', read('home-score'), '(expected 4)');
console.log('guest-score:', read('guest-score'), '(expected 9)');

const pass = read('home-score') === 4 && read('guest-score') === 9;
console.log(pass ? '\nPASS: buttons increment correctly' : '\nFAIL: buttons did not update');
process.exit(pass ? 0 : 1);