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

const maxWidth = 800;
const maxHeight = 700;
const lineLength = 300;
const incline = 0.5235987756;

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

// linear scale for Developed
const ylineScale1 = d3.scaleLinear()
                    .domain([0,7])
                    .range([maxHeight/2, maxHeight/2-lineLength]);

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

// linear scales for Developing
const xlineScale2 = d3.scaleLinear()
                        .domain([0,7])
                        .range([maxWidth/2, maxWidth/2-(lineLength*Math.cos(incline))]);
const ylineScale2 = d3.scaleLinear()
                        .domain([0,7])
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

// linear scales for Under-Developed
const xlineScale3 = d3.scaleLinear()
                        .domain([0,7])
                        .range([maxWidth/2, maxWidth/2+(lineLength*Math.cos(incline))]);
const ylineScale3 = d3.scaleLinear()
                        .domain([0,7])
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

var foodPrices;

d3.csv("https://raw.githubusercontent.com/Shake1999/CSC411_UVic/main/parsedFoodFinal.csv", function(this_data){
        foodPrices = this_data;
        console.log(foodPrices);
        var default_selected_foods = Array.from(document.querySelectorAll("input[type='checkbox'][name='food']:checked"))
                                        .map(obj => obj.value);

        // Plotting Developed food points //
        line1.selectAll('.country1')
            .data(foodPrices.filter(obj => 
                    obj.country == 'Developed' &&
                    obj.year == parseInt(document.querySelector("input[type='range'][name='year']").value) &&
                    default_selected_foods.includes(obj.foodName)))
            .enter()
            .append('circle')
            .classed('country1',true)
            .attr('cx',maxWidth/2)
            .attr('cy',data => ylineScale1(data.cost))
            .attr('r', 5)
            .style('fill', function(data){
                    if (data.foodName == 'Rice'){
                        return '#003f5c';
                    }
                    else if (data.foodName == 'Wheat flour'){
                        return '#7a5195';
                    }
                    else if (data.foodName == 'Meat'){
                        return '#ef5675';
                    }
                    else if (data.foodName == 'Potatoes'){
                        return '#ffa600';
                    }
                    else{
                        return '#ffa600';
                    }
            });
        
        // Plotting Developing food points //
        line2.selectAll('.country2')
            .data(foodPrices.filter(obj => 
                    obj.country == 'Developing' &&
                    obj.year == parseInt(document.querySelector("input[type='range'][name='year']").value) &&
                    default_selected_foods.includes(obj.foodName)))
            .enter()
            .append('circle')
            .classed('country2',true)
            .attr('cx',data => xlineScale2(data.cost))
            .attr('cy',data => ylineScale2(data.cost))
            .attr('r', 5)
            .style('fill', function(data){
                    if (data.foodName == 'Rice'){
                        return '#003f5c';
                    }
                    else if (data.foodName == 'Wheat flour'){
                        return '#7a5195';
                    }
                    else if (data.foodName == 'Meat'){
                        return '#ef5675';
                    }
                    else if (data.foodName == 'Potatoes'){
                        return '#ffa600';
                    }
                    else{
                        return '#ffa600';
                    }
            });

        // Plotting Under-Developed food points //
        line3.selectAll('.country3')
            .data(foodPrices.filter(obj => 
                    obj.country == 'Under-Developed' &&
                    obj.year == parseInt(document.querySelector("input[type='range'][name='year']").value) &&
                    default_selected_foods.includes(obj.foodName)))
            .enter()
            .append('circle')
            .classed('country3',true)
            .attr('cx',data => xlineScale3(data.cost))
            .attr('cy',data => ylineScale3(data.cost))
            .attr('r', 5)
            .style('fill', function(data){
                    if (data.foodName == 'Rice'){
                        return '#003f5c';
                    }
                    else if (data.foodName == 'Wheat flour'){
                        return '#7a5195';
                    }
                    else if (data.foodName == 'Meat'){
                        return '#ef5675';
                    }
                    else if (data.foodName == 'Potatoes'){
                        return '#ffa600';
                    }
                    else{
                        return '#ffa600';
                    }
            });

        //// Default ////
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
                    .domain([0,7])
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
        
        trend_svg.append("g")
                .attr("transform", "translate(0, "+y(2.39)+")")
                .append("line")
                .attr("x2", width)
                .style('stroke','black')
                .style('stroke-width',1)
                .style('stroke-dasharray',15)
                .style('fill','transparent');


        var current_foods = Array.from(document.querySelectorAll("input[type='checkbox'][name='food']:checked"))
                                .map(obj => obj.value);

        trend_svg.append('g')
                .append('text')
                .attr('x',100)
                .attr('y',0)
                .attr('transform','translate(0,0)')
                .style('font-size',15)
                .style('font-weight','bold')
                .text('Trend of food item prices in Developed Countries')
                .call(wrap,300);
        trend_data = foodPrices.filter(obj => obj.country == 'Developed' &&
                                        current_foods.includes(obj.foodName));

        trend_svg
                .append('g')
                .append('path')
                .datum(trend_data.filter(obj => obj.foodName=='Rice'))
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
                .datum(trend_data.filter(obj => obj.foodName=='Wheat flour'))
                .attr('d',d3.line()
                        .x(function(d){ return x(+d.year)})
                        .y(function(d){ return y(+d.cost)})
                    )
                .attr('stroke','#7a5195')
                .style('stroke-width',2)
                .style('fill','none');
                                    
        trend_svg
                .append('g')
                .append('path')
                .datum(trend_data.filter(obj => obj.foodName=='Meat'))
                .attr('d',d3.line()
                            .x(function(d){ return x(+d.year)})
                            .y(function(d){ return y(+d.cost)})
                    )
                .attr('stroke','#ef5675')
                .style('stroke-width',2)
                .style('fill','none');
                                    
        trend_svg
                .append('g')
                .append('path')
                .datum(trend_data.filter(obj => obj.foodName=='Potatoes'))
                .attr('d',d3.line()
                            .x(function(d){ return x(+d.year)})
                            .y(function(d){ return y(+d.cost)})
                    )
                .attr('stroke','#ffa600')
                .style('stroke-width',2)
                .style('fill','none');

        /// Trying interactive ///
        d3.selectAll('line')
            .on('mouseover', function(){
                d3.select(this)
                    .style('stroke-width',5);

                d3.select('#foodTrend')
                    .remove();
                        
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
                            .domain([0,7])
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

                trend_svg.append("g")
                        .attr("transform", "translate(0, "+y(2.39)+")")
                        .append("line")
                        .attr("x2", width)
                        .style('stroke','black')
                        .style('stroke-width',1)
                        .style('stroke-dasharray',15)
                        .style('fill','transparent');
                
                ///// User Food Selections /////
                var current_foods = Array.from(document.querySelectorAll("input[type='checkbox'][name='food']:checked"))
                                    .map(obj => obj.value);
                ///// DATA /////
                var trend_data;
                if (this.id == 'line1'){
                    //// TITLE of graph ////
                    trend_svg.append('g')
                            .append('text')
                            .attr('x',100)
                            .attr('y',0)
                            .attr('transform','translate(0,0)')
                            .style('font-size',15)
                            .style('font-weight','bold')
                            .text('Trend of food item prices in Developed Countries')
                            .call(wrap,300);
                    trend_data = foodPrices.filter(obj => obj.country == 'Developed' &&
                                                            current_foods.includes(obj.foodName));
                }
                else if (this.id == 'line2'){
                    //// TITLE of graph ////
                    trend_svg.append('g')
                            .append('text')
                            .attr('x',100)
                            .attr('y',0)
                            .attr('transform','translate(0,0)')
                            .style('font-size',15)
                            .style('font-weight','bold')
                            .text('Trend of food item prices in Developing countries')
                            .call(wrap,300);
                    trend_data = foodPrices.filter(obj => obj.country == 'Developing' &&
                                                            current_foods.includes(obj.foodName));
                }
                else{
                    //// TITLE of graph ////
                    trend_svg.append('g')
                            .append('text')
                            .attr('x',100)
                            .attr('y',0)
                            .attr('transform','translate(0,0)')
                            .style('font-size',15)
                            .style('font-weight','bold')
                            .text('Trend of food item prices in Under-Developed countries')
                            .call(wrap,300);
                    trend_data = foodPrices.filter(obj => obj.country == 'Under-Developed' &&
                                                            current_foods.includes(obj.foodName));
                }
                
                trend_svg
                    .append('g')
                    .append('path')
                        .datum(trend_data.filter(obj => obj.foodName=='Rice'))
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
                        .datum(trend_data.filter(obj => obj.foodName=='Wheat flour'))
                        .attr('d',d3.line()
                                    .x(function(d){ return x(+d.year)})
                                    .y(function(d){ return y(+d.cost)})
                            )
                        .attr('stroke','#7a5195')
                        .style('stroke-width',2)
                        .style('fill','none');
                
                trend_svg
                    .append('g')
                    .append('path')
                        .datum(trend_data.filter(obj => obj.foodName=='Meat'))
                        .attr('d',d3.line()
                                    .x(function(d){ return x(+d.year)})
                                    .y(function(d){ return y(+d.cost)})
                                    )
                        .attr('stroke','#ef5675')
                        .style('stroke-width',2)
                        .style('fill','none');
                
                trend_svg
                    .append('g')
                    .append('path')
                        .datum(trend_data.filter(obj => obj.foodName=='Potatoes'))
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
            });
})


