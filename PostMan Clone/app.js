console.log('PostMan Clone');


// Utility functions :
// 1. to get DOM elements from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}


//Initialise number of parameters
let addedParamCount = 0;

// Hide th parameters box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// if the user clicks on param, hide the json box
let paramRadio = document.getElementById('paramRadio');

paramRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none'; // Json Box
    document.getElementById('parametersBox').style.display = 'block'; // Parameter Box
})


// if the user clicks on json, hide the param box
let jsonRadio = document.getElementById('jsonRadio');

jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block'; // Json Box
    document.getElementById('parametersBox').style.display = 'none'; // Parameter Box
})

// If the user Clicks on Plus Button add more parameters
let addparams = document.getElementById('addparams');

addparams.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="row g-3 my-1 col-auto">
                    <label for="url" class="col-sm-2 col-form-group">Parameter ${addedParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Parameter Key ${addedParamCount + 2}">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Parameter value ${addedParamCount + 2}">
                    </div>
                    <button class="btn btn-primary col-auto deleteParam"> - </button>       
                </div>
    `;

    //Convert the element string to Dom node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    // Add a event LIstener to minus button
    let deleteparam = document.getElementsByClassName('deleteParam');
    for (item of deleteparam) {
        item.addEventListener('click', (e) => {
            let flag = alert('Do you Want to delete');
            if (!flag) {
                e.target.parentElement.remove();
            }
        })
    }

    addedParamCount++;
})

// If the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show please wait in the responseBox to request patience from the user
    // document.getElementById('responseJsonText').value = 'Please wait...Fetching Response';
    document.getElementById('responsePrism').innerHTML = 'Please wait...Fetching Response';

    // Fetch all the user has entered
    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector("input[name = 'requestType']:checked").value;
    let contentType = document.querySelector("input[name = 'contentType']:checked").value;



    // If user has used params option instead of json collect all the parameters
    let data = {};
    if (contentType == 'params') {
        for (i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {

                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
            data = JSON.stringify(data);
        }
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }
    // Log all the values in console for debigging
    console.log('Url', url);
    console.log('requestType', requestType);
    console.log('contentType', contentType);
    console.log('data ', data);


    // if the requestType is get invoke the fetch api
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();

            })
    }
    else {
        fetch(url, {
            method: 'POST',
            body : data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();

            })
    }

})