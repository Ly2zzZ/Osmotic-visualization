function ca_handle() {    
    console.log("into");     
	d3.select('#main_view').remove();
    d3.select("#details_inf").remove();    
    var x = d3.select("#loading").style("display", "block");    
	var url=document.getElementById("url").value;  
    console.log(url);    
    $.ajax({        
        url: "/geturl",
                type: "POST",
                data: JSON.stringify({            
            "url": url,
                     
        }),
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
						console.log("1")
						$.ajax({        
						        url: "/mulu",
						        type: "get",
						        dataType: "json",
						        success: function (d) {
									console.log("finished")
					                console.log(d.length);
					                console.log(d);
					 
									d3.select("#details_inf").remove();
					                var svg = d3.select("#details")
												.append("svg")
												.attr("id","details_inf")
												.attr("width","100%")
												.attr("height","220px");
					 
					                svg.selectAll("text")
					                    .data(d)
					                    .enter()
					                    .append("text")
					                    .attr("x", 10)
					                    .attr("y", function (d, i) {
					                    return 20 * (i + 1);
					                })
					                    .text(function (d) {
					                    return d.id;
					                });
					 
								  	 d3.csv('./file/Features.csv', function(fe) {
											initCircle(d,fe)
					                })
					                d3.select("#loading").style("display", "none")

					                 $.get("/getop",function(data){
										//drawpoint(data[0]["x"])
									  });
								},
								error:function(XMLHttpRequest, textStatus, errorThrown) {
									 alert("不好 快撤!");
									 		d3.select("#loading").style("display", "none")
								}
						    });
            }
    });
}
 function pory_handle() {
 			var url=document.getElementById("url").value;   
        console.log("into") 
    d3.select('#main_view').remove();
        d3.select("#details_inf").remove();    
        var x = d3.select("#loading").style("display", "block");    
        $.ajax({        
            url: "/getport",
                    type: "POST",
                    data: JSON.stringify({            
                "url": url     
            }),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {
                     	console.log("1")
						$.ajax({        
						        url: "/Portscan",
						        type: "get",
						        dataType: "json",
						        success: function (d) {
									console.log("finished")
					                console.log(d.length);
					                console.log(d);
					 
									d3.select("#details_inf").remove();
					                var svg = d3.select("#details")
												.append("svg")
												.attr("id","details_inf")
												.attr("width","100%")
												.attr("height","220px");
					 
					                svg.selectAll("text")
					                    .data(d)
					                    .enter()
					                    .append("text")
					                    .attr("x", 10)
					                    .attr("y", function (d, i) {
					                    return 20 * (i + 1);
					                })
					                    .text(function (d) {
					                    return d.openport;
					                });
					 
					                d3.select("#loading").style("display", "none")
										d3.select("#main_view").remove();
									createTreemap("main_view",860,500,d)
					                 $.get("/getop",function(data){
										//drawpoint(data[0]["x"])
									  });
								},
								error:function(XMLHttpRequest, textStatus, errorThrown) {
									 alert("不好 快撤!");
									 		d3.select("#loading").style("display", "none")
								}
						    });
                    
            }    
        });
    } function cms_handle(url) {    
        console.log("into")    
 d3.select('#main_view').remove();
        d3.select("#details_inf").remove();    
        var x = d3.select("#loading").style("display", "block");     
        $.ajax({        
            url: "/getcms",
                    type: "POST",
                    data: JSON.stringify({            
                "url": url        
            }),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {            
                d3.json("/CMSscan", function (error, operations) {                
                    console.log(operations.length);                
                    console.log(operations);
                    d3.select("#details_inf").remove();                
                    var svg = d3.select("#details")
                        .append("svg")
                        .attr("id", "details_inf")
                        .attr("width", "100%")
                        .attr("height", "220px");                 
                    svg.selectAll("text")                    .data(operations)                    .enter()                    
                        .append("text")                    .attr("x", 10)                    .attr("y", function (d, i) {                    
                        return 20 * (i + 1);                
                    })                    .text(function (d) {                    
                        return d;                
                    });                 
                    d3.select("#loading").style("display", "none")            
                });        
            }    
        });
    }  function sql_handle() {  
				var url=document.getElementById("url").value;    
        console.log("into")  
  d3.select('#main_view').remove();
        d3.select("#details_inf").remove();    
        var x = d3.select("#loading").style("display", "block");    
        $.ajax({        
            url: "/getsql",
                    type: "POST",
                    data: JSON.stringify({            
                "url": url        
            }),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {            
                console.log("asded");             
                d3.json("/sqlinto", function (error, operations) {                
                    console.log(operations.length);                
                    console.log(operations);
                    d3.select("#details_inf").remove();                
                    var svg = d3.select("#details")
                        .append("svg")
                        .attr("id", "details_inf")
                        .attr("width", "100%")
                        .attr("height", "220px");                 
                    svg.selectAll("text")                    .data(operations)                    .enter()                    
                        .append("text")                    .attr("x", 10)                    .attr("y", function (d, i) {                    
                        return 20 * (i + 1);                
                    })                    .text(function (d) {                    
                        return d;                
                    });                 
                    d3.select("#loading").style("display", "none")            
                });        
            }    
        });
    } 

 function mlpq_handle() {
				var url=document.getElementById("url").value;      
        console.log("into")
        console.log(url)     
d3.select('#main_view').remove();
        d3.select("#details_inf").remove();    
        var x = d3.select("#loading").style("display", "block");    
        $.ajax({        
            url: "/getDir",
                    type: "POST",
                    data: JSON.stringify({            
                "url": url        
            }),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {             
                   	$.ajax({        
						        url: "/MuluPaQu",
						        type: "get",
						        dataType: "json",
						        success: function (operations) {
									      console.log(operations);
                    d3.select("#main_view").remove()
                    d3.select("#main").append("div").attr("id", "main_view");
                    sub("main_view", 960, 400, operations)
                    d3.select("#details_inf").remove();                
                    var svg = d3.select("#details")
                        .append("svg")
                        .attr("id", "details_inf")
                        .attr("width", "100%")
                        .attr("height", "220px");                 
                    svg.selectAll("text")                    .data(operations)                    .enter()                    
                        .append("text")                    .attr("x", 10)                    .attr("y", function (d, i) {                    
                        return 20 * (i + 1);                
                    })                    .text(function (d) {                    
                        return d;                
                    });                 
                    d3.select("#loading").style("display", "none")
 
                    $.get("/getop", function (data) {
                        //drawpoint(data[0]["x"])
                    }); 
								},
								error:function(XMLHttpRequest, textStatus, errorThrown) {
									 alert("不好 快撤!");
					d3.select("#loading").style("display", "none")
								}
						    });
            }    
        });
    }