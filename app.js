function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
            }
        }
    });
}

function arcTweenOld(transition, percent, oldValue) {
    transition.attrTween("d", function (d) {

        var newAngle=(percent/100)*(2*Math.PI);

        var interpolate = d3.interpolate(d.endAngle, newAngle);

        var interpolateCount = d3.interpolate(oldValue, percent);


        return function (t) {
            d.endAngle = interpolate(t);
            var pathForegroundCircle = arcLine(d);

            middleTextCount.text(Math.floor(interpolateCount(t))+'%');

            var pathDummyCircle = arcDummy(d);

            console.log(pathDummyCircle);

            var coordinate = pathDummyCircle.split("L")[1].split("A")[0];

            console.log(coordinate);

            endCircle.attr('transform', 'translate(' + coordinate+ ')');

            return pathForegroundCircle;
        };
    });
};  




var foodPrices = [];
for (const foodItem of ['rice','apple','egg','lettuce','corn']) {
    for (const c of ['Developed','Under-Developed','Developing']){
        for (let year = 2011; year<=2020; year++){
            foodPrices.push({foodName: foodItem, country: c, year: year, cost: Math.round(Math.random()*24 + 1)})
        }
    }
}

const maxWidth = 800;
const maxHeight = 700;
const lineLength = 300;
const incline = 0.5235987756;

// linear scale for chad
const ylineScale1 = d3.scaleLinear()
                    .domain([1,25])
                    .range([maxHeight/2, maxHeight/2-lineLength]);

let svg = d3.select('div#container1')
            .append('svg')
            .attr('width', maxWidth)
            .attr('height', maxHeight)
            .style('background-color', 'white'); //#fde0dd

svg.append('g')
    .attr('transform', function(d,i){
        return 'translate(0,0)';
    })
    .attr('id','povertyCircle');

/// LINE 1 ///
let line1 = svg.append('g')
                .attr('transform', function(d,i){
                    return 'translate(0,0)';
                });
line1.append('line')
    .style('stroke','#e7e1ef')
    .style('stroke-width',3)
    .attr('id','line1')
    .attr('x1',maxWidth/2)
    .attr('y1',maxHeight/2)
    .attr('x2',maxWidth/2)
    .attr('y2',maxHeight/2-lineLength);
line1.append('text')
    .attr('x',maxWidth/2-40)
    .attr('y',maxHeight/2-lineLength-10)
    .attr('stroke','black')
    .attr('font-family','sans-serif')
    .attr('font-size','18px')
    .classed('countryName',true)
    .text('Developed');

var default_selected_foods = Array.from(document.querySelectorAll("input[type='checkbox'][name='food']:checked"))
                                        .map(obj => obj.value);

// Plotting CHAD food points //
line1.selectAll('.country1')
    .data(foodPrices.filter(obj => 
            obj.country == 'Developed' &&
            obj.year == parseInt(document.querySelector("input[type='radio'][name='year']:checked").value) &&
            default_selected_foods.includes(obj.foodName)))
    .enter()
    .append('circle')
    .classed('country1',true)
    .attr('cx',maxWidth/2)
    .attr('cy',data => ylineScale1(data.cost))
    .attr('r', 5)
    .style('fill', function(data){
            if (data.foodName == 'rice'){
                return '#003f5c';
            }
            else if (data.foodName == 'apple'){
                return '#58508d';
            }
            else if (data.foodName == 'egg'){
                return '#bc5090';
            }
            else if (data.foodName == 'lettuce'){
                return '#ff6361';
            }
            else{
                return '#ffa600';
            }
    });

// linear scales for Developing
const xlineScale2 = d3.scaleLinear()
                        .domain([1,25])
                        .range([maxWidth/2, maxWidth/2-(lineLength*Math.cos(incline))]);
const ylineScale2 = d3.scaleLinear()
                        .domain([1,25])
                        .range([maxHeight/2, maxHeight/2+(Math.sqrt(Math.pow(lineLength,2)-Math.pow(lineLength*Math.cos(incline),2)))]);
      
/// LINE 2 ///
let line2 = svg.append('g')
                .attr('transform', function(d,i){
                    return 'translate(0,0)';
                });
