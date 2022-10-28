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
        d3.select('div')
            .selectAll('p')
            .data(this_data)
            .enter()
            .append('p')
            .text(data => data.Entity);
    });