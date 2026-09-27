import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('.',import.meta.url));
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.jpeg':'image/jpeg','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
const port=Number(process.env.PORT||8124);
createServer(async(req,res)=>{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return}
 try {
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root.endsWith(sep)?root:root+sep)||!types[extname(file)]){res.writeHead(404);res.end('Not found');return}
  if(!(await stat(file)).isFile())throw new Error('Not file');
  const bytes=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)],'X-Content-Type-Options':'nosniff','Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:bytes);
 }catch{res.writeHead(404);res.end('Not found')}
}).listen(port,'0.0.0.0',()=>console.log(`Bunker Box Casino: http://localhost:${port}`));