line2.append('line')
    .style('stroke','#e7e1ef')
    .style('stroke-width',3)
    .attr('id','line2')
    .attr('x1',maxWidth/2)
    .attr('y1',maxHeight/2)
    .attr('x2',maxWidth/2-(lineLength*Math.cos(incline)))
    .attr('y2',maxHeight/2+(Math.sqrt(Math.pow(lineLength,2)-Math.pow(lineLength*Math.cos(incline),2))));
line2.append('text')
    .attr('x',maxWidth/2-(lineLength*Math.cos(incline))-40)
    .attr('y',maxHeight/2+(Math.sqrt(Math.pow(lineLength,2)-Math.pow(lineLength*Math.cos(incline),2)))+30)
    .attr('stroke','black')
    .attr('font-family','sans-serif')
    .attr('font-size','18px')
    .classed('countryName',true)
    .text('Developing');

// Plotting Developing food points //
line2.selectAll('.country2')
    .data(foodPrices.filter(obj => 
            obj.country == 'Developing' &&
            obj.year == parseInt(document.querySelector("input[type='radio'][name='year']:checked").value) &&
            default_selected_foods.includes(obj.foodName)))
    .enter()
    .append('circle')
    .classed('country2',true)
    .attr('cx',data => xlineScale2(data.cost))
    .attr('cy',data => ylineScale2(data.cost))
    .attr('r', 5)
    .style('fill', function(data){
            if (data.foodName == 'rice'){
                return '#003f5c';
            }
            else if (data.foodName == 'apple'){
                return '#58508d';
            }
            else if (data.foodName == 'egg'){
                return '#bc5090';
            }
            else if (data.foodName == 'lettuce'){
                return '#ff6361';
            }
            else{
                return '#ffa600';
            }
    });

// linear scales for Under-Developed
const xlineScale3 = d3.scaleLinear()
                        .domain([1,25])
                        .range([maxWidth/2, maxWidth/2+(lineLength*Math.cos(incline))]);
const ylineScale3 = d3.scaleLinear()
                        .domain([1,25])
                        .range([maxHeight/2, maxHeight/2+(Math.sqrt(Math.pow(lineLength,2)-Math.pow(lineLength*Math.cos(incline),2)))]);

/// LINE 3 ///
let line3 = svg.append('g')
                .attr('transform', function(d,i){
                    return 'translate(0,0)';
                });
line3.append('line')
    .style('stroke','#e7e1ef')
    .style('stroke-width',3)
    .attr('id','line3')
    .attr('x1',maxWidth/2)
    .attr('y1',maxHeight/2)
    .attr('x2',maxWidth/2+(lineLength*Math.cos(incline)))
    .attr('y2',maxHeight/2+(Math.sqrt(Math.pow(lineLength,2)-Math.pow(lineLength*Math.cos(incline),2))));
line3.append('text')
    .attr('x',maxWidth/2+(lineLength*Math.cos(incline))-2)
    .attr('y',maxHeight/2+(Math.sqrt(Math.pow(lineLength,2)-Math.pow(lineLength*Math.cos(incline),2)))+30)
    .attr('stroke','black')
    .attr('font-family','sans-serif')
    .attr('font-size','18px')
    .classed('countryName',true)
    .text('Under-Developed');
        
// Plotting Under-Developed food points //
line3.selectAll('.country3')
    .data(foodPrices.filter(obj => 
            obj.country == 'Under-Developed' &&
            obj.year == parseInt(document.querySelector("input[type='radio'][name='year']:checked").value) &&
            default_selected_foods.includes(obj.foodName)))
    .enter()
    .append('circle')
    .classed('country3',true)
    .attr('cx',data => xlineScale3(data.cost))
    .attr('cy',data => ylineScale3(data.cost))
    .attr('r', 5)
    .style('fill', function(data){
            if (data.foodName == 'rice'){
                return '#003f5c';
            }
            else if (data.foodName == 'apple'){
                return '#58508d';
            }
            else if (data.foodName == 'egg'){
                return '#bc5090';
            }
            else if (data.foodName == 'lettuce'){
                return '#ff6361';
            }
            else{
                return '#ffa600';
            }
    });

