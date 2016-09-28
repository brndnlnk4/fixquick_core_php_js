$('#homeTabs').tabs();	


$('.sCartSection').draggable();

 
////N0TIFICATION MODAL
$("button[name='notificationsBtn']").click(function(){      
        $('#myModal2 .modal-content').load('/fixitquick/incl/notifications.php');
        $('#myModal2 .modal-content').css({
            'min-width':'490px',
            'width':'50%',
            'background-color':'white',
            'height':'auto'
        })        
        $('#myModal2').fadeIn('fast');
    })
 
////hide left menu if on home page
document.getElementById('homeTabs').onclick = function(){
    var pg = $.trim(document.getElementById('current_pg_name').value);
    var menu = document.getElementById('leftMenu');
   
    if(!pg || pg == 'home'){
         $(menu).fadeOut('fast');
        $('#homeTabs > ul').animate({'width':'100%'},'fast');
    }else{
         $(menu).fadeIn('fast');;
        $('#homeTabs > ul').animate({'width':'75%'},'fast');
    }///END if
}///END onclck 
$(function(){
    document.getElementById('leftMenu').style.display = 'none';
})


////IF ANY MODAL OPEN THEN ALLOW OUTSIDE CLICK EVENT TO HIDE MODAL
window.onclick = function(){
	if($('#myModal2').css('display') == 'block'){
		if(event.target.id == 'myModal2'){
			$('#myModal2').fadeOut('fast');
		}/////END if
	}///END if
}///END onclick
$(function(){
	if($('#myModal2').css('display') == 'block'){
		window.onclick = function(){
			if(event.target.id == 'myModal2'){
				$('#myModal2').fadeOut('fast');
			}/////END if
		}////END onclick 	
	}///END if
})

    
////MY GARAGE MODAL
function delCarFrmGar(id_num){
    $("li[gar-li='"+id_num+"']").hide('fast'); ////hide li
    $("tr[gar-tr='"+id_num+"']").hide('fast'); ////hide tr
}/////END fnk
/////////////////////////////////
$("button[name='garageBtn']").click(openGarage);

///GARAGE MODAL
function openGarage(){
    $('#myModal2 .modal-content').load('/fixitquick/incl/pullGarage.php',function(){
        $('#myModal2 .modal-content').css({
            'width':'60%',
            'height':'auto',
            'background-color':'white',
            'min-height':$('.tireSizeTbl').height()
        })        
    });

    $('#myModal2').fadeIn('slow');
     window.onclick = function(){
        if(event.target.id == 'myModal2'){
            $('#myModal2').fadeOut('fast');
        }/////END if
     }    
}///END fn
/////////////////////////////////
function addCar2Gar(){
    $('#myModal2 .modal-content').load('/fixitquick/incl/makes.php',function(){
        $('#myModal2 .modal-content').css({
            'width':'70%',
            'background-color':'transparent',
            'height':'auto'
        })        
        $('#myModal2').fadeIn('fast');     
    });

     window.onclick = function(){
        if(event.target.id == 'myModal2'){
            $('#myModal2').fadeOut('fast');
        }/////END if
    }////END onclick     
}////END fn
/////////////////////////////////
function chooseVehicle(){
    var modal = document.getElementById('myModal2');
    
    $('.modal-content').addClass('fade');
    
    $(modal).fadeIn('slow',function(){       
        $('.modal-content').load('/fixitquick/incl/makes.php',function(){
        $('.modal-content').css({
            'width':'70%',
            'display':'block',
            'min-height':$('#addCars').height(),
            'background-color':'#ddd',
            'margin':'30px auto'
        });     
        
        //$(modal).removeClass('fade');
        $('.modal-content').addClass('fade in');
        });
        //$('.modal-content').fadeTo('1','slow');
    })

}///END fn


//////ADD VEHICLE MODAL
function addCar(carMake){
    $.get('/fixitquick/incl/pullModels.php',{carMake:carMake},function(data){
        $('#addCars').slideUp('slow',function(){
            $('#addModel').html(data);
            $('.modal-content').css({
                'height':'auto',
                'min-height':$('#addModel').height()
            });
            $('.modal-content').animate({
                'background-color':'white',
                'width':'60%'
            },'slow');         
            
            $('#addModel').slideDown('slow');
        })
    })
}////END fn  

function vehicleAddProcess(){
    if(this.value !== ''){
        $('.addCarBtn').removeAttr('disabled');
        $('.addCarBtn').attr('title','Click here to add Car to Garage');
    }else{
        $('.addCarBtn').attr('disabled','');
    }///END ifelse

	var carMake = document.getElementsByName('carMake')[0].value;
	var carModel = document.getElementsByName('carModel')[0].value;
	var carYear = document.getElementsByName('carYear')[0].value;
	
	console.log(carYear, carMake, carModel);
	
    $('.addCarBtn').click(function(){
        $('#myModal2').fadeOut('fast',function(){
			
			$.post('/fixitquick/incl/ajax_process.php',{
				add2gar:true,
				carMake:carMake,
				carModel:carModel,
				carYear:carYear
			},function(add_confirm){
                $('#garageCarsOutput').html(add_confirm);
			})
			 popUpMsg('Successfully Added New Vehicle');
		});   
    })           
 }////END fn

///DELETE CAR FROM GARAGE PROCESS
function delFromGar(car_id){
    $.post('/fixitquick/incl/ajax_process.php',{
        delFromGar:true,
        car_id:car_id
    },function(r){
        $('#garageCarsOutput').html(r);
    })    
}//END fn

///DELETE CAR FROM SIDEBAR MODAL GARAGAE PROCESS
function delFromGar4modal(car_id){
    $.post('/fixitquick/incl/ajax_process.php',{
        delFromGarModal:true,
        car_id:car_id
    },function(r){
        $('#garageModalOuput').html(r);
        
          /////REFRESH VEHICLES TAB ON HOME PAGE
         $('#garageCarsOutput').load('/fixitquick/incl/refreshGarage.php');        
    })    
}////END fn

