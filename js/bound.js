function initCircle(d,fe){
            var data = new Array();
            var datas = new Array()
            var datass = new Array()

           // console.log("muludraw")

            var l =0;
          for (var i = 0;i<d.length;i++) {
            data[i] = d[i].id.split(".")//分割url
          }
            
         // console.log(data)
            
            
           var k =1
          datas[0] ={
            name:data[0][data[0].length-1],
            count:1
            }
           var ifdeng =0;
      for (var i = 1;i<data.length;i++) {
        
        if(data[i][data[i].length-1]!=data[i-1][data[i-1].length-1]){//统计所有不同的后缀以及对应的数量
          for (var s = 0;s<datas.length;s++) {
            if(data[i][data[i].length-1]===datas[s].name&&data[i][data[i].length-1]!=""){
              ifdeng =1;
              datas[s].count=datas[s].count+1;
              
            }
          }
          if(ifdeng ==0&&data[i][data[i].length-1].length<=5&&data[i][data[i].length-1]!=""){//<=5 排除掉一些错误的分割
            datas[k++] ={name:data[i][data[i].length-1],count:1}
            //console.log(data[i][data[i].length-1])
          }
          else{ifdeng =0}
        }else {
          if(i ==1){datas[0].count=datas[0].count+1;}
            else {datas[k-1].count=datas[k-1].count+1;}
        }
      }
     // console.log(datas)
          var l =0;
            for (var i = 0;i<datas.length;i++) {//匹配特征标准 设定level
            for (var j = 0;j<fe.length;j++) {
              
              if(datas[i].name==fe[j].low)
              {   
                datass[i]={
                  name:datas[i].name,
                  count:datas[i].count,
                  level:1
                };
                break;
                
              }
              else if(datas[i].name==fe[j].middle)
              {
                
                datass[i]={
                  name:datas[i].name,
                  count:datas[i].count,
                  level:2
                };
                break;
              }
              else if(datas[i].name==fe[j].high)
              {   
                datass[i]={
                  name:datas[i].name,
                  count:datas[i].count,
                  level:3
                };
                break;
                
                
              }else {
                datass[i]={
                  name:datas[i].name,
                  count:datas[i].count,
                  level:0
                };
                
                
                
              }
            }
          }






  //console.log(datass);
       d3.select("#main_view").remove();//清空作图区域
var svg = d3.select("#main")
              .append("svg")
              .attr("id","main_view")
              .style("width","960")
              .style("height","500");
               width = 960,
               height = 500;
       var format = d3.format(",d");

 var color = d3.scaleOrdinal(d3.schemeCategory20c);
       var color = ["#FF0033","#336699","#CCFF00","#33FF66","#669966","#66CCFF","#99CCFF","#CCCCCC"];//自定义颜色
       var pack = d3.pack()
               .size([width, height])
               .padding(1.5);
       var num,pid;
       
        var root = d3.hierarchy({children: datass})
                .sum(function(d) {return d.count; })
                .each(function(d) {
                  
                    if(d.parent == null) {num = d.value;};
                   if (id = d.data.name) {
                   
                       var id
                       d.id = id;
                       d.class = id;
                       pid = d.data.level;
                      if(pid===4){
                        d.colorPick=5;
                      }if(pid===3){
                        d.colorPick=4;
                      }if(pid===2){
                        d.colorPick=3;
                      }if(pid===1){
                        d.colorPick=2;
                      }if(pid===0){
                        d.colorPick=1;
                      }
                   }
               });
              // console.log(root)
           var node = svg.selectAll(".node")
                   .data(pack(root).leaves())
                   .enter().append("g")
                   .attr("class", "node")
                   .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

           node.append("circle")
                   .attr("id", function(d) { return d.id; })
                   .attr("r", function(d) { return d.r; })
                   .style("fill", function(d) { return color[d.colorPick]; });

           node.append("clipPath")
                   .attr("id", function(d) { return "clip-" + d.id; })
                   .append("use")
                   .attr("xlink:href", function(d) { return "#" + d.id; });

           node.append("text")
                   .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
                   .selectAll("tspan")
                   .data(function(d) {
                       var arr = new Array();
                       arr.push(d.class);
                       arr.push(d.data.count);
                       return arr;//圆内显示内容
                   })
                   .enter().append("tspan")
                   .attr("x", 0)
                   .attr("y", function(d, i, nodes) { return 25 + (i - nodes.length / 2 - 0.5) * 20; })
                   .text(function(d) { return d; });

             node.append("title")
                   .text(function(d) { return d.id + "\n" + format(d.value); });
            node.on("click",function(d){
                printUrl(d.id);//自定义点击事件
            })
   }


