const ACTIVE='apex.active.v1',HISTORY='apex.history.v1';
export function createStorage(store){
 const read=(key,fallback)=>{const raw=store.getItem(key);if(!raw)return fallback;return JSON.parse(raw);};
 return {loadActive:()=>read(ACTIVE,null),loadHistory:()=>read(HISTORY,[]),saveActive:q=>store.setItem(ACTIVE,JSON.stringify(q)),saveQuote(q){const entries=read(HISTORY,[]);const old=entries.find(x=>x.id===q.id);const revision={...structuredClone(q),revisions:old?.revisions||[]};if(old&&JSON.stringify({...old,revisions:[]})!==JSON.stringify({...q,revisions:[]})){revision.revisions=[...revision.revisions,{...old,revisions:undefined}].slice(-20);}store.setItem(HISTORY,JSON.stringify([revision,...entries.filter(x=>x.id!==q.id)]));return revision;},exportHistory:()=>JSON.stringify({schema:1,exportedAt:new Date().toISOString(),quotes:read(HISTORY,[])},null,2)};
}
