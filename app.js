
/*
const xScale = d3.scaleBand()
                .domain(Dummy_Data.map((dataPoint) => dataPoint.region))
                .rangeRound([0,250])
                .padding(0.1);

const yScale = d3.scaleLinear()
                .domain([0,17])
                .range([200,0]);

const container = d3.select('svg')
    .classed('container', true)

const bars = container
    .selectAll('.bar')
    .data(Dummy_Data)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', xScale.bandwidth())
    .attr('height', (data) => 200 - yScale(data.value))
    .attr('x', data => xScale(data.region))
    .attr('y', data => yScale(data.value));

setTimeout(() => {
    bars.data(Dummy_Data.slice(0,2)).exit().remove();
}, 2000);

*/

var foodPrices = [];
for (const foodItem of ['RICE','APPLE','EGG','LETTUCE','CORN']) {
    for (const c of ['Chad','Japan','Mexico']){
        for (let year = 2011; year<=2020; year++){
            foodPrices.push({foodName: foodItem, country: c, year: year, cost: Math.round(Math.random()*19 + 1)})
        }
    }
}
console.log(foodPrices);


const maxWidth = 800;
const maxHeight = 700;
const lineLength = 300;
const incline = 0.5235987756;

d3.csv("https://raw.githubusercontent.com/Shake1999/CSC411_UVic/main/world_poverty.csv")
    .then(function(this_data){
        let svg = d3.select('div#container1')
                    .append('svg')
                    .attr('width', maxWidth)
                    .attr('height', maxHeight)
                    .style('background-color', 'white'); //#fde0dd

        /// LINE 1 ///
        let line1 = svg.append('g')
                        .attr('transform', function(d,i){
                            return 'translate(0,0)';
                        });
        line1.append('line')
            .style('stroke','#e7e1ef')
            .style('stroke-width',3)
            .attr('x1',maxWidth/2)
            .attr('y1',maxHeight/2)
            .attr('x2',maxWidth/2)
            .attr('y2',maxHeight/2-lineLength);
        line1.append('text')
            .attr('x',maxWidth/2-30)
            .attr('y',maxHeight/2-lineLength-10)
            .attr('stroke','black')
            .attr('font-family','sans-serif')
            .attr('font-size','18px')
            .classed('countryName',true)
            .text('Chad');
        
        // Rice Point Chad //
        line1.append('circle')
            .attr('cx',maxWidth/2)
            .attr('cy',(maxHeight/2)-16.92 )
            .attr('r', 5)
            .style('fill', '#003f5c')

      
        /// LINE 2 ///
        let line2 = svg.append('g')
                        .attr('transform', function(d,i){
                            return 'translate(0,0)';
                        });
        line2.append('line')
            .style('stroke','#e7e1ef')
            .style('stroke-width',3)
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
            .text('Japan');

        /// Japan Rice Point ///
        line2.append('circle')
            .attr('cx', maxWidth/2 - 268.68*Math.cos(incline))
            .attr('cy', maxHeight/2+(Math.sqrt(Math.pow(268.68,2)-Math.pow(268.68,2)*Math.pow(Math.cos(incline),2))) )
            .attr('r', 5)
            .style('fill', '#003f5c')
            
        /// LINE 3 ///
        let line3 = svg.append('g')
                        .attr('transform', function(d,i){
                            return 'translate(0,0)';
                        });
        line3.append('line')
            .style('stroke','#e7e1ef')
            .style('stroke-width',3)
            .attr('x1',maxWidth/2)
            .attr('y1',maxHeight/2)
            .attr('x2',maxWidth/2+(lineLength*Math.cos(incline)))
            .attr('y2',maxHeight/2+(Math.sqrt(Math.pow(lineLength,2)-Math.pow(lineLength*Math.cos(incline),2))));
        line3.append('text')
            .attr('x',maxWidth/2+(lineLength*Math.cos(incline))+10)
            .attr('y',maxHeight/2+(Math.sqrt(Math.pow(lineLength,2)-Math.pow(lineLength*Math.cos(incline),2)))+30)
            .attr('stroke','black')
            .attr('font-family','sans-serif')
            .attr('font-size','18px')
            .classed('countryName',true)
            .text('Mexico');
        
        // Mexico Rice point
        line3.append('circle')
            .attr('cx', maxWidth/2 + 18.12*Math.cos(incline))
            .attr('cy', maxHeight/2 + Math.sqrt(Math.pow(18.12,2)-Math.pow(18.12,2)*Math.pow(Math.cos(incline),2)))
            .attr('r',5)
            .style('fill', '#003f5c')

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
            .attr('y1',(maxHeight/2)-16.92)
            .attr('x2',maxWidth/2 + 18.12*Math.cos(incline))
            .attr('y2',maxHeight/2 + Math.sqrt(Math.pow(18.12,2)-Math.pow(18.12,2)*Math.pow(Math.cos(incline),2)));

        riceLines.append('line')
            .style('stroke','#003f5c')
            .style('stroke-width',2)
            .attr('x1',maxWidth/2 - 268.68*Math.cos(incline))
            .attr('y1',maxHeight/2+(Math.sqrt(Math.pow(268.68,2)-Math.pow(268.68,2)*Math.pow(Math.cos(incline),2))))
            .attr('x2',maxWidth/2 + 18.12*Math.cos(incline))
            .attr('y2',maxHeight/2 + Math.sqrt(Math.pow(18.12,2)-Math.pow(18.12,2)*Math.pow(Math.cos(incline),2)));

        
        /// POVERTY CIRCLE LINE ///
        let povertyLine = svg.append('g')
            .attr('transform', function(d,i){
                return 'translate(0,0)';
            });
        povertyLine.append('circle')
            .style('stroke','black')
            .style('stroke-width',1)
            .style('stroke-dasharray',15)
            .style('fill','transparent')
            .attr('r',lineLength/4)
            .attr('cx',maxWidth/2)
            .attr('cy',maxHeight/2);

        /// Trying interactive ///
        d3.selectAll('line')
            .on('mouseover', function(){
                d3.select(this)
                    .style('stroke-width',5);
            })
            .on('mouseout', function(){
                d3.select(this)
                    .style('stroke-width',2);
            });
        
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

        var thisCountryName;
        d3.selectAll('.countryName')
            .on('mouseover', function(){
                thisCountryName = this.textContent;
                d3.select(this)
                    .text(function(){
                        var selectedYear = parseInt(document.querySelector("input[type='radio'][name='year']:checked").value);
                        var pov = poverties.find(obj => 
                            obj.Entity == thisCountryName &&
                            obj.Year == selectedYear);
                        return `${this.textContent}: ${pov.PovPopulation}%`;
                    })
                    .attr('transform', 'translate(' + (-this.textContent.length*2) + ',' + 0 + ')')
                    .classed('povInfo',true);
            })
            .on('mouseout', function(){
                d3.select('.povInfo')
                    .text(thisCountryName)
                    .classed('povInfo',false)
                    .attr('transform','translate(0,0)');
            });
    }
);