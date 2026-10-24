let wishlistTable;
let tableHeaders = []
//2d array, each index is a column containing an array of that columns info
let tableColumns = []
let longestList = 0;

let handleSubsection = function(subsection, columnIndex, offset, column, title) {
    let subsecTd = document.createElement("td");
    subsecTd.classList.add("subsection-title")
    subsecTd.innerHTML = title;
    column[columnIndex + offset] = subsecTd;

    for (const item of subsection) {
        console.log(item);
        let td = document.createElement("td");
        td.classList.add("subsection-item");
        if (item.link) {
            console.log("HELLO")
            let a = document.createElement("a");
            a.innerHTML = item.name;
            a.href = item.link;
            td.appendChild(a);
        } else {
            td.innerHTML = item.name;
        }
        offset++;
        console.log("=====> TD: ", td, " : ", column, " : ", columnIndex, " : ", offset);
        column[columnIndex + offset] = td;
        console.log("COLUMN: ", column);
    }
    console.log("OFFSET: ", offset)
    return offset;
}

let handleWishlist = function(wishlist) {
    let thead = document.createElement("th");
    thead.innerHTML = wishlist.name;
    tableHeaders.push(thead);
    let column = [];
    let wishlistList = wishlist.wishlist;
    let offset = 0;
    if (wishlistList.length > longestList) {
        longestList = wishlistList.length;
    }
    for (let i = 0; i < wishlistList.length; i++) {
        let td = document.createElement("td");
        if (wishlistList[i].link) {
            let a = document.createElement("a");
            a.innerHTML = wishlistList[i].name;
            a.href = wishlistList[i].link;
            td.appendChild(a);
            column[i + offset] = td;
        } else if (wishlistList[i].subsection) {
            offset += handleSubsection(wishlistList[i].sublist, i, offset, column, wishlistList[i].title)
        } else {
            td.innerHTML = wishlistList[i].name;
            column[i + offset] = td;
        }
    }
    tableColumns.push(column);
}

let buildWishlistTable = function() {
    console.log(tableHeaders);
    console.log(tableColumns);
    let headerRow = document.createElement("tr");
    wishlistTable.appendChild(headerRow);
    for (const header of tableHeaders) {
        headerRow.appendChild(header)
    }
    for (let i = 0; i < longestList; i++) {
        let tr = document.createElement("tr");
        wishlistTable.appendChild(tr);
        for (let j = 0; j < tableColumns.length; j++) {
            
            if (tableColumns[j].length > i) {
                tr.appendChild(tableColumns[j][i]);
            } else {
                tr.appendChild(document.createElement("td"));
            }
        }
    }
    // for (const column of tableColumns) {
    //     let tr = document.createElement("tr");
    //     wishlistTable.appendChild(tr);
    //     for (const wishlistItem of column) {
    //         tr.appendChild(wishlistItem)
    //     }
    // }
}

document.addEventListener("DOMContentLoaded", async function() {
    wishlistTable = document.getElementById("wishlist");
    let fileResponse = await fetch("../assets/wishlists.json");
    let json = await fileResponse.json();
    //json = JSON.parse(json);

    for (const wishlist of json.wishlists) {
        handleWishlist(wishlist)
    }

    buildWishlistTable();

    console.log(wishlistTable);
})