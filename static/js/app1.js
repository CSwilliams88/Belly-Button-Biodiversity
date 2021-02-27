function init() {
    d3.json("samples.json").then((sampledata) => {
        var samplenames = sampledata.names
        console.log(samplenames)
        var location = d3.select("#selDataset")
        samplenames.forEach(function (data) {
            location.append("option").text(data).property("value", data)
        });
        buildtable(samplenames[0])
        buildcharts(samplenames[0])
    })
}
function buildtable(sampleID) {
    d3.json("samples.json").then((sampledata) => {
        var metatable = sampledata.metadata
        //console.log(metatable)
        var location = d3.select("#sample-metadata")
        location.html("")
        var filterdata = metatable.filter(x => x.id == sampleID)[0]
        //console.log(filterdata[0])
        Object.entries(filterdata).forEach(([key, value]) => {
            //console.log(key,value)
            var row = location.append("tr")
            row.append("td").html(`${key}`)
            row.append("td").html(`${value}`)
        })
    })
}
//build charts
function buildcharts(sampleID) {
    d3.json("samples.json").then((sampledata) => {
        var chartdata = sampledata.samples
        var filterdata = chartdata.filter(x => x.id == sampleID)[0]
        //bar chart        
        var trace1 = {
            x: filterdata.sample_values.slice(0, 10).reverse(),
            y: (filterdata.otu_ids.slice(0, 10)).reverse().map(d => "OTU " + d),
            text: filterdata.otu_labels.slice(0, 10),
            marker: {
                color: 'blue'
            },
            type: "bar",
            orientation: "h",
        };
        var data = [trace1];

        var layout = {
            title: "Belly-Button Bar Chart"
        };
        Plotly.newPlot("bar", data, layout);
        // bubble chart
        var trace2 = {
            x: filterdata.otu_ids,
            y: filterdata.sample_values,
            mode: "markers",
            marker: {
                size: filterdata.sample_values,
                color: filterdata.otu_ids
            },
            text: filterdata.otu_labels

        };

        // set the layout for the bubble plot
        var layout_2 = {
            xaxis: { title: "OTU ID" },
            height: 600,
            width: 1000
        };

        // creating data variable 
        var data1 = [trace2];

        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout_2);
    })
}

function optionChanged(newID) {
    buildtable(newID)
    buildcharts(newID)
}
init()