function onSelectionChange(){
            var current_year = parseInt(document.querySelector("input[type='range'][name='year']").value);
            var current_foods = Array.from(document.querySelectorAll("input[type='checkbox'][name='food']:checked"))
                                    .map(obj => obj.value);
            
            document.querySelector('#rangeValue').innerHTML = current_year;
            
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
                    if (data.foodName == 'Rice'){
                        return '#003f5c';
                    }
                    if (data.foodName == 'Wheat flour'){
                        return '#7a5195';
                    }
                    if (data.foodName == 'Meat'){
                        return '#ef5675';
                    }
                    if (data.foodName == 'Potatoes'){
                        return '#ffa600';
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
                    if (data.foodName == 'Rice'){
                        return '#003f5c';
                    }
                    if (data.foodName == 'Wheat flour'){
                        return '#7a5195';
                    }
                    if (data.foodName == 'Meat'){
                        return '#ef5675';
                    }
                    if (data.foodName == 'Potatoes'){
                        return '#ffa600';
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
                    if (data.foodName == 'Rice'){
                        return '#003f5c';
                    }
                    if (data.foodName == 'Wheat flour'){
                        return '#7a5195';
                    }
                    if (data.foodName == 'Meat'){
                        return '#ef5675';
                    }
                    if (data.foodName == 'Potatoes'){
                        return '#ffa600';
                    }
                    else{
                        return '#ffa600';
                    }
                });
}

