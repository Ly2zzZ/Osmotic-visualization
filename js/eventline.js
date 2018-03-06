
// Set the dimensions and margins of the diagram
var margin = {top: 20, right: 90, bottom: 30, left: 120},
    width = 1685 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var mainsvg = d3.select("#eventline").append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

var i = 0,
    duration = 400,
    root;

var treemap = d3.tree().size([height, width]);
// declares a tree layout and assigns the size
    var treeData =
      {
        "name": "xyh.swust.edu.cn",
        "children": []
      };

function Refresh(number){
  var record=[];
  for (var i=1;i<=number;i++)
  {
    var file_str="../file/history/op"+String(i-1)+".txt";
    record.push(file_str);
    d3.json(file_str, function (error, d) {
      //console.log(d)
          if (d[0].ways=="mulu"){
            treeData["children"][treeData["children"].length]={"name":"Dir_scan"};
        }
        else if (d[0].ways=="MuluPaQu"){
          treeData["children"][treeData["children"].length]={"name":"MuluPaQu"};

           var svg=d3.select("#MuluPaQug");
            //  Opsub("MuluPaQug",90,90,d[0]["content"])

        }
          else if (d[0].ways=="Portscan"){
          treeData["children"][treeData["children"].length]={"name":"Port_scan"};
        }

    });
}
    setTimeout(function(){
   //   console.log(record)
     //  console.log(treeData)
            root = d3.hierarchy(treeData, function(d) { return d.children; });
            root.x0 = height / 2;
            root.y0 = 0;
            update(root);

            for (var i=0;i<record.length;i++)
            {
                    d3.json(record[i], function (error, d) {
                  console.log(d)
                if (d[0].ways=="mulu"){
                   d3.csv('../file/Features.csv', function(fe) {
              var svg=d3.select("#Dir_scang")
              .attr("transform","translate("+ 70+","+(-20)+")");
              //svg.selectAll('g').remove()
              svg.attr('cursor', 'pointer')
                .on("mousedown",function() {
                           initCircle(d[0].content,fe)
                       d3.select("#details_inf").remove();
                       var svg = d3.select("#details")
                      .append("svg")
                      .attr("id","details_inf")
                      .attr("width","100%")
                      .attr("height","220px");

                      svg.selectAll("text")
                            .data(d[0].content)
                            .enter()
                            .append("text")
                            .attr("x", 10)
                            .attr("y", function (d, i) {
                            return 20 * (i + 1);
                        })
                            .text(function (d) {
                            return d.id;
                        });
                        });
                OpinitCircle(d[0].content,fe,svg)
             })
              }
              else if (d[0].ways=="MuluPaQu"){
                 var svg=d3.select("#MuluPaQug")
                 .attr("transform","translate("+ (100)+","+0+")")
                 .attr('cursor', 'pointer')
                 .on("mousedown",function() {
                        d3.select("#main_view").remove()
                        d3.select("#main").append("div").attr("id","main_view");
                        sub("main_view",960 ,400,d[0]["content"])
                       d3.select("#details_inf").remove();

                       var svg = d3.select("#details")
                      .append("svg")
                      .attr("id","details_inf")
                      .attr("width","100%")
                      .attr("height","100%");

                        svg.selectAll("text")
                            .data(d[0]["content"])
                            .enter()
                            .append("text")
                            .attr("x", 10)
                            .attr("y", function (d, i) {
                            return 20 * (i + 1);
                        })
                            .text(function (d) {
                        // console.log(d.id)
                            return d.id;
                        });
                    });

                  Opsub("MuluPaQug",40,40,d[0]["content"])
              }
                else if (d[0].ways=="Portscan"){
                  RcreateTreemap("Port_scang",40,40,d[0]["content"])

                  var svg=d3.select('#Port_scang')
                  .attr("transform","translate("+80+","+(-20)+")")
                  .attr('cursor', 'pointer')
                   .on("mousedown",function(event) {
                        d3.select("#main_view").remove();
                    createTreemap("main_view",860,500,d[0]["content"])
                       d3.select("#details_inf").remove();

                       var svg = d3.select("#details")
                      .append("svg")
                      .attr("id","details_inf")
                      .attr("width","100%")
                      .attr("height","100%");

                        svg.selectAll("text")
                            .data(d[0]["content"])
                            .enter()
                            .append("text")
                            .attr("x", 10)
                            .attr("y", function (d, i) {
                            return 20 * (i + 1);
                        })
                            .text(function (d) {
                        // console.log(d.id)
                            return d.openport;
                        });
                    });
              }

    });
        }
    }, 500);
}

// Collapse the node and all it's children
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}


function update(source) {
console.log("asd")
  // Assigns the x and y position for the node
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 180;d.x=d.x*1;});

  // ****************** node section ***************************

  // Update the node...
  var node = mainsvg.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'nodes')
      .attr('id',function(d){
        return d.data["name"];
      })
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    });
      


  // Add Circle for the node
  nodeEnter.append('g')
      .attr('class', 'nodes')
      .attr('id',function(d){
        return d.data['name']+'g';
      })




  // Add labels for the node
  nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", function(d) {
          return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
      })
      .text(function(d) { return d.data.name; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
/*  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", function(d) {
        return d._children ? "lightsteelblue" : "#fff";
    })
    .attr('cursor', 'pointer');*/


  // Remove any exiting node
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
/*  nodeExit.select('circle')
    .attr('r', 1e-6);*/

  // On exit reduce the opacity of text labels
/*  nodeExit.select('text')
    .style('fill-opacity', 1e-6);
*/
  // ****************** links section ***************************

  // Update the links...
  var link = mainsvg.selectAll('path.link')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });






  // Creates a curved (diagonal) path from parent to the child node
  function diagonal(s, d) {

    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }
}