import React, { useEffect, useRef, useState } from 'react';
import { Grid, Typography, Stack } from '@mui/material';
import * as d3 from 'd3';

// Match Size : 5
// Gap Penality : -1
// Overlap Wndow : 5
// E Value : 1e-05
// Maximum Gaps : 25

function Information() {
    const svgRef = useRef<SVGElement>(null);


    useEffect(() => {
        const width = svgRef?.current?.getBoundingClientRect().width;
        console.log(width);
        if (!width) return;
        drawarc(width);
        // return () => {
        //     svgRef.current.innerHTML = '';
        // }
    }, []);

    const drawarc = (width: number) => {
        const svg = d3.select('#arc')
            .attr('width', width)
            .attr('height', width / 2)

        const color = d3.scaleOrdinal()
            .range(['#be1522', '#1d1d1b']);
        const radius = width / 2;
        const vis = svg
            .append("svg")
            .data([
                [50.45, 100 - 50.45]
            ])
            .attr("width", width)
            .attr("height", width / 2)
            .append("svg:g")
            .attr('transform', 'translate(' + radius + ',' + radius + ')')
        const arc = d3.arc()
            .innerRadius(radius / 1.8)
            .outerRadius(radius)
        const pie = d3.pie()
            .startAngle(-90 * (Math.PI / 180))
            .endAngle(90 * (Math.PI / 180))
            .padAngle(.02)
            .sort(null)
            .value((d) => d)

        vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("svg:g")
            .attr("class", "slice")
            .append("svg:path")
            .attr("fill", (d: number, i: number) => color(i))
            .attr("d", arc)
        const text = vis.append('svg:text')
            .attr('class', 'pieText')
            .text(50.45 + "%")

        text.attr('transform', function () {
            // console.log('translate(-' + (this.clientWidth / 2) + ',-' + 0.2 * radius + ')')
            return 'translate(-' + (this.clientWidth / 2) + ',-' + 0.2 * radius + ')';
        })



    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Stack spacing={2}>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>Information</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 400 }}>Match Score : 50</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 400 }}>Gap Penality : -1</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 400 }}>Overlap Window : 5</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 400 }}>E Value : 1e-05</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 400 }}>Maximum Gaps : 25</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={2} >
                    <Stack spacing={2}>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>Information</Typography>
                        <svg id="arc" ref={svgRef}></svg>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default Information