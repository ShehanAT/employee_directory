$(document).ready(function(){
    
     $('#close-modal-btn').hide();
        $.ajax({
            url: 'https://randomuser.me/api/?results=12',
            dataType: 'json',
            success: function(data){
                function expandModal(id, type){
                    $(".searchPlayer").hide();
                    $("ul").css('pointer-events','none');
                    $('#'+id).css('background-color','white');
                    if (type == 'nav'){
                        if(id !== '1' || id !== '11'){
                            $('.fa-chevron-left').show();
                            $('.fa-chevron-right').show();
                        }
                        if (id == '0'){
                            $('.fa-chevron-left').hide();
                        }
                        if (id == '11'){
                            $('.fa-chevron-right').hide();
                        }
                        
                        $('.modal-container').append($($('#'+id)[0]).clone()[0]);
                        $('.modal-container section .cell_number').attr('hidden', false);
                        $('.modal-container section .address').attr('hidden', false);
                        $('.modal-container section .dob').attr('hidden', false);
                        
                    }
                    else if (type == 'modal'){
                        $('.modal-container').append($(event.currentTarget).clone());
                        $('.modal-container').show();
                        
                        $('.modal-container section .cell_number').attr('hidden', false);
                        $('.modal-container section .address').attr('hidden', false);
                        $('.modal-container section .dob').attr('hidden', false);
                            //console.log($($($($($("#"+id).children()[0]).children()[0]).children()[i])[0])[0]);
                        
                    }
                    
                }
                function hideModal(){
                    $("ul").css('pointer-events','auto');
                    $(".searchPlayer").show();
                    for(var i = 0 ; i < $('.modal-container').children().length; i++){
                        if (!isNaN(parseInt($($('.modal-container').children()[i]).attr('id')))){
                            hideDetails($($('.modal-container').children()[i]).attr('id'));
                        }
                    }
                    $('#clearfix').css('background-color','white');
                    $('.modal-container section').remove();
                    $('.modal-container').hide();
                    $('#clearfix').css('-webkit-filter','blur(0px)');
                    $('#close-modal-btn').hide();
                }
                function hideDetails(id){
                    $('#'+id).find()
                    for (var i = 4; i < 7; i++){
                        $($($($($("#"+id).children()[0]).children()[0]).children()[i])[0]).attr('hidden',true);
                    }
                }
                function removePrevious(){
                    $($('.modal-container section').first()).remove();
                }
                for(var i = 0 ; i < data.results.length; i++){
                    var firstName = JSON.stringify(data.results[i]['name']['first']).replace(/['"]+/g, '')[0].toUpperCase() + JSON.stringify(data.results[i]['name']['first']).replace(/['"]+/g, '').substring(1);
                    var lastName = JSON.stringify(data.results[i]['name']['last']).replace(/['"]+/g, '')[0].toUpperCase() + JSON.stringify(data.results[i]['name']['last']).replace(/['"]+/g, '').substring(1);
                    var fullName = firstName + ' ' + lastName;
                    var username = "Username: " + data.results[i]['login']['username'];
                    var city = "City: " + data.results[i]['location']['city'];
                    var cell_number = data.results[i]['cell'].replace(/['"]+/g, '');
                    var email = "Email: " + data.results[i]['email'];
            
                    var profilepic = data.results[i]['picture']['large'];
                    var address = "Address:" + data.results[i]['location']['street']+ ", " +data.results[i]['location']['city'] + ", " + data.results[i]['location']['state'] + " " +"PostCode: " +data.results[i]['location']['postcode'];
                    var dob = ("Date of Birth: " + data.results[i]['dob']).replace(/['"]+/g, '');
                    $('#clearfix').append('<section class="box" id="'+i+'" style=""><a target="_blank" ><div class="employee" >' +'<p style="font: bold 16px solid">' + fullName +  '</p>' +'\n' + '<p>'+ city + '</p>' + '\n' + '<p>'+ email + '</p>'+'\n' +'<p class="username" >'+ username +'</p>'+ '<p class="cell_number" hidden>Phone Number: '+ cell_number +'</p>'+ '<p class="address" hidden>'+ address +'</p>' + '<p class="dob" hidden>'+ dob +'</p>' +'<img style="border-radius: 70px;" src="'+ profilepic +'"/></div></a></section>');
                    
                    
                }; 
                
                $(".box").on('click', function(event){
                    if ($("#searchTerm").val() !== ''){
                        $('.fa-chevron-left').hide();
                        $('.fa-chevron-right').hide();
                        $('#close-modal-btn').show();
                        expandModal($(event.currentTarget).attr('id'),'modal');
                    }
                    if ($("#searchTerm").val() == ''){
                        if ($(event.currentTarget).attr('id') !== '1' || $(event.currentTarget).attr('id') !== '11'){
                            $('.fa-chevron-left').show();
                            $('.fa-chevron-right').show();
                            
                        }
                        if ($(event.currentTarget).attr('id') == '0'){
                            $('.fa-chevron-left').hide();
                        }
                        if ($(event.currentTarget).attr('id') == '11'){
                            $('.fa-chevron-right').hide();
                        }
                        $("modal-container").css('pointer-events','all');
                        expandModal($(event.currentTarget).attr('id'), 'modal');
                        $('#close-modal-btn').show();
                        $('body').css('filter','blur(10px);');
                        $('#clearfix').css('-webkit-filter','blur(10px)');
                        $('#clearfix').css('background-color','white');
                    }
                    
                });
                $("#close-modal-btn").on('click', function(event){
                    hideModal();
               });
               $('#searchUsername').on('click', function(event){
                   
                   if ($(event.currentTarget).text() == 'Searching By Username'){
                       $(event.currentTarget).text('Searching By Name');
                   }
                   else if ($(event.currentTarget).text() == 'Searching By Name'){
                       $(event.currentTarget).text('Searching By Username');
                   }
                    
               });
               $('#searchTerm').on('keyup',function(){
                var searchTerm = $("#searchTerm").val();
                var employeesList = $('.box');
                if ($('#searchUsername').text() == 'Searching By Name'){
                    employeesList.each(function(key, value){
                        if (($("#"+value.id).children().children().children()[0].textContent).indexOf(searchTerm.toLowerCase()) !== -1 || ($("#"+value.id).children().children().children()[0].textContent).indexOf(searchTerm.toUpperCase()) !== -1 || ($("#"+value.id).children().children().children()[0].textContent).indexOf(searchTerm) !== -1 || ($("#"+value.id).children().children().children()[0].textContent).indexOf(searchTerm[0].toUpperCase() + searchTerm.substring(1)) !== -1){
                            $("#"+value.id).css('display','block');
                            
                        }
                        else{
                            
                            $("#"+value.id).css('display','none');
                        }
                       });
                }
                if ($('#searchUsername').text() == 'Searching By Username'){
                    employeesList.each(function(key, value){
                        if ($("#"+value.id).children().children().children()[3].textContent.replace().indexOf(searchTerm) !== -1){
                            $("#"+value.id).css('display','block');
                        }
                        else{
                            $("#"+value.id).css('display','none');
                        }
                    })
                }
               
               });
               $('.clearfix .box').on({
                   mouseenter: function(event){
                       $(event.currentTarget).css('background-color','#A6EF2A');
                   },
                   mouseleave: function(event){
                       $(event.currentTarget).css('background-color','white');
                   }
            });
            $('.fa').on('click', function(event){
                if (event.target.id == 'left'){            
                    var currentIndex = $('.modal-container section').attr('id');
                    expandModal(currentIndex-1, 'nav');
                }
                else if (event.target.id == 'right'){
                    var currentIndex = $('.modal-container section').attr('id');
                    expandModal((parseInt(currentIndex))+1, 'nav');
                }
                removePrevious();
                
            });
                } ,
            error: function(data){
                console.log(data);
            }
        });
       
});