/*
//Rice Connected Line //
let riceLines = svg.append('g')
                  .attr('transform', function(d,i){
                      return 'translate(0,0)';
                });
riceLines.append('line')
            .style('stroke','#003f5c')
            .style('stroke-width',2)
            .attr('x1',maxWidth/2)
            .attr('y1',(maxHeight/2)-16.92)
            .attr('x2',maxWidth/2 - 268.68*Math.cos(incline))
            .attr('y2',maxHeight/2+(Math.sqrt(Math.pow(268.68,2)-Math.pow(268.68,2)*Math.pow(Math.cos(incline),2))));
        
riceLines.append('line')
            .style('stroke','#003f5c')
            .style('stroke-width',2)
            .attr('x1',maxWidth/2)
<<<<<<< HEAD
            .attr('y1',maxHeight/2)
            .attr('x2',maxWidth/2+(lineLength*Math.cos(incline)))
            .attr('y2',maxHeight/2+(Math.sqrt(Math.pow(lineLength,2)-Math.pow(lineLength*Math.cos(incline),2))));
        line3.append('text')
            .attr('x',maxWidth/2+(lineLength*Math.cos(incline))+10)
            .attr('y',maxHeight/2+(Math.sqrt(Math.pow(lineLength,2)-Math.pow(lineLength*Math.cos(incline),2)))+30)
            .attr('stroke','black')
            .attr('font-family','sans-serif')
            .attr('font-size','18px')
            .text('Mexico');

        // Mexico Rice Point //
        line3.append('circle')
            .attr('cx', maxWidth/2 + 18.12*Math.cos(incline))
            .attr('cy', maxHeight/2 + Math.sqrt(Math.pow(18.12,2)-Math.pow(18.12,2)*Math.pow(Math.cos(incline),2)))
            .attr('r',5)
            .style('fill', '#69b3a2')
=======
            .attr('y1',(maxHeight/2)-16.92)
            .attr('x2',maxWidth/2 + 18.12*Math.cos(incline))
            .attr('y2',maxHeight/2 + Math.sqrt(Math.pow(18.12,2)-Math.pow(18.12,2)*Math.pow(Math.cos(incline),2)));
>>>>>>> 21335fa35ea620b6c3f3da852a3ecff4bd4d8fdc

riceLines.append('line')
            .style('stroke','#003f5c')
            .style('stroke-width',2)
            .attr('x1',maxWidth/2 - 268.68*Math.cos(incline))
            .attr('y1',maxHeight/2+(Math.sqrt(Math.pow(268.68,2)-Math.pow(268.68,2)*Math.pow(Math.cos(incline),2))))
            .attr('x2',maxWidth/2 + 18.12*Math.cos(incline))
            .attr('y2',maxHeight/2 + Math.sqrt(Math.pow(18.12,2)-Math.pow(18.12,2)*Math.pow(Math.cos(incline),2)));
*/

