$(document).ready(function () {
    var result = '';
    var digits = '';
    var start = true;
    var history = [];
    $('#result').text(0);

    function initialize(re, d) {
        result = re.toString();
        digits = d.toString();

    }

    $('button').click(function () {

        switch ($(this).attr('id')) {
            case "c":
                start = true;
                display(0, '');
                initialize('', '');
                break;

            case "ce":
                if (digits != '') {
                    initialize(result.slice(0, result.length - 1), digits.slice(0, digits.length - 1));
                    display(digits, result);
                }
                else {
                    start = true;
                    display(0, '');
                    initialize('', '');
                }
                break;

            case "equals":
                if (start)
                    display(0);
                else {
                    result = result + ($('#result').text().indexOf('-') != -1 ? "(" + $('#result').text() + ")" : $('#result').text());
                    //Check for binary fractions
                    var r = trim(result);
                    display(r, "");
                    history.unshift(result + " " + "=" + " " + r);
                    initialize('', '');
                }
                break;

            case "toggle":
                var neg = $("#result").text();
                display(-neg);
                break;

            case ".": 
                digits = (digits != '' ? digits + ".": 0+".");
                display(digits);
                break;

            case "%":
                var temp = $('#result').text();
                var r = result;
                //If equation exists
                result = digits != ''? trim(result.slice(0, result.length-1)) : temp == history[0].split("= ")[1] ? temp : 0;

                temp = trim(result * (temp / 100));
                //If temp is too long due to binary fraction

                display(temp,r+temp);
                initialize(r, digits);
                break;

            default: 

                if (isNaN($(this).attr('id'))) {
                    // Add paranthesis if the number is negative
                    result = result + ($('#result').text().indexOf('-') != -1 ?  "(" + $('#result').text() + ")" : $('#result').text()) + $(this).attr('id');
                    if (start) {
                        display(0);
                        initialize('', '');
                    }
                    display(trim(result.substring(0, result.length - 1)), result);
                    digits = '';
                }
                else {
                    start = false;
                    digits = digits + $(this).attr('id');
                    display(digits);
                }
            }

    });

    $('#history').click(function () {
        $('#historyCont').toggle();
        $('#inputCont').toggle();

        if (history.length == 0)
            $('#historyCont').html("<h5>There's no history yet</h4>");
        else {
            var html = '';
            for (var i = 0; i < history.length; i++) {
                var temp = history[i].replace(/\+/g, ' + ').replace(/\-/g, ' - ').replace(/\*/g, ' × ').replace(/\//g, ' ÷ ');
                html = html + "<div class='resultDisplay'>" + temp + "</div>";
                if (i == 2)
                    break;
            }
            //html = html.replace(/\+/g, ' + ').replace(/\-/g, ' - ').replace(/\*/g, ' × ').replace(/\//g, ' ÷ ');
            $('#historyCont').html(html);
        }
    });

});


function display(input, show) {
    if (show != null) {
        show = show.replace(/\+/g, ' + ').replace(/\-/g, ' - ').replace(/\*/g, ' × ').replace(/\//g, ' ÷ ');
        $('#equation').text(show);
    } 
     $('#result').text(input);


}

function trim(val) {
    val = eval(val);
    return (val != Math.trunc(val) && val.toString().split('.')[1].length > 10)? val.toFixed(5) : val;
}