////CHANCHE CAR SELECTION IN GARAGE
function changeCarInGarage(car_row_id){
    
     $('#myModal2 .modal-content').load('/fixitquick/incl/changeCarInGarage.php',function(){
        $('#upd8yr,#upd8vehModel').change(function(){
            if($('#upd8vehModel').val() && $('#upd8yr').val()){
                $('.upd8CarBtn').removeAttr('disabled');
            }else{
                $('.upd8CarBtn').attr('disabled','');
            }//END if
        })
            $('.upd8CarBtn').on('click',function(){
                var makeModel = $('#upd8vehModel').val();
                var year = $('#upd8yr').val();
                
              $.post('/fixitquick/incl/ajax_process.php',{
                    changeVehicle:true,
                    car_row_id:car_row_id,
                    makeModel:makeModel,
                    year:year
              },function(r){
                  if($.trim(r) == 'ok'){
                      $('#myModal2').fadeOut('fast',function(){
                          popUpMsg('Sucessfully Changed Vehicle');
                      })
                  }///END if
                  /////REFRESH VEHICLES TAB ON HOME PAGE
                 $('#garageCarsOutput').load('/fixitquick/incl/refreshGarage.php');
              })
            })
     });
}///END fn

////TOGGLE THE SUB CAR EDIT BUTTONS IN GARAGE MODAL
function tglGarageCarEditBtns(car_id){
    var thisButon = $('tr[gar-tr="'+car_id+'"] .subBtnTglBtn');
    ///add toggle class
    if($(thisButon).hasClass('toggled')){
        $('.btnTglBtn'+car_id).removeClass('toggled');        
        $('.btnTglBtn'+car_id+' #editIcon').attr('class','fa fa-cog fa-fw');        
    }else{
        $('.btnTglBtn'+car_id).addClass('toggled');
        $('.btnTglBtn'+car_id+' #editIcon').attr('class','fa fa-cog fa-spin fa-3x fa-fw');
    }///END ifelse
    $(".editSubBtns"+car_id).toggle("fast");
}////END fn


///****MERCHANT TABS BUTTONS****\\\
$('#merchantsTabs ul > li button').on('click',function(){
     $('#loadingPopup').show();

    console.log(this.getAttribute('name'));
    var nameAttr = this.getAttribute('name');
    
    ////CHANGE MERCHANT VIEW
    $(this).addClass('selected');  
    $('#merchantsViewOutput').load('/fixitquick/incl/merchant_'+nameAttr+'.php'); ////LOAD CONTENT INTO ELEMENT
    
    
    $.each($('#merchantsTabs ul > li button'),function(){
        if(this.getAttribute('name') !== nameAttr){
            $(this).removeClass('selected');
        }///END if
    })///END 4loop
    $('#loadingPopup').hide();    
})


/////APPLY_BTN ONCLICK OPENS MERCHANT APPLICATION MODAL
$('#applyBtn2beMerchant').click(function(){ 
        $('#myModal2 .modal-content').load('/fixitquick/incl/regFrm.php');
        $('#myModal2 .modal-content').css({
            'width':'60%',
            'height':'auto'
        })         
        $('#myModal2').fadeIn('fast');
    window.onclick = function(){
        if(event.target.id == 'myModal2'){
            $('#myModal2').fadeOut('fast');
        }/////END if
    }////END onclick
})


////CREATE DEAL MODAL
function cr8Deal(){
    $('#myModal2 .modal-content').load('/fixitquick/incl/merchants_cr8deal_modal.php');
    $('#myModal2 .modal-content').css({
        'width':'60%',
        'height':'auto'
    })
    $('#myModal2').fadeIn('slow');
     window.onclick = function(){
        if(event.target.id == 'myModal2'){
            $('#myModal2').fadeOut('fast');
        }/////END if
     }      
}


////TGL SIDEBAR AND MAKE STICKY
function tglSideBar(){
    var sideBarOffset = $('.sideBar').offset().top;
    
    document.body.onscroll = function(){
        if(document.body.scrollTop > sideBarOffset
          && $('.sideBar').hasClass('open')){
            $('.sideBar').css({
                'position':'fixed',
                'top':'0'
            });
        }else{
            $('.sideBar').css({
                'position':'absolute',
                'top':'auto'
            });
        }////END ifelse
    }////END fn      
    
    if($('.sideBar').hasClass('open')){
         $('.sideBar').animate({right:'100%',left:'-150px'} ,'fast', function(){
            $(this).removeClass('open');
        });      
    }else{        
        $('.sideBar').animate({left:'0'} ,'fast', function(){
            $(this).addClass('open');    
        });          
    }///END ifelse
    document.body.onclick = function(){
     if($('.sideBar').hasClass('open')){
           if(event.target.id !== 'sideBr' 
              && event.target.className !== 'btn btn-lg btn-link'
              && event.target.className !== 'list-group-item list-group-item'){
              $('.sideBar').animate({right:'100%',left:'-150px'} ,'fast', function(){
                $(this).removeClass('open');
            });     
        }////END EVENT           
     }///END if
    }///END fn
}////END fn    
 
$('button[name="warantiesBtn"]').click(function(){
    var modal = document.getElementById('myModal2');
    
    //$('.modal-content').addClass('fade');

     $('.modal-content').load('/fixitquick/incl/warranties.php',function(){
    $('.modal-content').css({
        'width':'50%',
        'min-height':'400px',
        'background-color':'white',
        'margin':'30px auto'
    });     
    //$(modal).removeClass('fade');
        $(modal).fadeIn('fast');
    });
        //$('.modal-content').fadeTo('1','slow');
 })////END onclick

$('.regBtn').click(signUp);     

