$(document).ready(function(){
   
     $('#close-modal-btn').hide();
        $.ajax({//ajax request to the api 
            url: 'https://randomuser.me/api/?results=12',
            dataType: 'json',
            success: function(data){
                function expandModal(id, type){//function that shows the in depth employee information in a modal and/or shows the next employee when the arrow buttons are clicked
                    $(".searchPlayer").hide();
                    $("ul").css('pointer-events','none');
                    $('#'+id).css('background-color','white');
                    if (type == 'nav'){//differentiate when the user clicks on the arrow navigation buttons
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
                    else if (type == 'modal'){//differentiate when user clicks on the modal 
                        $('.modal-container').append($(event.currentTarget).clone());
                        $('.modal-container').show();
                        
                        $('.modal-container section .cell_number').attr('hidden', false);
                        $('.modal-container section .address').attr('hidden', false);
                        $('.modal-container section .dob').attr('hidden', false);
                            //console.log($($($($($("#"+id).children()[0]).children()[0]).children()[i])[0])[0]);
                        
                    }
                    
                }
                function hideModal(){//function that hide the modal window 
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
                function hideDetails(id){//function that hides the in depth employee details when the modal is hidden
                    $('#'+id).find()
                    for (var i = 4; i < 7; i++){
                        $($($($($("#"+id).children()[0]).children()[0]).children()[i])[0]).attr('hidden',true);
                    }
                }
                function removePrevious(){//function that removes the previous employee that the modal-container div holds
                    $($('.modal-container section').first()).remove();
                }
                for(var i = 0 ; i < data.results.length; i++){//getting the employee information for the api request
                    var firstName = JSON.stringify(data.results[i]['name']['first']).replace(/['"]+/g, '')[0].toUpperCase() + JSON.stringify(data.results[i]['name']['first']).replace(/['"]+/g, '').substring(1);
                    var lastName = JSON.stringify(data.results[i]['name']['last']).replace(/['"]+/g, '')[0].toUpperCase() + JSON.stringify(data.results[i]['name']['last']).replace(/['"]+/g, '').substring(1);
                    var fullName = firstName + ' ' + lastName;
                    var username = "Username: " + data.results[i]['login']['username'];
                    var city = "City: " + data.results[i]['location']['city'];
                    var cell_number = data.results[i]['cell'].replace(/['"]+/g, '');
                    var email = "Email: " + data.results[i]['email'];
            
                    var profilepic = data.results[i]['picture']['large'];
                    console.log(data);
                    var address = "Address:" + data.results[i]['location']['street']+ ", " +data.results[i]['location']['city'] + ", " + data.results[i]['location']['state'] + ", " +data.results[i]['nat'] + ", " +"PostCode: " +data.results[i]['location']['postcode'];
                    var dob = ("Date of Birth: " + data.results[i]['dob']).replace(/['"]+/g, '');
                    $('#clearfix').append('<section class="box" id="'+i+'" style=""><a target="_blank" ><div class="employee" >' +'<p style="font: bold 16px solid">' + fullName +  '</p>' +'\n' + '<p>'+ city + '</p>' + '\n' + '<p>'+ email + '</p>'+'\n' +'<p class="username" >'+ username +'</p>'+ '<p class="cell_number" hidden>Phone Number: '+ cell_number +'</p>'+ '<p class="address" hidden>'+ address +'</p>' + '<p class="dob" hidden>'+ dob +'</p>' +'<img style="border-radius: 70px;" src="'+ profilepic +'"/></div></a></section>');
                    //appending the employee information to the clearfix div
                    
                }; 
                
                $(".box").on('click', function(event){//event listener that is triggered when any of the employee box in the clearfix div is clicked
                    if ($("#searchTerm").val() !== ''){//if search feature is used then the user clicks on a employee box hide the arrow buttons and display the close button
                        $('.fa-chevron-left').hide();
                        $('.fa-chevron-right').hide();
                        $('#close-modal-btn').show();
                        expandModal($(event.currentTarget).attr('id'),'modal');
                    }
                    if ($("#searchTerm").val() == ''){//if the search feature is not used and the user clicks on a employee box show the arrow buttons and the close button
                        if ($(event.currentTarget).attr('id') !== '1' || $(event.currentTarget).attr('id') !== '11'){
                            $('.fa-chevron-left').show();
                            $('.fa-chevron-right').show();
                            
                        }
                        if ($(event.currentTarget).attr('id') == '0'){//if employee with id 0 is navigated to or clicked on hide the left arrow button
                            $('.fa-chevron-left').hide();
                        }
                        if ($(event.currentTarget).attr('id') == '11'){//if employee with id 11 is navigated to or clicked on hide the right arrow button 
                            $('.fa-chevron-right').hide();
                        }
                        $("modal-container").css('pointer-events','all');//prevents the user from clicking the clearfix div when the modal window is open
                        expandModal($(event.currentTarget).attr('id'), 'modal');
                        $('#close-modal-btn').show();
                        $('body').css('filter','blur(10px);');//blur the clearfix div 
                        $('#clearfix').css('-webkit-filter','blur(10px)');
                        $('#clearfix').css('background-color','white');
                    }
                    
                });
                $("#close-modal-btn").on('click', function(event){//event listener that calls the hideModal function on click
                    hideModal();
               });
               $('#searchUsername').on('click', function(event){//if the search toggle button is clicked switch the button text to name or username depending on the previous text
                   
                   if ($(event.currentTarget).text() == 'Searching By Username'){
                       $(event.currentTarget).text('Searching By Name');
                   }
                   else if ($(event.currentTarget).text() == 'Searching By Name'){
                       $(event.currentTarget).text('Searching By Username');
                   }
                    
               });
               $('#searchTerm').on('keyup',function(){//when user enters text into the search field filter the employees depending on name or username
                var searchTerm = $("#searchTerm").val();
                var employeesList = $('.box');
                if ($('#searchUsername').text() == 'Searching By Name'){//if the serach button is set to searching by name filter the employees by name
                    employeesList.each(function(key, value){
                        if (($("#"+value.id).children().children().children()[0].textContent).indexOf(searchTerm.toLowerCase()) !== -1 || ($("#"+value.id).children().children().children()[0].textContent).indexOf(searchTerm.toUpperCase()) !== -1 || ($("#"+value.id).children().children().children()[0].textContent).indexOf(searchTerm) !== -1 || ($("#"+value.id).children().children().children()[0].textContent).indexOf(searchTerm[0].toUpperCase() + searchTerm.substring(1)) !== -1){
                            $("#"+value.id).css('display','block');
                            
                        }
                        else{
                            
                            $("#"+value.id).css('display','none');
                        }
                       });
                }
                if ($('#searchUsername').text() == 'Searching By Username'){//if the search button is set to searching by username filter the employees by username
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
               $('.clearfix .box').on({//change background color when the employee boxes are hovered on 
                   mouseenter: function(event){
                       $(event.currentTarget).css('background-color','#A6EF2A');
                   },
                   mouseleave: function(event){
                       $(event.currentTarget).css('background-color','white');
                   }
            });
            $('.fa').on('click', function(event){//switch the employee depending on the employee id and the arrow button that is clicked when arrow button is clicked
                if (event.target.id == 'left'){            
                    var currentIndex = $('.modal-container section').attr('id');
                    expandModal(currentIndex-1, 'nav');
                }
                else if (event.target.id == 'right'){
                    var currentIndex = $('.modal-container section').attr('id');
                    expandModal((parseInt(currentIndex))+1, 'nav');
                }
                removePrevious();//remove the previous employee in the modal-container div 
                
            });
                } ,
            error: function(data){
                console.log(data);
            }
        });
       
});

