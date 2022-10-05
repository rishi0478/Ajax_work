

$(document).ready(function () {

    $("#btn").click(function () {

        let nm = $("#nameid").val()
        let em = $("#emailid").val()
        let pswrd = $("#passwordid").val()
        let csrf = $("input[name=csrfmiddlewaretoken").val()
        let unique_id = $("#usr_id").val()

        if (nm == "") {

            console.log("enter your name")
            document.getElementById("hid_div").hidden = false;
            document.getElementById("msg").innerHTML = "Enter Your name"
            $("#hid_div").show().delay(3000).fadeOut();

        } else if (em == "") {

            console.log("Enter you email")
            document.getElementById("hid_div").hidden = false;
            document.getElementById("msg").innerHTML = "Enter Your email"
            $("#hid_div").show().delay(3000).fadeOut();

        } else if (pswrd == "") {

            console.log("Enter you password");
            document.getElementById("hid_div").hidden = false;
            document.getElementById("msg").innerHTML = "Enter Your password"
            $("#hid_div").show().delay(3000).fadeOut();

        } else {

            var mydata = { "name": nm, 'email': em, "password": pswrd, "csrfmiddlewaretoken": csrf , "my_id":unique_id }

            console.log(mydata);
            $.ajax({
                url: "",
                type: "POST",
                data: mydata,

                success: function (data) {
                    console.log(data);
                    var user_data = data['raw_data']
                    if (data['status'] == 'Invalid data') {
                        document.getElementById("hid_div").hidden = false;
                        document.getElementById("msg").innerHTML = "Invaid data!"
                        $("#hid_div").show().delay(3000).fadeOut();

                    } else if (data['status'] == 'save') {
                        document.getElementById("hid_div").hidden = false;
                        document.getElementById("msg").innerHTML = "Data is save"
                        $("#hid_div").show().delay(3000).fadeOut();
                        $('form')[0].reset();

                        var output = ""

                        for (i = 0; i < user_data.length; i++) {
                            output += "<tr><td>" + user_data[i].id + "</td><td>" + user_data[i].name +
                                "</td><td>" + user_data[i].email + "</td><td>" + user_data[i].password +
                                "</td><td> <input type='button' id='edit-btn' class='btn btn-outline-primary' data=" + user_data[i].id + " value='Edit'>" + "<td> <input type='button' id='delete-btn' data=" + user_data[i].id + " class='btn btn-outline-dark' value='Delete'>"
                        }

                        $("#tbody").html(output);
                    }
                }
            })


        }


    });

    $("tbody").on("click", "#delete-btn", function () {
        let key = $(this).attr("data");
        // console.log(key,"----HERE-----");
        var mydel = this;
        console.log(mydel, '------HERE WE GO--------');

        let csrf = $("input[name=csrfmiddlewaretoken").val()
        let id = { unique_key: key, csrfmiddlewaretoken: csrf }
        var root = "dl"

        $.ajax({
            url: root,
            type: "POST",
            data: id,

            success: function (data) {
                console.log(data)
                if (data['Status'] == 1) {
                    console.log("YES")
                    $(mydel).closest("tr").fadeOut()
                }
            }


        })
    })

    $("tbody").on("click", "#edit-btn", function () {
        var data = $(this).attr("data")
        console.log(data)
        console.log(this)
        let id = {key:data}

        $.ajax({
            url : 'edit',
            type : "GET",
            data: id,

            success: function(data){
                console.log(data['response'])
                let details = data['response']
                $("#nameid").val(details['name'])
                $("#emailid").val(details['email'])
                $("#passwordid").val(details['password'])
                $("#usr_id").val(details['id'])
            }
        })
    })
});