////SIGNUP REGISTRATION PROCESS MODAL
function signUp(){
    $(function(){
		$('#myModal2 .modal-content').load('/fixitquick/incl/regFrm.php',function(){
			$('#myModal2').fadeIn('fast');  

			$('#myModal2 .modal-content').css({
				'min-width':'50%',
				'min-height':$('.rgFrmTbl').height(),
				'height':'auto',
				'background-color':'white'
			})         
			
			////check for duplicate usrname via ajax
			$('input[name="mem_login"]').keyup(function(){
				$.get('/fixitquick/incl/ajax_process.php',{
					chk4dupLogin:true,
					login:this.value
				},function(confirmation){
					if($.trim(confirmation) == 'dup'){
						$('.merchRegDoneBtn').attr('disabled','');
						$('.dupLoginPic').fadeIn('fast');
						popUpMsg('Username Already Used');
					}else{
						$('.merchRegDoneBtn').removeAttr('disabled');
						$('.dupLoginPic').fadeOut('fast');
					}
				})////END $get
			})////END login onkeyup
		 });
    })    
}////END fn
////////////////////
$('.loginBtn').click(loginModal);


/////////HOME PAGE JS-ADD ITEMS////////////
function addMoreVehicleYrs(){
     var year = new Date;
     var modal_height = Number($('.modal-content').height()) + 35; 
     var html = "<select oninput='gatherAddedYrs()' class='input-sm form-control added_yr'>";
        html += "<option value=''>Select Year</option>";
            
        for(var i = 0;i < 50;i++){
         html += "<option>"+Number(year.getFullYear() - i)+"</option>";
        }///END 4loop
    
         html += "</select>";
    
      $("#addPartUl").after(html);
        $('.modal-content').css({
            'height':modal_height
        });   
 }//END fn

/////create CSV of vehicle years selected as compatible
function gatherAddedYrs(){
    var all_dates = '';
    
     $.each($(".added_yr"),function(){
        if($.trim($(this).val()) !== ''){
            all_dates += ',' + $.trim($(this).val());        
        }///END if
    })
     $("input[name='additional_years']").val(all_dates);
}//END fn
 
///left menu onhome pg sell parts btn
$('button[name="home_sellBtn"]').click(function(){
    
 if(document.cookie.indexOf('login') > 0){

 var modal = document.getElementById('myModal2');

//$('.modal-content').addClass('fade');
  $('.modal-content').load('/fixitquick/incl/sellItem.php',function(){
    $('.modal-content').css({
        'width':'50%',
        'min-height':'200px',
        'height':'200px',
        'background-color':'white',
        'margin':'30px auto'
    });     
    $(modal).fadeIn('fast');
     //////SELL ITEM STEP 2 PROCESS/////
     //////SELL ITEM STEP 2 PROCESS/////
     
     //if selling part//if selling part
     document.getElementsByClassName('sellPartCat')[0].onclick = (function(){

         $('#sellTiresSection').hide();

         $('#sellPartsSection').show();
         
         $('input[name="part_or_tire"]').val('part');

         $('.sellPartStp1').slideUp('fast');

             $('.modal-content').animate({'height':'260px'},'fast',function(){
                 $('.sellPartStp2').fadeIn('slow');
             });     
             $('#yr,#make,#parts').change(function(){
                 var yr = $('#yr').val();
                 var make = $('#make').val();
                 var parts = $('#parts').val();
                if(yr
                && make
                && parts){
                    $('.sellPartStp2').slideUp('fast');
					
					//GENER8 PART ITEM ID  BY MAKE AND UNIQID FOR PART
					var uniqid = $('input[name="item_uniquid"]').val();
					var part_id = $('input[name="item_id"]');
					var make_prefix = $.trim(make.substring(0,3).toLocaleUpperCase());
					
					//ASSIGN NEWLY GENERATED PART ID TO INPUT FIELD
					$(part_id).val(make_prefix + '-' + uniqid);
					
					//CR8 PART SELECTION HIDDEN INPUT 4 ITEM-TYPE-ID 
					$('input[name="item_part"]').val($.trim(parts.toLocaleLowerCase()));
					
                    $('.modal-content').animate({'height':'330px'},'fast',function(){
                        $('.sellPartStp3').fadeIn('slow');
                    })
					
                    document.getElementById('file_upload').onchange = (function(){
                        var imgBlob = [];  ////img blob array 4 multiple uplds
                        for(var i=0;this.files[i];i++){

                        if(i > 2){
                            popUpMsg('Upload 3 Pictures Max');
                            break;
                        }else{
                            var imgType = this.files[i].type;
                            var imgSize = this.files[i].size;
                            var allowed_ext = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
								
							imgType = imgType.split('/');
							imgType = $.trim(imgType[1]);
							
                            imgBlob.push(URL.createObjectURL(this.files[i]));
                            
							var chkExt = $.inArray(imgType,allowed_ext); 
							
							if(chkExt > 0){
								$('.sellPartPic center').slideUp('fast',function(){

								$('.modal-content').animate({'height':450},'slow',function(){
									$('.sellPartStp4').fadeIn('fast',function(){
									$('input[name="SellItem"]').animate({'width':'100px'},'slow');

									////ENTER PRICE INPUT FIELD	
									 document.getElementsByName('itemPrice')[0].oninput = (function(){

										if($.trim(this.value) !== ''){
										 $('input[name="item_price"]').val(this.value);	
                                            
										 $('#sellPartsDoneBtn').removeAttr('disabled');
                                                                                        
										}//END remove attribute

									 })
									});
								})
							 })
                            
                            $('.insertImgPreviewHere').after("<li><img src='"+imgBlob[i]+"' class='img-responsive' width='160px' /></li>"); 
                           
							}else{
								popUpMsg('Wrong File Format');
							}///END if
                       }///IF over 3 images total
                      }///END 4 loop 
                 })
                }///END if
             })
    })
	 
	 //if selling tire//if selling tire
     document.getElementsByClassName('sellTireCat')[0].onclick = (function(){

         $('#sellPartsSection').hide();

         $('.sellPartStp2').show();
         
         $('input[name="part_or_tire"]').val('tire');
         
         $('.sellPartStp1').fadeOut('fast');
             
         $('.modal-content').animate({'height':'660px'},'fast',function(){
            $('.sellTireStp1,.sellTireStp1Tires').slideDown('slow');
            $('#sellTiresSection').show('fast');
        $('select[name="selTire_width"],select[name="selTire_ratio"],select[name="selTire_size"]').change(function(){
            var width = $('select[name="selTire_width"').val();
            var ratio = $('select[name="selTire_ratio"]').val();
            var size = $('select[name="selTire_size"]').val();
            if(width
            && ratio
            && size){
				
			  $('.tireBrandTable tbody tr td button').click(function(){
				var tire_brand = $(this).attr('name');
				  
				$("input[name='tire_brand']").val(tire_brand.toLocaleLowerCase());
				  
                $('.sellTireStp1,.sellTireStp1Tires').slideUp('fast',function(){
                    $('.modal-content').animate({'height':'330px'},function(){
                        $('.sellTireStp2').slideDown('fast'); 

					//GENER8 TIRE ITEM ID  BY BRAND AND UNIQID FOR PART
					var uniqid = $('input[name="tire_uniquid"]').val();
					var tire_id = $('input[name="item_id"]');
					var brand_prefix = $.trim($("input[name='tire_brand']").val().substring(0,3).toLocaleUpperCase());
											
					//ASSIGN NEWLY GENERATED PART ID TO INPUT FIELD
					$(tire_id).val(brand_prefix + '-' + uniqid);
					
					//CR8 PART SELECTION HIDDEN INPUT 4 ITEM-TYPE-ID 
					$('input[name="tire_width"]').val($.trim(width));
					$('input[name="tire_ratio"]').val($.trim(ratio));
					$('input[name="tire_size"]').val($.trim(size));
						
                       document.getElementById('file_upload').onchange = (function(){

                        var imgBlob = [];  ////img blob array 4 multiple uplds
                        for(var i=0;this.files[i];i++){

                        if(i > 2){
                            popUpMsg('Upload 3 Pictures Max');
                            break;
                        }else{
                            var imgType = this.files[i].type;
                            var imgSize = this.files[i].size;
                            var allowed_ext = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
								
							imgType = imgType.split('/');
							imgType = $.trim(imgType[1]);
							
                            imgBlob.push(URL.createObjectURL(this.files[i]));
                                 
							var chkExt = $.inArray(imgType,allowed_ext); 
							
							if(chkExt > 0){
								$('.insertImgPreviewHere ').after("<li><img src='"+imgBlob[i]+"' class='img-responsive' width='160px' /></li>"); 

								$('.sellTirePic center').slideUp('fast',function(){

								$('.modal-content').animate({'height':450},'slow',function(){

									$('.sellTireStp3').fadeIn('fast',function(){
										$('input[name="SellItem"]').animate({'width':'100px'},'slow');

										document.getElementsByName('tirePrice')[0].oninput = (function(){

											if($.trim(this.value) !== ''){
                                                
											 $('#sellTiresDoneBtn').removeAttr('disabled');

											}//END remattr  

										})                                 

									});
								})
							})
							}else{
								popUpMsg('Wrong File Format');
							}///END if
							
                       }///IF over 3 images total
                      }///END 4 loop  
                     })
                   })
                });
				  
			  })
            }////END if
			
          })
         });                   
     })     
   });   
 }else{
     loginModal();
 }////END if
})////END fn

