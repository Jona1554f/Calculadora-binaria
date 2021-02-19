var num,lum;
var result=0,result2 = "";
var lock = false;

var expre = {"Binario":" Expression:<br/><br>E.g. 110+(11*01.01)/10",
              "Decimal":" Expression:<br/><br>E.g. 67+(78.5*99)/2"};

//Restablecer valor de entrada y salida
function Reset(){
  document.getElementById('output1').value="";
  document.getElementById('input1').value="";
}


//comprobar el valor de los selectores y convertirlos
function takevalue(){

  let unit1 = document.getElementById('select1').value;
  let unit2 = document.getElementById('select2').value;
  lum = document.getElementById('input1').value;
  lum = lum.trim();
  num = lum.replace(/ +/g, "");
  let hu;
  //console.log(num);
  if((num.lastIndexOf("-") == 0 || num.lastIndexOf("-") == -1) && ((num.match(/\./g) == null)?0:(num.match(/\./g)).length)<2){
    document.getElementById('output1').style.color="#45A29E";
    if(unit1 == "Binario"){
      var number;
      num = num.toString();
      var regex = /[01\.\-]/g;
      num = num.match(regex).join('');
      number = num;
          switch(unit2){
            case 'Binario':result = num;break;
            case 'Decimal':if(number.indexOf(".") != -1) result2 = ToDecimal(num,2);
                           if(!isNaN(parseInt(num,2)))
                           result=parseInt(num,2).toString(10);break;
            
          }
        document.getElementById('input1').value=number;
        document.getElementById('output1').value=result.toString().toUpperCase()+result2;
        result2="";
        result = 0;
    }
    else if(unit1 == "Decimal"){
          var number;
          num = num.toString();
          var regex = /[0-9\.\-]/g;
          num = num.match(regex).join('');
          number = num;
          switch (unit2) {
            case 'Binario':if(number.indexOf(".") != -1) result2 = DecimalToBinario(num);
                          if(!isNaN(parseInt(num,10)))
                          result=parseInt(num,10).toString(2);break;
            case 'Decimal':result = num;break;
           
          }
            document.getElementById('input1').value=number;
            document.getElementById('output1').value=result.toString().toUpperCase()+result2;
            result2="";
            result = 0;
    }
  
    }else{
      document.getElementById('output1').style.color="red";
      document.getElementById('output1').value="!Invalid input";
    }
}

//cambiar otro elemento basado en el selector
function convert(){
  Reset();
  let unit1 = document.getElementById('select1').value;
  let unit2 = document.getElementById('select2').value;
  if(unit1 != unit2){
    //document.getElementById ('título'). innerHTML = unidad1 + "a" + unidad2 + "convertidor";
    document.getElementById('h1').innerHTML= unit1+" a "+unit2+" convertidor y CALCULADORA";
    document.getElementById('lable1').innerHTML= "Enter "+unit1+" number:";
    document.getElementById('lable2').innerHTML= unit2+" number:";

    switch (unit1) {
      case 'Binario':document.getElementById('sub1').innerHTML="2";break;
      case 'Decimal':document.getElementById('sub1').innerHTML="10";break;
     
    }
    switch (unit2) {
      case 'Binario':document.getElementById('sub2').innerHTML="2";break;
      case 'Decimal':document.getElementById('sub2').innerHTML="10";break;
     
    }
  }
}

//intercambiar valores de selectores solamente
function Swape(){
  let x = document.getElementById('select1');
  let y = document.getElementById('select2');
  let temp = x.value;
  x.value = y.value;
  y. value = temp;
  Reset();
  convert();
}


//entrada enlazada basada en valores de selector validacion

function Onpress(e){
  let pressedkey=(window.event)?event.charCode:e.which;
  if(pressedkey == 13){
    takevalue();
    return true;
  }
  else{
          let unit1 = document.getElementById('select1').value;
          switch (unit1) {
            case 'Binario':  if( pressedkey == 48 || pressedkey == 49 ||
                            pressedkey == 46 || pressedkey == 45 )return true;
                            else{ return false; }
                            break;
            case 'Decimal':  if( (pressedkey > 47 && pressedkey < 58) ||
                             pressedkey == 46 || pressedkey == 45 ) return true;
                             else{ return false; }
                             break;
           
          }
      }
}


// convertir cualquier -> decimal
function ToDecimal(val,n){
  //var bin to Dic = [2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768,65536,131072];
    var number = val.toString();          //Encadenar
    var inDex = number.indexOf(".");      //buscar .
    var fraction = number.slice(inDex+1); //cortar después. string
    var leng = fraction.length;           //encontrar longitud
    if(leng == 0) return "";
    number = parseInt(fraction);          //extraer valor int
    var numberA = fraction.split("");     //dividir en matriz de cadenas
    val = 0;
    for(let i=0;i<leng;i++){
        if(numberA[i] != "0"){
            let temp = numberA[i];
            let devide = parseInt(temp,n);
            let devided = Math.pow(n,i+1);
            val += (devide/devided);
        }
    }
    number = val.toString();
    val = number.slice(1);
    return val;
}


// convert decimal a Binario
function DecimalToBinario(val){
  var number = val.toString();          //Encadenar
  var inDex = number.indexOf(".");      //buscar .
  var fraction = number.slice(inDex+1); //cortar después. string
  var leng = fraction.length;           //encontrar longitud
  if(leng == 0) return "";
  fraction = number.slice(inDex);
  number = Number(fraction);
  fraction = ".";
    for(let i=0;i<21;i++){
        number *= 2;
            if(number == 1){
              fraction+= "1";
                break;
            }
            else if(number < 1){
              fraction+= "0";
            }
            else{
              number-=1;
              fraction+= "1";
            }
      }
  return fraction;
}

    

function convertCal(){
  ResetCal();
  var calval = document.getElementById('select3');
  let label3 = document.getElementById('lable3');
  var sub3 = document.getElementById('sub3');
  var sub4 = document.getElementById('sub4');
  let unit1 = calval.value;
  label3.innerHTML= "Enter "+unit1+expre[unit1];
  switch (unit1) {
    case 'Binario':sub3.innerHTML="2";sub4.innerHTML="2";
      break;
    case 'Decimal':sub3.innerHTML="10";sub4.innerHTML="10";
      break;
    
  }
}

// tecla enlazada Enter 
function OnpressCal(e){
  let pressedkey=(window.event)?event.charCode:e.which;
  if(pressedkey == 13){
    solve();
    return true;
  }
}
