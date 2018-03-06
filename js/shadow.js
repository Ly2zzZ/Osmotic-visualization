function createTreemap(divname,width,height,res){
 d3.csv("./file/portlist.txt", function(error, data) {

 // console.log(res)
  var data0 = new Array();
  var datares = new Array();
    for(var i = 0;i<res.length;i++){
      datares[i]=res[i]
    }
    console.log(datares)
  for(var i = 0;i<data.length;i++){
    data0[i]=data[i].portlist.split("|")
  }

  var k = 0;
  var l = 0;
  var data1 = new Array();
      data1[0]= new Array()
  var data2 = new Array() 
  var c = 6;
  
  for (var i = 0;i<data0.length;i++) {
    
      if(k===100){
        data2[l]={"name": "分组", "children": data1[l]}
        k =0;
        l = l+1;
        c=c-1;
        data1[l] = new Array();
      }else{
      for (var j = 0;j<datares.length;j++) {
          if(data0[i][0]==datares[j]){
            
            data1[l][k]={"name":data0[i][0],"value":c,"inf":data0[i][1],"ifopen":true};
            break;
          }else{
            data1[l][k]={"name":data0[i][0],"value":c,"inf":data0[i][1],"ifopen":false};
          }
        }
      
      k++;
      }
     
  }
  var roots = {"name": "端口扫描\n", "children": data2};

  var svg = d3.select("#main")
              .append("svg")
              .attr("id","main_view")
              .style("width",width)
              .style("height",height);

  console.log(divname)

var defs = svg.append("defs");


var filter = defs.append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "130%");


filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 5)
    .attr("result", "blur");


filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 5)
    .attr("dy", 5)
    .attr("result", "offsetBlur");
 var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");

    color = ["#ff6666","#ff9966","#ffcc66","#ff9999","#ffcc99","#ffff66","#ffff99"]

var treemap = d3.treemap()
    .tile(d3.treemapResquarify)
    .size([width, height])
    .round(true)
    .paddingOuter(1)
    .paddingInner(0);
  
  
  
  
var root = d3.hierarchy(roots)
      .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + ":" : "") + d.data.name; })
      .sum(sumBySize)
      .sort(function(b,a ) { return b.height - a.height || b.value - a.value; });

  treemap(root);
        

  var cell = svg.selectAll("g")
    .data(root.leaves())
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

 var rects = cell.append("rect")
      .attr("id", function(d) { return d.data.id; })
      .attr("width", function(d) { return d.x1 - d.x0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
     .attr("fill", function(d,i) {   
      if(d.data.ifopen == true){ return "#FF3030"} else{return color[d.data.value];} 
     })
      .style("opacity", function(d,i) { return (Math.sqrt(d.data.value))*0.35 })
     .on("mouseover",function(d,i){
        d3.selectAll("rect")
        .transition()
        .duration(500)
        .style("opacity", 0.4);
        d3.selectAll("text")
        .transition()
        .duration(500)
        .style("opacity", 0.5);
        d3.select(this)
        .transition()
        .duration(200)
        .attr("stroke-width", 2)
        .style("filter", "url(#drop-shadow)")
         .style("opacity", 1);
         
        
      })
      .on("mouseleave",function(d,i){
        
        d3.selectAll("rect")
        .transition()
        .duration(600)
        .attr("stroke-width", 0)
        .style("filter", "")
        .style("opacity", function(d,i) { return (Math.sqrt(d.data.value))*0.35 });
          d3.selectAll("text")
          .transition()
        .duration(200)
        .style("opacity", 1);
          
      });
      cell.append("text")
       
        .attr("class","nodeName")
        .attr("x",function(d){ return d.x; })
        .attr("y",function(d){ return d.y; })
        .attr("dx","0.5em")
        .attr("dy","1.5em")
        .text(function(d){ 
          
          if(d.value>=4)
        {return d.data.name; }  
        }) ;


  cell.append("title")
      .text(function(d) {  return  "端口号: " + d.data.name+"\n"+d.data.inf; });

        });
}


  


 

function sumBySize(d) {
  return d.value;
}


function RcreateTreemap(divname,width,height,res){
 d3.csv("./file/portlist.txt", function(error, data) {

 // console.log(res)
  var data0 = new Array();
  var datares = new Array();
    for(var i = 0;i<res.length;i++){
      datares[i]=res[i]
    }
    console.log(datares)
  for(var i = 0;i<data.length;i++){
    data0[i]=data[i].portlist.split("|")
  }

  var k = 0;
  var l = 0;
  var data1 = new Array();
      data1[0]= new Array()
  var data2 = new Array() 
  var c = 6;
  
  for (var i = 0;i<data0.length;i++) {
    
      if(k===100){
        data2[l]={"name": "分组", "children": data1[l]}
        k =0;
        l = l+1;
        c=c-1;
        data1[l] = new Array();
      }else{
      for (var j = 0;j<datares.length;j++) {
          if(data0[i][0]==datares[j]){
            
            data1[l][k]={"name":data0[i][0],"value":c,"inf":data0[i][1],"ifopen":true};
            break;
          }else{
            data1[l][k]={"name":data0[i][0],"value":c,"inf":data0[i][1],"ifopen":false};
          }
        }
      
      k++;
      }
     
  }
  var roots = {"name": "端口扫描\n", "children": data2};

  var svg = d3.select("#"+divname)

  console.log(divname)

var defs = svg.append("defs");


var filter = defs.append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "130%");


filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 5)
    .attr("result", "blur");


filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 5)
    .attr("dy", 5)
    .attr("result", "offsetBlur");
 var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");

    color = ["#ff6666","#ff9966","#ffcc66","#ff9999","#ffcc99","#ffff66","#ffff99"]

var treemap = d3.treemap()
    .tile(d3.treemapResquarify)
    .size([width, height])
    .round(true)
    .paddingOuter(1)
    .paddingInner(0);
  
  
  
  
var root = d3.hierarchy(roots)
      .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + ":" : "") + d.data.name; })
      .sum(sumBySize)
      .sort(function(b,a ) { return b.height - a.height || b.value - a.value; });

  treemap(root);
        

  var cell = svg.selectAll("g")
    .data(root.leaves())
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

 var rects = cell.append("rect")
      .attr("id", function(d) { return d.data.id; })
      .attr("width", function(d) { return d.x1 - d.x0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
     .attr("fill", function(d,i) {   
      if(d.data.ifopen == true){ return "#FF3030"} else{return color[d.data.value];} 
     })
      .style("opacity", function(d,i) { return (Math.sqrt(d.data.value))*0.35 });



        });
}
