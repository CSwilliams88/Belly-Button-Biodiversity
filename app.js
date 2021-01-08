function dropdown(){
    d3.json("samples.json").then((sampledata) => {
      var samplenames = sampledata.names
        //console.log(samplenames)
        var location = d3.select("#selDataset")
        samplenames.forEach(function(data){
            location.append("option").text(data).property("value")
            })
            buildtable(samplenames[0])
            buildcharts(samplenames[0]))
        })
}
dropdown()
​
//build the tables
function buildtable(sampleID){
    d3.json("samples.json").then((sampledata) =>{
        var metatable = sampledata.metadata
        //console.log(metatable)
        var location = d3.select("#sample-metadata")
        var filterdata = metatable.filter(x => x.id == sampleID) 
        console.log(filterdata[0])
        Object.entries(filterdata[0]).forEach(function([key, value]){
            console.log(key,value)
            var row = location.append("tr")
            row.append("td").html(`${key}`)
            row.append("td").html(`${value}`)
        })
    })
}
//build charts
function buildcharts(sampleID){
    d3.json("samples.json").then((sampledata) => {
        var location = d3.select("#bar")
        var otu_ids = sampledata.otu_ids
        var otu_labels = sampledata.otu_labels
        var sample_values = sampledata.sample_values
        //bar chart
        var trace1 = {
            x: sampledata.samples[0].otu_ids.slice
            y: sampledata.samples[0].sample_values,
            type: "bar"
         
          };
          
          var data = [trace1];
          
          var layout = {
            title: "'Bar' Chart"
          };
          
          Plotly.newPlot("plot", data, layout);
        
        
    
    })
​
}
​
//when the an option is select in the dropdown, display the data for the selection
function optionChanged(newID){
    buildtable(newID)
    buildcharts(newID)
}
