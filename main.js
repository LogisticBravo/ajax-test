//const baseURL = "https://ci-swapi.herokuapp.com/api/"

function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

function writeToDocument(url) {
    var tableRows = [];
    var el = document.getElementById("data");

    getData(url, function(data) {
        var pagination = "";

        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous);
        }
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            var dataRow = [];

            Object.keys(item).forEach(function(key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");
    });
}

//console.dir(data); console.dir(data) - shows us the directory of 'data' which led us to 'results'
//by placing the entire code in a function called getData(cb) which is a newly created 'callback' function.
//it allows us to move the data out by calling the getData() function later.

//function below created for the action of console log so as to be later passed below to the getData function.
/*function printDataToConsole(data){
    console.log(data);
}

getData(printDataToConsole); */


//tells it to wait 500milliseconds before executing and sol allows time to load into console.log


/*xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        document.getElementById("data").innerHTML = this.responseText;
    }
};*/ 
//readystate of 4 means that the operation is complete i.e. it is ready.
    // httpstatus code of 200 means 'ok,request succeeded.content delivered'
    //javascript is used to get an element of id 'data' (the <div>) and change the inner html to the response text from the call to the API(below).

//returned data is a string and so needs to be 'JSON.parse(this.responseText)' in order to be manipulated.

//function setData(jsonData){data = jsonData;} 
//deprecated as the setTimout() allows us to tell it to wait until it is at state of ready 4 before logging
//function to allow the response to be parsed to JSON and passed out of the function itself into setData