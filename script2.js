
  


Map2();


function Map2() {
  

  //our JavaScript section starts and the first thing that happens is that we set the size of the area that we’re going to use for the chart and the margins;
  var margin = { top: 60, left: 60, bottom: 60, right: 60 } 
  var height = 480, width = 900;
  
  var y = d3.scale.linear().range([0, height]);
  var x = d3.scale.linear().range([0, width]);
  
  var yAxis = d3.svg.axis().scale(y).orient("left");
  var xAxis = d3.svg.axis().scale(x).orient("bottom");
  
  var svg = d3.select("#reader").append("svg")
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right);
  
  svg.append("rect")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("x", 0)
        .attr("y", 0)
        .attr("fill", "blue")
        .attr("fill-opacity", 0);
  // It also adds a g element that provides a reference point for adding our axes.  
  svg = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  //declair the tooltip
  var tooltip = d3.select("#reader").append("div")
      .attr("class", "tooltip");

  var reader = d3.select("#reader").append("div")
      .attr("class", "reader");
  
  function showToolTip(d, i) {
    tooltip.style({
      "height": "125px",
      "width": "200px",
      "opacity": 0.9
    });
    var circle = d3.event.target; 
    var tippadding = 5, tipsize = { 
      dx: parseInt(tooltip.style("width")), 
      dy: parseInt(tooltip.style("height")) 
    };
  
    tooltip.style({
        "top": (d3.event.pageY - tipsize.dy - 5) + "px",
        "left": (d3.event.pageX - tipsize.dx - 5) + "px"
      }).html("<span><b>" + d.tag_id + ": " + "<br/>" + 
            "X-axis: " + d.x + "<br/>")
  //           "Y-axis: " + d.y + "<br/>");
  }
  
  /* 
  * This function is like mouse out. 
  * If we mouse out then the tooltip is hidding
  */
  function hideToolTip(d, i) {
    tooltip.style({
      "height": 0,
      "width": 0,
      "opacity": 0
    }).html("");
  }
  
 
  var url2 = "https://www.nodus-ecosystem.com:3250/reader_info";
  // READER JSON

  d3.json(url2, (error, data2) => {
    if(error) {
      throw new Error("d3.json error");
    }
    else {
     
      var node2 = svg.selectAll(".node2")
          .data(data2)
        .enter().append("g")
          .attr("class", "node2")
          .attr("x", (d) => { return x(d.x); })
          .attr("y", (d) => { return y(d.y); });
      
      node2.append("circle")
          .attr("cx", (d) => { return x(d.x); })
          .attr("cy", (d) => { return y(d.y); })
          .attr("r", 7)
          .attr("fill","green")


          //call the functions
          .on("mouseover", showToolTip)
          .on("mouseout", hideToolTip)
          
    }
   
  });
}