function onSelectionChange(){
    var current_year = parseInt(document.querySelector("input[type='radio'][name='year']:checked").value);
    var current_foods = Array.from(document.querySelectorAll("input[type='checkbox'][name='food']:checked"))
                            .map(obj => obj.value);
    
    line1.selectAll('.country1')
            .remove();
    line2.selectAll('.country2')
            .remove();
    line3.selectAll('.country3')
            .remove();
    
    line1.selectAll('.country1')
        .data(foodPrices.filter(obj =>
                obj.country == 'Developed' &&
                obj.year == current_year &&
                current_foods.includes(obj.foodName)))
        .enter()
        .append('circle')
        .classed('country1',true)
        .attr('cx', maxWidth/2)
        .attr('cy', data=> ylineScale1(data.cost))
        .attr('r', 5)
        .style('fill',function(data){
            if (data.foodName == 'rice'){
                return '#003f5c';
            }
            if (data.foodName == 'apple'){
                return '#58508d';
            }
            if (data.foodName == 'egg'){
                return '#bc5090';
            }
            if (data.foodName == 'lettuce'){
                return '#ff6361';
            }
            else{
                return '#ffa600';
            }
        });
    
    line2.selectAll('.country2')
        .data(foodPrices.filter(obj =>
                obj.country == 'Developing' &&
                obj.year == current_year &&
                current_foods.includes(obj.foodName)))
        .enter()
        .append('circle')
        .classed('country2',true)
        .attr('cx',data => xlineScale2(data.cost))
        .attr('cy',data => ylineScale2(data.cost))
        .attr('r', 5)
        .style('fill',function(data){
            if (data.foodName == 'rice'){
                return '#003f5c';
            }
            if (data.foodName == 'apple'){
                return '#58508d';
            }
            if (data.foodName == 'egg'){
                return '#bc5090';
            }
            if (data.foodName == 'lettuce'){
                return '#ff6361';
            }
            else{
                return '#ffa600';
            }
        });
    
    line3.selectAll('.country3')
        .data(foodPrices.filter(obj =>
                obj.country == 'Under-Developed' &&
                obj.year == current_year &&
                current_foods.includes(obj.foodName)))
        .enter()
        .append('circle')
        .classed('country3',true)
        .attr('cx',data => xlineScale3(data.cost))
        .attr('cy',data => ylineScale3(data.cost))
        .attr('r', 5)
        .style('fill',function(data){
            if (data.foodName == 'rice'){
                return '#003f5c';
            }
            if (data.foodName == 'apple'){
                return '#58508d';
            }
            if (data.foodName == 'egg'){
                return '#bc5090';
            }
            if (data.foodName == 'lettuce'){
                return '#ff6361';
            }
            else{
                return '#ffa600';
            }
        });
}

/// Trying interactive ///
d3.selectAll('line')
    .on('mouseover', function(){
        d3.select(this)
            .style('stroke-width',5);

        let margin = 40;
        let width = 480;
        let height = 480;
                
        let trend_svg = d3.select('div#container2')
                            .append('svg')
                            .attr('id','foodTrend')
                            .attr('width', width + 2*margin)
                            .attr('height', height + 2*margin)
                            .style('background-color', 'white')
                            .append('g')
                            .attr('transform','translate('+(margin+20)+','+margin+')');
        
        var x = d3.scaleLinear()
                    .domain([2011,2020])
                    .range([0, width]);
        trend_svg.append('g')
            .attr('transform','translate(0,'+height+')')
            .call(d3.axisBottom(x).tickFormat(d3.format('d')));
        
        var y = d3.scaleLinear()
                    .domain([1,30])
                    .range([height, 0]);
        trend_svg.append('g')
            .call(d3.axisLeft(y));
        
        //// X Axis Label ////
        trend_svg.append('g')
                .append('text')
                .attr('text-anchor','end')
                .attr('x', width/2)
                .attr('y', height+35)
                .attr('transform','translate(0,0)')
                .style('font-size',15)
                .style('font-weight','bold')
                .text('Years');
        
        //// Y Axis Labell ////
        trend_svg.append('g')
                .append('text')
                .attr('text-anchor','end')
                .attr('x', 0)
                .attr('y', 0)
                .attr('transform','translate(-30,200) rotate(-90)')
                .style('font-size',15)
                .style('font-weight','bold')
                .text('Cost ($)');

        ///// User Food Selections /////
        var current_foods = Array.from(document.querySelectorAll("input[type='checkbox'][name='food']:checked"))
                            .map(obj => obj.value);
        ///// DATA /////
        var trend_data;
        if (this.id == 'line1'){
            //// TITLE of graph ////
            trend_svg.append('g')
                    .append('text')
                    .attr('x',150)
                    .attr('y',0)
                    .attr('transform','translate(0,0)')
                    .style('font-size',15)
                    .style('font-weight','bold')
                    .text('Trend of food item prices in Developed Countries');
            trend_data = foodPrices.filter(obj => obj.country == 'Developed' &&
                                                    current_foods.includes(obj.foodName));
        }
        else if (this.id == 'line2'){
            //// TITLE of graph ////
            trend_svg.append('g')
                    .append('text')
                    .attr('x',150)
                    .attr('y',0)
                    .attr('transform','translate(0,0)')
                    .style('font-size',15)
                    .style('font-weight','bold')
                    .text('Trend of food item prices in Developing countries');
            trend_data = foodPrices.filter(obj => obj.country == 'Developing' &&
                                                    current_foods.includes(obj.foodName));
        }
        else{
            //// TITLE of graph ////
            trend_svg.append('g')
                    .append('text')
                    .attr('x',150)
                    .attr('y',0)
                    .attr('transform','translate(0,0)')
                    .style('font-size',15)
                    .style('font-weight','bold')
                    .text('Trend of food item prices in Under-Developed countries');
            trend_data = foodPrices.filter(obj => obj.country == 'Under-Developed' &&
                                                    current_foods.includes(obj.foodName));
        }
        
        trend_svg
            .append('g')
            .append('path')
                .datum(trend_data.filter(obj => obj.foodName=='rice'))
                .attr('d',d3.line()
                            .x(function(d){ return x(+d.year)})
                            .y(function(d){ return y(+d.cost)})
                            )
                .attr('stroke','#003f5c')
                .style('stroke-width',2)
                .style('fill','none');        
        
        trend_svg
            .append('g')
            .append('path')
                .datum(trend_data.filter(obj => obj.foodName=='apple'))
                .attr('d',d3.line()
                            .x(function(d){ return x(+d.year)})
                            .y(function(d){ return y(+d.cost)})
                            )
                .attr('stroke','#58508d')
                .style('stroke-width',2)
                .style('fill','none');
        
        trend_svg
            .append('g')
            .append('path')
                .datum(trend_data.filter(obj => obj.foodName=='egg'))
                .attr('d',d3.line()
                            .x(function(d){ return x(+d.year)})
                            .y(function(d){ return y(+d.cost)})
                            )
                .attr('stroke','#bc5090')
                .style('stroke-width',2)
                .style('fill','none');
        
        trend_svg
            .append('g')
            .append('path')
                .datum(trend_data.filter(obj => obj.foodName=='lettuce'))
                .attr('d',d3.line()
                            .x(function(d){ return x(+d.year)})
                            .y(function(d){ return y(+d.cost)})
                            )
                .attr('stroke','#ff6361')
                .style('stroke-width',2)
                .style('fill','none');
        
        trend_svg
            .append('g')
            .append('path')
                .datum(trend_data.filter(obj => obj.foodName=='corn'))
                .attr('d',d3.line()
                            .x(function(d){ return x(+d.year)})
                            .y(function(d){ return y(+d.cost)})
                            )
                .attr('stroke','#ffa600')
                .style('stroke-width',2)
                .style('fill','none');
    })
    .on('mouseout', function(){
        d3.select(this)
            .style('stroke-width',2);
        d3.select('#foodTrend')
            .remove();
    });

