

queue()
    .defer(d3.json, "/GOT/CharacterDeaths")
    .defer(d3.json, "/GOT/Battles")
    .await(makeGraphs);

function makeGraphs(error, dataJson, dataBattlesJson) {
    var data = dataJson;
    // console.log(dataBattlesJson)
    var dataBattles = dataBattlesJson;
    
    function print_filter(filter) {
    var f = eval(filter);
    if (typeof (f.length) != "undefined") {} else {}
    if (typeof (f.top) != "undefined") {f = f.top(Infinity);} else {}
    if (typeof (f.dimension) != "undefined")
    {f = f.dimension(function(d) {
    return "";}).top(Infinity);
    }
    else
    {}
    console.log(
    filter + "(" + f.length + ") = " +
    JSON.stringify(f)
    .replace("[","[\n\t")
    .replace("]","\n]")
    );
    }

    data.forEach(function(d){

        d.Allegiances = d.Allegiances.replace("House ", "")
        d.Allegiances = d.Allegiances.replace("None", "No known Allegiances")
        if (d.Nobility == 1){
            d.Nobility="Noble"
        }
        else{
            d.Nobility ="Common"
        }

        if (d.Gender == 0){
            d.Gender="Female"
        }
        else{
            d.Gender ="Male"
        }

        if (String(d.Book_of_Death)== "1"){
            d.Book_of_Death="1:A Game of Thrones"
        }
        else if  (String(d.Book_of_Death)== "2") {
            d.Book_of_Death="2:A Clash of Kings"
        }
        else if (String(d.Book_of_Death)== "3"){
            d.Book_of_Death="3:A Storm of Swords"
        }
        else if (String(d.Book_of_Death)== "4"){
            d.Book_of_Death="4:A Feast for Crows"
        }
        else if (String(d.Book_of_Death)== "5"){
            d.Book_of_Death="5:A dance with Dragons"
        }
        else{
            d.Book_of_Death="0:Outside of Ice and Fire Timeline"
        }

    });

    var ndx = crossfilter(data);

    var allegiancesDim = ndx.dimension(function(d){
        return d.Allegiances;
    });

    var deathsByAllegiance = allegiancesDim.group();

    var genderDim = ndx.dimension(function(d){
        return d.Gender;
    });

    var deathsByGender = genderDim.group();
    
    var nobilityDim = ndx.dimension(function(d){
        return d.Nobility;
    });

    var deathsByNobility = nobilityDim.group();

    var deathBookDim = ndx.dimension(function(d){
        return d.Book_of_Death;
    });

    var deathBookGroup = deathBookDim.group()


    var deathLineChart = dc.barChart("#chart­line­deaths-per-book");
    deathLineChart
    .width(1150)
    .height(400)
    .dimension(deathBookDim)
    .group(deathBookGroup)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal);




    var hitspieChart = dc.pieChart("#chart­alligance");
    hitspieChart
    .width(560)
    .height(560)
    .innerRadius(50)
    .dimension(allegiancesDim)
    .group(deathsByAllegiance);


    var genderpieChart = dc.pieChart("#chart­gender");
    genderpieChart
    .width(250)
    .height(250)
    .slicesCap(2)
    .innerRadius(50)
    .dimension(genderDim)
    .group(deathsByGender);
    
    var nobilityChart = dc.pieChart("#chart­nobility");
    nobilityChart
    .width(250)
    .height(250)
    .slicesCap(2)
    .innerRadius(50)
    .dimension(nobilityDim)
    .group(deathsByNobility);

    // battles logic
    var ndxbat = crossfilter(dataBattles);

    var attackerDim = ndxbat.dimension(function(d){
        return d.attacker_1;
    });

    var attackerByNumber = attackerDim .group();
    
    var deffenderDim = ndxbat.dimension(function(d){
        return d.defender_1;
    });

    var deffenderByNumber = deffenderDim .group();

    var battleTypeDim = ndxbat.dimension(function(d){
        return d.battle_type;
    });

    var battleTypeByNumber = battleTypeDim .group();

    var attackerChart = dc.pieChart("#chart­attacker");
    attackerChart
    .width(300)
    .height(300)
    .innerRadius(50)
    .dimension(attackerDim)
    .group(attackerByNumber);
    
    var deffenderChart = dc.pieChart("#chart­deffender");
    deffenderChart
    .width(300)
    .height(300)
    .innerRadius(50)
    .dimension(deffenderDim)
    .group(deffenderByNumber);

    var battleChart = dc.pieChart("#chart­battle-type");
    battleChart
    .width(300)
    .height(300)
    .innerRadius(50)
    .dimension(battleTypeDim)
    .group(battleTypeByNumber);

    dc.renderAll();

};