$('.homePgUsrQuickDashBrd li').mouseenter(function(){
    var newIcon = $(this).children('span');
    $(newIcon).addClass('fade');
})


///left menu onhome pg buy parts btn
$('button[name="home_buyBtn"]').click(function(){
	$("a[href='#pa']").trigger('click');
		$('html, body').animate({
		 scrollTop:$('.breadcrumb').offset().top
		},'fast');
	$('.srchNput').focus();   
})


///***************///SIGN IN LOGIN MODAL***************///
///***************///SIGN IN LOGIN MODAL***************///
function loginModal(login = false,pw = false){
    var loginHtml = "<form method='post' action='/fixitquick/' onsubmit='loginSession()'>"+
                "<b class='center-block text-center' style='color:#7b0101;font-size:150%;font-weight:bold;text-shadow:0px 1px 3px #999;'>Sign In</b>"+
                "<div class='well well-sm' id='loginFrm'>"+
                "<label class='label label-info'>Username</label>"+
                "<input type='name' name='usr_login' id='regName' class='input-sm form-control' maxlength='50' placeholder='Login' minlength='3' required autofocus /><br>"+
                "<label class='label label-info'>Password</label>"+
                "<input type='password' name='pw' id='regPw' class='input-sm form-control' maxlength='30' placeholder='Password' /><br>"+
                "<input type='submit' value='Sign In' id='login_btn' name='loginSbtBtn' class='btn btn-sm btn-primary center-block' disabled />"+
                "</div>"+
                "<span class='center-block text-center well well-sm'>"+
                "<a href='#' class='btn btn-sm btn-link' name='recoverPw' target='_self'>Forgot Password</a>"+
                "<a href='#' class='btn btn-sm btn-link' name='recoverLogin' target='_self'>Forgot Username</a>"+
                "</span>"+
                "</form>";
       
        $('#myModal2 .modal-content').css({
            'width':'550px',
            'min-height':'300px',
            'background-color':'white'
        })
    
        $('#myModal2 .modal-content').html(loginHtml);
	
        $('#myModal2').fadeIn('fast');

/*
        $('#myModal2').fadeIn('fast',function(){
			if(login && pw){
				popUpMsg('Successfully Created Account');
				$('#regName').val(login);
				$('#regPw').val(pw);
				$('#regPw').focus();
				$('input[name="loginSbtBtn"]').removeAttr('disabled');
				$('input[name="loginSbtBtn"]').addClass('flash');
				$('input[name="loginSbtBtn"]').animate({'width':'260px'},2500);
 			}///end if
		});
*/ 
        $('#regName').focus();

        $('#regName,#regPw').keyup(function(){
            if($.trim($('#regName').val()) !== ''){
                $("input[name='loginSbtBtn']").removeAttr('disabled');
                $('#loginFrm label:nth-of-type(1)').removeClass('label-info');
                $('#loginFrm label:nth-of-type(1)').addClass('label-primary')
            }else{
                $("input[name='loginSbtBtn']").attr('disabled','');
                $('#loginFrm label:nth-of-type(1)').removeClass('label-primary');
                $('#loginFrm label:nth-of-type(1)').addClass('label-info')
            }///END ifelse
            ////////////////////////////
            $('#regPw').keyup(function(){
                if($.trim($('#regPw').val())){
                    console.log(this.value);
                    $('#loginFrm label:nth-of-type(2)').removeClass('label-info');
                    $('#loginFrm label:nth-of-type(2)').addClass('label-primary');
                }else{
                    $('#loginFrm label:nth-of-type(2)').removeClass('label-primary');
                    $('#loginFrm label:nth-of-type(2)').addClass('label-info');
                }///END if
            })
        })////END keyup 

     ///////////////////////    
    $('a[name="recoverPw"], a[name="recoverLogin"]').click(function(){
        popUpMsg('Password and Usernme Recovery Under Construction');
    })
    
     window.onclick = function(){
        if(event.target.id == 'myModal2'){
            $('#myModal2').fadeOut('fast');
        }///END if
    }///END window onclick 
}/////END sign in modal popup /////////////////////


