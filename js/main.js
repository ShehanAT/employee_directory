$(document).ready(function(){
    /*$(function(){
        $('a[rel=lightbox').lightBox({
            containerResizeSpeed: 250,
            fixedNavigation: true
        });
        $('a[rel=2ndlightbox').lightBox({
            overlayBgColor: '#fff',
            overlayOpacity: 0.7
        });
    });
    $(function() {
        $('a[@rel*=lightbox]').lightBox({
         overlayBgColor: '#fff',
         overlayOpacity: 0.6,
             fixedNavigation: false,
         imageLoading: 'images/loading.gif',
         imageBtnClose: 'images/close.gif',
         imageBtnPrev: 'images/prev.gif',
         imageBtnNext: 'images/next.gif',
         containerResizeSpeed: 350,
         txtImage: 'Imagem',
         txtOf: 'de'
        });
     });*/
     $('#close-modal-btn').hide();
        $.ajax({
            url: 'https://randomuser.me/api/?results=12',
            dataType: 'json',
            success: function(data){
                for(var i = 0 ; i < data.results.length; i++){
                    var firstName = JSON.stringify(data.results[i]['name']['first']).replace(/['"]+/g, '')[0].toUpperCase() + JSON.stringify(data.results[i]['name']['first']).replace(/['"]+/g, '').substring(1);
                    var lastName = JSON.stringify(data.results[i]['name']['last']).replace(/['"]+/g, '')[0].toUpperCase() + JSON.stringify(data.results[i]['name']['last']).replace(/['"]+/g, '').substring(1);
                    var fullName = firstName + ' ' + lastName;
                    var username = "Username: " + data.results[i]['login']['username'];
                    var city = "City: " + data.results[i]['location']['city'];
                    var cell_number = data.results[0]['cell'];
                    var email = "Email: " + data.results[i]['email'];
            
                    var profilepic = data.results[i]['picture']['large'];
                    var address = "Address:" + data.results[i]['location']['street']+ ", " +data.results[i]['location']['city'] + ", " + data.results[i]['location']['state'] + " " +"PostCode: " +data.results[i]['location']['postcode'];
                    var dob = ("Date of Birth: " + data.results[i]['dob']).replace(/['"]+/g, '');
                    $('#clearfix').append('<section class="box" id="'+i+'" style=""><a target="_blank" ><div class="employee" >' +'<p style="font: bold 16px solid">' + fullName +  '</p>' +'\n' + '<p>'+ city + '</p>' + '\n' + '<p>'+ email + '</p>'+'\n' +'<p class="username" hidden>'+ username +'</p>'+ '<p class="cell_number" hidden>"'+ cell_number +'"</p>'+ '<p class="address" hidden>'+ address +'</p>' + '<p class="dob" hidden>'+ dob +'</p>' +'<img style="border-radius: 70px;" src="'+ profilepic +'"/></div></a></section>');
                    
                    
                }; 
                
                $(".box").on('click', function(event){
                    console.log('!!!');
                    $('.modal-container').append(event.currentTarget);
                    $('.modal-container .box').addClass('selected');   
                    $('.modal-container').css('display','block');
                    $('.modal-container').show();
                    $('#close-modal-btn').show();
                    var username = $($('.modal-container')[0]).find('.username')[0];
                    var cell_number = $($('.modal-container')[0]).find('.cell_number')[0];
                    var address = $($('.modal-container')[0]).find('.address')[0];
                    var dob = $($('.modal-container')[0]).find('.dob')[0];
                    $(dob).removeAttr('hidden').css('display','block');
                    $(address).removeAttr('hidden').css('display','block');
                    $(cell_number).removeAttr('hidden').css('display','block');
                    $(username).removeAttr('hidden').css('display','block');
                    $('body').css('filter','blur(10px);');
                    $('#clearfix').css('-webkit-filter','blur(10px)');
                    $('#clearfix').css('background-color','black');
                
                });
                $("#close-modal-btn").on('click', function(event){
                    $('.modal-container').hide();
                    $('#clearfix').css('-webkit-filter','blur(0px)');
                    $('.modal-container .box a .employee .username').attr('hidden','hidden').hide();
                    $('.modal-container .box a .employee .cell_number').attr('hidden','hidden').hide();
                    $('.modal-container .box a .employee .address').attr('hidden','hidden').hide();
                    $('.modal-container .box a .employee .dob').attr('hidden','hidden').hide();
                    $('#clearfix').css('background-color','white');
                    $('#clearfix').append($('.selected').removeClass('selected').css('background-color','white'));
                    $('#close-modal-btn').hide();
                    
               });
               $('#searchTerm').on('change',function(){
                var searchTerm = $("#searchTerm").val();
                var employeesList = $('.box');
                employeesList.each(function(key, value){
                console.log(searchTerm);
                 if (($("#"+value.id).children().children().children()[0].textContent).indexOf(searchTerm) >= 0){
                     $("#"+value.id).css('display','block');
                     console.log('!!!');
                 }
                 else{
                     console.log((searchTerm).indexOf($("#"+value.id).children().children().children()[0]));
                     console.log($("#"+value.id).children().children().children()[0]);
                     $("#"+value.id).css('display','none');
                 }
                });
               });
               $('.clearfix .box').on({
                   mouseenter: function(event){
                       $(event.currentTarget).css('background-color','green');
                   },
                   mouseleave: function(event){
                       $(event.currentTarget).css('background-color','white');
                   }
            });
               
               /*
               for (var i = 0 ; i < 12; i+=3){
                   $('<div class="col-md-3">').insertBefore("#"+i)
                   //$('</div>').after("#"+i+3)
               }
               for (var i = 0 ; i < 12; i+=3){
                   var col= i/3
                   $('.col-md-3')[col].append($('.box')[i]);
                   $('.col-md-3')[col].append($('.box')[i+1]);
                   $('.col-md-3')[col].append($('.box')[i+2]);
               }
               */
            /*    
            $('.box').on('mouseover', (event) => {
                $(event.currentTarget).css('background-color','green');
                //event.target.parentElement.parentElement.style.background = 'green';
            });
            $('.box').on('mouseout', (event) => {
                $(event.currentTarget).css('background-color','');
                //event.target.parentElement.parentElement.style.backgroundColor = '';
            });
            */
                } ,
            error: function(data){
                console.log(data);
            }
        });
       
});

