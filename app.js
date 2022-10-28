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

d3.csv("https://raw.githubusercontent.com/Shake1999/CSC411_UVic/main/world_poverty.csv")
    .then(function(this_data){
        let svg = d3.select('#svg1')
                    .attr('width',1000)
                    .attr('height',1000)
                    .style('background-color', 'white'); //#fde0dd

        svg.append('line')
            .style('stroke','#e7e1ef')
            .style('stroke-width',2)
            .attr('x1',500)
            .attr('y1',500)
            .attr('x2',500)
            .attr('y2',100);

        svg.append('line')
            .style('stroke','#e7e1ef')
            .style('stroke-width',2)
            .attr('x1',500)
            .attr('y1',500)
            .attr('x2',50)
            .attr('y2',750);
        
        svg.append('line')
            .style('stroke','#e7e1ef')
            .style('stroke-width',2)
            .attr('x1',500)
            .attr('y1',500)
            .attr('x2',950)
            .attr('y2',750);
        
        svg.append('circle')
            .style('stroke','black')
            .style('stroke-width',1)
            .style('stroke-dasharray',15)
            .style('fill','transparent')
            .attr('r',150)
            .attr('cx',500)
            .attr('cy',500);
    });