/////FOCUS ON GMAPS SRCH INPUT//
$('.srchNput,input[placeholder="Zip Code"]').focus(function(){
    var srch =  document.getElementsByClassName('srchNput')[0];
    var zip =  document.getElementsByClassName('zipFld ')[0];
    
   srch.oninput = (function(){
        $('#pac-input').val(this.value);
       
        input = this.value;
       
       if($.trim(input)
        && input.length > 3){
           
            $.get('/fixitquick/incl/ajax_process.php',{
                item_search:true,
                input:input
            },function(confirm){               
               if($.trim(confirm)){
                    $(".srchInput").html(confirm);
               }///END if
            })    
           
            $('.srchNput').animate({
                'width':'95%'
            },'fast',function(){
                 $("#itemSrchBtn").fadeIn('slow');
            });

       }else{        
           if(input == ''){
               $('.srchInput').load('/fixitquick/incl/parts.php');
           }///END if
           
           $("#itemSrchBtn").fadeOut('slow',function(){
            $('.srchNput').animate({
                'width':'105%'
            },'fast');
           });
       }///END if
       ///////////zip code
/*
       zip.oninput = (function(){
            $('#pac-input').val($(srch).val() +' '+ this.value);
            
           if($.trim(this.value.length) == '5'){
                $('a[href="#mechanics"]').trigger('click');        
               $('#pac-input').focus();
           }///END if
       })
*/
    })
   
   ////on srch btn click
    $("#itemSrchBtn").click(function(){
        ///pull items via ajax
        popUpMsg(input);
    })
})///END fn
///LOAD DATALIST INTO SEARCH BAR ONWINDOW LOAD
$(function(){
   //load datalist on input
   $('.srchInput').load('/fixitquick/incl/parts.php');    
})

////ONSELECT OF TIRE SPECS CR8 TAB IN '#vehTabDiv'
$(function(){
  var elms2listen2 = 'select[name="rim_size"],select[name="tire_width"],select[name="tire_ratio"]';
    
   $(elms2listen2).change(function(){    
    var tire_width = $('select[name="tire_width"]').val();
    var tire_ratio = $('select[name="tire_ratio"]').val();
    var rim_size = $('select[name="rim_size"]').val(); 
       
        if($.trim(tire_width) !== '' 
        && $.trim(tire_ratio) !== ''
        && $.trim(rim_size) !== ''){
            
          var tireHTML = tire_width +' / '+ tire_ratio +' / '+ rim_size;
            
            $('p.storedCarTabs:last').after('<strong class="stordTireSizes">'
                                       +tireHTML
                                       +'<button class="btn-link" onclick="remTireCookie();$(\'.stordTireSizes\').slideUp(\'fast\');$(\'#tireSpecInputs ul\').slideDown(\'slow\');" type="button">X</button>'
                                       +'</strong>');
           /////hide tire input fields
           $('#tireSpecInputs ul').slideUp('slow');  
            ////set cookie to store tire selection
            var d8 = new Date();
            d8 = d8.setTime(d8.getTime() + 90000); ///90000 = 24hrs?
            
            document.cookie = 'tire_set='+tireHTML+';expires='+d8.toString()+';path=/';
        }////END if tire selected
    })
})

////////////////////////////////
///PULL TIRE PRODUCT INFORATION 
function loadTireProdDesc(tire_id){
    
    $('.main_tires_tbl').fadeOut('fast',function(){
        $.get('/fixitquick/incl/tires_product_desc.php',{
            tire_id:tire_id
        },function(product_description){
            
            $('#homeTabs > ul:first-child').slideUp('fast');

            $('#tire_product_output').html(product_description);
            
            ////back btn onclick
            $('#bak2tiresItems').click(function(){
                $('#homeTabs > ul:first-child').slideDown('fast');
                $('#tire_product_output').html('');
                $('.main_tires_tbl').fadeIn('fast');
            })
             
        })
    })//END fn
}///END fn

