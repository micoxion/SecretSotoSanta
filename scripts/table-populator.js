let wishlistTable;
let tableHeaders = []
//2d array, each index is a column containing an array of that columns info
let tableColumns = []
let longestList = 0;

let getWishlistLength = function(wishlist) {
    let count = 0;
    for (const item of wishlist) {
        count++;
        if (item.subsection) {
            for (const subItem of item.sublist) {
                count++
            }
        }
    }
    console.log("WISHLIST LENGTH: ", count);
    return count;
}

let handleSubsection = function(subsection, columnIndex, offset, column, title) {
    console.log("================== SUBSECTION START ==================")
    console.log("OFFSET: ", offset)
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
    console.log("================== SUBSECTION END ==================")
    console.log("OFFSET: ", offset)
    return offset;
}

let handleWishlist = function(wishlist) {
    let thead = document.createElement("th");
    thead.innerHTML = wishlist.name;
    tableHeaders.push(thead);
    let column = [];
    let actualList = wishlist.wishlist;
    let offset = 0;
    if (getWishlistLength(actualList) > longestList) {
        longestList = getWishlistLength(actualList);
    }
    for (let i = 0; i < actualList.length; i++) {
        let td = document.createElement("td");
        if (actualList[i].link) {
            let a = document.createElement("a");
            a.innerHTML = actualList[i].name;
            a.href = actualList[i].link;
            td.appendChild(a);
            column[i + offset] = td;
        } else if (actualList[i].subsection) {
            offset = handleSubsection(actualList[i].sublist, i, offset, column, actualList[i].title)
        } else {
            td.innerHTML = actualList[i].name;
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
                console.log(tableColumns[j][i], j, i)
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
    //PROD: 
    let fileResponse = await fetch("./assets/wishlists.json");
    //DEV: let fileResponse = await fetch("../assets/wishlists.json");
    let json = await fileResponse.json();
    //json = JSON.parse(json);

    for (const wishlist of json.wishlists) {
        handleWishlist(wishlist)
    }

    buildWishlistTable();

    console.log(wishlistTable);
})