<?php //************************************\\
///**********INCLUDE SESSION PHP FILE************////
require_once($_SERVER['DOCUMENT_ROOT'].'/fixitquick/incl/ses.php');
///*******END INCLUDE SESSION PHP FILE***********////
///////INLCUDE THE DB CONNECTION SV.PHP//////////////
include_once($_SERVER['DOCUMENT_ROOT'].'/fixitquick/incl/sv.php');
////LAST CHECK IF SESSION CONSTANTS ARE DEFINED/////
if(isset($_SESSION['username'])){
  if(!defined('_USER_')){

    $rzlt = mysqli_query($dbCon,"SELECT * FROM members WHERE mem_username = '{$_SESSION['username']}'");
    while($r = mysqli_fetch_assoc($rzlt)){
         define("_USER_", strtolower($_SESSION['username']));
         define("_BOSS_", $r['admin']);
         define("_ID_", $r['id']);   
         define("_AVATAR_", $r['mem_avatar']);   
         break;
    }///END while
  }///END if CONST !DEFINED
}///END if

///IF !COOKIE['login'] THEN LOGOUT USER
if(isset($_SESSION['username']) && !$_COOKIE['login']){
	 print("<script>window.open('/fixitquick/?logout','_self');</script>");
}

//DEFINE CONSTANT _USR_ DEFINE CONSTANT _USR_\\
 if(isset($_SESSION['username']) &&
    isset($_SESSION['admin']) &&
    isset($_SESSION['myId'])){
$qry = "SELECT mem_avatar
        FROM members
        WHERE id = '{$_SESSION['myId']}'
        LIMIT 1";
$rzlt = mysqli_query($dbCon,$qry) or die(mysqli_error($dbCon));
 if(mysqli_num_rows($rzlt) > 0){
    while($pix = mysqli_fetch_array($rzlt)){
        if(!empty($pix[0])){
            $pic = $pix[0];	
        }else{
            $pic = "boy.png";
        }////END ifelse
    break;
    }///END while loop	 
 }///END if
}////END if const !defined
define("_KEYWORDS_","");
define("_AUTHOR_","brandon osuji"); 
define("_DESC_","");

