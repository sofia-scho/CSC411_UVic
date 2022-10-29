/*
const Dummy_Data = [
    {id: 'd1', value: 10, region:'USA'},
    {id: 'd2', value: 11, region:'India'},
    {id: 'd3', value: 15, region:'Canada'},
    {id: 'd4', value: 12, region:'China'},
];

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

const maxWidth = 800;
const maxHeight = 700;
const lineLength = 300;
const incline = 0.5235987756;

d3.csv("https://raw.githubusercontent.com/Shake1999/CSC411_UVic/main/world_poverty.csv")
    .then(function(this_data){
        let svg = d3.select('div#container')
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
            .style('stroke-width',2)
            .attr('x1',maxWidth/2)
            .attr('y1',maxHeight/2)
            .attr('x2',maxWidth/2)
            .attr('y2',maxHeight/2-lineLength);
        line1.append('text')
            .attr('x',maxWidth/2-30)
            .attr('y',maxHeight/2-lineLength-15)
            .attr('stroke','black')
            .attr('font-family','sans-serif')
            .attr('font-size','18px')
            .text('Country A');
        
        /// LINE 2 ///
        let line2 = svg.append('g')
                        .attr('transform', function(d,i){
                            return 'translate(0,0)';
                        });
        line2.append('line')
            .style('stroke','#e7e1ef')
            .style('stroke-width',2)
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
            .text('Country B');
        
        /// LINE 3 ///
        let line3 = svg.append('g')
                        .attr('transform', function(d,i){
                            return 'translate(0,0)';
                        });
        line3.append('line')
            .style('stroke','#e7e1ef')
            .style('stroke-width',2)
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
            .text('Country C');
        
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
    });