function OpinitCircle(d,fe,svg){
  
            var data = new Array();
            var datas = new Array()
            var datass = new Array()

           // console.log("muludraw")

            var l =0;
          for (var i = 0;i<d.length;i++) {
            data[i] = d[i].id.split(".")//分割url
          }
            
         // console.log(data)
            
            
           var k =1
          datas[0] ={
            name:data[0][data[0].length-1],
            count:1
            }
           var ifdeng =0;
      for (var i = 1;i<data.length;i++) {
        
        if(data[i][data[i].length-1]!=data[i-1][data[i-1].length-1]){//统计所有不同的后缀以及对应的数量
          for (var s = 0;s<datas.length;s++) {
            if(data[i][data[i].length-1]===datas[s].name&&data[i][data[i].length-1]!=""){
              ifdeng =1;
              datas[s].count=datas[s].count+1;
              
            }
          }
          if(ifdeng ==0&&data[i][data[i].length-1].length<=5&&data[i][data[i].length-1]!=""){//<=5 排除掉一些错误的分割
            datas[k++] ={name:data[i][data[i].length-1],count:1}
            //console.log(data[i][data[i].length-1])
          }
          else{ifdeng =0}
        }else {
          if(i ==1){datas[0].count=datas[0].count+1;}
            else {datas[k-1].count=datas[k-1].count+1;}
        }
      }
     // console.log(datas)
          var l =0;
            for (var i = 0;i<datas.length;i++) {//匹配特征标准 设定level
            for (var j = 0;j<fe.length;j++) {
              
              if(datas[i].name==fe[j].low)
              {   
                datass[i]={
                  name:datas[i].name,
                  count:datas[i].count,
                  level:1
                };
                break;
                
              }
              else if(datas[i].name==fe[j].middle)
              {
                
                datass[i]={
                  name:datas[i].name,
                  count:datas[i].count,
                  level:2
                };
                break;
              }
              else if(datas[i].name==fe[j].high)
              {   
                datass[i]={
                  name:datas[i].name,
                  count:datas[i].count,
                  level:3
                };
                break;
                
                
              }else {
                datass[i]={
                  name:datas[i].name,
                  count:datas[i].count,
                  level:0
                };
                
                
                
              }
            }
          }






  //console.log(datass);
//var svg = d3.select("#"+svgname);
               width = 40,
               height = 40;
       var format = d3.format(",d");

 var color = d3.scaleOrdinal(d3.schemeCategory20c);
       var color = ["#FF0033","#336699","#CCFF00","#33FF66","#669966","#66CCFF","#99CCFF","#CCCCCC"];//自定义颜色
       var pack = d3.pack()
               .size([width, height])
               .padding(1.5);
       var num,pid;
       
        var root = d3.hierarchy({children: datass})
                .sum(function(d) {return d.count; })
                .each(function(d) {
                  
                    if(d.parent == null) {num = d.value;};
                   if (id = d.data.name) {
                   
                       var id
                       d.id = id;
                       d.class = id;
                       pid = d.data.level;
                      if(pid===4){
                        d.colorPick=5;
                      }if(pid===3){
                        d.colorPick=4;
                      }if(pid===2){
                        d.colorPick=3;
                      }if(pid===1){
                        d.colorPick=2;
                      }if(pid===0){
                        d.colorPick=1;
                      }
                   }
               });
              // console.log(root)
           var node = svg.selectAll(".node")
                   .data(pack(root).leaves())
                   .enter().append("g")
                   .attr("class", "node")
                   .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

           node.append("circle")
                   .attr("id", function(d) { return d.id; })
                   .attr("r", function(d) { return d.r; })
                   .style("fill", function(d) { return color[d.colorPick]; });

           node.append("clipPath")
                   .attr("id", function(d) { return "clip-" + d.id; })
                   .append("use")
                   .attr("xlink:href", function(d) { return "#" + d.id; });

   }




  function printUrl(id){
    
    for(var i = 0;i<datass.length;i++){
      var str =""
      if(id ===datass[i][datass[i].length-1]){
        for(var j = 0;j<datass[i].length;j++){
          if(j==datass[i].length-1){
            str=str+datass[i][j];
          }
          else{
            str=str+datass[i][j]+".";
          }
        }
       // console.log(str)
      }
    }
  }