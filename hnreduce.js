x=document.getElementsByTagName("tr");
container=x[3]; // <tr> with the table with all news items
items=container.getElementsByTagName("tr");

// items[0] ... first <tr> with item number, votearrow, title, url
// items[1] ... first <tr> with metainfo
// items[2] ... first <tr> with blank line
 
console.log(items[0]);
