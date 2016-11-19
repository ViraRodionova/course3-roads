/**
 * Created by bepa on 13.11.16.
 */

var userName;
var signedIn;
// var user;
var objJSONAddRoutes;
var tableData;

function formTableRows(routes) {
    tableData = routes;

    console.log(tableData);

    // var count = 0;
    var html = "";

    if (tableData.length == 0) return html;

    tableData.forEach(function (item, i) {
        // count = item.ways.length;

        // html += "<tr data-toggle=\"collapse\" data-target=\"#accordion"+i+"\" class=\"clickable\">" +
        //     "<td>"+ item.address.start +"</td>" +
        //     "<td>"+ item.address.end +"</td>" +
        //     "<td><span style='border-radius:25px;background-color:#c8e5bc;'>"+ count +"</span></td>" +
        //     "</tr>" +
        //     "<tr>" +
        //     "<td colspan=\"3\">" +
        //     "<div id=\"accordion"+i+"\" class=\"collapse\">" +
        //     "<table class=\"table table-hover\">";

        // item.ways.forEach(function (item1, j) {
        //     html += "<tr><td>Шлях"+ (j+1) +"</td></tr>"
        // });
        // html += "</table></div></td></tr>";

        html += "<tr>" +
            "<td>"+ item.address.start +"</td>" +
            "<td>"+ item.address.end +"</td>" +
            "</tr>";
    });
    // console.log(html);
    return html;
}