d3.csv("https://raw.githubusercontent.com/Shake1999/CSC411_UVic/main/world_poverty.csv")
    .then(function(this_data){
        /// POVERTY CIRCLE LINE ///
        svg.select('#povertyCircle')
            .append('circle')
            .style('stroke','black')
            .style('stroke-width',1)
            .style('stroke-dasharray',15)
            .style('fill','transparent')
            .attr('r',ylineScale1(21.8))
            .attr('cx',maxWidth/2)
            .attr('cy',maxHeight/2);
        
        //// POVERTY ////
        const parsedPovertyData = this_data.map(item => {
            return {Entity: item.Entity, Year: parseInt(item.Year), PovPopulation: +(parseFloat(item.PovPopulation).toFixed(2))};
        });
        
        var poverties = parsedPovertyData.filter(obj => {
            return (obj.Entity == 'Chad' || obj.Entity == 'Japan' || obj.Entity == 'Mexico') && (obj.Year>2011);
        });
        
        poverties.push({Entity: 'Chad', Year: 2011, PovPopulation: 55.43});
        poverties.push({Entity: 'Chad', Year: 2015, PovPopulation: 30.43});
        poverties.push({Entity: 'Chad', Year: 2020, PovPopulation: 28.43});
        poverties.push({Entity: 'Japan', Year: 2011, PovPopulation: 2.5});
        poverties.push({Entity: 'Japan', Year: 2015, PovPopulation: 0.854});
        poverties.push({Entity: 'Japan', Year: 2020, PovPopulation: 1.45});
        poverties.push({Entity: 'Mexico', Year: 2011, PovPopulation: 15.322});
        poverties.push({Entity: 'Mexico', Year: 2015, PovPopulation: 11.5});

        console.log(poverties);

        d3.selectAll('.countryName')
            .on('mouseover', function(){
                let countryTypeInfo = d3.select('div#container2')
                            .append('svg')
                            .attr('id','countryTypeInformation')
                            .attr('width', 500)
                            .attr('height', 500)
                            .style('background-color', 'white')
                            .append('g')
                            .attr('transform','translate(0,0)');
                var str = 'The countries under the '+this.textContent+' Category:\n';
                if (this.textContent == 'Under-Developed'){
                        str += 'Chad, Burundi';
                }
                else if (this.textContent == 'Developed'){
                        str += 'Japan and South Africa.'
                }
                else {
                    str += 'Haiti, Mexico, and Argentina'
                }
                countryTypeInfo.append('g')
                                .append('text')
                                .attr('x',30)
                                .attr('y',250)
                                .attr('transform','translate(0,0)')
                                .style('font-size',25)
                                .style('font-weight','bold')
                                .text(str)
                                .call(wrap,470);
                
                                var percent = 55;

                                var w=300,h=320;
                            
                                var outerRadius=(w/2)-10;
                                var innerRadius=outerRadius-8;
                            
                            
                                var color = ['#ec1561','#2a3a46','#202b33'];
                            
                                var arc=d3.svg.arc()
                                        .innerRadius(innerRadius)
                                        .outerRadius(outerRadius)
                                        .startAngle(0)
                                        .endAngle(2*Math.PI);
                            
                                //The circle is following this
                                var arcDummy=d3.svg.arc()
                                        .innerRadius((outerRadius-innerRadius)/2+innerRadius)
                                        .outerRadius((outerRadius-innerRadius)/2+innerRadius)
                                        .startAngle(0);
                            
                            
                                var arcLine=d3.svg.arc()
                                        .innerRadius(innerRadius)
                                        .outerRadius(outerRadius)
                                        .startAngle(0);
                            /*
                                var svg=d3.select("#chart")
                                        .append("svg")
                                        .attr({
                                            width:w,
                                            height:h,
                                            class:'shadow'
                                        }).append('g')
                                        .attr({
                                            transform:'translate('+w/2+','+h/2+')'
                                        });
                                        */
                            
                            
                                //background
                                countryTypeInfo.append('path')
                                        .attr({
                                            d:arc
                                        })
                                        .style({
                                            fill:color[1]
                                        });
                            
                            
                                vcountryTypeInfo.append('path')
                                        .datum({endAngle:0})
                                        .attr({
                                            d:arcLine
                                        })
                                        .style({
                                            fill:color[0]
                                        });
                            
                                //Dummy Arc for Circle
                                countryTypeInfo.append('path')
                                        .datum({endAngle:0})
                                        .attr({
                                            d:arcDummy
                                        }).style({
                                            fill:color[0]
                                        });
                            
                                countryTypeInfo.append('circle')
                                        .attr({
                                            r:12,
                                            transform:'translate(0,'+ (-outerRadius+15) +')'
                                        })
                                        .style({
                                            stroke:color[0],
                                            'stroke-width':8,
                                            fill:color[2]
                                        });
                            
                                countryTypeInfo.append('text')
                                        .datum(0)
                                        .text(function(d){
                                            return d+'%';
                                        })
                            
                                        .attr({
                                            class:'middleText',
                                            'text-anchor':'middle',
                                            dy:25,
                                            dx:0
                                        })
                                        .style({
                                            fill:'#ec1561',
                                            'font-size':'80px'
                            
                                        });
                            
                            
                                
                               
                                 
                                var animate=function(){
                                    pathChart.transition()
                                            .duration(750)
                                            .ease('cubic')
                                            .call(arcTween,((2*Math.PI))*ratio, percent, oldValue);
                                 
                                 
                                };
                                 
                                 
                                setTimeout(animate,0);
               

                

            })
            
            .on('mouseout', function(){
                /*
                d3.select('#countryTypeInformation')
                    .remove();
                */
                
            });
            
    }
);