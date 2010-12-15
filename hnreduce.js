function getItemRows() {
    // Get the main table container
    rows1 = document.getElementsByTagName("tr");
    if (rows1.length < 3) return false;
    
    // Get the tr from the main container which has the actual item table inside
    container = rows1[3]; // <tr> with the table with all news items
    
    // Get all the item tr's
    items = container.getElementsByTagName("tr");    
    // items[0] ... first <tr> with item number, votearrow, title, url
    // items[1] ... first <tr> with metainfo
    // items[2] ... first <tr> with blank line
    
    return items;
}

function remove(i) { alert("remove: " + i); }

function checkItemRows(rows) {
    if (rows === false) return false;
    var id = 0;
    
    len = rows.length;
    for (i=0; i<len; i++) {
        if (i%3 == 0) {
            removeCurrentItem = false;
            
            // Row with item number, title, etc. Check title
            cols = rows[i].getElementsByTagName("td");
            if (cols.length > 2) {                
                td_title = cols[2];
                link = td_title.getElementsByTagName("a");
                
                // if link is found, remove this and next two rows from DOM
                // else add remove tag
                removeCurrentItem = false;
                //console.log(link[0]);
                
                if (!removeCurrentItem) {
                    // Add remove column
                    x = document.createElement('td');
                    x.innerHTML = " <small style='color:lightgray;' onmouseover='this.parentNode.parentNode.style.background=\"#333\"' onmouseout='this.parentNode.parentNode.style.background=\"\"'>[remove]</small>";
                    x.reduce_id = id;
                    x.addEventListener("click", function(e) {
                        alert(this.reduce_id);
                    }, false);
                    rows[i].appendChild(x);
                }
                
                id += 1;
            }
        }
    }
}

rows = getItemRows();
checkItemRows(rows);