///pull product description, shipping, & rating
function pullProductInfo(section,item_id){
    
    $('button[name="'+section+'"]').parent('.list-group-item').addClass('selected');

    //item_product_desc//item_product_ship//item_product_rate//
    if(section == 'desc'){
        $('button[name="ship"]').parent('.list-group-item').removeClass('selected');
        $('button[name="rate"]').parent('.list-group-item').removeClass('selected');
        $('#item_product_desc').slideDown('fast');
        $('#item_product_ship').slideUp('fast');
        $('#item_product_rate').slideUp('fast');
    }else if(section == 'ship'){
        $('button[name="desc"]').parent('.list-group-item').removeClass('selected');
        $('button[name="rate"]').parent('.list-group-item').removeClass('selected');
        $('#item_product_ship').slideDown('fast');
        $('#item_product_desc').slideUp('fast');
        $('#item_product_rate').slideUp('fast');    
    }else if(section == 'rate'){
        $('button[name="ship"]').parent('.list-group-item').removeClass('selected');
        $('button[name="desc"]').parent('.list-group-item').removeClass('selected');
        $('#item_product_rate').slideDown('fast');
        $('#item_product_ship').slideUp('fast');
        $('#item_product_desc').slideUp('fast');
    }////END elseif
}////END fn


function loadPartsProdDesc(item_id){
    $.get('/fixitquick/incl/pa_reviews_tbody.php',{
        item_id:item_id
    },function(product_description){
        
        $('#pa').html(product_description);
        
    })
    /////LOADS SELLER PROFILE INFO ONCLICK
    $('#homeTabs > ul:first-child').slideUp('fast');
}///END fn

//PULL LOCATION FOR MECHANIC SEARCH (not used: replaced by searchplaces)
function pullLocation(){
    if($.trim($('#mechanicSrchInput').val())
    && $('#mechanicSrchInput').val() !== 'Search Mechanic'
    && $.trim($('#mechanicSrchZip').val())){
        
        var location = $('#mechanicSrchInput').val();///$_REQUEST['location']
        var zip = $('#mechanicSrchZip').val();
        
         ////PULL LOCATIONS VIA AJAX
        $.get('/fixitquick/incl/pullLocation.php',{
            location:location,
            zip:zip
        },function(results){
            
            $('#locationsOutput').html(results);
            
        })
    }else{
        popUpMsg('Please Enter Location and Zip Code');
    }///END ifelse
}///END fn
/////////////////////////
function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 32.7766642, lng: -96.79698789},
      zoom: 10,
      mapTypeId: 'roadmap'
    });
    
    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.getDetails({
      placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
    }, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            'Place ID: ' + place.place_id + '<br>' +
            place.formatted_address + '</div>');
          infowindow.open(map, this);
        });
      }
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });


    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
searchBox.addListener('places_changed', function() {
   var places = searchBox.getPlaces();

    if (places.length == 0) {
    return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
    marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    var icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    // Create a marker for each place.
    markers.push(new google.maps.Marker({
      map:map,
      icon: icon,
      title: place.name,
      position: place.geometry.location
    }));

     ////pull searched location's details    
/*
    for(var i=0;markers[i];i++){
        var coord = markers[i].position;
        var htmlRows = "<li class='center-block text-center'>"
            +"<p align='center'>"
            +"<img src='"+markers[i].icon.url+"' width='30px' class='' />"
            +"</p>"
            +"<p align='center'>"
            +markers[i].title
            +"</p>"
            +"<p align='center'>";

        $.get('/fixitquick/incl/pullLocation.php',{
                  coord:coord.toString()
        },function(rlocation){
 
            console.log(rlocation.length);
 
            htmlRows += rlocation+"</p></li>";  

            if(rlocation){
                $('#locationsOutput').after(htmlRows);
            }///END if
        })          
    };///END 4loop
*/

    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
    });
    map.fitBounds(bounds);
    });
    /////////////////////////////////////
    $('#mechanicSrchInput').keyup(function(){
        input.value = this.value;
        
        
        $('button[name="mechanicSrchBtn"]').click(function(){
           var e = jQuery.Event("keypress");
            e.which = 13; //choose the one you want
            e.keyCode = 13;
            $(input).focus().trigger(e); 
            ///jQuery.Event( 'keydown', { which: $.ui.keyCode.ENTER } )
        })
    })
    
}////END google maps search places API process

//-----MERCHANTS APPLICATION REGISTRATION-----\\\
function previewSelProfPic(){
    var fType = this.files[0].type;
    var fSize = this.files[0].size;
    var fUrl = URL.createObjectURL(this.files[0]);

    ////CHCK 2 MAKESURE FILE IS IMAGE    
    fType = this.files[0].type.split('/');
    fType = fType[1];
    
     if(fType == 'jpeg' ||
        fType == 'bmp' ||
        fType == 'gif' ||
        fType == 'png'){
          if(Number(fSize) < 2000000){
            $('.uplProfPicBtn > img').attr('src',fUrl);
            $('.uplProfPicBtn > img').width('150px');
            $('.uplProfPicBtn > strong').hide();		
          }else{
              popUpMsg('Picture is too Large, Must be less than 2MB');
          }////END ifelse    
    }else{
        popUpMsg('File must be a picture');
    }//////END ifelse  
}////END fn 
/////////////////////////////////
function validInputs4merchReg(){
    var inputName = this.getAttribute('name');
    var inputVal = this.value;

    if($.trim(inputVal) !== ''){
        $('label[for="'+inputName+'"]').removeClass('label-info');
        $('label[for="'+inputName+'"]').addClass('label-primary');
    }else{
        $('label[for="'+inputName+'"]').removeClass('label-primary');
        $('label[for="'+inputName+'"]').addClass('label-info');      
    }///END ifelse   
    ///chk if pw1 field filled out then show pw2 field
}///END funk
/////////////////////////////////
function chkPw(){
    var pw2inputTd = document.getElementById('mem_pw2td');
    var pw2inputVal = $("input[name='mem_pw1']").val();
    
    if($.trim(pw2inputVal) !== ''){
        pw2inputTd.style.display = 'block';
    }else{
        pw2inputTd.style.display = 'none';
    }////END if    
}///END fn
function chkZip(){
    if($.trim(this.value) && isNaN(this.value)){
        this.value = '';
    }///END if
}///end fn
function chkTel(){
    if($.trim(this.value) && isNaN(this.value)){
        this.value = '';
    }///END if.
}///end fn
function chkTaxid(){
    if($.trim(this.value) && !/[a-z]/.test(this.value)){
        if(isNaN(this.value) && !/\-/.test($.trim(this.value))){
             this.value = '';
        }else if($.trim(this.value).length == 3){
            var first3char = this.value.substr(0,3);
            
            this.value = first3char + '-';
            
        }else if($.trim(this.value).length <= 4){
            var first3char = this.value.substr(0,3);
            
            this.value = first3char;           
        }///END ifelse   
    }else{
        this.value = 'Must Enter Tax ID Numbers';
    }///END if
}///end fn
/////////////////////////////////
$('.rgFrmTbl th p form').validate();


