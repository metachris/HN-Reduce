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

function remove(id, href) { 
    //for (var x in localStorage) {
    //    console.log("- " + x);
    //}
    console.log("remove: " + id + " > " + href);
    localStorage[href] = "1";
    _remove(href);
}

function _remove(href) {
    console.log("x " + href);
    rows1 = document.getElementsByTagName("tr");
    tbody = rows1[3].getElementsByTagName("tbody")[0];

    rows = rows1[3].getElementsByTagName("tr");

    var len = rows.length;
    for (i=0; i<len; i++) {
        if (i%3 == 0) {
            cols = rows[i].getElementsByTagName("td");
            if (cols.length > 2) {
                td_title = cols[2];                
                link = td_title.getElementsByTagName("a")[0];
                //console.log(link.href);
                if (link.href == href) {
                    //console.log("found");
                    // found   
                    i1 = rows[i];
                    i2 = rows[i+1];
                    i3 = rows[i+2];
                    tbody.removeChild(i1);        
                    tbody.removeChild(i2);        
                    tbody.removeChild(i3);
                    return ;
                }
            }                
        }        
    }            
}
    
function checkItemRows(rows) {
    if (rows === false) return false;
    //var id = 0;

    rows1 = document.getElementsByTagName("tr");
    tbody = rows1[3].getElementsByTagName("tbody")[0];

    var toRemove = Array();
        
    var len = rows.length;
    for (i=0; i<len; i++) {
        if (i%3 == 0) {
            // Row with item number, title, etc. Check title
            cols = rows[i].getElementsByTagName("td");
            if (cols.length > 2) {                
                td_title = cols[2];
                td_title.style.width = "680px";
                link = td_title.getElementsByTagName("a")[0];
                // console.log(link[0].href);
                
                // if link is found, remove this and next two rows from DOM
                // else add remove tag
                removeCurrentItem = false;
                if (localStorage[link.href] == "1") {
                    removeCurrentItem = true;
                    toRemove.push(link.href);
                }
                //console.log(link[0]);
                
                if (!removeCurrentItem) {
                    // Add remove column
                    x = document.createElement('td');
                    x.innerHTML = " <small><a href='javascript:void(0);' style='color:lightgray;' onmouseover='this.parentNode.parentNode.parentNode.style.background=\"#fbfbf9\"' onmouseout='this.parentNode.parentNode.parentNode.style.background=\"\"'>[remove]</a></small>";
                    x.reduce_id = i;
                    x.reduce_href = link.href; 
                    x.addEventListener("click", function(e) {
                        remove(this.reduce_id, this.reduce_href);
                    }, false);
                    rows[i].appendChild(x);
                }
                
                //id += 1;
                //console.log(id);
            }
        }
    }
    
    for (var i in toRemove) {
        _remove(toRemove[i]);
    }
}

rows = getItemRows();
checkItemRows(rows);