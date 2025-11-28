const dateFormatter = d3.timeFormat("%c")

fetch('https://api.data.gov.sg/v1/environment/psi')
    .then(r => r.json())
    .then(data => {

        const humandate = dateFormatter(new Date(data.items[0].update_timestamp))
        d3.select('#timestring').text(humandate);
        let readings = data.items[0].readings;
        Object.keys(readings).forEach(metric => {
            let row = d3.select('#PSItable').append('tr');
            row.append('td').text(metric);
            ['west', 'east', 'central', 'south', 'north'].forEach(region => {
                row.append('td').text(readings[metric][region]);
            });
        });
    })