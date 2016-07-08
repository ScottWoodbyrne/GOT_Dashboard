/**
 * Created by Scott on 08/07/2016.
 */
//Width and height
			var w = 1200;
			var h = 750;
			//Original data
			var dataset = {
				people: [
					{ name: "Stark", r: 50 },
					{ name: "Baratheon", r: 35 },
					{ name: "Bolton", r: 35 },
					{ name: "Bracken", r: 20 },
					{ name: "Brave Companions", r: 35 },
					{ name: "Brotherhood without Banners", r: 20 },
					{ name: "Darry", r: 25 },
					{ name: "Free Folk", r: 20 },
					{ name: "Frey", r: 25 },
					{ name: "Greyjoy", r: 50 },
                    { name: "Lannister", r: 80 },
                    { name: "Tully", r: 20 },
                    { name: "Tyrell", r: 20 },
                    { name: "Blackwood", r: 20 },
                    { name: "Mallister", r: 20 },
                    { name: "Nights Watch", r: 20 },
                    { name: "Town Folk of Saltpans", r: 20 }

				],
				killed: [
					{ source: 0, target: 9 },
					{ source: 0, target: 10 },
					{ source: 1, target: 2 },
					{ source: 1, target: 9 },
					{ source: 1, target: 10 },
					{ source: 2, target: 9 },
					{ source: 2, target: 0 },
					{ source: 3, target: 13 },
					{ source: 4, target: 16 },
					{ source: 5, target: 4 },
					{ source: 6, target: 10 },
					{ source: 7, target: 15 },
					{ source: 8, target: 0 },
                    { source: 8, target: 14 },
                    { source: 9, target: 0 },
                    { source: 9, target: 12 },
                    { source: 10, target: 11 },
                    { source: 10, target: 1 },
                    { source: 10, target: 4 },
                    { source: 10, target: 6 },
                    { source: 10, target: 0 }

				]
			};


//Initialize a default force layout, using the nodes and edges in dataset
			var force = d3.layout.force()
								 .nodes(dataset.people)
								 .links(dataset.killed)
								 .size([w, h])
								 .linkDistance([120])
								 .charge([-1000])
								 .start();
			var colors = d3.scale.category20c();
			//Create SVG element
			var svg = d3.select("#bubbles")
						.append("svg")
						.attr("width", w)
						.attr("height", h);
//			//Create edges as lines
			var lines = svg.selectAll("line")
				.data(dataset.killed)
				.enter()
				.append("line")
				.style("stroke", "#999")
				.style("stroke-width", 1);
			//Create nodes as circles
			var circles = svg.selectAll("circle")
				.data(dataset.people)
				.enter()
				.append("circle")
				.attr("r", function(d){
                    return d.r;
                })
				.style("fill", function(d, i) {
					return colors(i);
				})
				.attr("opacity", "1")
				.call(force.drag);
			var text = svg.selectAll("text")
			   .data(dataset.people)
			   .enter()
			   .append("text")
			   .text(function (d) {
				   return d.name;
			   })
			   .attr("text-anchor", "middle")
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px");
			//Every time the simulation "ticks", this will be called
			force.on("tick", function() {
				lines.attr("x1", function(d) { return d.source.x; })
					 .attr("y1", function(d) { return d.source.y; })
					 .attr("x2", function(d) { return d.target.x; })
					 .attr("y2", function(d) { return d.target.y; });
				circles.attr("cx", function(d) { return d.x; })
					 .attr("cy", function(d) { return d.y; });
				text.attr("x", function(d) { return d.x; })
					 .attr("y", function(d) { return d.y; });
			});