//ADD PAYMENT PG
$('button[name="paymentBtn"]').click(function(){
    $('#myModal2 .modal-content').load('/fixitquick/incl/addPayment.php',function(){

        $('#myModal2').fadeIn('fast');

        //$('#myModal2 .modal-content').draggable();

        $('#myModal2 .modal-content').css({
            'min-height':'250px',
            'min-width':'60%',
            'background-color':'white'
        })////END css
        
        $('button[name="addCardBtn"]').click(function(){
            $('.addPaymentTbl tbody:nth-of-type(1)').fadeOut('fast',function(){
                $('.addPaymentTbl tbody:nth-of-type(2)').fadeIn('fast');
            });
                $('button[name="addCardFinishBtn"]').click(function(){
                    $('#myModal2').fadeOut('fast');
                    popUpMsg('Successfully Added Card');
                })
        })
    })
})

/////HOME BTNS TO REDIRECT TO OTHER 4 PAGES
document.getElementsByName('homeBtn_tires')[0].onclick = (function(){
    $('a[href="#tires"]').trigger('click');
        $('body').animate({
            scrollTop: $('.breadcrumb').offset().top
        },'fast');
})
document.getElementsByName('homeBtn_pa')[0].onclick = (function(){
    $('a[href="#pa"]').trigger('click');
        $('body').animate({
            scrollTop: $('.breadcrumb').offset().top
        },'fast');
})
document.getElementsByName('homeBtn_deals')[0].onclick = (function(){
    $('a[href="#deals"]').trigger('click');
        $('body').animate({
            scrollTop: $('.breadcrumb').offset().top
        },'fast');
})


///CREATE LOGIN SESSION VIA COOKIE
function loginSession(){
    var loginName = $.trim($('#regName').val());
    var password = $.trim($('#regPw').val());
    var d8 = new Date();
    d8 = d8.setTime(d8.getTime() + 3600);
	
	////verify username and password via AJAX
	$.get('/fixitquick/incl/ajax_process.php',{
		check4loginMatch:true,
		login:loginName,
		pw:password
	},function(rzlt){
		if($.trim(rzlt) == 'ok'){
  		  document.cookie = 'login='+loginName+';expires='+d8.toString()+';path=/';
		}///END ifelse
	})	
}////END fn


/////TOGGLE SHOPPING CART
function tglCart(itemAdded = ''){
    
    if(itemAdded == 'discount'){

        $('#myModal2 .modal-content').load('/fixitquick/incl/sCart.php',function(){

            $('#myModal2').fadeIn('fast',function(){
                
                $('#myModal2 .modal-content').css({
                    'min-height':$('.sCartSection').innerHeight(),
                    'min-width':'60%',
                    'background-color':'white'
                })////END css  
                
                  $('#discount_confirmation_tr').show('fast');

                 $('#discount_confirmation').html("Successfully Used Your "+disc+"% Discount",function(){
                });     
            });

         });      
     //*******************************************   
     }else{
        $('.scart-modal-content').load('/fixitquick/incl/sCart.php',function(){

            $('#scart_modal').fadeIn('fast');
            
                $('.scart-modal-content').css({
                    'min-height':$('.sCartSection').innerHeight(),
                    'min-width':'60%',
                    'background-color':'white'
                })////END css 
            
            $('.scart-modal-content').animate({
                'left':'70%'
            },'fast')      
        });        
    }//END if
    window.onclick = function(){
        if(event.target.id == 'scart_modal'){
            $('.scart-modal-content').animate({
                'left':'100%'
            },'fast',function(){
                $('#scart_modal').fadeOut('fast');
            })      
        }///END if 
    }///END if 
    $('.sCartSection').load('/fixitquick/incl/ajax_scart.php'); 
    
    refreshScartIconCntNumber();
}////END fn

////APPLY SELECTED DISCOUNT
$('div[name="discount_promos_on_home_pg"] div a').click(function(){
    disc = $(this).children('b').attr('disc');
   
    tglCart('discount');

})////END click

///////////////////
$("button[name='tireBuyNow']").click(function(){
        var totalItems = 0;
    $.each($(".cartItem"),function(){
        totalItems++;
    })///END 4each  
    
    var nextItem = totalItems + 1;
    var html = "<tr id='sCartTr"+nextItem+"' class='cartItem'>"+
                "<td colspan='5%'>"+
                "<p align='center'>"+
                "<button type='button' value='"+nextItem+"' onclick='$(\"#sCartTr"+nextItem+"\").fadeOut(\"fast\")' class='btn btn-sm btn-link' value='' name='delete' item-price='20'>"+
                "<img src='/fixitquick/css/img/garbage.png' class='img-responsive' width='20px' alt='Delete' title='Delete' />"+
                "</button></p>"+
                "</td>"+
                "<td colspan='85%'>"+
                "<p align='center' valign='center'>"+
                "itemName"+
                "</p>"+
                "</td>"+
                "<td colspan='5%'>"+
                "<p align='center' valign='center'>"+
                "1"+
                "</p>"+ 
                "</td>"+
                "<td colspan='5%'>"+
                "<p align='center'>"+
                "$0.00"+
                "</p>"+
                "</td>"+
                "</tr>";
    console.log(nextItem);
     $("#sCartTr"+totalItems).after(html);
})
///////////////////
$(function(){
    $('#regName').val('Full Name');
    $('#regEmail').val('Email');
    $('#regName').on('focus',function(){
        if($(this).val() == 'Full Name'){
            
            $(this).val('');
            
        }////END if
    })/////END funk
    $('#regEmail').on('focus',function(){
        if($(this).val() == 'Email'){
            
            $(this).val('');
            
        }////END if
    })/////END funk
    ////////////////////////
    $('#regEmail').validate();
    ////////////////////////
    $('.zipFld').keyup(function(){
        if(isNaN($(this).val())){
            $(this).val('');
        }/////END if
    })/////END keyup
})/////END $funk


