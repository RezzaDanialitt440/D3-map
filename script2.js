
  
setInterval(Map,2000);




function Map() {
  

  //our JavaScript section starts and the first thing that happens is that we set the size of the area that we’re going to use for the chart and the margins;
  var margin = { top: 60, left: 60, bottom: 60, right: 60 } 
  var height = 480, width = 1200;
  
  var y = d3.scale.linear().range([0, height]);
  var x = d3.scale.linear().range([0, width]);
  
  //The declarations for our two axes are relatively simple
  //show data (nums) under the x-axis line
  // var xAxis = d3.svg.axis().scale(x).orient("bottom")
  //     .ticks(d3.time.seconds, 30)
      // .tickFormat(ft);
  //show data (nums) left of the y-axis line
  var yAxis = d3.svg.axis().scale(y).orient("left");
  var xAxis = d3.svg.axis().scale(x).orient("bottom");
  

/* 
* The next block of code selects the id scatterplot-stats on the web page 
* and appends an svg object to it of the size 
* that we have set up with our width, height and margin’s.
*/
  var svg = d3.select("#scatterplotStats").append("svg")
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right)
      .attr('viewBox','0 0' + height +' ' + width );
  
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
  var tooltip = d3.select("#scatterplotStats").append("div")
      .attr("class", "tooltip");
  
  
  /* 
  * this function is like mouse over. 
  * If we place the mouse over a circle the tooltip is going to show up.
  */
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
            "X-axis: " + d.x + "<br/>" +
            "Y-axis: " + d.y + "<br/>");
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

  function checkType(arg) {
    return arg !== "Reader" ? "blue" : "red";
  }

  queue()
    .defer(d3.json,'json2.json')
    .defer(d3.json,'json1.json')
    .await(function(error, reader, tag){
      if(error) {
            throw new Error("Node JSON error");
          }
      console.log(tag)
      console.log(reader)

      var Xdekat = 0 ;
      var Xjauh =  20;
      var Ydekat = 10;
      var Yjauh = 0;
     
      x.domain([Xdekat, Xjauh]);
      y.domain([Ydekat, Yjauh]);

      var node = svg.selectAll(".node")
          .data(tag)
        .enter().append("g")
          .attr("class", "node")
          .attr("x", (d) => { return x(d.x); })
          .attr("y", (d) => { return y(d.y); });
      
      node.append("circle")
          .attr("cx", (d) => { return x(d.x); })
          .attr("cy", (d) => { return y(d.y); })
          .attr("r", 5)
          .attr("fill","blue")

      var node2 = svg.selectAll(".node2")
          .data(tag)
        .enter().append("g")
          .attr("class", "reader")
          .attr("x", (d) => { return x(d.x); })
          .attr("y", (d) => { return y(d.y); });
      
      node2.append("circle")
          .attr("cx", (d) => { return x(d.x); })
          .attr("cy", (d) => { return y(d.y); })
          .attr("r", 5)
          .attr("fill","green")

    })
  
  


    setTimeout(function(){
      $("#scatterplotStats").remove();
      console.log("div clear");
    },1000)
    
    setTimeout(function(){
      var newElement = document.createElement('div');
      newElement.id = "scatterplotStats";
      
      var list = document.getElementById('bg');
      list.appendChild(newElement);
      console.log(newElement);
      },1100)
    

    }



