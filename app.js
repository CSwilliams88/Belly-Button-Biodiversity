function init(){
    d3.json("samples.json").then((sampledata) => {
      var samplenames = sampledata.names
        //console.log(samplenames)
        var location = d3.select("#selDataset")
        samplenames.forEach(function(data){
            location.append("option").text(data).property("value", data)
        });
        buildtable(samplenames[0])
        buildcharts(samplenames[0])
    })
}
init()
​
function optionChanged(newID){
    buildtable(newID)
    buildcharts(newID)
​
}
//build the tables
function buildtable(sampleID){
    d3.json("samples.json").then((sampledata) =>{
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
function buildcharts(sampleID){
    d3.json("samples.json").then((sampledata) =>{
        var location = d3.select("#bar")
​
        var otu_ids = sampledata.samples[0].otu_ids
        var otu_labels = sampledata.samples[0].otu_labels
        var sample_values = sampledata.samples[0].sample_values
​
        //bar chart
        
        var trace1 = {
            x: sampledata.samples[0].sample_values.slice(0,10).reverse(),
            y: (sampledata.samples[0].otu_ids.slice(0, 10)).reverse().map(d => "OTU " + d),
            text: sampledata.samples[0].otu_labels.slice(0,10),
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
          var data = [trace1];
          
          var layout = {
            title: "Belly-Button Bar Chart"
          };
          Plotly.newPlot("bar", data, layout);
    })
         // Bubble chart
​
    d3.json("samples.json").then((sampledata) =>{
    var location = d3.select("#bubble")       
         var trace2 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text: sampledata.samples[0].otu_labels
​
        };
​
        // set the layout for the bubble plot
        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
​
        // creating data variable 
        var data1 = [trace2];
​
    // create the bubble plot
    Plotly.newPlot("bubble", data1, layout_2); 
    })
}
​
// //when the an option is select in the init, display the data for the selection
// function optionChanged(newID){
//     buildtable(newID)
//     buildcharts(newID)
// }