//////check if tire selection cookie set
if(isset($_COOKIE['tire_set']) && !empty($_COOKIE['tire_set'])){
    $tire_specs = explode('/',$_COOKIE['tire_set']);
    define('_TIRE_WIDTH_',$tire_specs[0]);
    define('_TIRE_RATIO_',$tire_specs[1]);
    define('_TIRE_SIZE_',$tire_specs[2]);
}////END if
////////////////////////////////////////////  
///COOKIES 2 CHECK 4: 'login','makeModelYr'
////////////////////////////////////////////  
class fn{
public function getFld($tbl,$whereThat,$whereThis,$fld){
    global $dbCon;
        $q = "SELECT * 
             FROM $tbl ";
        if(!empty($whereThat) && !empty($whereThis)){
        $q .= " WHERE $whereThat 
                LIKE '{$whereThis}'";            
        }
    $r = mysqli_query($dbCon,$q) or die(mysqli_error($dbCon));
    if(mysqli_num_rows($r) > 0){
     $field = NULL;   
     while($row = mysqli_fetch_assoc($r)){
        if(!empty(trim($row[$fld]))){
            $field = trim($row[$fld]);    
            break;
        }else{
             continue;
            $field = NULL; 
        }     
     }
    }else{
        $field = NULL;
     }                
    return $field;
}
///////////////////////////
public function getRows($tbl,$whereThat,$whereThis){
    $whereThat = trim($whereThat);
    $whereThis = trim($whereThis);
    global $dbCon;
        $q = "SELECT * 
             FROM $tbl ";
        if(!empty($whereThat) && !empty($whereThis)){
        $q .= " WHERE $whereThat 
                LIKE '$whereThis'";            
        }
    $r = mysqli_query($dbCon,$q) or die(mysqli_error($dbCon));
    if(mysqli_num_rows($r) > 0){
    $rows = array();
     while($row = mysqli_fetch_assoc($r)){
        $rows[] = $row;
     }
        return $rows;
    }else{
        return false;
    }            
}////END fn
///////////////////////////
public function ifLoggedInEcho($echoThis){
global $dbCon;
if(isset($_SESSION['username'])){
	echo $echoThis;
	}else{
		 echo "";
	} 
}
//*****************************************///
public function ifLoggedInReturn($returnThis){
global $dbCon;
if(isset($_SESSION['username'])){
	return $returnThis;
	}else{
		return false;
	} 
}
//*****************************************///
public function ifLoggedOut($echoThis){
global $dbCon;
if(!isset($_SESSION['username'])){
	echo $echoThis;
	}else{
		 echo "";
	} 
}
//*****************************************///
public function getNameById($id){
    global $dbCon;
    $r = mysqli_query($dbCon,"SELECT mem_username 
                             FROM members 
                             WHERE id 
                             LIKE '$id'") or die(mysqli_error($dbCon));
    if(mysqli_num_rows($r) > 0){
        while($row = mysqli_fetch_array($r)){
         return $row[0];
        }        
    }else{
        return NULL;
    }
}
//*****************************************///
public function getIdByName($name){
    global $dbCon;
    $r = mysqli_query($dbCon,"SELECT id 
                             FROM members 
                             WHERE mem_username 
                             LIKE '$name'") or die(mysqli_error($dbCon));
    if(mysqli_num_rows($r) > 0){
        while($row = mysqli_fetch_array($r)){
         return $row[0];
        }        
    }else{
        return NULL;
    }
}
//*****************************************///
public function getAvatar($nameOrId){
    global $dbCon;

        $q = "SELECT mem_avatar 
             FROM members ";
    if(is_numeric($nameOrId)){
        $q .= " WHERE id LIKE '$nameOrId'";
    }else{
        $q .= " WHERE mem_username = '$nameOrId'";
    }
    $r = mysqli_query($dbCon,$q) or die(mysqli_error($dbCon));
    while($row = mysqli_fetch_array($r)){
        if(!empty(trim($row[0]))){
            return '/fixitquick/img/'.urldecode($row[0]);
        }else{
            return '/fixitquick/css/img/boy.png'; 
        }
        break;
    }

 }
//*****************************************///
public function getItemPic($item_id){
  global $dbCon;
    $item_id = trim($item_id);
    $q = "SELECT item_pic_file
         FROM item_4_sale_pics
         WHERE item_id LIKE '$item_id'";
    $r = mysqli_query($dbCon,$q) or die(mysqli_error($dbCon).', item_pic issue');
    if(mysqli_num_rows($r) > 0){
        while($row = mysqli_fetch_assoc($r)){
                return urldecode('/fixitquick/upl/'.$row['item_pic_file']);
            break;
        }///END while        
    }else{
        return '/fixitquick/css/img/matte-black-bmw-wrap.jpg';
    }///END num_rows
}///END fn    
//*****************************************///
public function echoIfIsset($chk,$Echo,$elseEcho){
    if(isset($chk) || !empty($chk)){
        echo $Echo;
    }else{
        echo $elseEcho;
    }
}
//*****************************************///
public function getD8Re4matted($d8){
 if(isset($d8) &&  $d8 !== 'Private'){
    $d8 = explode('-',$d8);
    $d8New = $d8[1].'-'.$d8[2].'-'.$d8[0];
   return $d8New;     
 }else{
     echo "";
 }
}
//*****************************************///
public function ifStrLenEqualZero($str,$thenEcho){
    if(strlen($str) == 0){
        echo $thenEcho;
    }else{
        echo $str;
    }
}
//*****************************************///
public function ifStrLenNotZero($str,$thenEcho,$else){
    if(strlen($str) > 0){
        echo $thenEcho;
    }else{
        echo $str;
    }
}
//*****************************************///
public function ifIssetAndEquals($var,$eqls,$Echo,$else){
        if(isset($var) && $var == $eqls){
          echo $Echo;
     }else{
         echo $else;
     }
 }
//*****************************************///  
public function getAdminFld($usrName){
    global $dbCon;
    $q = "SELECT `admin` 
          FROM `members`
          WHERE `mem_username` = '$usrName'";
    $r = mysqli_query($dbCon,$q) or die(mysqli_error($dbCon));
        while($row = mysqli_fetch_assoc($r)){
            $adminStatus = $row['admin'];
             break;
        }
    return $adminStatus;
}
//*****************************************///
public function chkIfScartTblExist(){
    global $dbCon;
  if($fn->ifLoggedInReturn(true)){
    $scart_tbl = 'shopping_cart_'.strtolower(trim(_USER_));
	$chk4sCartTbl = mysqli_query($dbCon,"SHOW TABLES LIKE '$scart_tbl'");
	if(mysqli_num_rows($chk4sCartTbl) > 0){
        return true;
    }else{
        return false;
    }///END ifelse
  }else{
      return false;
  }///END ifelse
}///END fn
//*****************************************///
public function getCompId($usrName){
    global $dbCon;
    $q = "SELECT `company_id` 
          FROM `members`
          WHERE `mem_username` = '$usrName'";
    $r = mysqli_query($dbCon,$q) or die(mysqli_error($dbCon));
        while($row = mysqli_fetch_assoc($r)){
            $company_id = $row['company_id'];
             break;
        }
    return $company_id;
}
//*****************************************///
public function ifGet($get,$eqls,$echo,$else){
    if(!empty($eqls)){
        if(isset($_GET[$get]) && $_GET[$get] == $eqls){
            echo $echo;
        }else{
            echo $else;
        }
    }else{
        if(isset($_GET[$get])){
            echo $echo;
        }else{
            echo $else;
        }
    }
}
//*****************************************///
public function ifStrstr($This,$inThis,$echo,$else){
    if(stristr($inThis,$This)){
        echo $echo;
    }else{
        echo $else;
    }
}
//*****************************************///
public function getFileByPath($path){
    if(!empty(trim($path))){
        $path = explode('\\',$path);
        $path = end($path);
        if(stristr($path,'.')){
            $end = explode('.',$path);
            $exts = array('php','html','htm','js');
            if(in_array(end($end),$exts)){
                $path = str_replace('.'.end($end),'',$path);
                return $path;
            }else{
                return false;
            }///END ifelse
        }///END if
    }///END if
}///$path = __file__
//*****************************************///
public function alertString($string){
    if(isset($string)){
        print("<script>alert('$string');</script>");
    }//END if
}//END fn    
//*****************************************///
public function ifValGreaterThan($val,$greaterThanThis,$return,$else){
    if(trim(intval($val)) > trim(intval($greaterThanThis))){
        return $return;
    }else{
        return $else;
    }///END if
}////END fn
//*****************************************///
function dateAdd($hour,$minute,$day){	
    $newdate = date('Y-m-d', mktime(
    date('h') + $hour, ////hour
    date('i') + $minute, /////minute
    0,                  ////seconds
    date('m'), ////month
    date('d') + $day, /////day
    date('y'))); //////year
return $newdate;
 }    
}////END CLASS fn
//////////////////////////////////////////////
class hdr{
    
    public function meta($keywords,$author,$desc){
    
    echo '
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta http-equiv="content-type" content="text/html" />
    <meta http-equiv="content-type" content="cache" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="'.$author.'" />	
    <meta name="robots" content="INDEX,FOLLOW" />
    <meta name="keywords" content="'.$keywords.'" />
    <meta name="description" content="'.$desc.'" /> 	  
    
 
    <script src="/fixitquick/js/jquery-1.11.3.min.js" ></script>
	<script src="/fixitquick/js/jquery-ui.js" ></script>
  	<script src="/fixitquick/js/bootstrap.min.js" ></script>
	<script src="/fixitquick/js/custom.js" ></script>   
 	<script src="/fixitquick/js/jquery.easing.min.js" ></script>
 	<script src="/fixitquick/js/jquery-scrollto.js" ></script>
 	<script src="/fixitquick/js/jquery.validate.js" ></script>
     
	<link rel="stylesheet" href="/fixitquick/css/footer-distributed-with-address-and-phones.css">
    <link rel="icon" href="/fixitquick/css/icon.ico" /> 
	<link rel="stylesheet" type="text/css" href="/fixitquick/css/bootstrap.css" />   
    <link rel="stylesheet" type="text/css" href="/fixitquick/css/jquery-ui.css" />	
 	<link rel="stylesheet" type="text/css" href="/fixitquick/css/custom.css" />
    <link rel="stylesheet" href="/fixitquick/css/font-awesome.css">
       
    ';
    }
    
    public static function page($pg){
	  if(defined('_PG_')){
		  $pg = true ? ($pg == _PG_ ? 'active' : '') : false;
	  }
	  return $pg;
  }///////////////////////////
}////END CLASS hdr
 /////////////// END FUNK \\\\\\\\\\\\\\\\\\\\\
$fn = new fn;
//////////////////////////////////////////////
$hdr = new hdr;
//////////////////////////////////////////////

//////////////////////////////////////////////

//////////////////////////////////////////////
?>