/// Annotations ///
const annotations = [{
    note: {
        label: 'People can afford items within this circle',
        bgPadding: {'top':15, 'left':10, 'right':10,'bottom':10},
        title: 'Poverty Baseline $2.39(USD)/Day'
    },
    x: 320,
    y: 280,
    dy: -100,
    dx: -100,
    connector: {end: 'arrow'}
}];

const makeAnnotations = d3.annotation()
                            .type(d3.annotationCallout)
                            .annotations(annotations);

d3.csv("https://raw.githubusercontent.com/Shake1999/CSC411_UVic/main/world_poverty.csv", function(pov_data){
        /// POVERTY CIRCLE LINE ///
        svg.select('#povertyCircle')
            .append('circle')
            .style('stroke','black')
            .style('stroke-width',1)
            .style('stroke-dasharray',15)
            .style('fill','transparent')
            .attr('r',maxHeight/2 - ylineScale1(2.39))
            .attr('cx',maxWidth/2)
            .attr('cy',maxHeight/2);
        
        svg.append('g')
            .attr('class','annotation-group')
            .call(makeAnnotations)
        
        //// POVERTY ////

        d3.selectAll('.countryName')
            .on('mouseover', function(){
                var countryNameAnimate = this.textContent;
                let countryTypeInfo = d3.select('div#container1')
                            .append('svg')
                            .attr('id','countryTypeInformation')
                            .style('position','absolute')
                            .style('z-index','10')
                            .attr('opacity',1)
                            .attr('width', 400)
                            .attr('height', 300)
                            .style('background-color', 'white')
                            .attr('transform','translate(0,150)')
                            .style("border", "solid")
                            .style("border-width", "2px")
                            .style("border-radius", "5px");
                var str = 'The countries under the '+this.textContent+' Category are ';
                if (this.textContent == 'Under-Developed'){
                        str += 'Chad, Burundi.\nThe average percentage of these countries\' population living below the poverty baseline:\n'
                        
                }
                else if (this.textContent == 'Developed'){
                        str += 'Japan and South Africa.\nThe average percentage of these countries\' population living below the poverty baseline:\n'
                }
                else {
                    str += 'Haiti, Mexico, and Argentina.\nThe average percentage of these countries\' population living below the poverty baseline:\n'
                }
                
                countryTypeInfo.append('g')
                                .append('text')
                                .attr('x',50)
                                .attr('y',50)
                                .attr('transform','translate(0,0)')
                                .style('font-size',15)
                                .style('font-weight','bold')
                                .text(str)
                                .call(wrap,300);

                var width1 = 150;
                var height1 = 150;

                function radialProgress() {
                    const outerRadius = Math.min(width1, height1) * 0.45;
                    const thickness = 10;
                    let value = 0;
                                    
                    const mainArc = d3.arc()
                                      .startAngle(0)
                                      .endAngle(Math.PI * 2)
                                      .innerRadius(outerRadius-thickness)
                                      .outerRadius(outerRadius)
                                  
                    countryTypeInfo.append("path")
                                      .attr('class', 'progress-bar-bg')
                                      .attr('transform', `translate(200,200)`)
                                      .attr('d', mainArc())
                                    
                    const mainArcPath = countryTypeInfo.append("path")
                                      .attr('class', 'progress-bar')
                                      .attr('transform', 'translate(200,200)')
                                    
                    countryTypeInfo.append("circle")
                                      .attr('class', 'progress-bar')
                                      .attr('transform', `translate(200,${200-outerRadius+thickness/2})`)
                                      .attr('width', thickness)
                                      .attr('height', thickness)
                                      .attr('r', thickness/2)
                                  
                    const end = countryTypeInfo.append("circle")
                                      .attr('class', 'progress-bar')
                                      .attr('transform', `translate(200,${200-outerRadius+thickness/2})`)
                                      .attr('width', thickness)
                                      .attr('height', thickness)
                                      .attr('r', thickness/2)
                                    
                    let percentLabel = countryTypeInfo.append("text")
                                      .attr('class', 'progress-label')
                                      .attr('transform', `translate(200,200)`)
                                      .text('0')
                                  
                    return {
                        update: function(progressPercent) {
                                    const startValue = value
                                    const startAngle = Math.PI * startValue / 50
                                    const angleDiff = Math.PI * progressPercent / 50 - startAngle;
                                    const startAngleDeg = startAngle / Math.PI * 180
                                    const angleDiffDeg = angleDiff / Math.PI * 180
                                    const transitionDuration = 500
                                  
                                    mainArcPath.transition().duration(transitionDuration).attrTween('d', function(){
                                      return function(t) {
                                        mainArc.endAngle(startAngle + angleDiff * t)
                                        return mainArc();
                                      }
                                    })
                                    end.transition().duration(transitionDuration).attrTween('transform', function(){
                                      return function(t) {
                                        return `translate(200,200)`+
                                          `rotate(${(startAngleDeg + angleDiffDeg * t)})`+
                                            `translate(0,-${outerRadius-thickness/2})`
                                        }
                                    })
                                    percentLabel.transition().duration(transitionDuration).tween('bla', function() {
                                      return function(t) {
                                        percentLabel.text(Math.round(startValue + (progressPercent - startValue) * t));
                                      }
                                    })
                                    value = progressPercent
                                }
                        }
                    }
                    let chart = radialProgress()
                    d3.interval(function(){
                        
                        if(countryNameAnimate == 'Under-Developed'){
                            chart.update(78)
                        }
                        
                        else if(countryNameAnimate == 'Developed'){
                            chart.update(20)
                        }
                        else if (countryNameAnimate == 'Developing'){
                            chart.update(33)
                        }
                  }, 500)
                  
            })
            
            .on('mouseout', function(){
                /*
                d3.select('#countryTypeInformation')
                    .remove();
                */
                
            });
            
    }
);