//////popup method////
popUpMsg = function(msg){
    ///////POP UP A MSG THAT FADES OUT 
	$('#msgSntPopup h1').text(msg);
    $('#msgSntPopup').effect('pulsate',{
        times:2,
     },function(){
        $('#msgSntPopup').fadeIn('fast',function(){
            $('#msgSntPopup').fadeTo('1',3000,function(){
                $('#msgSntPopup').fadeOut("slow");
            });
        })        
    })/////END fx
}/////END funk   


////product info pg details section
function tglItemDetailsSection (){
    
    $('.product_info_div, .item_product_info_left_btns, #item_product_info_pics').toggle();
    
    if($('#minimize_icon').hasClass('fa-minus')){
        $('#minimize_icon').attr('class','fa fa-plus');
    }else{
        $('#minimize_icon').attr('class','fa fa-minus');
    }
        ///END if
}////END fn


///ENLARGE PRODUCT PICTURE ONCLICK
function enlargeImg(src){
        
    $('#myModal2').fadeIn('fast',function(){
        
        $('#myModal2 .modal-content').animate({
            'min-width':'490px',
            'width':'80%',
            'background-color':'white',
            'height':'70%'   
        })
        
        var img_html = "<p align='center'>"
                    +"<img src='/fixitquick/upl/"+escape(src)+"' width='' class='product_img_enlarged img-responsive img-rounded' alt='Item for sale' />";
                    +"</p>";
        
        $('#myModal2 .modal-content').html(img_html);
        
    })///END fn    
    window.onclick=function(){
        if(event.target.id == 'myModal2'){
            $('#myModal2').fadeOut('fast');
        }
    }
}///END fn


///RATING PROCESS FOR REVIEWS
function r8_icon_hover(){
    
    $('.review_rate_section button').mouseenter(function(){
        var r8_num = $(this).attr('r8');

        for(var r8Num = r8_num;r8Num > 0;r8Num--){

            //$("button[r8='"+r8Num+"']").removeClass('fa-star-o');
            $("button[r8='"+r8Num+"']").css('background-color','rgba(0,0,0,0.14)');

        }//END 4loop
    })////END onmouseenter
        $('.review_rate_section').mouseout(function(){
            
            $('.review_rate_section button').css('background-color','transparent');
            
        })////END onmouseout    
}///END fn

////post your rating scrore for item process
function r8_4_review(r8,item_id){
    var item_id = document.getElementsByName('item_id')[0].value;
    
    $('.review_rate_section button i').attr('class','fa fa-star-o');
        
    $.post('/fixitquick/incl/ajax_process.php',{
        item_id:item_id,
        r8_num:r8
    },function(r){
                
        if($.trim(r) == 'ok'){
            for(var r8Num = r8;r8Num > 0;r8Num--){
                
                $("button[r8='"+r8Num+"'] > i").removeClass('fa-star-o');
                $("button[r8='"+r8Num+"'] > i").addClass('fa-star');

            }//END 4loop
        }////END if
    })///END $post
}///END fn

///review posting 2 db
function itemReviewInputProcess(){
    var review_data = document.getElementsByName('item_review_tArea')[0].value;
    var sbt_btn = document.getElementsByName('item_review_submit_btn')[0];
    var item_id = document.getElementsByName('item_id')[0].value;
    
    if($.trim(review_data)){
        
        sbt_btn.removeAttribute('disabled');
        
        sbt_btn.onclick = (function(){
            
            $.post('/fixitquick/incl/ajax_process.php',{
                review_data:review_data,
                item_id:item_id
            },function(confirm){
                if($.trim(confirm) == 'ok'){
                    
                    $('#rev').trigger('click');

                }///end if
            })
        })
    }else{
        sbt_btn.setAttribute('disabled','');
    }///END if
}///END fn


///****SHOPING CART********SHOPING CART****\\\\
function addItemToCart(item_id,sCart_qty = false){
//sCart_qty = if changing items in shopping-cart modal
    if(sCart_qty == false){
        
        var item_qty = $("."+item_id+"_qty").val();
    
        $.post('/fixitquick/incl/sCart.php',{
            add2cart:true,
            item_id:item_id,
            item_qty:item_qty
        },function(ok){
         if(ok){
          $('.sCartSection').load('/fixitquick/incl/ajax_scart.php'); 
             refreshScartIconCntNumber();
         }//END if
        })
    }else{
        ///IF UPDATING ITEM ALREADY IN SHOPPING CART
        $.post('/fixitquick/incl/sCart.php',{
            add2cart:true,
            item_id:item_id,
            item_qty:sCart_qty
        },function(ok){
         if(ok){
          $('.sCartSection').load('/fixitquick/incl/ajax_scart.php'); 
             refreshScartIconCntNumber();
         }//END if
        })  
    }//END ifelse scart modal already open
    
    $('button[onclick="tglCart()"]').trigger('click');
    
}/////END fn

function refreshScartIconCntNumber(){
    ////upd8 shopping cart icon 'items-in-cart' count
    $.getJSON('/fixitquick/incl/ajax_process.php',{
        refreshScartCount:true
    },function(confirm){
        if(confirm.check == 'ok'){
            $('#shopping_cart_item_count').html(confirm.count);
        }///END if
    })    
}//END fn

////I <3 ECMA\\\\\\